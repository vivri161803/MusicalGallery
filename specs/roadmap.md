# Roadmap

## Fase 1: Setup dell'Infrastruttura e del Progetto
- Inizializzazione del progetto base in Astro con le integrazioni per React e Tailwind CSS.
- Configurazione delle dipendenze core (GSAP, Three.js/react-three-fiber, colorthief).
- Impostazione della struttura delle directory, font globali (sans-serif e font-mono) e asset.

## Fase 2: Sviluppo dei Componenti e della Struttura UI Stabile
- Creazione della struttura a griglia responsive (due colonne su desktop).
- Sviluppo della "Colonna Visiva" utilizzando il componente `<Image />` nativo di Astro (no-hover, no-click).
- Sviluppo della "Colonna Informativa" curando la tipografia per titoli e tracklist.
- Sviluppo dello Skeleton Loader (placeholder Tailwind) per l'iFrame di Spotify.

## Fase 3: Interazioni e ScrollTrigger ("Crate Digger")
- Configurazione di GSAP e ScrollTrigger a livello globale o di layout.
- Implementazione dell'animazione per gli elementi in ingresso nella viewport:
  - Transizione e rotazione 3D (asse Y e Z).
  - Appiattimento fluido verso il centro (`rotate: 0`, `translate: 0`).

## Fase 4: Background Dinamico e Integrazione WebGL (Three.js)
- Creazione del canvas globale Three.js sottostante al DOM principale.
- Estrazione statica lato server dei colori dominanti dalle immagini (via colorthief).
- Sviluppo di shader o effetti particellari per dissolvere vecchie immagini.
- Sincronizzazione della transizione fluida dello sfondo per combaciare con i colori della nuova sezione attivata allo scroll.

## Fase 5: Ottimizzazione, Isole Astro e Finalizzazione
- Configurazione mirata delle Isole Astro (`client:load` / `client:visible`) per limitare il JavaScript sul client alle sezioni Three.js e GSAP.
- Ottimizzazione delle performance (prevenzione Layout Shifts causate da iFrame lenti).
- QA, test su device con ratio differenti e fine-tuning dell'estetica "vinilica".
