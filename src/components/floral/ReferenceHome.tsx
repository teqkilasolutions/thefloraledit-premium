import { useRef, useState, type FormEvent } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Flower2, Layers3, Leaf, Plus, ShoppingBag } from 'lucide-react';
import { usePresentation } from '../../context/PresentationContext';
import { usePortfolio } from '../../context/PortfolioContext';
import { PHOTO_BY_ID, PORTFOLIO_PROJECTS, projectForPhoto } from '../../data/portfolio';
import { FLORAL_PRODUCTS } from '../../data/floralData';
import { money } from '../../data/studio';
import { PortfolioFAQ, PortfolioImage } from './PortfolioSections';

export function OpeningHero() {
  return <section className="opening-hero" aria-labelledby="opening-title">
    <PortfolioImage photo={PHOTO_BY_ID['day-room']} className="opening-photo opening-photo-wide" priority sizes="100vw" />
    <PortfolioImage photo={PHOTO_BY_ID['day-lounge']} className="opening-photo opening-photo-tall" priority sizes="100vw" />
    <div className="opening-shade" />
    <h1 id="opening-title">Flowers for the moments<br />that become memories.</h1>
    <a className="opening-scroll" href="#immersive-title" aria-label="Discover The Floral Edit"><ArrowDown size={18} strokeWidth={1} /></a>
  </section>;
}

export function HouseIntroduction() {
  return <section className="house-intro" id="services" aria-labelledby="house-title">
    <div className="house-flower"><PortfolioImage photo={PHOTO_BY_ID['day-flowers']} sizes="(max-width:700px) 100vw, 52vw" /></div>
    <div className="house-copy"><h2 id="house-title">A house of flowers.<br />A world of possibility.</h2><div><p>Flowers have a way of changing how a place feels. We bring them together with colour, texture and the details that make a celebration yours.</p><a className="round-link" href="#work">Discover our work <ArrowRight size={20} strokeWidth={1.2} /></a></div></div>
  </section>;
}

