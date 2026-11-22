import { useState } from 'react';
import { ArrowDown, Pause, Play } from 'lucide-react';
import { PHOTO_BY_ID, photoUrl } from '../../data/portfolio';
import { useReducedMotion } from './useStudioMotion';

const SLIDES = [
  { wide: 'day-room', tall: 'day-lounge' },
  { wide: 'night-room', tall: 'night-arrangement' },
  { wide: 'heritage-room', tall: 'heritage-lounge' },
  { wide: 'day-wide', tall: 'day-arch' },
];
// Starting at the final duplicate lets the complete strip travel to the right.
const LOOP = [SLIDES[0], SLIDES[3], SLIDES[2], SLIDES[1], SLIDES[0]];

export function OpeningHero() {
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  return <section className="opening-hero" aria-labelledby="opening-title" aria-roledescription="carousel">
    <div className="opening-carousel" aria-label="Celebrations by The Floral Edit"><div className={`hero-track${paused ? ' is-paused' : ''}`}>
      {LOOP.map((slide, index) => {
        const wide = PHOTO_BY_ID[slide.wide];
        const tall = PHOTO_BY_ID[slide.tall];
        const duplicate = index === 0;
        return <picture key={`${slide.wide}-${index}`} className="hero-slide" aria-hidden={duplicate || undefined}>
          <source media="(max-width:700px)" srcSet={`${photoUrl(tall, true)} ${tall.smallWidth}w, ${photoUrl(tall)} ${tall.width}w`} sizes="100vw" />
          <img className="opening-photo" src={photoUrl(wide)} srcSet={`${photoUrl(wide, true)} ${wide.smallWidth}w, ${photoUrl(wide)} ${wide.width}w`} sizes="100vw" alt={duplicate ? '' : wide.alt} width={wide.width} height={wide.height} loading="eager" fetchPriority={index === LOOP.length - 1 ? 'high' : 'low'} />
        </picture>;
      })}
    </div></div>
    <div className="opening-shade" />
    <h1 id="opening-title">Flowers for the moments<br />that become memories.</h1>
    <a className="opening-scroll" href="#immersive-title" aria-label="Discover The Floral Edit"><ArrowDown size={18} strokeWidth={1} /></a>
    {!reduced && <button className="hero-motion-toggle" aria-label={paused ? 'Play slideshow' : 'Pause slideshow'} aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? <Play size={16} strokeWidth={1.3} /> : <Pause size={16} strokeWidth={1.3} />}</button>}
  </section>;
}
