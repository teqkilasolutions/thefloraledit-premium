import { ArrowDown, ArrowRight, ArrowUpRight, CalendarDays, Flower2, HeartHandshake, Leaf } from 'lucide-react';
import { usePresentation } from '../../context/PresentationContext';
import { floralImage } from '../../data/studio';
import { PHOTO_BY_ID } from '../../data/portfolio';
import { PortfolioImage } from './PortfolioSections';

export function BotanicalDrawing({ small = false }: { small?: boolean }) {
  return <svg className={small ? 'botanical-drawing botanical-small' : 'botanical-drawing'} viewBox="0 0 240 330" fill="none" aria-hidden="true" focusable="false">
    <g stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round">
      <path d="M111 325c9-73 28-130 38-220M114 289C72 237 60 194 55 150M129 239c32-32 52-67 69-100M133 214c-10-30-12-52-7-73M110 302c-20-18-42-22-64-20 13 20 37 25 64 20ZM123 256c23-5 40-18 51-35-24 0-42 12-51 35ZM87 245c-5-27-21-45-43-51 5 26 21 45 43 51ZM148 171c21-6 36-22 42-42-23 5-38 20-42 42ZM135 198c-18-12-31-29-34-49 23 7 34 24 34 49ZM150 113c16-9 26-24 28-42-19 8-28 22-28 42Z" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => <ellipse key={angle} cx="55" cy="127" rx="8" ry="22" transform={`rotate(${angle} 55 148)`} />)}
      <circle cx="55" cy="148" r="10" /><circle cx="55" cy="148" r="5" />
      {[0, 60, 120, 180, 240, 300].map(angle => <ellipse key={angle} cx="155" cy="65" rx="9" ry="26" transform={`rotate(${angle} 155 89)`} />)}
      <circle cx="155" cy="89" r="11" /><circle cx="155" cy="89" r="5" />
      <path d="M187 165c17-1 28-10 34-25-18 0-29 9-34 25ZM63 190c-17-2-29-13-34-29 20 3 30 13 34 29Z" />
    </g>
  </svg>;
}

export function ReferenceHero() {
  const { openEnquiry } = usePresentation();
  return <section className="reference-hero reference-hero-celebration">
    <PortfolioImage className="reference-hero-photo" photo={PHOTO_BY_ID['night-room']} priority sizes="100vw" />
    <div className="reference-hero-shade" />
    <div className="reference-hero-content celebration-hero-copy">
      <span className="hero-kicker">Floral design & meaningful celebrations</span>
      <h1><span>Where your</span><span>story blooms.</span></h1>
      <div className="hero-flourish"><span /><Leaf size={21} strokeWidth={1} /></div>
      <p>Thoughtful flowers. Beautifully imagined spaces.<br />Celebrations that feel entirely your own.</p>
      <div className="hero-actions"><a className="studio-button" href="#work">Explore our work <ArrowUpRight size={17} /></a><button className="reference-secondary" onClick={() => openEnquiry('Event flowers & celebrations')}>Enquire about your occasion <ArrowRight size={15} /></button></div>
    </div>
    <div className="reference-hero-footer"><span>A floral arch. An evening in colour.</span><a href="#work">Step inside <ArrowDown size={14} /></a></div>
  </section>;
}
export function StudioPromises() {
  return <div className="studio-promises"><div><Flower2 size={25} strokeWidth={1} /><span>Designed around you<small>A personal floral language</small></span></div><div><Leaf size={25} strokeWidth={1} /><span>Led by the season<small>Natural colour & character</small></span></div><div><HeartHandshake size={26} strokeWidth={1} /><span>Considered with care<small>From first stem to final detail</small></span></div><div><CalendarDays size={25} strokeWidth={1} /><span>For every occasion<small>The everyday & the extraordinary</small></span></div></div>;
}

export function CelebrationSignature() {
  const { openEnquiry } = usePresentation();
  const offerings = [
    { name: 'Floral installations', note: 'An entrance. A focal point. A feeling.', image: 'day-arch', service: 'Floral installations & arches' },
    { name: 'Table flowers', note: 'A beautiful reason to gather.', image: 'night-table', service: 'Table flowers & centrepieces' },
    { name: 'Complete settings', note: 'One vision, carried through the details.', image: 'heritage-room', service: 'Complete event floral styling' },
  ];
  return <section id="services" className="signature-events section-shell"><div className="signature-events-heading"><span className="eyebrow">Floral design, considered together</span><h2>Details that tell your story.</h2></div><div className="signature-events-grid">{offerings.map(o => <button key={o.name} className="signature-event-card" onClick={() => openEnquiry(o.service)}><div><PortfolioImage photo={PHOTO_BY_ID[o.image]} sizes="(max-width: 700px) 90vw, 33vw" /><span><ArrowUpRight size={18} /></span></div><h3>{o.name}</h3><p>{o.note}</p></button>)}</div></section>;
}

export function EventInvitation() {
  const { openEnquiry } = usePresentation();
  return <section className="event-invitation"><img src={floralImage('wedding-table.jpg')} alt="A garden table set with seasonal flowers and softly coloured glassware" loading="lazy" width="1200" height="900" /><div className="event-invitation-shade" /><div><span className="eyebrow">Your vision. Our flowers.</span><h2>Some things are<br />meant to be felt.</h2><p>From the first idea to the last flower,<br />let’s create a setting that stays with you.</p><button className="studio-button" onClick={() => openEnquiry('Full event floral design')}>Let’s imagine your occasion <ArrowUpRight size={17} /></button></div></section>;
}

