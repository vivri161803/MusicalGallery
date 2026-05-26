/**
 * MusicalGallery — Configurazione dei Contenuti
 * ================================================
 * Modifica questo file per personalizzare la tua galleria musicale.
 *
 * COME AGGIUNGERE UN ALBUM:
 * 1. Salva la copertina in:   public/images/<nome-file>.jpg  (o .jpeg, .png, .webp)
 * 2. Aggiungi un blocco       { ... } nell'array `gallery` qui sotto.
 * 3. Salva — il server si aggiorna da solo.
 *
 * Il colore dello sfondo viene estratto automaticamente dall'immagine.
 */

export interface AlbumEntry {
  /** Nome visualizzato come titolo principale */
  title: string;

  /** Artista o etichetta — mostrato in piccolo sotto il titolo */
  artist: string;

  /**
   * Nome del file immagine in `public/images/`
   * Esempi: "cover.jpg", "2026-04-26.jpeg", "my album.png"
   * Il percorso /images/ viene aggiunto automaticamente.
   */
  imageFile: string;

  /** Lista di tracce in evidenza */
  tracks: string[];
}

export const gallery: AlbumEntry[] = [
  {
    title: "26 Aprile",
    artist: "2026",
    imageFile: "2BF1C51C-DD04-41EC-A194-AD4A3A3D7CAF_1_105_c.jpeg",
    tracks: [
      "DAMN — Kendrick Lamar",
      "Imaginal Disk — Magdalena Bay",
      "6 Feet Between the Moon — King Krule",
      "Miles — Blu & Exile",
    ],
  },

  {
    title: "4 Maggio",
    artist: "2026",
    imageFile: "4E4D1806-8999-4782-9CFD-47E4CF7F1276_1_105_c.jpeg",
    tracks: [
      "Not Waving, But Drowning - Loyle Carner",
      "Drukqs - Aphex Twin",
      "A Word Of Science - Nightmares On Wax",
      "Moon Safari - Air",
      "In Waves - Jamie xx",
      "You'd prefer an Astronaut - Hum"
    ],
  }

  // ── TEMPLATE PER UN NUOVO ALBUM ────────────────────────────────────────
  // Rimuovi i commenti, compila i campi e metti il file in public/images/.
  //
  // {
  //   title: "Nome Album",
  //   artist: "Artista",
  //   imageFile: "nome-file.jpg",
  //   tracks: [
  //     "Traccia 1 — Artista",
  //     "Traccia 2 — Artista",
  //   ],
  // },
];

/**
 * Configurazione della pagina principale (Hero)
 */
export const heroConfig = {
  /** Titolo grande visualizzato nella prima schermata */
  title: "MusicalGallery",

  /** Sottotitolo descrittivo */
  subtitle: "Una galleria visiva e interattiva delle tue playlist musicali.",

  /** Testo di invito allo scroll */
  scrollHint: "Scroll to explore ↓",
};
