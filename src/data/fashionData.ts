import type { ShopifyProduct, ShopifyCollection } from '../types/shopify';

/**
 * Editorial Photography Assets
 * Curated high-fashion imagery: Indian female models, warm natural light,
 * sandstone and marble architecture, premium raw silks, fine thread work,
 * avoiding generic stock or tacky bridal aesthetics.
 */
export const EDITORIAL_ASSETS = {
  // Main Hero: Indian model, warm architectural sunlight, contemporary luxury silhouette
  heroImage: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=2000&q=90",
  // Brand Intro: Tall editorial fashion image
  brandIntroImage: "/assets/editorial/straight_suit_editorial.jpg",
  // Signature Thread macro photography
  macroThread: "/assets/editorial/macro_embroidery.jpg",
  macroEmbroidery: "/assets/editorial/macro_embroidery.jpg",
  macroFabric: "/assets/editorial/macro_fabric.jpg",
  macroStitch: "/assets/editorial/macro_stitch.jpg",
  // Craftsmanship Columns
  craftDetail: "/assets/editorial/macro_embroidery.jpg",
  craftFabric: "/assets/editorial/macro_fabric.jpg",
  craftSilhouette: "/assets/editorial/straight_suit_editorial.jpg",
  // Brand Story atelier background
  brandStoryImage: "/assets/editorial/sharara_editorial.jpg"
};

export const COLLECTIONS_DATA: ShopifyCollection[] = [
  {
    id: "col-1",
    handle: "anarkalis",
    title: "ANARKALIS",
    description: "Flowing contemporary silhouettes crafted with thirty-two architectural kalis and delicate thread artistry.",
    image: {
      id: "img-c1",
      url: "/assets/editorial/anarkali_editorial.jpg",
      altText: "Velvet Loom Anarkali Collection"
    },
    productsCount: 14
  },
  {
    id: "col-2",
    handle: "shararas",
    title: "SHARARAS",
    description: "Dramatic tiered flares in crushed raw silk and chanderi, paired with structured ateliers.",
    image: {
      id: "img-c2",
      url: "/assets/editorial/sharara_editorial.jpg",
      altText: "Velvet Loom Sharara Collection"
    },
    productsCount: 18
  },
  {
    id: "col-3",
    handle: "straight-suits",
    title: "STRAIGHT SUITS",
    description: "Clean tailored lines, elongated cuts, and minimalist antique gold embroidery.",
    image: {
      id: "img-c3",
      url: "/assets/editorial/straight_suit_editorial.jpg",
      altText: "Velvet Loom Straight Suits Collection"
    },
    productsCount: 16
  },
  {
    id: "col-4",
    handle: "indo-westerns",
    title: "INDO-WESTERNS",
    description: "Sculpted capes, asymmetric drapes, and modern corsetry honoring Indian textiles.",
    image: {
      id: "img-c4",
      url: "/assets/editorial/indo_western_editorial.jpg",
      altText: "Velvet Loom Indo-Western Collection"
    },
    productsCount: 12
  }
];

export const OCCASION_EDITS = [
  {
    id: "occ-1",
    title: "THE WEDDING EDIT",
    tagline: "Understated Regal Splendour",
    description: "Heirloom tissue silks, antique bullion wire thread-work, and refined silhouettes designed for nuptials without excessive weight.",
    image: "/assets/editorial/sharara_editorial.jpg",
    link: "/collections/wedding"
  },
  {
    id: "occ-2",
    title: "THE FESTIVE EDIT",
    tagline: "Muted Jewels & Pure Luster",
    description: "Rich mulberry silks and velvet borders that capture candlelight with quiet sophistication for festive evenings.",
    image: "/assets/editorial/anarkali_editorial.jpg",
    link: "/collections/festive"
  },
  {
    id: "occ-3",
    title: "THE CELEBRATION EDIT",
    tagline: "Contemporary Cocktail Drapes",
    description: "Sculptural capes, pre-draped fluid sets, and modern feminine proportions crafted for celebratory dinners.",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&h=1600&q=85",
    link: "/collections/celebration"
  },
  {
    id: "occ-4",
    title: "THE EVERYDAY EDIT",
    tagline: "Effortless Atelier Casual",
    description: "Breathable Chanderi linens, fine cotton-silk blends, and minimalist hand-tucked pleats for elevated daily luxury.",
    image: "/assets/editorial/straight_suit_editorial.jpg",
    link: "/collections/everyday"
  }
];

