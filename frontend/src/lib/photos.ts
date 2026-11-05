import heroLanding from "../assets/images/P1059017 copy.jpg"
import heroShop from "../assets/images/P1059001 copy.jpg"
import heroPreFooter from "../assets/images/P1059038 copy.jpg"
import productBodyWash from "../assets/images/Background Change Design.jpg"
import productSoapBox from "../assets/images/Background Change Design (1).jpg"
import productJelly from "../assets/images/Untitled design.jpg"
import coffeeGroundsPour from "../assets/images/coffee-grounds-pour.png"
import storyInspiration from "../assets/images/P1059050 copy.jpg"
import storyProductLineup from "../assets/images/grece-fav-product-lineup.png"
import gracePortrait from "../assets/images/grace-portrait.png"

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
  "grece-fav-body-jelly": productJelly,
  "grece-fav-body-wash": productBodyWash,
  "tabithy-bath-soap": productSoapBox,
  "daily-moisturizer": productJelly,
  "repair-shampoo": productBodyWash,
  "rosewater-toner": productSoapBox,
}

export const showcaseCollectionTiles = [
  {
    slug: "grece-fav-body-jelly",
    src: productJelly,
    alt: "Grece Fav body jelly jar.",
  },
  {
    slug: "grece-fav-body-wash",
    src: productBodyWash,
    alt: "Grece Fav body wash with gold pump.",
  },
  {
    slug: "tabithy-bath-soap",
    src: productSoapBox,
    alt: "Tabithy bath soap packaging.",
  },
] as const

export const gracePortraitPhoto = {
  src: gracePortrait,
  alt: "Umubyeyi Grace, founder of Grece Fav Cycles.",
}

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
  meetGrace: gracePortraitPhoto,
  whatWeMake: {
    src: storyProductLineup,
    alt: "Grece Fav and Tabithy body care collection.",
  },
  whereGoing: {
    src: coffeeGroundsPour,
    alt: "Fresh coffee grounds for upcycled skincare.",
  },
}
