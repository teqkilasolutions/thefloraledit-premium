import { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Flower2, Menu, Plus, ShoppingBag, X } from 'lucide-react';
import { usePresentation, type FrameworkId } from '../../context/PresentationContext';
import { FLORAL_PRODUCTS } from '../../data/floralData';
import { StudioForm } from './StudioForm';
import { base, floralImage, money, YEAR } from '../../data/studio';
import { BotanicalDrawing, CelebrationSignature, EventInvitation, ReferenceHero, StudioPromises } from './StudioArtDirection';


function Brand() {
  return <a className="studio-brand" href="#home" aria-label="The Floral Edit home"><span className="studio-brand-mark" aria-hidden="true"><img src={`${base}assets/brand/the-floral-edit-master-logo.jpg`} width="3601" height="3601" alt="" fetchPriority="high" /></span><span className="studio-brand-name">The Floral Edit<small>Where floral meets design</small></span></a>;
}

function Navigation() {
  const { cartItems, setIsCartOpen, openEnquiry } = usePresentation();
  const [menuOpen, setMenuOpen] = useState(false);
  const nav = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!menuOpen) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') { setMenuOpen(false); nav.current?.querySelector<HTMLButtonElement>('.menu-button')?.focus(); }
    }
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);
  const quantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const links = [['#collections', 'The collections'], ['#services', 'Events & occasions'], ['#studio', 'Our studio']];
  return <nav ref={nav} className="studio-nav" aria-label="Main navigation">
    <div className="studio-nav-inner">
      <div className="nav-links">{links.map(([href, title]) => <a href={href} key={href}>{title}</a>)}</div>
      <Brand />
      <div className="nav-actions"><button className="nav-enquire" onClick={() => openEnquiry()}>Let’s talk flowers <ArrowUpRight size={15} /></button><button className="icon-button bag-button" onClick={() => { setMenuOpen(false); setIsCartOpen(true); }} aria-label={`Shopping bag, ${quantity} ${quantity === 1 ? 'item' : 'items'}`}><ShoppingBag size={19} strokeWidth={1.4} /><span className="bag-count" aria-hidden="true">{quantity}</span></button><button className="icon-button menu-button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="studio-mobile-menu" onClick={() => setMenuOpen(v => !v)}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button></div>
    </div>
    {menuOpen && <div id="studio-mobile-menu" className="studio-mobile-menu">{links.map(([href, title]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{title}<ArrowUpRight size={17} /></a>)}<a href="#journal" onClick={() => setMenuOpen(false)}>The inspiration journal<ArrowUpRight size={17} /></a><button className="studio-button" onClick={() => { setMenuOpen(false); openEnquiry(); }}>Plan something beautiful <ArrowUpRight size={17} /></button></div>}
  </nav>;
}

function SectionHeading({ label, title, text, action }: { label: string; title: string; text?: string; action?: { href: string; title: string } }) {
  return <div className="section-heading"><div><span className="eyebrow">{label}</span><h2>{title}</h2></div>{text && <p>{text}</p>}{action && <a className="text-button" href={action.href}>{action.title}<ArrowUpRight size={16} /></a>}</div>;
}

function Shop() {
  const { openQuickView } = usePresentation();
  return <section id="collections" className="shop-section"><div className="section-shell"><SectionHeading label="The considered collection" title="Objects to live with." text="Hand-finished vessels. Quiet shapes. Pieces that feel at home, wherever you place them." /><div className="product-grid">{FLORAL_PRODUCTS.slice(0, 4).map(p => <button key={p.id} className="product-card" onClick={() => openQuickView(p)} aria-label={`View ${p.name}, ${money(p.price)}`}><div className="product-image"><img src={p.image} alt={p.name} width="600" height="600" loading="lazy" /><span className="product-plus"><Plus size={19} /></span></div><div className="product-info"><h3>{p.name}</h3><span>{money(p.price)}</span></div><p>{p.subtitle}</p></button>)}</div><div className="collection-note"><span>Considered materials. Enduring forms.</span><span>Explore a piece for dimensions & details <ArrowUpRight size={14} /></span></div></div></section>;
}

