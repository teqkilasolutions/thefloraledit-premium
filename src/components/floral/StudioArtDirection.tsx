import { ArrowDown, ArrowRight, ArrowUpRight, CalendarDays, Flower2, HeartHandshake, Leaf } from 'lucide-react';
import { usePresentation } from '../../context/PresentationContext';
import { floralImage } from '../../data/studio';

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
    <img className="reference-hero-photo" src={floralImage('celebration-reception-v2.jpg')} alt="A candlelit reception with chandeliers, blush roses and a suspended floral canopy" fetchPriority="high" width="1800" height="1013" />
    <div className="reference-hero-shade" />
    <div className="reference-hero-content celebration-hero-copy">
      <span className="hero-kicker">Floral design & meaningful celebrations</span>
      <span className="signature-line">Where your story blooms.</span>
      <h1>Flowers for<br />unforgettable<br className="hero-line-break" /> moments.</h1>
      <div className="hero-flourish"><span /><Leaf size={21} strokeWidth={1} /></div>
      <p>Thoughtful flowers. Beautifully imagined spaces. Celebrations that feel entirely your own.</p>
      <div className="hero-actions"><a className="studio-button" href="#services">Explore our world <ArrowUpRight size={17} /></a><button className="reference-secondary" onClick={() => openEnquiry('Wedding & celebration flowers')}>Plan your occasion <ArrowRight size={15} /></button></div>
    </div>
    <div className="reference-hero-footer"><span>Weddings · Intimate gatherings · Floral installations</span><a href="#services">Step inside <ArrowDown size={14} /></a></div>
  </section>;
}
export function StudioPromises() {
  return <div className="studio-promises"><div><Flower2 size={25} strokeWidth={1} /><span>Designed around you<small>A personal floral language</small></span></div><div><Leaf size={25} strokeWidth={1} /><span>Led by the season<small>Natural colour & character</small></span></div><div><HeartHandshake size={26} strokeWidth={1} /><span>Considered with care<small>From first stem to final detail</small></span></div><div><CalendarDays size={25} strokeWidth={1} /><span>For every occasion<small>The everyday & the extraordinary</small></span></div></div>;
}

export function CelebrationSignature() {
  const { openEnquiry } = usePresentation();
  const offerings = [
    { name: 'Bouquets', note: 'A little wild. Entirely yours.', image: 'garden-bouquet-v2.jpg', service: 'Bridal & occasion bouquets' },
    { name: 'Table flowers', note: 'A beautiful reason to gather.', image: 'wedding-table.jpg', service: 'Dinner tables & centrepieces' },
    { name: 'Ceremony flowers', note: 'The setting for your story.', image: 'garden-gate-v2.jpg', service: 'Ceremony flowers & floral arches' },
    { name: 'Complete celebrations', note: 'One vision. Every detail.', image: 'celebration-reception-v2.jpg', service: 'Full celebration floral styling' },
  ];
  return <section id="services" className="signature-events section-shell"><div className="signature-events-heading"><span className="eyebrow">The signature collection</span><h2>Details that tell your story.</h2><BotanicalDrawing small /></div><div className="signature-events-grid">{offerings.map(o => <button key={o.name} className="signature-event-card" onClick={() => openEnquiry(o.service)}><div><img src={floralImage(o.image)} alt={o.name === 'Ceremony flowers' ? 'A rose-covered garden arch' : o.name === 'Bouquets' ? 'An airy bouquet of garden roses and seasonal flowers' : 'Floral table styling with seasonal flowers'} loading="lazy" width="600" height="750" /><span><ArrowUpRight size={18} /></span></div><h3>{o.name}</h3><p>{o.note}</p></button>)}</div></section>;
}

export function EventInvitation() {
  const { openEnquiry } = usePresentation();
  return <section className="event-invitation"><img src={floralImage('celebration-reception-v2.jpg')} alt="Ivory and blush floral centrepieces with candlelight" loading="lazy" width="1800" height="1013" /><div className="event-invitation-shade" /><div><span className="eyebrow">Your vision. Our flowers.</span><h2>Some things are<br />meant to be felt.</h2><p>From the first idea to the last flower,<br />let’s create a setting that stays with you.</p><button className="studio-button" onClick={() => openEnquiry('Full event floral design')}>Let’s imagine your occasion <ArrowUpRight size={17} /></button></div></section>;
}

