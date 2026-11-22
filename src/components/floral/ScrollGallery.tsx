import { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { PHOTO_BY_ID } from '../../data/portfolio';
import { scrollGalleryTransform } from '../../lib/scrollGallery';
import { observeVisibleScroll } from '../../lib/visibleScroll';
import { PortfolioImage } from './PortfolioSections';
import { useReducedMotion } from './useStudioMotion';

export function ScrollGallery() {
  const section = useRef<HTMLDivElement>(null);
  const focus = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const root = section.current;
    const image = focus.current;
    const photograph = image?.querySelector('img');
    if (!root || !image || !photograph) return;
    if (reduced) { image.removeAttribute('style'); photograph.removeAttribute('style'); root.style.removeProperty('--gallery-progress'); root.style.removeProperty('--gallery-height'); return; }
    let previous = '';
    let imageDimensions = '';
    const draw = () => {
      const bounds = root.getBoundingClientRect();
      const height = window.innerHeight;
      const progress = Math.min(1, Math.max(0, -bounds.top / Math.max(1, bounds.height - height)));
      const photo = PHOTO_BY_ID['day-flowers'];
      const value = scrollGalleryTransform(progress, bounds.width, height, photo.width, photo.height);
      // Mobile browser controls can make 100vh differ from the visible height.
      root.style.setProperty('--gallery-height', `${height}px`);
      const dimensions = `width:${value.imageWidth}px;height:${value.imageHeight}px`;
      if (dimensions !== imageDimensions) { photograph.style.cssText = dimensions; imageDimensions = dimensions; }
      const transform = `--focus-x:${value.scaleX};--focus-y:${value.scaleY};--photo-x:${value.imageScaleX};--photo-y:${value.imageScaleY}`;
      if (transform === previous) return;
      previous = transform;
      image.style.cssText = transform;
      root.style.setProperty('--gallery-progress', String(progress));
    };
    return observeVisibleScroll(root, draw);
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
