import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { backgroundColor } from '../store';
import { siteConfig } from '../config';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface Props {
  children: React.ReactNode;
  color: string;
}

export default function CrateDiggerWrapper({ children, color }: Props) {
  const snapRef    = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const snap    = snapRef.current;
      const content = contentRef.current;
      if (!snap || !content) return;

      // Stato iniziale: sfocato e invisibile
      gsap.set(content, { filter: 'blur(28px)', opacity: 0, scale: 0.96 });

      ScrollTrigger.create({
        trigger: snap,
        start: 'top 65%',

        // ENTRATA: sfocatura si risolve
        onEnter: () => {
          gsap.to(content, {
            filter: 'blur(0px)',
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
          });
          backgroundColor.set(color);
        },

        // ENTRATA tornando su
        onEnterBack: () => {
          gsap.to(content, {
            filter: 'blur(0px)',
            opacity: 1,
            scale: 1,
            duration: 1.0,
            ease: 'power3.out',
          });
          backgroundColor.set(color);
        },

        // USCITA in avanti: torna sfocata verso l'alto
        onLeave: () => {
          gsap.to(content, {
            filter: 'blur(28px)',
            opacity: 0,
            scale: 1.04,
            duration: 0.7,
            ease: 'power2.in',
          });
        },

        // USCITA tornando su
        onLeaveBack: () => {
          gsap.to(content, {
            filter: 'blur(28px)',
            opacity: 0,
            scale: 0.96,
            duration: 0.7,
            ease: 'power2.in',
          });
        },
      });
    },
    { scope: snapRef }
  );

  const snapClass = siteConfig.layout.scrollSnap
    ? 'h-[100dvh] snap-center flex items-center justify-center flex-shrink-0'
    : 'w-full min-h-screen flex items-center justify-center py-32';

  return (
    <div ref={snapRef} className={`${snapClass} w-full`}>
      <div
        ref={contentRef}
        className="w-full h-full will-change-transform"
        style={{ opacity: 0, filter: 'blur(28px)' }}
      >
        {children}
      </div>
    </div>
  );
}
