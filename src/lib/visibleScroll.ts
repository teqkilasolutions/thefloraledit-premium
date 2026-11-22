// Offscreen sections do not subscribe to global scroll events. A final draw at
// the intersection boundary preserves both the expanded and reversed states.
export function observeVisibleScroll(element: HTMLElement, draw: () => void) {
  let frame = 0;
  let active = false;
  const render = () => { frame = 0; draw(); };
  const schedule = () => { if (!frame) frame = requestAnimationFrame(render); };
  const observer = new IntersectionObserver(entries => {
    const visible = entries[0].isIntersecting;
    if (visible === active) return;
    active = visible;
    if (active) window.addEventListener('scroll', schedule, { passive: true });
    else window.removeEventListener('scroll', schedule);
    schedule();
  }, { rootMargin: '120px 0px' });
  const resize = () => { if (active) schedule(); };
  observer.observe(element);
  window.addEventListener('resize', resize);
  return () => { observer.disconnect(); cancelAnimationFrame(frame); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', resize); };
}
