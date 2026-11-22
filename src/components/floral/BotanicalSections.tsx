import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { base } from '../../data/studio';
import { usePresentation } from '../../context/PresentationContext';
import { useEntrance, useFanProgress, useReducedMotion } from './useStudioMotion';
import { observeVisibleScroll } from '../../lib/visibleScroll';

const art = (name: string) => `${base}assets/botanicals/${name}`;
const PANELS = [
  { file: 'panel-left.webp', alt: 'Yellow botanical stems extending beyond a pale green rectangular panel' },
  { file: 'panel-centre.webp', alt: 'Sculptural burgundy poppies extending above an olive green panel' },
  { file: 'panel-right.webp', alt: 'Purple allium and blue flowers extending beyond a pale green panel' },
];

function LeafOrnament({ down = false }: { down?: boolean }) {
  return <div className={`reference-leaf-art${down ? ' leaf-art-down' : ''}`} aria-hidden="true"><img src={art(down ? 'leaf-down.svg' : 'leaf-up.svg')} alt="" width="92" height="29" loading="lazy" /></div>;
}

export function HouseIntroduction() {
  const copy = useRef<HTMLDivElement>(null);
  useEntrance(copy);
  return <section className="house-intro exact-house" id="services" aria-labelledby="house-title">
    <div className="house-flower"><img src={art('hero-flowers.webp')} width="1436" height="1709" loading="lazy" alt="Sculptural white anemones, peach roses and burgundy calla lilies with gold leaves" /></div>
    <div className="house-copy botanical-enter" ref={copy}><h2 id="house-title">A house of<br />floral design.<br />Made for you.</h2><div><p>Flowers for meaningful gatherings, thoughtfully imagined spaces and moments you want to remember. Discover a floral world shaped around you.</p><a className="round-link" href="#work">Browse services <ArrowRight size={22} strokeWidth={1.4} /></a></div></div>
  </section>;
}

export function FloralForms() {
  const fan = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  useFanProgress(fan, reduced);
  const goTo = (index: number) => {
    const container = rail.current;
    const child = container?.children[index] as HTMLElement | undefined;
    if (!container || !child) return;
    container.scrollTo({ left: child.offsetLeft - container.offsetLeft - (container.clientWidth - child.clientWidth) / 2, behavior: reduced ? 'instant' : 'smooth' });
    setActive(index);
  };
  return <section id="work" className="forms-section exact-forms" aria-labelledby="forms-title"><div className="botanical-section-shell">
    <LeafOrnament /><h2 id="forms-title">The forms we work in.</h2>
    <div className="botanical-fan" ref={fan} aria-label="Three botanical compositions"><figure className="fan-panel fan-left"><img src={art(PANELS[0].file)} alt={PANELS[0].alt} width="907" height="1302" loading="lazy" /></figure><figure className="fan-panel fan-centre"><img src={art(PANELS[1].file)} alt={PANELS[1].alt} width="907" height="1301" loading="lazy" /></figure><figure className="fan-panel fan-right"><img src={art(PANELS[2].file)} alt={PANELS[2].alt} width="907" height="1302" loading="lazy" /></figure></div>
    <div className="botanical-mobile-fan" aria-label="Botanical compositions">
      <div className="mobile-fan-rail" ref={rail} onScroll={event => { const element = event.currentTarget; const midpoint = element.scrollLeft + element.clientWidth / 2; const distances = [...element.children].map(child => { const panel = child as HTMLElement; return Math.abs(panel.offsetLeft - element.offsetLeft + panel.clientWidth / 2 - midpoint); }); setActive(distances.indexOf(Math.min(...distances))); }}>{PANELS.map((panel, index) => <figure className="mobile-fan-panel" key={panel.file} aria-label={`Botanical composition ${index + 1} of 3`}><img src={art(panel.file)} alt={panel.alt} width="907" height="1302" loading="lazy" /></figure>)}</div>
      <div className="form-pagination">{PANELS.map((panel, index) => <button key={panel.file} aria-label={`Show botanical panel ${index + 1}`} aria-pressed={active === index} onClick={() => goTo(index)}><span /></button>)}</div>
    </div>
    <div className="forms-note"><p>Floral arches, tablescapes and sculptural arrangements. <br />Flowers, vessels and the space around them, designed as one complete story.</p><a className="round-link light-link" href="#celebrations">Explore our celebrations <ArrowRight size={22} strokeWidth={1.4} /></a><LeafOrnament down /></div>
  </div></section>;
}

const CATEGORIES = [
  { title: 'Fresh flowers', file: 'peony.webp', width: 702, height: 599, alt: 'An open red peony with detailed layered petals' },
  { title: 'Preserved & dry', file: 'velvet-flower.webp', width: 436, height: 454, alt: 'A mauve velvet flower with sculptural curled petals' },
  { title: 'Fillers & foliage', file: 'foliage.webp', width: 506, height: 556, alt: 'A sculptural green botanical spray with fine leaves' },
];

