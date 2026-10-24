export interface ColorSwatch {
  name: string;
  hex: string;
  role: string;
  textColor: string;
}

export interface TypographySpec {
  headlineFont: string;
  headlineSample: string;
  bodyFont: string;
  bodySample: string;
  rationale: string;
}

export interface FrameworkSectionPlan {
  number: string;
  name: string;
  purpose: string;
  treatment: string;
}

export interface FrameworkSpec {
  id: 'garden' | 'atelier' | 'celebration';
  number: string;
  name: string;
  tagline: string;
  positioning: string;
  mood: string[];
  colors: ColorSwatch[];
  typography: TypographySpec;
  copyDeck: {
    eyebrow: string;
    headline: string;
    supportingCopy: string;
    primaryCta: string;
    secondaryCta: string;
  };
  sectionPlan: FrameworkSectionPlan[];
  motionAndInteraction: string;
  bestSuitedFor: string;
  keyDifferentiators: string[];
}

export const FRAMEWORK_SPECS: Record<'garden' | 'atelier' | 'celebration', FrameworkSpec> = {
  garden: {
    id: 'garden',
    number: '01',
    name: 'The Editorial Garden',
    tagline: 'Understated luxury · Editorial · Timeless',
    positioning: 'Premium floral design studio with a timeless editorial identity. Makes the brand feel like a high-end publication atelier.',
    mood: ['Understated Luxury', 'Editorial Poise', 'Serene Space', 'Craftsmanship', 'Timeless Quality'],
    colors: [
      { name: 'Ivory', hex: '#F8F6EF', role: 'Primary Canvas & Generous Whitespace', textColor: '#292A25' },
      { name: 'Olive', hex: '#536336', role: 'Signature Brand Accent & Highlights', textColor: '#F8F6EF' },
      { name: 'Forest Green', hex: '#26382C', role: 'Primary Contrast & Editorial Depth', textColor: '#F8F6EF' },
      { name: 'Sage', hex: '#AAB39A', role: 'Subtle Botanical Wash & Badges', textColor: '#292A25' },
      { name: 'Sand', hex: '#E9E1D4', role: 'Warm Secondary Neutral Panelling', textColor: '#292A25' },
      { name: 'Charcoal', hex: '#292A25', role: 'Primary Typography & Structural Lines', textColor: '#F8F6EF' }
    ],
    typography: {
      headlineFont: 'Cormorant Garamond',
      headlineSample: 'Flowers, thoughtfully composed.',
      bodyFont: 'DM Sans',
      bodySample: 'From everyday bouquets to thoughtfully designed celebrations, discover floral arrangements that bring quiet beauty into every space.',
      rationale: 'Expressive classical serif with delicate serifs and generous letter-spacing, grounded by hyper-clean modern humanist sans for effortless clarity.'
    },
    copyDeck: {
      eyebrow: 'FLOWERS · SPACES · MEANINGFUL MOMENTS',
      headline: 'Flowers, thoughtfully composed.',
      supportingCopy: 'From considered bouquets to beautifully styled celebrations, we bring a thoughtful floral perspective to the spaces and moments that matter.',
      primaryCta: 'Explore the Collection',
      secondaryCta: 'Enquire About an Event'
    },
    sectionPlan: [
      { number: '01', name: 'Navigation', purpose: 'Make key journeys easy', treatment: 'Refined ivory header, centered wordmark, shopping bag and direct enquiry trigger' },
      { number: '02', name: 'Hero', purpose: 'Establish premium identity', treatment: 'Asymmetric split layout with architectural photography, serif headline, twin CTAs' },
      { number: '03', name: 'Collections', purpose: 'Guide visitors by interest', treatment: 'Three editorial image cards with subtle hover zoom and category tags' },
      { number: '04', name: 'Featured Work', purpose: 'Demonstrate craftsmanship', treatment: 'Asymmetric gallery of floral compositions with detail captions' },
      { number: '05', name: 'The Studio', purpose: 'Explain the brand’s approach', treatment: 'Warm sand neutral panel with artisan story and founder philosophy' },
      { number: '06', name: 'Event Services', purpose: 'Generate high-value enquiries', treatment: 'Wide panoramic event photograph with lead consultation booking' },
      { number: '07', name: 'Closing CTA & Footer', purpose: 'Encourage direct conversion', treatment: 'Rich olive closing panel with clear contact action and refined footer' }
    ],
    motionAndInteraction: 'Slow image reveals, subtle 1.03x hover zoom on photography, delicate hairline border transitions, and quiet page section reveals.',
    bestSuitedFor: 'A brand that wants to look established, timeless, and effortlessly premium across both products and bespoke services.',
    keyDifferentiators: [
      'Generous ivory whitespace with editorial margins',
      'Asymmetric split hero that feels like an art monograph',
      'Balanced focus between retail vessels and event enquiries'
    ]
  },

  atelier: {
    id: 'atelier',
    number: '02',
    name: 'The Botanical Atelier',
    tagline: 'Immersive · Artistic · Distinctive',
    positioning: 'An immersive, artistic brand experience with a powerful visual signature built around deep forest green, sculptural flora, and dramatic typography.',
    mood: ['Immersive Drama', 'Artistic Signature', 'Sculptural Flora', 'Deep Green Resonance', 'Botanical Haute Couture'],
    colors: [
      { name: 'Deep Forest', hex: '#26382C', role: 'Dominant Dramatic Background & Canvas', textColor: '#F8F6EF' },
      { name: 'Signature Olive', hex: '#536336', role: 'Brand Core Accent & Card Framing', textColor: '#F8F6EF' },
      { name: 'Soft Ivory', hex: '#F8F6EF', role: 'High-contrast Crisp Typography & Manifesto Panel', textColor: '#26382C' },
      { name: 'Muted Sage', hex: '#AAB39A', role: 'Delicate Secondary Labels & Subtext', textColor: '#26382C' },
      { name: 'Moss', hex: '#737D51', role: 'Textured Surface & Earthy Accents', textColor: '#F8F6EF' },
      { name: 'Warm Gold', hex: '#B8A276', role: 'Metallic Numbering & Luxury Hairlines', textColor: '#26382C' }
    ],
    typography: {
      headlineFont: 'Cormorant Garamond (Expressive & Oversized)',
      headlineSample: 'Where floral meets feeling.',
      bodyFont: 'DM Sans (Restrained & High Legibility)',
      bodySample: 'We bring together flowers, form and thoughtful design to create arrangements and environments that feel distinctly yours.',
      rationale: 'Oversized, confident serif headlines that command attention against dark velvet-forest backgrounds, paired with luminous ivory sans copy.'
    },
    copyDeck: {
      eyebrow: 'A FLORAL DESIGN STUDIO',
      headline: 'Where floral meets feeling.',
      supportingCopy: 'We bring together flowers, form and thoughtful design to create arrangements and environments that feel distinctly yours.',
      primaryCta: 'Discover Our Work',
      secondaryCta: 'Create Something Bespoke'
    },
    sectionPlan: [
      { number: '01', name: 'Minimal Navigation', purpose: 'Keep focus on botanical imagery', treatment: 'Deep dark-forest transparent header with luminous white monogram and navigation links' },
      { number: '02', name: 'Immersive Hero', purpose: 'Create immediate emotional response', treatment: 'Full-bleed deep forest section with oversized typography and sculptural calla lily photography' },
      { number: '03', name: 'Signature Florals', purpose: 'Present key offerings with numeric poise', treatment: '01 Signature Florals, 02 Bespoke Events, 03 Styled Spaces in warm gold accents' },
      { number: '04', name: 'Selected Work', purpose: 'Establish creative authority', treatment: 'Large-scale editorial image compositions under “Nature, interpreted through design.”' },
      { number: '05', name: 'Our Philosophy', purpose: 'Luminous breathing space', treatment: 'Striking contrast ivory panel with botanical details and brand manifesto' },
      { number: '06', name: 'Bespoke Projects', purpose: 'Attract higher-value private clients', treatment: 'Forest green panel highlighting bespoke installations and curated styling projects' },
      { number: '07', name: 'Enquiry & Footer', purpose: 'Turn curiosity into direct commissions', treatment: 'Sculptural dark inquiry form with golden accents and artistic footer' }
    ],
    motionAndInteraction: 'Layered parallax scrolling, slow cinematic image reveals, floating subtle botanical badges, and high-contrast hover states.',
    bestSuitedFor: 'A client who prioritises strong market differentiation, progressive creative direction, and an unforgettable artistic impression.',
    keyDifferentiators: [
      'Bold Deep Forest atmosphere that instantly separates the brand from generic pastel floral shops',
      'Art gallery aesthetic with numbered collections (01, 02, 03) in warm gold',
      'Luminous contrast shift when transitioning to the ivory philosophy section'
    ]
  },

  celebration: {
    id: 'celebration',
    number: '03',
    name: 'The Celebration House',
    tagline: 'Romantic · Experiential · Aspirational',
    positioning: 'A photography-first, romantic brand experience built to celebrate weddings, private galas, experiential events, and bespoke installations.',
    mood: ['Romantic Grandeur', 'Warm Daylight', 'Aspirational Tablescapes', 'Celebratory Warmth', 'Blush & Ochre Elegance'],
    colors: [
      { name: 'Warm Ivory', hex: '#FAF7F1', role: 'Luminous Cream Canvas with Golden Warmth', textColor: '#3B302C' },
      { name: 'Muted Blush', hex: '#D9B4A4', role: 'Romantic Accent & Delicate Pill Badges', textColor: '#3B302C' },
      { name: 'Olive', hex: '#536336', role: 'Grounding Botanical Green', textColor: '#FAF7F1' },
      { name: 'Soft Sand', hex: '#E9E1D4', role: 'Warm Neutral Separation & Borders', textColor: '#3B302C' },
      { name: 'Rose Taupe', hex: '#AA8175', role: 'Rich Earthy Warmth & Secondary Text', textColor: '#FAF7F1' },
      { name: 'Deep Brown', hex: '#3B302C', role: 'Espresso Headline & Body Readability', textColor: '#FAF7F1' }
    ],
    typography: {
      headlineFont: 'Playfair Display (Romantic Editorial)',
      headlineSample: 'For moments that deserve more.',
      bodyFont: 'DM Sans',
      bodySample: 'Thoughtfully designed bouquets, floral installations and event styling that bring your vision to life across weddings, dinners and milestones.',
      rationale: 'Playfair Display brings romantic, festive warmth with high editorial elegance, complemented by clean DM Sans for wedding booking forms and product cards.'
    },
    copyDeck: {
      eyebrow: 'FLOWERS FOR EVERY KIND OF OCCASION',
      headline: 'For moments that deserve more.',
      supportingCopy: 'Thoughtfully designed bouquets, floral installations and event styling that bring your ideas to life.',
      primaryCta: 'Enquire About Your Event',
      secondaryCta: 'Explore Bouquets'
    },
    sectionPlan: [
      { number: '01', name: 'Warm Navigation', purpose: 'Highlight shopping & event consultation', treatment: 'Warm ivory header, dual CTA buttons (Shop Bouquets & Book Consultation)' },
      { number: '02', name: 'Event-Led Hero', purpose: 'Create desire and show scale', treatment: 'Cinematic full-width celebration installation with floating layered editorial card' },
      { number: '03', name: 'Service Categories', purpose: 'Clear navigational pathways', treatment: 'Four distinct image cards: Bespoke Bouquets, Event Florals, Celebration Styling, Home Décor' },
      { number: '04', name: 'Signature Gallery', purpose: 'Showcase celebratory scale', treatment: 'Wedding tablescapes, mandap florals, and evening candlelight scenes' },
      { number: '05', name: 'The Experience', purpose: 'Demystify custom commissioning', treatment: 'Three-step process: Consultation & Palette, Spatial Blueprint, Day-Of Styling' },
      { number: '06', name: 'Event Enquiry Form', purpose: 'Capture high-ticket wedding & event leads', treatment: 'Dedicated lead form with date selector, event type, guest count, and venue location' },
      { number: '07', name: 'Shop & Contact', purpose: 'Support direct orders and gifting', treatment: 'Curated artisanal vessels, corporate gifting, and romantic footer' }
    ],
    motionAndInteraction: 'Smooth horizontal gallery sliding, gentle card lifting with soft blush shadow, fluid accordion step reveals, and inviting form focus states.',
    bestSuitedFor: 'A brand whose business model relies heavily on weddings, milestone celebrations, luxury event installations, and high-ticket styling.',
    keyDifferentiators: [
      'Layered floating card over cinematic event photography',
      'Step-by-step bespoke process section that builds client trust',
      'Four-card category grid covering both bespoke celebrations and daily gifting'
    ]
  }
};
