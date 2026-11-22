import { useEffect, useState, type RefObject } from 'react';
import { observeVisibleScroll } from '../../lib/visibleScroll';

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const change = () => setReduced(media.matches);
    change();
    media.addEventListener('change', change);
    return () => media.removeEventListener('change', change);
  }, []);
  return reduced;
}

export function useFanProgress(ref: RefObject<HTMLDivElement | null>, reduced: boolean) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (reduced) { element.style.setProperty('--fan-progress', '1'); return; }
    const draw = () => {
      const top = element.getBoundingClientRect().top;
      const progress = Math.min(1, Math.max(0, (innerHeight * .6 - top) / (innerHeight * .3)));
      const eased = progress * progress * (3 - 2 * progress);
      element.style.setProperty('--fan-progress', String(eased));
    };
    return observeVisibleScroll(element, draw);
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
