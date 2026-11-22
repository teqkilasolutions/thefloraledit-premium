import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowDown, Pause, Play } from 'lucide-react';
import { PHOTO_BY_ID } from '../../data/portfolio';
import { base } from '../../data/studio';
import { responsivePhotoSet, responsivePhotoUrl } from '../../lib/responsiveImages';
import { useReducedMotion } from './useStudioMotion';

const SLIDES = [
  { wide: 'day-room', tall: 'day-lounge' },
  { wide: 'night-room', tall: 'night-arrangement' },
  { wide: 'heritage-room', tall: 'heritage-lounge' },
  { wide: 'day-wide', tall: 'day-arch' },
];
// Starting at the final duplicate lets the complete strip travel to the right.
const LOOP = [SLIDES[0], SLIDES[3], SLIDES[2], SLIDES[1], SLIDES[0]];
const BUFFER_ORDER = [3, 2, 1, 0];

export function OpeningHero() {
  const reduced = useReducedMotion();
  const hero = useRef<HTMLElement>(null);
  const [paused, setPaused] = useState(false);
  const [loaded, setLoaded] = useState<number[]>([]);
  const [buffer, setBuffer] = useState(0);
  const [visible, setVisible] = useState(true);
  const ready = loaded.length === LOOP.length;
  const markLoaded = useCallback((index: number) => setLoaded(current => current.includes(index) ? current : [...current, index]), []);

  // A preloaded/server-rendered image can finish before hydration attaches its
  // onLoad handler. Include those cached frames in the readiness check too.
  useEffect(() => {
    let mounted = true;
    hero.current?.querySelectorAll<HTMLImageElement>('.opening-photo').forEach(image => {
      if (image.complete && image.naturalWidth) image.decode().catch(() => {}).then(() => { if (mounted) markLoaded(Number(image.dataset.slide)); });
    });
    return () => { mounted = false; };
  }, [buffer, markLoaded]);

  // Give the opening photograph and identity the connection first. Only start
  // moving once every frame has decoded, so slow connections never reveal gaps.
  useEffect(() => {
    const previous = buffer === 0 ? LOOP.length - 1 : BUFFER_ORDER[buffer - 1];
    if (!loaded.includes(previous) || reduced || buffer === BUFFER_ORDER.length) return;
    // Decode one photograph at a time, leaving a paint/idle opportunity between
    // frames instead of competing for the phone's decoder and main thread.
    const next = () => setBuffer(current => current + 1);
    if (!window.requestIdleCallback) { const timer = window.setTimeout(next, 100); return () => clearTimeout(timer); }
    const idle = window.requestIdleCallback(next, { timeout: 1200 });
    return () => window.cancelIdleCallback(idle);
  }, [loaded, reduced, buffer]);
  useEffect(() => {
    let inView = true;
    const update = () => setVisible(inView && document.visibilityState === 'visible');
    const observer = new IntersectionObserver(entries => { inView = entries[0].isIntersecting; update(); });
    if (hero.current) observer.observe(hero.current);
    document.addEventListener('visibilitychange', update);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', update); };
  }, []);

  return <section ref={hero} className="opening-hero" aria-labelledby="opening-title" aria-roledescription="carousel">
    <div className="opening-carousel" aria-label="Celebrations by The Floral Edit"><div className={`hero-track${paused || !ready || !visible ? ' is-paused' : ''}`} data-ready={ready}>
      {LOOP.map((slide, index) => {
        const wide = PHOTO_BY_ID[slide.wide];
        const tall = PHOTO_BY_ID[slide.tall];
        const duplicate = index === 0;
        const first = index === LOOP.length - 1;
        const load = first || BUFFER_ORDER.slice(0, buffer).includes(index);
        return <picture key={`${slide.wide}-${index}`} className="hero-slide" aria-hidden={duplicate || undefined}>
          <source type="image/avif" media="(max-width:700px)" srcSet={load ? responsivePhotoSet(base, tall.id, 'avif') : undefined} sizes="100vw" />
          <source type="image/webp" media="(max-width:700px)" srcSet={load ? responsivePhotoSet(base, tall.id) : undefined} sizes="100vw" />
          <source type="image/avif" srcSet={load ? responsivePhotoSet(base, wide.id, 'avif') : undefined} sizes="100vw" />
          {load && <img className="opening-photo" data-slide={index} src={responsivePhotoUrl(base, wide.id)} srcSet={responsivePhotoSet(base, wide.id)} sizes="100vw" alt={duplicate ? '' : wide.alt} width={wide.width} height={wide.height} loading="eager" decoding="async" fetchPriority={first ? 'high' : 'low'} onLoad={async event => { await event.currentTarget.decode().catch(() => {}); markLoaded(index); }} />}
        </picture>;
      })}
    </div></div>
    <div className="opening-shade" />
    <h1 id="opening-title">Flowers for the moments<br />that become memories.</h1>
    <a className="opening-scroll" href="#immersive-title" aria-label="Discover The Floral Edit"><ArrowDown size={18} strokeWidth={1} /></a>
    {!reduced && <button className="hero-motion-toggle" aria-label={paused ? 'Play slideshow' : 'Pause slideshow'} aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? <Play size={16} strokeWidth={1.3} /> : <Pause size={16} strokeWidth={1.3} />}</button>}
  </section>;
}
