import { useEffect } from 'react';
import { ArrowUpRight, Columns2, Monitor, SlidersHorizontal, Smartphone } from 'lucide-react';
import { PresentationProvider, usePresentation } from '../../context/PresentationContext';
import { StudioPage } from './StudioPage';
import { CONCEPTS } from '../../data/studio';
import { StudioOverlays } from './StudioOverlays';
import './studio.css';
import './references.css';

function Presentation() {
  const { activeFramework, setActiveFramework, viewportMode, setViewportMode, setIsSpecsOpen, setIsComparisonOpen } = usePresentation();
  const preview = new URLSearchParams(window.location.search).has('preview');
  useEffect(() => {
    document.title = `${CONCEPTS.find(c => c.id === activeFramework)?.name} | The Floral Edit`;
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (!preview) { const url = new URL(window.location.href); url.searchParams.set('concept', activeFramework); url.hash = ''; window.history.replaceState(null, '', url); }
  }, [activeFramework, preview]);
  if (preview) return <><StudioPage /><StudioOverlays /></>;
  const previewUrl = new URL(window.location.href); previewUrl.search = ''; previewUrl.searchParams.set('preview', activeFramework); previewUrl.hash = '';
  return <><header className="presentation-bar"><div className="presentation-identity"><span className="agency-mark">TEQKILA</span><span className="presentation-caption">The Floral Edit <span> / Design collection</span></span></div><div className="concept-tabs" role="group" aria-label="Design concept">{CONCEPTS.map((c, i) => <button aria-pressed={activeFramework === c.id} onClick={() => setActiveFramework(c.id)} key={c.id}><span className="concept-index">0{i + 1}</span><span className="concept-full">{c.name.replace('The ', '')}</span><span className="concept-short">{c.short}</span>{c.id === activeFramework && <span className="selected-dot" />}</button>)}</div><div className="presentation-tools"><div className="viewport-controls" role="group" aria-label="Preview size"><button className="presentation-icon" title="Desktop view" aria-label="Desktop view" aria-pressed={viewportMode === 'desktop'} onClick={() => setViewportMode('desktop')}><Monitor size={15} /></button><button className="presentation-icon" title="Mobile preview" aria-label="Mobile preview" aria-pressed={viewportMode === 'mobile'} onClick={() => setViewportMode('mobile')}><Smartphone size={15} /></button></div><button className="presentation-icon" title="Design notes" aria-label="Design notes" onClick={() => setIsSpecsOpen(true)}><SlidersHorizontal size={15} /></button><button className="presentation-icon compare-control" onClick={() => setIsComparisonOpen(true)}><Columns2 size={15} /><span>Compare</span></button></div></header>{viewportMode === 'mobile' ? <div className="device-stage"><div className="device-caption"><span>Mobile preview</span><span>390 × 844 <ArrowUpRight size={12} /></span></div><div className="device-chassis"><iframe title={`${CONCEPTS.find(c => c.id === activeFramework)?.name} mobile preview`} src={previewUrl.toString()} width="390" height="844" /></div><p className="device-note">A real mobile viewport. Scroll to explore.</p></div> : <StudioPage />}<StudioOverlays /></>;
}

export function StudioApp() { return <PresentationProvider><Presentation /></PresentationProvider>; }
