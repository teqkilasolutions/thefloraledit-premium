import { useEffect, useRef, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { PHOTO_BY_ID } from '../../data/portfolio';
import { scrollGalleryFrame } from '../../lib/scrollGallery';
import { PortfolioImage } from './PortfolioSections';

export function ScrollGallery() {
  const section = useRef<HTMLDivElement>(null);
  const focus = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const changed = () => setReduced(media.matches);
    media.addEventListener('change', changed);
    return () => media.removeEventListener('change', changed);
  }, []);
  useEffect(() => {
    if (reduced) { focus.current?.removeAttribute('style'); section.current?.style.removeProperty('--gallery-progress'); return; }
    let frame = 0;
    const draw = () => {
      frame = 0;
      const root = section.current;
      const image = focus.current;
      if (!root || !image) return;
      const bounds = root.getBoundingClientRect();
      const height = window.innerHeight;
      const progress = Math.min(1, Math.max(0, -bounds.top / Math.max(1, bounds.height - height)));
      const value = scrollGalleryFrame(progress, root.clientWidth, height);
      image.style.cssText = `width:${value.width}px;height:${value.height}px;left:${value.x}px;top:${value.y}px;border-radius:${value.radius}px`;
      root.style.setProperty('--gallery-progress', String(progress));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(draw); };
    draw();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); };
  }, [reduced]);
  return <section className="immersive-story" aria-labelledby="immersive-title">
    <div className="scroll-intro"><h2 id="immersive-title">A world of flowers.<br />A feeling all your own.</h2><div><p>Floral design, thoughtful spaces<br />and the joy of gathering.</p><a href="#services">Step into our world <ArrowDown size={17} /></a></div></div>
    <div className={`scroll-gallery${reduced ? ' is-still' : ''}`} ref={section}>
      <div className="scroll-gallery-stage">
        <div className="scroll-gallery-surround" aria-hidden="true">
          <div className="scroll-tile tile-one"><PortfolioImage photo={PHOTO_BY_ID['heritage-stems']} sizes="24vw" /></div>
          <div className="scroll-tile tile-two"><PortfolioImage photo={PHOTO_BY_ID['day-candles']} sizes="24vw" /></div>
          <div className="scroll-tile tile-three"><PortfolioImage photo={PHOTO_BY_ID['night-arrangement']} sizes="24vw" /></div>
          <div className="scroll-tile tile-four"><PortfolioImage photo={PHOTO_BY_ID['day-passage']} sizes="24vw" /></div>
        </div>
        <div className="scroll-gallery-focus" ref={focus}><PortfolioImage photo={PHOTO_BY_ID['day-flowers']} sizes="100vw" /><span className="scroll-photo-caption">Every stem, a little possibility.</span></div>
      </div>
    </div>
  </section>;
}
