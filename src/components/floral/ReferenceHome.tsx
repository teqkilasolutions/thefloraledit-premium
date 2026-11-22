import { useEffect, useState, type FormEvent } from 'react';
import { ArrowRight, ArrowUpRight, Flower2, Layers3, Leaf, Plus, ShoppingBag } from 'lucide-react';
import { usePresentation } from '../../context/PresentationContext';
import { PHOTO_BY_ID } from '../../data/portfolio';
import { FLORAL_PRODUCTS } from '../../data/floralData';
import { money } from '../../data/studio';
import { PortfolioFAQ, PortfolioImage } from './PortfolioSections';
export { OpeningHero } from './HeroCarousel';
export { HouseIntroduction, FloralForms, BotanicalTypes, StudioListening, StudioScale } from './BotanicalSections';

export function StudioPrinciples() {
  return <section className="studio-principles" aria-label="Our design approach"><div className="principle-grid">{[
    { Icon: Flower2, title: <>Flowers with<br />a point of view</>, text: 'A composition shaped around your space, its light and the atmosphere you love.' },
    { Icon: Leaf, title: <>Thoughtful<br />by nature</>, text: 'Colour, texture and the character of each stem, given room to be themselves.' },
    { Icon: Layers3, title: <>Every detail,<br />considered together</>, text: 'Flowers, vessels and the surrounding setting, composed as one complete story.' },
  ].map(({ Icon, title, text }, index) => <div key={index}><Icon size={32} strokeWidth={.8} /><h3>{title}</h3><p>{text}</p></div>)}</div><div className="floral-divider"><Leaf size={30} strokeWidth={.8} /></div></section>;
}

export function StudioNotes() {
  const [email, setEmail] = useState('');
  const { openEnquiry } = usePresentation();
  const submit = (event: FormEvent) => { event.preventDefault(); openEnquiry('Studio notes & floral inspiration', email.trim()); };
  return <section className="studio-notes" aria-labelledby="notes-title"><div className="notes-image"><PortfolioImage photo={PHOTO_BY_ID['day-candles']} sizes="(max-width:700px) 90vw, 44vw" /></div><div className="notes-copy"><h2 id="notes-title">A little closer<br />to the studio.</h2><p>Floral ideas, the details behind a setting and a little inspiration for what comes next.</p><form onSubmit={submit}><label htmlFor="studio-notes-email">Your email for studio notes</label><div><input id="studio-notes-email" type="email" autoComplete="email" maxLength={200} required placeholder="Your email address" value={email} onChange={event => setEmail(event.target.value)} /><button type="submit" aria-label="Ask about studio notes"><ArrowRight size={25} strokeWidth={1} /></button></div><small>Prepare an enquiry about studio notes. No subscription is created here.</small></form></div></section>;
}

function VesselCollection() {
  const { openQuickView, cartItems, setIsCartOpen } = usePresentation();
  const quantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  return <div className="reference-vessels"><div className="vessel-heading"><h3>Objects to live with.</h3><button className="line-link" onClick={() => setIsCartOpen(true)} aria-label={`Shopping bag, ${quantity} items`}><ShoppingBag size={17} />Your vessel bag ({quantity})</button></div><div className="product-grid">{FLORAL_PRODUCTS.slice(0, 4).map(product => <button key={product.id} className="product-card" onClick={() => openQuickView(product)} aria-label={`View ${product.name}, ${money(product.price)}`}><div className="product-image"><img src={product.image} alt={product.name} width="600" height="600" loading="lazy" /><span className="product-plus"><Plus size={19} /></span></div><div className="product-info"><h3>{product.name}</h3><span>{money(product.price)}</span></div><p>{product.subtitle}</p></button>)}</div></div>;
}

export function StudioExtras() {
  useEffect(() => {
    const reveal = () => { const id = window.location.hash.slice(1); if (id !== 'questions' && id !== 'collections') return; const panel = document.getElementById(id); if (panel instanceof HTMLDetailsElement) panel.open = true; };
    reveal();
    window.addEventListener('hashchange', reveal);
    return () => window.removeEventListener('hashchange', reveal);
  }, []);
  return <div className="studio-extras"><details id="collections"><summary>The vessel collection <Plus size={20} strokeWidth={1} /></summary><VesselCollection /></details><details id="questions"><summary>Before we begin <Plus size={20} strokeWidth={1} /></summary><PortfolioFAQ /></details></div>;
}

export function ContactPanel() {
  const { openEnquiry } = usePresentation();
  return <section className="contact-panel" id="enquiry" aria-label="Get in touch with The Floral Edit"><div className="contact-photo"><PortfolioImage photo={PHOTO_BY_ID['day-passage']} sizes="100vw" /><span>The Floral Edit</span></div><button className="contact-ticker" onClick={() => openEnquiry()} aria-label="Get in touch"><span className="contact-ticker-track" aria-hidden="true">{[0, 1, 2, 3].map(index => <span key={index}>Get in touch <ArrowUpRight strokeWidth={.7} /></span>)}</span><span className="portfolio-sr-only">Get in touch</span></button></section>;
}