export function BotanicalTypes() {
  const { openEnquiry } = usePresentation();
  const rows = useRef<HTMLDivElement>(null);
  const [scrollActive, setScrollActive] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [focused, setFocused] = useState<number | null>(null);
  const active = hovered ?? focused ?? scrollActive;
  useEffect(() => {
    const container = rows.current;
    if (!container) return;
    const draw = () => {
      const elements = [...(rows.current?.children || [])];
      let selected: number | null = null;
      let distance = Infinity;
      elements.forEach((element, index) => { const box = element.getBoundingClientRect(); if (box.top > innerHeight * .8 || box.bottom < innerHeight * .2) return; const gap = Math.abs(box.top + box.height / 2 - innerHeight * .5); if (gap < distance) { distance = gap; selected = index; } });
      setScrollActive(current => current === selected ? current : selected);
    };
    // A deliberate scroll gesture yields visual selection without moving keyboard focus.
    const userScroll = () => setFocused(null);
    const stop = observeVisibleScroll(container, draw);
    addEventListener('wheel', userScroll, { passive: true });
    addEventListener('touchstart', userScroll, { passive: true });
    return () => { stop(); removeEventListener('wheel', userScroll); removeEventListener('touchstart', userScroll); };
  }, []);
  return <section id="flowers" className="botanical-types exact-flower-types" aria-labelledby="flowers-title"><div className="botanical-copy-shell"><div className="botanical-heading"><h2 id="flowers-title">Our flowers.</h2><p>Fresh colour, lasting textures and the beautiful lines of foliage. A different character in every stem, and a floral direction for every kind of setting.</p></div><div className="flower-category-list" ref={rows}>{CATEGORIES.map((category, index) => <div className={`flower-category${active === index ? ' is-active' : ''}`} key={category.file} onMouseEnter={() => setHovered(index)} onMouseLeave={() => setHovered(null)}><button onFocus={() => setFocused(index)} onBlur={() => setFocused(null)} onClick={() => openEnquiry(category.title)} aria-label={`Enquire about ${category.title.toLowerCase()}`}><h3>{category.title}</h3><span className="flower-category-visual"><img src={art(category.file)} width={category.width} height={category.height} alt={category.alt} loading="lazy" /></span><ArrowUpRight className="flower-category-arrow" size={22} strokeWidth={1} /></button></div>)}</div></div></section>;
}

export function StudioListening() {
  const content = useRef<HTMLDivElement>(null);
  useEntrance(content);
  return <section id="studio" className="studio-listening exact-listening" aria-labelledby="listening-title"><img className="listening-photo" src={art('roses-background.webp')} width="2880" height="1428" alt="A close study of rose petals" loading="lazy" /><div className="listening-overlay" /><div className="listening-content botanical-enter" ref={content}><img className="listening-sketch" src={art('botanical-sketch.svg')} alt="" width="110" height="217" loading="lazy" /><div><h2 id="listening-title">We listen first.<br />Everything else follows.</h2><div className="listening-body"><p>Tell us about the occasion, the setting and the feeling you want to create. Bring the colours you love, the details you notice and the ideas that are still taking shape.</p><p>From there, we explore a floral direction together. A considered palette, expressive forms and thoughtful proportions, with every element belonging to the same story.</p></div></div></div></section>;
}

const STUDIES = ['A tall delphinium stem on a muted green field', 'A closer study of pale delphinium petals', 'Delphinium flowers and branching stems in detail', 'A blush chair beneath an overhead floral installation'];
export function StudioScale() {
  const { openEnquiry } = usePresentation();
  const grid = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  useEntrance(grid);
  useEntrance(copy);
  return <section className="studio-scale exact-scale" aria-labelledby="scale-title"><div className="botanical-copy-shell"><div className="scale-photo-rail" ref={grid}>{STUDIES.map((alt, index) => <figure key={alt}><img src={art(`study-${['one', 'two', 'three', 'four'][index]}.webp`)} alt={alt} width="432" height="651" loading="lazy" /></figure>)}</div><div className="scale-copy botanical-enter" ref={copy}><h2 id="scale-title">From one beautiful stem to a room transformed. One vision, considered in every detail.</h2><div className="scale-indent"><p>Intimate arrangements and immersive settings. Flowers, vessels and the room around them, brought together with a shared sense of purpose.</p><button className="round-link outline-link" onClick={() => openEnquiry()}>Plan your flowers <ArrowRight size={22} strokeWidth={1.4} /></button></div></div></div></section>;
}
