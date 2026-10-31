import heroLanding from "../assets/images/P1059017 copy.jpg"
import heroShop from "../assets/images/P1059001 copy.jpg"
import heroPreFooter from "../assets/images/P1059038 copy.jpg"
import productBodyWash from "../assets/images/Background Change Design.jpg"
import productSoapBox from "../assets/images/Background Change Design (1).jpg"
import productJelly from "../assets/images/Untitled design.jpg"
import productLipGloss from "../assets/images/Untitled design (1).jpg"
import coffeeGroundsPour from "../assets/images/coffee-grounds-pour.png"
import storyWhatWeDo from "../assets/images/P1059003 copy.jpg"
import storyInspiration from "../assets/images/P1059050 copy.jpg"
import storyWhereWeAre from "../assets/images/P1059001 copy.jpg"

export const landingHeroPhoto = {
  src: heroLanding,
  alt: "Model holding Tabithy body butter from Grece Fav Cycles.",
}

export const heroPhoto = {
  src: heroPreFooter,
  alt: "Applying Grece Fav skin treatment.",
}

export const lineupPhoto = {
  src: heroShop,
  alt: "Grece Fav Cycles body butter held after skincare ritual.",
}

export const samplePhotos: Record<string, string> = {
  "rosewater-toner": productSoapBox,
  "daily-moisturizer": productJelly,
  "soft-matte-lipstick": productLipGloss,
  "repair-shampoo": productBodyWash,
}

export const showcaseCollectionTiles = [
  {
    src: productBodyWash,
    alt: "Grece Fav body wash with gold pump.",
  },
  {
    src: productJelly,
    alt: "Grece Fav jelly jar.",
  },
  {
    src: productLipGloss,
    alt: "Grece Fav lip gloss.",
  },
] as const

export const showcaseWhyPhotos = [
  {
    src: coffeeGroundsPour,
    alt: "Fresh coffee grounds pouring from a scoop.",
  },
  {
    src: storyInspiration,
    alt: "Coffee-based scrub applied to skin.",
  },
] as const

export const storyPhotos = {
  origin: {
    src: storyWhatWeDo,
    alt: "Grece Fav body butter in daily skincare ritual.",
  },
  material: {
    src: productSoapBox,
    alt: "Tabithy bath soap packaging with natural ingredients.",
  },
  craft: {
    src: storyWhereWeAre,
    alt: "Grece Fav body butter product.",
  },
  range: [
    { src: productSoapBox, alt: "Tabithy bath soap." },
    { src: productBodyWash, alt: "Grece Fav body wash." },
    { src: productJelly, alt: "Grece Fav jelly." },
    { src: productLipGloss, alt: "Grece Fav lip gloss." },
  ],
}
