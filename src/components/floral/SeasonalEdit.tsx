import { useState } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { usePresentation } from '../../context/PresentationContext';
import { floralImage } from '../../data/studio';

const arrangements = [
  { name: 'The garden gathering', style: 'Soft & romantic', description: 'Garden roses, sweet peas and a little untamed beauty. Soft colours with a story to tell.', image: 'garden-bouquet-v2.jpg', alt: 'Airy ivory and peach garden flowers in a cream vase' },
  { name: 'The sculptural study', style: 'Sculptural stems', description: 'An expressive silhouette of calla lilies and garden roses. For spaces with a point of view.', image: 'atelier-composition.jpg', alt: 'Architectural calla lilies and roses in an ivory amphora' },
  { name: 'The everyday gesture', style: 'Soft & romantic', description: 'Fresh tulips, full of colour and possibility. A thoughtful gift, or a little just because.', image: 'tulip-bouquet.jpg', alt: 'A fresh bunch of pink tulips and green foliage' },
];
const filters = ['All flowers', 'Soft & romantic', 'Sculptural stems'];

export function SeasonalEdit() {
  const { activeFramework, openEnquiry } = usePresentation();
  const [filter, setFilter] = useState('All flowers');
  const visible = arrangements.filter(a => filter === 'All flowers' || a.style === filter);
  return <section id="seasonal-edit" className={`seasonal-edit section-shell seasonal-${activeFramework}`}><div className="seasonal-heading"><div><span className="eyebrow">The seasonal edit</span><h2>{activeFramework === 'garden' ? 'What’s blooming today.' : 'Botanical expressions.'}</h2></div><p>A few of our favourite ways to say it with flowers.<br />Each arrangement is made personal.</p></div><div className="seasonal-filters" role="group" aria-label="Arrangement style">{filters.map(f => <button key={f} aria-pressed={filter === f} onClick={() => setFilter(f)}>{f}</button>)}</div><div className="seasonal-grid">{visible.map(a => <article className="seasonal-card" key={a.name}><button className="seasonal-photo-button" aria-label={`Enquire about ${a.name}`} onClick={() => openEnquiry(`${a.name} · Seasonal floral arrangement`)}><img src={floralImage(a.image)} alt={a.alt} loading="lazy" width="700" height="900" /><span className="seasonal-photo-arrow"><ArrowUpRight size={20} /></span></button><div className="seasonal-card-copy"><span>{a.style}</span><h3>{a.name}</h3><p>{a.description}</p><button className="text-button" onClick={() => openEnquiry(`${a.name} · Seasonal floral arrangement`)}>Make it your own <ArrowRight size={16} /></button></div></article>)}</div><p className="seasonal-footnote" aria-live="polite">{visible.length} {visible.length === 1 ? 'arrangement' : 'arrangements'} to inspire you. Flowers and colours follow the season.</p></section>;
}
