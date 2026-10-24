export interface FloralProduct {
  id: string;
  name: string;
  subtitle: string;
  category: 'vessel' | 'bouquet' | 'setting' | 'decor';
  price: number;
  dimensions: string;
  material: string;
  description: string;
  image: string;
  tags: string[];
  inStock?: boolean;
}

export interface FloralService {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  features: string[];
  deliverables: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  aspect: 'tall' | 'wide' | 'square';
  image: string;
}

export const FLORAL_PRODUCTS: FloralProduct[] = [
  {
    id: 'aurelia-amphora',
    name: 'Aurelia Amphora',
    subtitle: 'Ivory Stoneware & Gold Lustre',
    category: 'vessel',
    price: 4800,
    dimensions: 'H 32 cm · Ø 16 cm',
    material: 'Hand-glazed matt stoneware, gold-lustre bands',
    description: 'A tall two-handled amphora in a soft ivory glaze with delicate gold-lustre bands. Holds long architectural branches, delphiniums and wild foliage without needing a frog.',
    image: `${import.meta.env.BASE_URL}assets/floral/amphora.jpg`,
    tags: ['Amphora', 'Gold Lustre', 'Ceramic', 'Editorial'],
    inStock: true
  },
  {
    id: 'wren-bud-vase',
    name: 'Wren Bud Vase',
    subtitle: 'Muted Sage Stoneware',
    category: 'vessel',
    price: 1450,
    dimensions: 'H 18 cm · Ø 9 cm',
    material: 'Wheel-thrown stoneware, satin sage glaze',
    description: 'A slim sage bottle designed for a single stem or delicate botanical sprig. Lives comfortably on bedside tables, writing desks, and minimal architectural consoles.',
    image: `${import.meta.env.BASE_URL}assets/floral/bud-vase.jpg`,
    tags: ['Bud Vase', 'Minimalist', 'Sage'],
    inStock: true
  },
  {
    id: 'moonlight-jar',
    name: 'Moonlight Jar',
    subtitle: 'Pearl Glaze Architectural Vessel',
    category: 'vessel',
    price: 3900,
    dimensions: 'H 36 cm · Ø 24 cm',
    material: 'Matt pearl stoneware',
    description: 'A round, quiet jar with a soft pearl glaze. Striking with dried pampas, flowering quince branches, or standing alone as a sculptural ceramic presence.',
    image: `${import.meta.env.BASE_URL}assets/floral/moon-jar.jpg`,
    tags: ['Sculptural', 'Moon Jar', 'Pearl'],
    inStock: true
  },
  {
    id: 'orla-low-bowl',
    name: 'Orla Low Bowl',
    subtitle: 'Blush Ceramic Centrepiece',
    category: 'vessel',
    price: 2900,
    dimensions: 'H 14 cm · Ø 30 cm',
    material: 'Warm blush unglazed exterior, glazed reservoir',
    description: 'A low blush bowl sculpted specifically for dinner tables, allowing guests to converse freely across the floral dome. Ideal for garden roses, ranunculus and water blooms.',
    image: `${import.meta.env.BASE_URL}assets/floral/blush-bowl.jpg`,
    tags: ['Tablescape', 'Low Bowl', 'Dining'],
    inStock: true
  },
  {
    id: 'sable-urn',
    name: 'Sable Urn',
    subtitle: 'Footed Charcoal Urn with Lustre',
    category: 'vessel',
    price: 5400,
    dimensions: 'H 38 cm · Ø 22 cm',
    material: 'Charcoal stoneware, hand-applied gold bands',
    description: 'A footed urn in deep charcoal glaze with hairline gold lustre detailing. Formal, grounding, and extraordinary when filled with white calla lilies and gardenias.',
    image: 'https://images.unsplash.com/photo-1507290439931-a861b5a38200?auto=format&fit=crop&w=1000&q=85',
    tags: ['Charcoal', 'Urn', 'High Drama'],
    inStock: true
  },
  {
    id: 'solstice-trumpet',
    name: 'Solstice Flared Trumpet',
    subtitle: 'Terracotta & Warm Ochre',
    category: 'vessel',
    price: 3200,
    dimensions: 'H 40 cm · Ø 20 cm',
    material: 'Terracotta stoneware with sand wash',
    description: 'A flared trumpet vessel created for wild grasses, eucalyptus, and untamed botanical stems. Brings an earthy Mediterranean warmth to airy rooms.',
    image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1000&q=85',
    tags: ['Terracotta', 'Tall Vessel', 'Wild Flora'],
    inStock: true
  }
];

