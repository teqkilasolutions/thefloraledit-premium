import { useEffect, useRef, type ReactNode } from 'react';
import { X } from 'lucide-react';

export function StudioDialog({ title, children, onClose, wide = false, drawer = false }: {
  title: string; children: ReactNode; onClose: () => void; wide?: boolean; drawer?: boolean;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current!;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, []);
  return <dialog ref={ref} className={`studio-dialog ${wide ? 'dialog-wide' : ''} ${drawer ? 'dialog-drawer' : ''}`}
    aria-label={title} onCancel={e => { e.preventDefault(); onClose(); }}
    onKeyDown={event => {
      if (event.key !== 'Tab') return;
      const controls = [...event.currentTarget.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex="0"]')].filter(el => el.getClientRects().length > 0);
      const first = controls[0]; const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }}
    onClick={e => { if (e.target === e.currentTarget) { const r = e.currentTarget.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) onClose(); } }}>
    <div className="dialog-heading"><h2>{title}</h2><button className="icon-button" onClick={onClose} aria-label={`Close ${title}`}><X size={21} /></button></div>
    {children}
  </dialog>;
}
