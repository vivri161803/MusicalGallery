# Tech Stack

## Framework e Librerie Principali
- **Framework Base:** Astro. Si sfrutta l'architettura ad isole per massimizzare le performance inviando HTML statico ovunque possibile, relegando il JavaScript alle sole interazioni e animazioni.
- **Componenti UI:** React.
- **Styling:** Tailwind CSS per uno stile rapido e mantenibile. Obbligo di utilizzo rigoroso di dimensioni relative (percentuali, unità viewport, o grid standard), evitando altezze/larghezze hard-coded in pixel (`px`).
- **Animazioni DOM e Scroll:** GSAP, e nello specifico `ScrollTrigger` per gestire le interazioni "Crate Digger".
- **Effetti WebGL e Background:** Three.js (con `react-three-fiber` o `drei`) per gestire la fluidità delle transizioni WebGL nel background (es. dissolvenze, particellari e interpolazione cromatica tra sezioni).

## Strumenti Accessori e Architettura dei Dati
- **Estrazione Colori:** L'uso di `colorthief` o tool simili in fase di build statica (lato server in Astro) per estrarre la palette cromatica delle copertine e passarla dinamicamente a Three.js.
- **Gestione Immagini:** Utilizzo del componente nativo `<Image />` di Astro per ottimizzare e servire i collage in formati moderni e leggeri (WebP/AVIF).
- **Dati e Hosting:** Dati gestiti in modo statico (testi, riferimenti alle playlist hardcoded o via markdown locale). Il deployment avverrà su piattaforme standard come Vercel o Netlify.
- **iFrame e Componenti Terzi:** Gli iFrame (es. player Spotify) implementano categoricamente il `loading="lazy"` e sono accompagnati da "skeleton loaders" in Tailwind per mitigare salti del DOM o latenze derivanti dalle tracker protection del browser.