function Journal({ concept }: { concept: FrameworkId }) {
  const { openEnquiry } = usePresentation();
  return <section id="journal" className={`section-shell journal-section ${concept === 'atelier' ? 'atelier-journal' : ''}`}><SectionHeading label="The inspiration journal" title={concept === 'atelier' ? 'A dialogue with nature.' : 'Gathered with feeling.'} text="A glimpse into the colours, textures and moments that inspire our floral world." /><div className="journal-grid"><figure className="journal-main"><img loading="lazy" src={floralImage(concept === 'atelier' ? 'atelier-composition.jpg' : 'wedding-table.jpg')} alt={concept === 'atelier' ? 'Sculptural seasonal flowers in an ivory amphora' : 'An outdoor table dressed with seasonal flowers'} width="1200" height="900" /><figcaption><span>{concept === 'atelier' ? 'The seasonal study' : 'The art of gathering'}</span><h3>{concept === 'atelier' ? 'Wildness, with intention.' : 'A seat at a beautiful table.'}</h3></figcaption></figure><div className="journal-side"><figure><img loading="lazy" src={floralImage('dahlias.jpg')} alt="Soft peach dahlias in full bloom" width="650" height="700" /><figcaption><span>Notes from nature</span><h3>A study in seasonal colour.</h3></figcaption></figure><button className="journal-link" onClick={() => openEnquiry('A floral composition inspired by the journal')}><span>Something caught your eye?<br /><strong>Let’s make it your own.</strong></span><ArrowUpRight size={23} /></button></div></div></section>;
}

function Philosophy() {
  const { activeFramework } = usePresentation();
  return <section id="studio" className="philosophy-section"><BotanicalDrawing /><div className="section-shell philosophy-grid"><div className="philosophy-image"><img loading="lazy" src={floralImage('garden-bouquet-v2.jpg')} alt="An airy gathering of garden roses, cosmos and sweet peas" width="700" height="850" /><span>Always a little closer to nature.</span></div><div className="philosophy-copy"><span className="eyebrow">{activeFramework === 'garden' ? 'Our floral philosophy' : 'A note from the studio'}</span><h2>A little less ordinary.<br />A little more you.</h2><p>We believe the most beautiful flowers feel like they belong. To a place. To a moment. To you.</p><p>Our approach brings together a love of seasonal stems, thoughtful proportions and the small details that make something personal. From a single vessel to a room in bloom, we begin by listening.</p><div className="philosophy-signature">With flowers, always.<span>The Floral Edit</span></div><a className="text-button" href="#enquiry">Meet us in the making <ArrowUpRight size={16} /></a></div></div></section>;
}

function Process() {
  return <section className="section-shell process-section"><SectionHeading label="Your occasion, our full attention" title="Imagined together." text="A personal approach, from our first conversation to the final flowers." /><div className="process-grid">{[
    ['01', 'We listen.', 'Your story, your setting, the atmosphere you want to create. We start with what matters to you.'],
    ['02', 'We imagine.', 'A seasonal palette, thoughtful vessels and a floral direction shaped around your occasion.'],
    ['03', 'It comes to life.', 'From the first stem to the finishing touches, every detail is considered as part of the whole.'],
  ].map(([n, title, copy]) => <div key={n}><span className="process-number">{n}</span><h3>{title}</h3><p>{copy}</p></div>)}</div></section>;
}

function Footer() {
  return <footer className="studio-footer"><div className="section-shell"><div className="footer-main"><div><a className="brand-artwork" href={`${base}assets/brand/the-floral-edit-master-logo.jpg`} target="_blank" rel="noopener noreferrer" aria-label="View The Floral Edit original logo in full detail (opens in a new tab)"><img src={`${base}assets/brand/the-floral-edit-master-logo.jpg`} width="3601" height="3601" alt="The Floral Edit — Where floral meets design. Original monogram with a detailed calla lily on green." loading="lazy" /></a><p>An independent floral design studio.<br />Rooted in New Delhi. Inspired by nature.</p></div><div><span className="footer-label">Explore</span><a href="#collections">The vessel collection</a><a href="#services">Flowers & occasions</a><a href="#journal">The inspiration journal</a></div><div><span className="footer-label">Come a little closer</span><a href="#studio">Our approach</a><a href="#enquiry">Begin a conversation <ArrowUpRight size={14} /></a><p>Delhi NCR & beyond<br />By private appointment</p></div></div><div className="footer-bottom"><span>© {YEAR} The Floral Edit</span><Flower2 size={19} strokeWidth={1} /><span>Creative direction by TEQKILA</span></div></div></footer>;
}

export function StudioPage() {
  return <div className="floral-site theme-celebration" id="home">
    <a className="skip-link" href="#main-content">Skip to content</a>
    <Navigation />
    <main id="main-content">
      <ReferenceHero />
      <CelebrationSignature /><EventInvitation /><StudioPromises />
      <Journal concept="celebration" /><Process /><Philosophy /><Shop />
      <section id="enquiry" className="enquiry-section enquiry-expanded"><div className="section-shell"><div className="enquiry-intro"><span className="eyebrow">Good things begin with a conversation</span><h2>Let’s make something<br />beautiful together.</h2><p>A thought, an occasion, a space waiting to bloom.<br />We’d love to hear what you have in mind.</p></div><StudioForm service="Wedding & celebration flowers" /></div></section>
    </main><Footer />
  </div>;
}

