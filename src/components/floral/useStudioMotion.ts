import { useEffect, useState, type RefObject } from 'react';

export function useReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const change = () => setReduced(media.matches);
    media.addEventListener('change', change);
    return () => media.removeEventListener('change', change);
  }, []);
  return reduced;
}

export function useFanProgress(ref: RefObject<HTMLDivElement | null>, reduced: boolean) {
  useEffect(() => {
    let frame = 0;
    const draw = () => {
      frame = 0;
      const element = ref.current;
      if (!element) return;
      const top = element.getBoundingClientRect().top;
      const progress = reduced ? 1 : Math.min(1, Math.max(0, (innerHeight * .6 - top) / (innerHeight * .3)));
      const eased = progress * progress * (3 - 2 * progress);
      element.style.setProperty('--fan-progress', String(eased));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(draw); };
    draw();
    addEventListener('scroll', schedule, { passive: true });
    addEventListener('resize', schedule);
    return () => { cancelAnimationFrame(frame); removeEventListener('scroll', schedule); removeEventListener('resize', schedule); };
  }, [ref, reduced]);
}

export function useEntrance(ref: RefObject<HTMLElement | null>) {
  const reduced = useReducedMotion();
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (reduced) { element.classList.add('has-entered'); return; }
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { element.classList.add('has-entered'); observer.disconnect(); }
    }, { threshold: .12 });
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, reduced]);
}
