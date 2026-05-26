# Validation: Core Features

La validazione dell'implementazione delle Fasi 2-5 si basa su questi criteri:

1. **Frontend Design ed Estetica**: L'interfaccia a doppia colonna si presenta spaziosa, bilanciata e con una tipografia estremamente curata in stile Apple. Non ci sono elementi di default generici.
2. **Robustezza IFrame**: L'inclusione di Spotify non rallenta il First Contentful Paint. Lo Skeleton Loader appare immediatamente e sparisce senza scatti (no Cumulative Layout Shift) quando la playlist è pronta.
3. **Crate Digger (GSAP)**: Durante lo scroll, i contenitori musicali appaiono emergendo e raddrizzandosi nello spazio 3D come vinili fisici estratti dallo scaffale.
4. **Mesh WebGL (Three.js)**: Il fondo della pagina non è un colore unito, ma un mesh liquido continuo che muta dolcemente tonalità (basandosi sull'algoritmo `colorthief` applicato alla copertina visualizzata) senza cali visibili di framerate.
5. **Perfomance (Astro Islands)**: I log di rete mostrano che i bundle JavaScript (Three.js e React) vengono serviti solo quando necessario (grazie a `client:visible`), mantenendo intatta la natura statica e veloce di Astro.