export const PRODUCTS_CATALOG: ShopifyProduct[] = [
  {
    id: "gid://shopify/Product/101",
    handle: "aurelia-mulberry-anarkali",
    title: "Aurelia Mulberry Anarkali",
    vendor: "VELVET LOOM",
    productType: "Anarkali",
    category: "Anarkalis",
    description: "Crafted from hand-spun mulberry silk in our signature warm ivory tone, accented with micro-embroidery in champagne and antique gold thread. Designed with thirty-two flared kalis that drape with poetic fluidity.",
    availableForSale: true,
    tags: ["New In", "Signature", "Ivory", "Mulberry Silk"],
    priceRange: {
      minVariantPrice: { amount: "680.00", currencyCode: "USD" },
      maxVariantPrice: { amount: "680.00", currencyCode: "USD" }
    },
    featuredImage: {
      id: "img-101-1",
      url: "/assets/editorial/anarkali_editorial.jpg",
      altText: "Aurelia Mulberry Anarkali Front"
    },
    images: [
      {
        id: "img-101-1",
        url: "/assets/editorial/anarkali_editorial.jpg",
        altText: "Aurelia Mulberry Anarkali Front View"
      },
      {
        id: "img-101-2",
        url: "https://images.unsplash.com/photo-1528458876861-544fd1761a91?auto=format&fit=crop&w=1000&h=1300&q=85",
        altText: "Aurelia Mulberry Anarkali Detail"
      }
    ],
    options: [
      { id: "opt-101-size", name: "Size", values: ["XS", "S", "M", "L", "XL", "Custom Atelier"] }
    ],
    variants: [
      {
        id: "var-101-xs",
        title: "XS",
        availableForSale: true,
        selectedOptions: [{ name: "Size", value: "XS" }],
        price: { amount: "680.00", currencyCode: "USD" }
      },
      {
        id: "var-101-s",
        title: "S",
        availableForSale: true,
        selectedOptions: [{ name: "Size", value: "S" }],
        price: { amount: "680.00", currencyCode: "USD" }
      },
      {
        id: "var-101-m",
        title: "M",
        availableForSale: true,
        selectedOptions: [{ name: "Size", value: "M" }],
        price: { amount: "680.00", currencyCode: "USD" }
      },
      {
        id: "var-101-l",
        title: "L",
        availableForSale: true,
        selectedOptions: [{ name: "Size", value: "L" }],
        price: { amount: "680.00", currencyCode: "USD" }
      },
      {
        id: "var-101-custom",
        title: "Custom Atelier",
        availableForSale: true,
        selectedOptions: [{ name: "Size", value: "Custom Atelier" }],
        price: { amount: "780.00", currencyCode: "USD" }
      }
    ],
    atelierDetails: {
      fabric: "100% Hand-spun Mulberry Silk & Pure Tissue Organza Dupatta",
      technique: "Marodi & Aari needlework with matte bullion thread",
      lining: "Mulberry Silk Habotai",
      careInstruction: "Specialist Luxury Dry Clean Only",
      modelStats: "Model is 5'9\" (176cm) wearing Atelier Size Small",
      leadTime: "Ships within 5-7 business days",
      bestseller: true,
      occasion: "Celebration"
    }
  },
  {
    id: "gid://shopify/Product/102",
    handle: "sultana-velvet-sharara",
    title: "Sultana Velvet Sharara",
    vendor: "VELVET LOOM",
    productType: "Sharara Suit",
    category: "Shararas",
    description: "Tailored in our warm sand and muted gold raw silk with structured architectural shoulders and billowing tiered kalis. Trimmed in delicate hand-stitched antique gold borders.",
    availableForSale: true,
    tags: ["Bestseller", "Warm Sand", "Sharara"],
    priceRange: {
      minVariantPrice: { amount: "790.00", currencyCode: "USD" },
      maxVariantPrice: { amount: "790.00", currencyCode: "USD" }
    },
    featuredImage: {
      id: "img-102-1",
      url: "/assets/editorial/sharara_editorial.jpg",
      altText: "Sultana Velvet Sharara Front"
    },
    images: [
      {
        id: "img-102-1",
        url: "/assets/editorial/sharara_editorial.jpg",
        altText: "Sultana Velvet Sharara Front"
      },
      {
        id: "img-102-2",
        url: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&h=1300&q=85",
        altText: "Sultana Velvet Sharara Fabric"
      }
    ],
    options: [
      { id: "opt-102-size", name: "Size", values: ["XS", "S", "M", "L", "XL"] }
    ],
    variants: [
      {
        id: "var-102-s",
        title: "S",
        availableForSale: true,
        selectedOptions: [{ name: "Size", value: "S" }],
        price: { amount: "790.00", currencyCode: "USD" }
      },
      {
        id: "var-102-m",
        title: "M",
        availableForSale: true,
        selectedOptions: [{ name: "Size", value: "M" }],
        price: { amount: "790.00", currencyCode: "USD" }
      },
      {
        id: "var-102-l",
        title: "L",
        availableForSale: true,
        selectedOptions: [{ name: "Size", value: "L" }],
        price: { amount: "790.00", currencyCode: "USD" }
      }
    ],
    atelierDetails: {
      fabric: "Handloom Raw Silk Kurta & Flared Kalidar Sharara",
      technique: "Zardozi needlepoint with vintage gold bullion thread",
      lining: "Cupro Silk Satin",
      careInstruction: "Dry Clean Only. Steam gently on reverse",
      modelStats: "Model is 5'10\" wearing Size Small",
      leadTime: "Crafted to order; ships in 10-14 days",
      bestseller: true,
      occasion: "Wedding"
    }
  },
  {
    id: "gid://shopify/Product/103",
    handle: "soraya-tailored-straight-suit",
    title: "Soraya Tailored Straight Suit",
    vendor: "VELVET LOOM",
    productType: "Straight Suit",
    category: "Straight Suits",
    description: "An elongated straight-cut silhouette in warm sand Chanderi silk. Features minimalist French-bound cuffs and discreet thread loop fastenings along the neckline.",
    availableForSale: true,
    tags: ["New In", "Minimalist", "Straight Suit"],
    priceRange: {
      minVariantPrice: { amount: "520.00", currencyCode: "USD" },
      maxVariantPrice: { amount: "520.00", currencyCode: "USD" }
    },
    featuredImage: {
      id: "img-103-1",
      url: "/assets/editorial/straight_suit_editorial.jpg",
      altText: "Soraya Tailored Straight Suit"
    },
    images: [
      {
        id: "img-103-1",
        url: "/assets/editorial/straight_suit_editorial.jpg",
        altText: "Soraya Tailored Straight Suit Full"
      },
      {
        id: "img-103-2",
        url: "https://images.unsplash.com/photo-1528458876861-544fd1761a91?auto=format&fit=crop&w=1000&h=1300&q=85",
        altText: "Soraya Silk Weave"
      }
    ],
    options: [
      { id: "opt-103-size", name: "Size", values: ["XS", "S", "M", "L", "XL"] }
    ],
    variants: [
      {
        id: "var-103-s",
        title: "S",
        availableForSale: true,
        selectedOptions: [{ name: "Size", value: "S" }],
        price: { amount: "520.00", currencyCode: "USD" }
      },
      {
        id: "var-103-m",
        title: "M",
        availableForSale: true,
        selectedOptions: [{ name: "Size", value: "M" }],
        price: { amount: "520.00", currencyCode: "USD" }
      }
    ],
    atelierDetails: {
      fabric: "Pure Handloom Chanderi Silk with Raw Silk Straight Trousers",
      technique: "Needle-drawn threadwork and micro French knots",
      lining: "Featherweight Cotton Voile",
      careInstruction: "Luxury Dry Clean",
      modelStats: "Model is 5'9\" wearing Size XS",
      leadTime: "In Studio Stock; ships in 48 hours",
      bestseller: false,
      occasion: "Everyday"
    }
  },
  {
    id: "gid://shopify/Product/104",
    handle: "noor-sculpted-indo-western-cape",
    title: "Noor Sculpted Cape Set",
    vendor: "VELVET LOOM",
    productType: "Indo-Western",
    category: "Indo-Westerns",
    description: "A visionary contemporary silhouette featuring an asymmetric tailored corset in rich burgundy silk, draped with an ethereal floor-grazing tissue cape.",
    availableForSale: true,
    tags: ["Occasion", "Editorial", "Cape Set"],
    priceRange: {
      minVariantPrice: { amount: "890.00", currencyCode: "USD" },
      maxVariantPrice: { amount: "890.00", currencyCode: "USD" }
    },
    featuredImage: {
      id: "img-104-1",
      url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&h=1300&q=85",
      altText: "Noor Sculpted Indo-Western Cape"
    },
    images: [
      {
        id: "img-104-1",
        url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&h=1300&q=85",
        altText: "Noor Sculpted Indo-Western Cape Front"
      },
      {
        id: "img-104-2",
        url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&h=1300&q=85",
        altText: "Noor Cape Atelier Model"
      }
    ],
    options: [
      { id: "opt-104-size", name: "Size", values: ["S", "M", "L", "Custom Atelier"] }
    ],
    variants: [
      {
        id: "var-104-s",
        title: "S",
        availableForSale: true,
        selectedOptions: [{ name: "Size", value: "S" }],
        price: { amount: "890.00", currencyCode: "USD" }
      },
      {
        id: "var-104-m",
        title: "M",
        availableForSale: true,
        selectedOptions: [{ name: "Size", value: "M" }],
        price: { amount: "890.00", currencyCode: "USD" }
      }
    ],
    atelierDetails: {
      fabric: "Tissue Organza Cape & Silk Duchess Corset",
      technique: "Sculpted boning with hand-embroidered cutwork trim",
      lining: "100% Silk Twill",
      careInstruction: "Atelier Specialist Care",
      modelStats: "Model is 5'11\" wearing Size S",
      leadTime: "Bespoke handcrafted; 12 business days",
      bestseller: true,
      occasion: "Festive"
    }
  },
  {
    id: "gid://shopify/Product/105",
    handle: "miraya-champagne-sharara",
    title: "Miraya Champagne Sharara",
    vendor: "VELVET LOOM",
    productType: "Sharara Suit",
    category: "Shararas",
    description: "Woven in lustrous champagne raw silk with hand-pleated kalis, subtle threadwork borders, and an open-weave organza veil.",
    availableForSale: true,
    tags: ["Bestseller", "Champagne Gold", "Sharara"],
    priceRange: {
      minVariantPrice: { amount: "740.00", currencyCode: "USD" },
      maxVariantPrice: { amount: "740.00", currencyCode: "USD" }
    },
    featuredImage: {
      id: "img-105-1",
      url: "/assets/editorial/sharara_editorial.jpg",
      altText: "Miraya Champagne Sharara"
    },
    images: [
      {
        id: "img-105-1",
        url: "/assets/editorial/sharara_editorial.jpg",
        altText: "Miraya Champagne Sharara"
      }
    ],
    options: [{ id: "opt-105-size", name: "Size", values: ["XS", "S", "M", "L"] }],
    variants: [
      {
        id: "var-105-s",
        title: "S",
        availableForSale: true,
        selectedOptions: [{ name: "Size", value: "S" }],
        price: { amount: "740.00", currencyCode: "USD" }
      }
    ],
    atelierDetails: {
      fabric: "Raw Silk Kurta & Georgette Flared Sharara",
      technique: "Gota Patti and micro thread embellishment",
      lining: "Pure Cotton Mulmul",
      careInstruction: "Dry Clean Only",
      modelStats: "Model is 5'9\" wearing Size S",
      leadTime: "Ships within 5 days",
      bestseller: true,
      occasion: "Wedding"
    }
  },
  {
    id: "gid://shopify/Product/106",
    handle: "zoya-architectural-anarkali",
    title: "Zoya Architectural Anarkali",
    vendor: "VELVET LOOM",
    productType: "Anarkali",
    category: "Anarkalis",
    description: "Warm sand silk yoke paired with fluid chanderi skirt. Modern high neck with hand-tied golden thread frogs.",
    availableForSale: true,
    tags: ["New In", "Anarkali", "Silk"],
    priceRange: {
      minVariantPrice: { amount: "710.00", currencyCode: "USD" },
      maxVariantPrice: { amount: "710.00", currencyCode: "USD" }
    },
    featuredImage: {
      id: "img-106-1",
      url: "/assets/editorial/anarkali_editorial.jpg",
      altText: "Zoya Architectural Anarkali"
    },
    images: [
      {
        id: "img-106-1",
        url: "/assets/editorial/anarkali_editorial.jpg",
        altText: "Zoya Architectural Anarkali"
      }
    ],
    options: [{ id: "opt-106-size", name: "Size", values: ["XS", "S", "M", "L"] }],
    variants: [
      {
        id: "var-106-m",
        title: "M",
        availableForSale: true,
        selectedOptions: [{ name: "Size", value: "M" }],
        price: { amount: "710.00", currencyCode: "USD" }
      }
    ],
    atelierDetails: {
      fabric: "Mulberry Silk Bodice with Handloom Chanderi Skirt",
      technique: "Fine thread work with antique gold bullion accents",
      lining: "Pure Silk Habotai",
      careInstruction: "Dry Clean Only",
      modelStats: "Model is 5'10\" wearing Size S",
      leadTime: "Ships within 7 days",
      bestseller: false,
      occasion: "Festive"
    }
  },
  {
    id: "gid://shopify/Product/107",
    handle: "tarana-antique-gold-straight-suit",
    title: "Tarana Gold Straight Suit",
    vendor: "VELVET LOOM",
    productType: "Straight Suit",
    category: "Straight Suits",
    description: "A masterclass in restraint. Muted antique gold woven tissue silk tailored in clean architectural lines with mother-of-pearl buttons.",
    availableForSale: true,
    tags: ["Bestseller", "Antique Gold", "Straight Suit"],
    priceRange: {
      minVariantPrice: { amount: "560.00", currencyCode: "USD" },
      maxVariantPrice: { amount: "560.00", currencyCode: "USD" }
    },
    featuredImage: {
      id: "img-107-1",
      url: "/assets/editorial/straight_suit_editorial.jpg",
      altText: "Tarana Gold Straight Suit"
    },
    images: [
      {
        id: "img-107-1",
        url: "/assets/editorial/straight_suit_editorial.jpg",
        altText: "Tarana Gold Straight Suit"
      }
    ],
    options: [{ id: "opt-107-size", name: "Size", values: ["XS", "S", "M", "L", "XL"] }],
    variants: [
      {
        id: "var-107-s",
        title: "S",
        availableForSale: true,
        selectedOptions: [{ name: "Size", value: "S" }],
        price: { amount: "560.00", currencyCode: "USD" }
      }
    ],
    atelierDetails: {
      fabric: "Woven Tissue Silk with Tonal Satin Lining",
      technique: "Geometric hand-drawn thread embroidery",
      lining: "100% Breathable Cotton Mulmul",
      careInstruction: "Luxury Dry Clean Only",
      modelStats: "Model is 5'8\" wearing Size S",
      leadTime: "Ships in 3-5 days",
      bestseller: true,
      occasion: "Celebration"
    }
  },
  {
    id: "gid://shopify/Product/108",
    handle: "leila-draped-corset-set",
    title: "Leila Draped Cape Set",
    vendor: "VELVET LOOM",
    productType: "Indo-Western",
    category: "Indo-Westerns",
    description: "Sculpted boned corset in deep velvet layered over a fluid ivory silk cowl drape with tailored smoking trousers.",
    availableForSale: true,
    tags: ["New In", "Corset", "Indo-Western"],
    priceRange: {
      minVariantPrice: { amount: "840.00", currencyCode: "USD" },
      maxVariantPrice: { amount: "840.00", currencyCode: "USD" }
    },
    featuredImage: {
      id: "img-108-1",
      url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&h=1300&q=85",
      altText: "Leila Draped Cape Set"
    },
    images: [
      {
        id: "img-108-1",
        url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&h=1300&q=85",
        altText: "Leila Draped Cape Set"
      }
    ],
    options: [{ id: "opt-108-size", name: "Size", values: ["XS", "S", "M", "L"] }],
    variants: [
      {
        id: "var-108-s",
        title: "S",
        availableForSale: true,
        selectedOptions: [{ name: "Size", value: "S" }],
        price: { amount: "840.00", currencyCode: "USD" }
      }
    ],
    atelierDetails: {
      fabric: "Velvet & Crepe de Chine Silk",
      technique: "Atelier corsetry with micro cord embroidery",
      lining: "Pure Silk Satin",
      careInstruction: "Professional Dry Clean Only",
      modelStats: "Model is 5'9\" wearing Size S",
      leadTime: "Ships in 7-10 days",
      bestseller: false,
      occasion: "Celebration"
    }
  }
];

export const TESTIMONIALS_DATA = [
  {
    id: "test-1",
    author: "Gayatri Singhania",
    location: "London & New Delhi",
    garment: "Aurelia Mulberry Anarkali",
    rating: 5,
    quote: "The drape of the mulberry silk is unlike anything off-the-rack. Velvet Loom balances contemporary restraint with Indian heritage so thoughtfully. It felt like couture made just for me.",
    verifiedPurchase: true
  },
  {
    id: "test-2",
    author: "Ananya Mehra",
    location: "New York",
    garment: "Sultana Velvet Sharara",
    rating: 5,
    quote: "The raw silk and antique gold detailing were breathtaking under evening lights. Not heavy, not costume-like—just pure, understated luxury.",
    verifiedPurchase: true
  },
  {
    id: "test-3",
    author: "Tara Chawla",
    location: "Dubai",
    garment: "Noor Sculpted Cape Set",
    rating: 5,
    quote: "I wore this for an intimate reception at the Louvre Abu Dhabi. Countless inquiries about the designer. Velvet Loom is redefining Indian modern elegance.",
    verifiedPurchase: true
  }
];
