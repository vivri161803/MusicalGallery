import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '@nanostores/react';
import { backgroundColor } from '../store';
import { siteConfig } from '../config';

const PARTICLE_COUNT = 1800;
// Raggio di rallentamento in unità mondo (proporzionale a halfW)
const SLOW_RADIUS_FACTOR = 0.22;
// Fattore di rallentamento massimo (0 = fermo, 1 = velocità normale)
const SLOW_MIN_FACTOR = 0.08;

function lerpVal(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

const ParticleField = () => {
  const { size, viewport } = useThree();
  // Con fov=90 e camera z=1: visible world = viewport.width x viewport.height
  // viewport.width/height ci dà le dimensioni in unità mondo — usiamo quello
  const halfW = viewport.width  / 2;
  const halfH = viewport.height / 2;

  const mouse = useRef({ x: 0, y: 0 });
  const smoothMouse = useRef({ x: 0, y: 0 });
  const currentColor = useStore(backgroundColor);
  const targetColor = useRef(new THREE.Color());

  // Genera posizioni iniziali distribuite su TUTTO lo schermo
  const { positions, velocities, depths, alphas, pSizes, baseY } = useMemo(() => {
    const positions  = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT);
    const depths     = new Float32Array(PARTICLE_COUNT);
    const alphas     = new Float32Array(PARTICLE_COUNT);
    const pSizes     = new Float32Array(PARTICLE_COUNT);
    const baseY      = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * halfW * 2;
      positions[i * 3 + 1] = (Math.random() - 0.5) * halfH * 2;
      positions[i * 3 + 2] = 0;

      baseY[i]      = positions[i * 3 + 1];
      depths[i]     = Math.random();                                    // 0=lontano 1=vicino
      velocities[i] = (0.03 + Math.random() * 0.12) * (0.4 + depths[i] * 0.6) * halfW;
      // size in unità mondo proporzionale alla viewport
      pSizes[i]     = (0.003 + depths[i] * 0.007) * halfW;
      alphas[i]     = 0;
    }
    return { positions, velocities, depths, alphas, pSizes, baseY };
  }, [halfW, halfH]);

  const geomRef = useRef<THREE.BufferGeometry>(null);
  const matRef  = useRef<THREE.ShaderMaterial>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth)  * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // Converti il colore dominante (anche scuro) in qualcosa di visibile:
  // estrai lo hue e forza saturation=0.9, lightness=0.65
  useEffect(() => {
    const c = new THREE.Color(currentColor);
    const hsl = { h: 0, s: 0, l: 0 };
    c.getHSL(hsl);
    // Se il colore è quasi acromatico (grigio), usa un fallback caldo
    const sat = hsl.s < 0.1 ? 0.3 : 0.85;
    c.setHSL(hsl.h, sat, 0.65); // sempre luminoso e saturo
    targetColor.current.copy(c);
  }, [currentColor]);

  useFrame((state, delta) => {
    if (!geomRef.current || !matRef.current) return;
    const pos  = geomRef.current.attributes.position.array as Float32Array;
    const aAlp = geomRef.current.attributes.aAlpha.array   as Float32Array;

    smoothMouse.current.x = lerpVal(smoothMouse.current.x, mouse.current.x, 0.05);
    smoothMouse.current.y = lerpVal(smoothMouse.current.y, mouse.current.y, 0.05);

    const margin = halfW * 0.12;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const ix = i * 3;

      // Rallentamento locale al mouse — zero offset laterale
      // Converti mouse NDC → coordinate mondo
      const mouseWX = smoothMouse.current.x * halfW;
      const mouseWY = -smoothMouse.current.y * halfH;
      const dx = pos[ix] - mouseWX;
      const dy = (pos[ix + 1]) - mouseWY;
      const distToMouse = Math.sqrt(dx * dx + dy * dy);
      const slowRadius = halfW * SLOW_RADIUS_FACTOR;
      // smoothstep → 1 al centro, 0 fuori dal raggio
      const influence = 1.0 - smoothstep(0, slowRadius, distToMouse);
      // Velocità effettiva: rallenta verso SLOW_MIN_FACTOR vicino al cursore
      const speedFactor = 1.0 - influence * (1.0 - SLOW_MIN_FACTOR);

      pos[ix] += velocities[i] * speedFactor * delta;

      // Leggero ondeggiamento sinusoidale in Y (invariato)
      pos[ix + 1] = baseY[i] + Math.sin(state.clock.elapsedTime * 0.25 + i * 0.9) * halfH * 0.03;

      // Wrap a sinistra
      if (pos[ix] > halfW + margin) {
        pos[ix]     = -halfW - margin;
        pos[ix + 1] = (Math.random() - 0.5) * halfH * 2;
        baseY[i]    = pos[ix + 1];
      }

      // Fade in/out ai bordi X
      const fadeIn  = smoothstep(-halfW - margin, -halfW + margin, pos[ix]);
      const fadeOut = 1.0 - smoothstep(halfW - margin, halfW + margin, pos[ix]);
      aAlp[i] = fadeIn * fadeOut * (0.4 + depths[i] * 0.6);
    }

    geomRef.current.attributes.position.needsUpdate = true;
    geomRef.current.attributes.aAlpha.needsUpdate   = true;

    // Lerp del colore uniforme
    matRef.current.uniforms.uColor.value.lerp(targetColor.current, 0.018);
  });

  const vertexShader = `
    attribute float aAlpha;
    attribute float aSize;
    varying float vAlpha;
    void main() {
      vAlpha = aAlpha;
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      // gl_PointSize in pixel: size in world units * pixels per unit
      gl_PointSize = aSize * (projectionMatrix[1][1] * ${size.height.toFixed(1)} * 0.5);
      gl_Position  = projectionMatrix * mvPosition;
    }
  `;

  const fragmentShader = `
    uniform vec3 uColor;
    varying float vAlpha;
    void main() {
      vec2 uv = gl_PointCoord - 0.5;
      float dist = length(uv);
      if (dist > 0.5) discard;
      float softEdge = 1.0 - smoothstep(0.15, 0.5, dist);
      gl_FragColor = vec4(uColor, vAlpha * softEdge);
    }
  `;

  const uniforms = useMemo(() => ({
    uColor: { value: new THREE.Color(0.35, 0.35, 0.35) }
  }), []);

  return (
    <points>
      <bufferGeometry ref={geomRef}>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aAlpha"   args={[alphas, 1]} />
        <bufferAttribute attach="attributes-aSize"    args={[pSizes, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </points>
  );
};

export default function FluidBackground() {
  if (!siteConfig.fluidBackground.enabled) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {/* fov=90 + z=1: le dimensioni mondo = dimensioni viewport normalizzate */}
      <Canvas
        camera={{ position: [0, 0, 1], fov: 90, near: 0.01, far: 100 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ParticleField />
      </Canvas>
    </div>
  );
}
