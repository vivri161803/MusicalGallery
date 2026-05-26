export const siteConfig = {
  title: "MusicalGallery",
  description: "Una galleria visiva e interattiva delle tue playlist musicali.",
  theme: "dark", 
  
  // Opzioni per il layout e la navigazione
  layout: {
    scrollSnap: true, // Se true, blocca lo scroll su ogni disco (pagina intera)
    padding: "px-6", // Padding globale
  },

  // Configurazione dell'animazione di entrata "Crate Digger"
  crateDigger: {
    enabled: true,
    rotationY: 25, 
    rotationZ: -5, 
    translateY: 100, 
    duration: 1.2
  },

  // Configurazione per il WebGL Background (Three.js)
  fluidBackground: {
    enabled: true,
    distort: 0.4, 
    speed: 1.5,
    roughness: 0.7,
    mixBlendMode: "mix-blend-screen",
    opacity: "opacity-40"
  }
};
