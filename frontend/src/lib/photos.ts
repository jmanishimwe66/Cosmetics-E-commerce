const unsplash = (id: string, width = 1400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=82`

export const landingHeroPhoto = {
  src: "/assets/landing-hero.jpg",
  alt: "GRECE FOV body care collection on travertine stone with citrus accents.",
}

export const heroPhoto = {
  src: "/assets/hero-retreat-collection.jpg",
  alt: "GRECE FOV body care collection on warm stone and sand.",
}

export const lineupPhoto = {
  src: "/assets/hero-collection.jpg",
  alt: "Natural skincare and hair products arranged with moss, stone, and driftwood.",
}

export const splitLifestylePhoto = {
  src: unsplash("1447933601403-0c6688de566e", 1200),
  alt: "Roasted coffee beans and grounds.",
}

export const macroTexturePhoto = {
  src: unsplash("1447753072467-2f56032d1d48", 1200),
  alt: "Close-up of dark roasted coffee beans.",
}

export const samplePhotos: Record<string, string> = {
  "rosewater-toner": unsplash("1608571423902-eed4a5ad8108", 1100),
  "daily-moisturizer": unsplash("1585945037805-5fd82c2e60b1", 1100),
  "soft-matte-lipstick": unsplash("1576426863848-c21f53c60b19", 1100),
  "repair-shampoo": unsplash("1630682103595-25bd3b95caf2", 1100),
}

export const productCodes: Record<string, string> = {
  "daily-moisturizer": "GF-01",
  "rosewater-toner": "GF-02",
  "repair-shampoo": "GF-03",
  "soft-matte-lipstick": "GF-04",
}

export const storyPhotos = {
  origin: {
    src: unsplash("1688413467024-c539918fdd7c", 1400),
    alt: "Hand holding an essential oil bottle in warm daylight.",
  },
  material: {
    src: unsplash("1447933601403-0c6688de566e", 1400),
    alt: "Coffee beans and residue texture.",
  },
  craft: {
    src: unsplash("1552046122-03184de85e08", 1400),
    alt: "Formulation bottle on a minimal studio counter.",
  },
  range: [
    { src: samplePhotos["rosewater-toner"], alt: "Sample photograph for Rosewater Toner." },
    { src: samplePhotos["daily-moisturizer"], alt: "Sample photograph for Daily Moisturizer." },
    { src: samplePhotos["soft-matte-lipstick"], alt: "Sample photograph for Soft Matte Lipstick." },
    { src: samplePhotos["repair-shampoo"], alt: "Sample photograph for Repair Shampoo." },
  ],
}