const FORM_COVERS = ['day-passage', 'night-arrangement', 'heritage-stems'];
export function FloralForms() {
  const { openProject } = usePortfolio();
  const rail = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const goTo = (index: number) => {
    const container = rail.current;
    const child = container?.children[index] as HTMLElement | undefined;
    if (!container || !child) return;
    container.scrollTo({ left: child.offsetLeft - container.offsetLeft - (container.clientWidth - child.clientWidth) / 2, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    setActive(index);
  };
  return <section id="work" className="forms-section" aria-labelledby="forms-title"><h2 id="forms-title">Flowers, in every form.</h2>
    <div className="form-rail" ref={rail} onScroll={event => {
      const element = event.currentTarget;
      const midpoint = element.scrollLeft + element.clientWidth / 2;
      const distances = [...element.children].map(child => { const item = child as HTMLElement; return Math.abs(item.offsetLeft - element.offsetLeft + item.clientWidth / 2 - midpoint); });
      setActive(distances.indexOf(Math.min(...distances)));
    }} aria-label="Selected celebration stories">{PORTFOLIO_PROJECTS.map((project, index) => <article key={project.id} className={`project-story form-panel form-panel-${index + 1}`}>
      <button className="project-cover form-panel-photo" onClick={() => openProject(project.id)} aria-label={`Explore ${project.title}`}><PortfolioImage photo={PHOTO_BY_ID[FORM_COVERS[index]]} sizes="(max-width:700px) 80vw, 32vw" /><span className="form-panel-open"><Plus size={22} strokeWidth={1} /></span></button>
      <div className="form-panel-caption"><h3>{project.title}</h3><span>{project.mood}</span></div>
    </article>)}</div>
    <div className="form-pagination" aria-label="Choose a celebration">{PORTFOLIO_PROJECTS.map((project, index) => <button key={project.id} onClick={() => goTo(index)} aria-label={`Show ${project.title}`} aria-pressed={active === index}><span /></button>)}</div>
    <div className="forms-note"><p>Arches that welcome. Tables that bring people together.<br />Floral moments, considered as part of the whole room.</p><button className="round-link light-link" onClick={() => openProject(PORTFOLIO_PROJECTS[active].id)}>Explore the celebration <ArrowRight size={20} strokeWidth={1.2} /></button></div><div className="floral-divider"><Leaf size={30} strokeWidth={.8} /></div>
  </section>;
}

const FLOWER_TYPES = [
  { title: 'Statement flowers', id: 'night-arrangement', text: 'Colour, scale and sculptural stems. A focal point with a presence of its own.' },
  { title: 'Soft textures', id: 'day-candles', text: 'Petals, candlelight and gentle layers. Details that invite a closer look.' },
  { title: 'Foliage & form', id: 'day-passage', text: 'Trailing greenery and botanical lines, bringing the feeling of a garden indoors.' },
];

export function BotanicalTypes() {
  const [active, setActive] = useState(0);
  const { openProject } = usePortfolio();
  return <section id="flowers" className="botanical-types" aria-labelledby="flowers-title"><div className="botanical-heading"><h2 id="flowers-title">Our floral language.</h2><p>A play of colour, texture and line.<br />Chosen for the feeling you want to create.</p></div><div className="botanical-type-layout"><div className="botanical-type-image">{FLOWER_TYPES.map((type, index) => <PortfolioImage key={type.id} photo={PHOTO_BY_ID[type.id]} className={active === index ? 'is-active' : ''} sizes="(max-width:700px) 90vw, 33vw" />)}</div><div className="botanical-type-list">{FLOWER_TYPES.map((type, index) => <div className={active === index ? 'is-active' : ''} key={type.id}><button onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} onClick={() => { setActive(index); openProject(projectForPhoto(type.id)!.id, type.id); }} aria-label={`Explore ${type.title.toLowerCase()}`}><h3>{type.title}</h3><ArrowUpRight size={24} strokeWidth={1} /></button><p>{type.text}</p></div>)}</div></div></section>;
}

export function StudioListening() {
  return <section id="studio" className="studio-listening" aria-labelledby="listening-title"><PortfolioImage photo={PHOTO_BY_ID['night-table']} className="listening-photo" sizes="100vw" /><div className="listening-overlay" /><div className="listening-content"><Leaf size={68} strokeWidth={.65} aria-hidden="true" /><div><h2 id="listening-title">It starts with you.<br />And a little imagination.</h2><div className="listening-body"><p>A place, an occasion, a feeling you’d like to create. We begin there, with your ideas and the things that matter to you.</p><p>Then we consider the flowers alongside the room: the shapes, the textures, the quiet details and the moments that call for something extraordinary.</p><a className="line-link" href="#enquiry">Let’s imagine your occasion <ArrowUpRight size={17} strokeWidth={1.2} /></a></div></div></div></section>;
}

export function StudioScale() {
  const { openProject } = usePortfolio();
  return <section className="studio-scale" aria-labelledby="scale-title"><div className="scale-photo-rail">{['heritage-stems', 'day-flowers', 'night-arrangement', 'day-lounge'].map(id => <button key={id} onClick={() => openProject(projectForPhoto(id)!.id, id)} aria-label={`View ${PHOTO_BY_ID[id].caption}`}><PortfolioImage photo={PHOTO_BY_ID[id]} sizes="(max-width:700px) 45vw, 24vw" /></button>)}</div><div className="scale-copy"><h2 id="scale-title">From one beautiful stem<br />to a room transformed.</h2><p>An intimate table. An immersive setting.<br />One floral idea, carried through every detail.</p><a className="round-link light-link" href="#enquiry">Bring your vision <ArrowRight size={20} strokeWidth={1.2} /></a></div></section>;
}

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
  return <div className="studio-extras"><details id="collections"><summary>The vessel collection <Plus size={20} strokeWidth={1} /></summary><VesselCollection /></details><details id="questions"><summary>Before we begin <Plus size={20} strokeWidth={1} /></summary><PortfolioFAQ /></details></div>;
}

export function ContactPanel() {
  const { openEnquiry } = usePresentation();
  return <section className="contact-panel" id="enquiry" aria-label="Get in touch with The Floral Edit"><div className="contact-photo"><PortfolioImage photo={PHOTO_BY_ID['day-passage']} sizes="100vw" /><span>The Floral Edit</span></div><button className="contact-ticker" onClick={() => openEnquiry()} aria-label="Get in touch"><span className="contact-ticker-track" aria-hidden="true">{[0, 1, 2, 3].map(index => <span key={index}>Get in touch <ArrowUpRight strokeWidth={.7} /></span>)}</span><span className="portfolio-sr-only">Get in touch</span></button></section>;
}
