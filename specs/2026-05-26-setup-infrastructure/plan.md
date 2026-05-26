# Plan: Setup Infrastruttura e Progetto

1. **Inizializzazione Progetto Astro**
   - Eseguire il comando di bootstrap di Astro nella directory corrente.
   - Configurare il progetto per non sovrascrivere file essenziali (`specs/`, `prompt`, `README.md` se presente).

2. **Aggiunta Integrazioni Core (Astro)**
   - Eseguire `npx astro add react tailwind` per auto-configurare React e Tailwind CSS all'interno di `astro.config.mjs` e `tailwind.config.mjs`.

3. **Installazione Dipendenze Esterne**
   - Installare dipendenze per animazioni: `npm install gsap`
   - Installare dipendenze per 3D: `npm install three @react-three/fiber @react-three/drei`
   - Installare dipendenze di utilità: `npm install colorthief` (e tipi se necessari, es. `@types/three`).

4. **Pulizia e Configurazione Iniziale**
   - Creare le cartelle strutturali in `src/` (es. `components/`, `layouts/`, `styles/`).
   - Sostituire il contenuto di `src/pages/index.astro` con un layout pulito che confermi il corretto setup di Tailwind.
   - Utilizza i paradigmi di programazione per componenti
   - Setuppa un file di configurazione che possa modificare al volo per modificare l'intera pagina. 

5. **Test Iniziale**
   - Assicurarsi che `npm run build` completi senza errori.
