import { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Flower2, Menu, Plus, ShoppingBag, X } from 'lucide-react';
import { usePresentation } from '../../context/PresentationContext';
import { FLORAL_PRODUCTS } from '../../data/floralData';
import { StudioForm } from './StudioForm';
import { base, money, YEAR } from '../../data/studio';
import { CelebrationSignature, ReferenceHero } from './StudioArtDirection';
import { CloserLook, InspirationButton, PortfolioFAQ, PortfolioImage, SelectedProjects } from './PortfolioSections';
import { PHOTO_BY_ID } from '../../data/portfolio';


function Brand() {
  return <a className="studio-brand" href="#home" aria-label="The Floral Edit home"><span className="studio-brand-mark" aria-hidden="true"><img src={`${base}assets/brand/the-floral-edit-master-logo.jpg`} width="3601" height="3601" alt="" fetchPriority="high" /></span><span className="studio-brand-name">The Floral Edit<small>Where floral meets design</small></span></a>;
}

function Navigation() {
  const { openEnquiry } = usePresentation();
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
  const links = [['#work', 'Our work'], ['#services', 'Floral design'], ['#studio', 'The studio']];
  return <nav ref={nav} className="studio-nav" aria-label="Main navigation">
    <div className="studio-nav-inner">
      <div className="nav-links">{links.map(([href, title]) => <a href={href} key={href}>{title}</a>)}</div>
      <Brand />
      <div className="nav-actions"><button className="nav-enquire" onClick={() => openEnquiry()}>Enquire about your occasion <ArrowUpRight size={15} /></button><InspirationButton /><button className="icon-button menu-button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="studio-mobile-menu" onClick={() => setMenuOpen(v => !v)}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button></div>
    </div>
    {menuOpen && <div id="studio-mobile-menu" className="studio-mobile-menu">{links.map(([href, title]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{title}<ArrowUpRight size={17} /></a>)}<a href="#questions" onClick={() => setMenuOpen(false)}>A few questions<ArrowUpRight size={17} /></a><button className="studio-button" onClick={() => { setMenuOpen(false); openEnquiry(); }}>Enquire about your occasion <ArrowUpRight size={17} /></button></div>}
  </nav>;
}

function SectionHeading({ label, title, text, action }: { label: string; title: string; text?: string; action?: { href: string; title: string } }) {
  return <div className="section-heading"><div><span className="eyebrow">{label}</span><h2>{title}</h2></div>{text && <p>{text}</p>}{action && <a className="text-button" href={action.href}>{action.title}<ArrowUpRight size={16} /></a>}</div>;
}

function Shop() {
  const { openQuickView, cartItems, setIsCartOpen } = usePresentation();
  const quantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  return <section id="collections" className="shop-section"><div className="section-shell"><SectionHeading label="The considered collection" title="Objects to live with." text="Hand-finished vessels. Quiet shapes. Pieces that feel at home, wherever you place them." /><button className="collection-bag text-button" onClick={() => setIsCartOpen(true)} aria-label={`Shopping bag, ${quantity} ${quantity === 1 ? 'item' : 'items'}`}><ShoppingBag size={17} />Your vessel bag ({quantity})</button><div className="product-grid">{FLORAL_PRODUCTS.slice(0, 4).map(p => <button key={p.id} className="product-card" onClick={() => openQuickView(p)} aria-label={`View ${p.name}, ${money(p.price)}`}><div className="product-image"><img src={p.image} alt={p.name} width="600" height="600" loading="lazy" /><span className="product-plus"><Plus size={19} /></span></div><div className="product-info"><h3>{p.name}</h3><span>{money(p.price)}</span></div><p>{p.subtitle}</p></button>)}</div><div className="collection-note"><span>Considered materials. Enduring forms.</span><span>Explore a piece for dimensions & details <ArrowUpRight size={14} /></span></div></div></section>;
}

function Philosophy() {
  return <section id="studio" className="philosophy-section"><div className="section-shell philosophy-grid"><div className="philosophy-image"><PortfolioImage photo={PHOTO_BY_ID['heritage-stems']} className="portfolio-studio-image" /><span>A little space for the unexpected.</span></div><div className="philosophy-copy"><span className="eyebrow">A note from the studio</span><h2>A little less ordinary.<br />A little more you.</h2><p>We believe the most beautiful flowers feel like they belong. To a place. To a moment. To you.</p><p>Flowers, vessels and the space around them belong in the same conversation. We bring together colour, texture and thoughtful proportions, beginning with the feeling you want to create.</p><div className="philosophy-signature">With flowers, always.<span>The Floral Edit</span></div><a className="text-button" href="#enquiry">Enquire about your occasion <ArrowUpRight size={16} /></a></div></div></section>;
}

function Process() {
  return <section className="section-shell process-section"><SectionHeading label="Your occasion, our full attention" title="Imagined together." text="A personal approach, from our first conversation to the final flowers." /><div className="process-grid">{[
    ['01', 'Share the occasion.', 'Tell us about your setting and the atmosphere you love. Bring a few ideas—or save photographs from our work.'],
    ['02', 'Shape the feeling.', 'Explore a floral direction through colour, texture and the details that make the occasion personal.'],
    ['03', 'Bring it together.', 'Flowers, vessels and the surrounding space, considered together as one complete setting.'],
  ].map(([n, title, copy]) => <div key={n}><span className="process-number">{n}</span><h3>{title}</h3><p>{copy}</p></div>)}</div></section>;
}

function Footer() {
  return <footer className="studio-footer"><div className="section-shell"><div className="footer-main"><div><a className="brand-artwork" href={`${base}assets/brand/the-floral-edit-master-logo.jpg`} target="_blank" rel="noopener noreferrer" aria-label="View The Floral Edit original logo in full detail (opens in a new tab)"><img src={`${base}assets/brand/the-floral-edit-master-logo.jpg`} width="3601" height="3601" alt="The Floral Edit — Where floral meets design. Original monogram with a detailed calla lily on green." loading="lazy" /></a><p>Floral design for spaces and celebrations.<br />Where floral meets design.</p></div><div><span className="footer-label">Explore</span><a href="#work">Selected celebrations</a><a href="#services">Floral design</a><a href="#collections">The vessel collection</a></div><div><span className="footer-label">Come a little closer</span><a href="#studio">Our approach</a><a href="#questions">A few questions</a><a href="#enquiry">Enquire about your occasion <ArrowUpRight size={14} /></a></div></div><div className="footer-bottom"><span>© {YEAR} The Floral Edit</span><Flower2 size={19} strokeWidth={1} /><span>Creative direction by TEQKILA</span></div></div></footer>;
}

export function StudioPage() {
  return <div className="floral-site theme-celebration" id="home">
    <a className="skip-link" href="#main-content">Skip to content</a>
    <Navigation />
    <main id="main-content">
      <ReferenceHero />
      <SelectedProjects /><CloserLook /><CelebrationSignature /><Philosophy /><Process /><Shop /><PortfolioFAQ />
      <section id="enquiry" className="enquiry-section enquiry-expanded"><div className="section-shell"><div className="enquiry-intro"><span className="eyebrow">Good things begin with a conversation</span><h2>Let’s make something<br />beautiful together.</h2><p>A thought, an occasion, a space waiting to bloom.<br />Bring your ideas and the photographs you love.</p></div><StudioForm service="Event flowers & celebrations" /></div></section>
    </main><Footer />
  </div>;
}

