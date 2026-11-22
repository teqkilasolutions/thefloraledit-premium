import { useEffect, useId, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { base, YEAR } from '../../data/studio';
import { usePresentation } from '../../context/PresentationContext';
import { InspirationButton } from './PortfolioSections';

export function FloralIdentity({ footer = false, onNavigate }: { footer?: boolean; onNavigate?: () => void }) {
  const filterId = `logo-${useId().replace(/:/g, '')}`;
  return <a className={`studio-brand floral-identity${footer ? ' identity-footer' : ''}`} href="#home" onClick={onNavigate} aria-label="The Floral Edit home">
    <svg className="identity-monogram" viewBox="805 735 1970 1710" aria-hidden="true" focusable="false">
      <defs><filter id={filterId} colorInterpolationFilters="sRGB" x="0" y="0" width="100%" height="100%">
        <feColorMatrix type="matrix" values="0 0 0 0 .32549 0 0 0 0 .38824 0 0 0 0 .21176 .34016 1.14432 .11552 0 -.6" />
      </filter></defs>
      <image href={`${base}assets/brand/the-floral-edit-master-logo.jpg`} width="3601" height="3601" filter={`url(#${filterId})`} />
    </svg>
    <span className="identity-wordmark">The Floral Edit<small>Where floral meets design</small></span>
  </a>;
}

const LEFT_LINKS = [['#home', 'Home'], ['#work', 'Our work'], ['#flowers', 'Our flowers'], ['#services', 'Spaces']];
const RIGHT_LINKS = [['#studio', 'The studio'], ['#enquiry', 'Contact']];

export function ReferenceNavigation() {
  const { openEnquiry } = usePresentation();
  const [menuOpen, setMenuOpen] = useState(false);
  const nav = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const close = () => { setMenuOpen(false); toggle.current?.focus(); };
    const keydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); close(); }
      if (event.key === 'Tab') {
        const controls = [...(nav.current?.querySelectorAll<HTMLElement>('.menu-button, .reference-mobile-menu a, .reference-mobile-menu button') || [])].filter(el => el.getClientRects().length);
        const first = controls[0]; const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    const wide = window.matchMedia('(min-width: 1101px)');
    const resize = () => { if (wide.matches) close(); };
    document.addEventListener('keydown', keydown);
    wide.addEventListener('change', resize);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener('keydown', keydown); wide.removeEventListener('change', resize); };
  }, [menuOpen]);
  return <header className={`studio-nav reference-nav${menuOpen ? ' menu-is-open' : ''}`} ref={nav}>
    <nav className="reference-nav-inner" aria-label="Main navigation">
      <div className="reference-nav-left">{LEFT_LINKS.map(([href, label]) => <a key={href} href={href}>{label}</a>)}</div>
      <FloralIdentity onNavigate={() => setMenuOpen(false)} />
      <div className="nav-actions reference-nav-right">{RIGHT_LINKS.map(([href, label]) => <a className="desktop-nav-link" key={href} href={href}>{label}</a>)}<InspirationButton onBeforeOpen={() => setMenuOpen(false)} /><button ref={toggle} className="icon-button menu-button" aria-expanded={menuOpen} aria-controls="studio-mobile-menu" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(value => !value)}>{menuOpen ? <X size={25} strokeWidth={1} /> : <Menu size={28} strokeWidth={1} />}</button></div>
    </nav>
    {menuOpen && <div className="reference-mobile-menu" id="studio-mobile-menu"><div>{[...LEFT_LINKS, ...RIGHT_LINKS].map(([href, label]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}<ArrowUpRight size={20} strokeWidth={1} /></a>)}</div><button className="studio-button" onClick={() => { setMenuOpen(false); openEnquiry(); }}>Enquire about your occasion <ArrowUpRight size={17} /></button><p>Where floral meets design.</p></div>}
  </header>;
}

export function ReferenceFooter() {
  const { openEnquiry } = usePresentation();
  const reveal = (id: string) => { const panel = document.getElementById(id); if (panel instanceof HTMLDetailsElement) panel.open = true; };
  return <footer className="reference-footer">
    <div className="reference-footer-main">
      <nav className="footer-links-left" aria-label="Footer work navigation"><a href="#home">Home</a><a href="#work">Our work</a><a href="#flowers">Our flowers</a><a href="#services">Spaces & celebrations</a><a className="footer-master" href={`${base}assets/brand/the-floral-edit-master-logo.jpg`} target="_blank" rel="noopener noreferrer">View original logo</a></nav>
      <div className="footer-identity"><FloralIdentity footer /><p>Flowers, thoughtfully composed.<br />Spaces and celebrations, beautifully your own.</p><span>© {YEAR} The Floral Edit</span><small>Creative direction by TEQKILA</small></div>
      <nav className="footer-links-right" aria-label="Footer studio navigation"><a href="#enquiry">Contact</a><a href="#studio">The studio</a><a href="#questions" onClick={() => reveal('questions')}>A few questions</a><a href="#collections" onClick={() => reveal('collections')}>The vessel collection</a><button onClick={() => openEnquiry()}>Enquire <ArrowUpRight size={13} /></button></nav>
    </div>
    <div className="reference-footer-strip"><div><h3>A beautiful beginning.</h3><p>Your occasion. Your ideas. Our flowers.</p></div><button onClick={() => openEnquiry()}>Let’s begin a conversation <ArrowUpRight size={18} strokeWidth={1.2} /></button></div>
  </footer>;
}
