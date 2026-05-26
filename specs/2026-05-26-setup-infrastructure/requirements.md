# Requirements: Setup Infrastruttura e Progetto

## Ambito (Scope)
Inizializzare l'ambiente di sviluppo per la "Galleria dei Ricordi Musicale", garantendo che tutte le librerie core necessarie (Astro, React, Tailwind CSS, GSAP, Three.js) siano installate, configurate correttamente e pronte per lo sviluppo della UI.

## Decisioni Architetturali
- **Framework Base:** Astro, per sfruttare la sua architettura a isole (Islands Architecture) e generare siti statici ad altissime prestazioni.
- **Integrazioni:** React verrà utilizzato per costruire i componenti interattivi, Tailwind CSS per lo styling utility-first.
- **Librerie di Animazione e 3D:** GSAP (con ScrollTrigger) per le interazioni DOM e "Crate Digger". Three.js (tramite `react-three-fiber` e `drei`) per il background WebGL. `colorthief` per l'estrazione dei colori.

## Contesto e Prerequisiti
- Il progetto risiederà nella directory corrente (`/Users/vivri161803/Documents/Code/MusicalGallery`).
- L'installazione dovrà forzare la scrittura nella cartella se vi sono conflitti o inizializzare un nuovo progetto in modo pulito.
- Saranno mantenuti i file `specs/` come documentazione viva del progetto.