export const FLORAL_SERVICES: FloralService[] = [
  {
    id: 'bespoke-bouquets',
    number: '01',
    title: 'Signature & Bespoke Bouquets',
    tagline: 'Composed with intention, seasonal stems and sculptural form.',
    description: 'Each bouquet is handcrafted in our studio using heirloom roses, architectural calla lilies, wild field blossoms and fragrant greenery. Never formulaic, always sculptural.',
    image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=1000&q=85',
    features: ['Hand-tied luxury bouquets', 'Heirloom botanical curation', 'Monogram gift packaging', 'Same-day Delhi NCR delivery'],
    deliverables: ['Custom floral stem selection', 'Care guide & flower food', 'Personalised wax-sealed card']
  },
  {
    id: 'event-florals',
    number: '02',
    title: 'Celebrations & Event Installations',
    tagline: 'Transformative floral environments for weddings, galas and private soirées.',
    description: 'From intimate private dinners to magnificent wedding mandaps, hanging floral clouds and candlelight tablescapes, we design atmospheres that linger in memory.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
    features: ['Complete wedding floral direction', 'Suspended ceiling installations', 'Bespoke ceremonial arches', 'Full on-site styling & breakdown'],
    deliverables: ['Moodboard & botanical palette', '3D spatial layout preview', 'Sample arrangement trial', 'Dedicated production team']
  },
  {
    id: 'styled-spaces',
    number: '03',
    title: 'Bespoke Styled Spaces',
    tagline: 'Living botanical architecture for luxury residences, hotels and studios.',
    description: 'We partner with interior designers, boutique hotels and private homeowners to curate vessel and floral rotations that elevate architectural volumes.',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=85',
    features: ['Weekly & bi-weekly floral rotations', 'Curated ceramic vessel placement', 'Seasonal dried botanical sculptures', 'Corporate hospitality styling'],
    deliverables: ['Space & lighting assessment', 'Custom vessel collection', 'Scheduled fresh replenishment']
  },
  {
    id: 'home-decor',
    number: '04',
    title: 'Curated Home Décor & Vessels',
    tagline: 'Artisanal stoneware and objects created to frame nature’s silhouettes.',
    description: 'Handmade ceramic urns, amphoras, brass bowls and fluted glass vessels crafted by master artisans to stand as timeless sculptures in your home.',
    image: 'https://images.unsplash.com/photo-1546842931-886c185b4c8c?auto=format&fit=crop&w=1000&q=85',
    features: ['Limited batch artisanal ceramics', 'Water-tight interior glazing', 'Custom matte and lustre finishes', 'Architectural proportions'],
    deliverables: ['Authenticity stamp', 'Styling recipe booklet', 'Protective padded presentation box']
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-1',
    title: 'The Calla Lily Composition',
    subtitle: 'Sculptural stems in matte stoneware',
    category: 'Signature Flora',
    aspect: 'tall',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=900&q=85'
  },
  {
    id: 'g-2',
    title: 'The Courtyard Wedding',
    subtitle: 'Ivory roses & candlelight tablescape',
    category: 'Event Installation',
    aspect: 'wide',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'g-3',
    title: 'Morning Light in Delhi Studio',
    subtitle: 'Sage bud vessels & botanical stems',
    category: 'Vessel Series',
    aspect: 'square',
    image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=900&q=85'
  },
  {
    id: 'g-4',
    title: 'The Amber & Olive Tablescape',
    subtitle: 'Curated gala dinner with hand-blown glass',
    category: 'Celebration Styling',
    aspect: 'wide',
    image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'g-5',
    title: 'Wild Anemone & Heirloom Foliage',
    subtitle: 'Organic silhouette for a private salon',
    category: 'Bespoke Bouquet',
    aspect: 'tall',
    image: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=900&q=85'
  },
  {
    id: 'g-6',
    title: 'Atmospheric Dusk Setting',
    subtitle: 'Charcoal urn with white garden roses',
    category: 'Bespoke Spaces',
    aspect: 'square',
    image: 'https://images.unsplash.com/photo-1507290439931-a861b5a38200?auto=format&fit=crop&w=900&q=85'
  }
];
