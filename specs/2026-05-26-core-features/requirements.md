# Requirements: Core Features (Fasi 2, 3, 4, 5)

## Ambito (Scope)
Progettare le specifiche per tutte le componenti principali della "Galleria dei Ricordi Musicale": interfaccia a doppia colonna, animazioni allo scroll "Crate Digger", sfondo 3D mesh gradiente e ottimizzazione globale. Il tutto seguendo rigorosamente la direzione artistica `/frontend-design` ispirata all'eleganza di Apple (minimalismo, transizioni fluide, estetica vinilica).

## Decisioni Architetturali (Tech Stack)
- **UI & Layout:** Tailwind CSS puro per la stilizzazione dei componenti React, garantendo la massima aderenza all'estetica Apple senza dipendere da framework UI esterni (come shadcn) che potrebbero compromettere la coesione stilistica.
- **Animazioni DOM:** GSAP + ScrollTrigger per simulare l'effetto "Crate Digger" (traslazione 3D e rotazione all'entrata in viewport).
- **Animazioni WebGL:** Un gradiente mesh 3D liquido e continuo creato con Three.js (`react-three-fiber`), elegante e non invadente, che si interpola con i colori dominanti estratti dalle copertine tramite `colorthief`.
- **Performance:** Sfruttamento massiccio delle Isole Astro (`client:load`, `client:visible`) per minimizzare il JavaScript bloccante. Lazy-loading dell'iFrame di Spotify protetto da uno Skeleton animato in Tailwind CSS per azzerare il Cumulative Layout Shift (CLS).
