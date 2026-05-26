# Plan: Core Features (Fasi 2, 3, 4, 5)

## 1. Struttura UI Stabile e Frontend Design (Fase 2)
- Creare `PlaylistSection.tsx` (React): layout responsive a due colonne.
- **Colonna Visiva**: Componente per l'immagine ottimizzata (senza hover né interazioni al click, fungendo da puro ancoraggio estetico).
- **Colonna Informativa**: Pannello testuale curato. Titoli in Sans-serif minimalista (stile San Francisco), elenchi e tracklist in Monospace rigoroso.
- Sviluppare `SpotifyPlayer.tsx`, un componente wrapper per l'iFrame di Spotify con uno "Skeleton Loader" fluido (pulsazione in Tailwind) che copre il blocco finché l'iFrame non è completamente caricato.

## 2. Interazioni e ScrollTrigger "Crate Digger" (Fase 3)
- Sviluppare `CrateDiggerWrapper.tsx` che inizializza `GSAP ScrollTrigger`.
- L'animazione all'ingresso in viewport (dal basso) prevede:
  - Rotazione 3D sull'asse Y (es. 20-25 gradi) e sull'asse Z (leggera inclinazione).
  - Traslazione verticale e opacità da 0 a 1.
  - Tween fluido fino allo stato di riposo (`rotate: 0`, `translate: 0`) a centro schermo, che emula l'atto di estrarre un vinile.

## 3. Background Dinamico Mesh WebGL (Fase 4)
- Sviluppare `FluidBackground.tsx` usando `@react-three/fiber`. Utilizzare un materiale custom (o estensioni Drei come `MeshDistortMaterial`) per generare una superficie liquida, morbida e astratta (effetto Apple Music).
- Implementare l'estrazione statica dei colori in Astro: usare `colorthief` (lato server) per generare la palette dominante associata a ciascuna playlist.
- Creare uno state manager globale (o un Context React) che, al trigger dello scroll di GSAP, passi i nuovi colori al canvas Three.js per innescare un'interpolazione armonica tra le sezioni.

## 4. Ottimizzazione e Isole Astro (Fase 5)
- Assemblare in `src/pages/index.astro` le sezioni utilizzando mock data (playlist statiche) iniettando i colori dominanti.
- Assicurarsi che `FluidBackground` venga caricato come `<FluidBackground client:load />` e le singole sezioni come `<PlaylistSection client:visible />`.
- Eseguire review QA per confermare che l'estetica "vinile/Apple" sia mantenuta in tutte le viewport e che le animazioni scorrano a 60 FPS senza drop.
