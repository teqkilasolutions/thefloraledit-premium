import { lazy, Suspense, useEffect } from 'react';
import { PresentationProvider, usePresentation } from '../../context/PresentationContext';
import { StudioPage } from './StudioPage';
import './studio.css';
import './celebration.css';
import './portfolio.css';
import './reference-home.css';
import './motion-refinement.css';
import './performance.css';
import { PortfolioProvider, usePortfolio } from '../../context/PortfolioContext';
import { InteractionBoundary } from './InteractionBoundary';

const StudioOverlays = lazy(() => import('./StudioOverlays').then(module => ({ default: module.StudioOverlays })));
const PortfolioOverlays = lazy(() => import('./PortfolioOverlays').then(module => ({ default: module.PortfolioOverlays })));

function Interactions() {
  const { isEnquiryModalOpen, quickViewProduct, isCartOpen, closeEnquiry, closeQuickView, setIsCartOpen } = usePresentation();
  const { viewer, boardOpen, closeViewer, closeBoard } = usePortfolio();
  return <InteractionBoundary onDismiss={() => { closeEnquiry(); closeQuickView(); setIsCartOpen(false); closeViewer(); closeBoard(); }}><Suspense fallback={<span className="portfolio-sr-only" role="status">Opening your selection…</span>}>
    {(isEnquiryModalOpen || quickViewProduct || isCartOpen) && <StudioOverlays />}
    {(viewer || boardOpen) && <PortfolioOverlays />}
  </Suspense></InteractionBoundary>;
}

export function StudioApp() {
  useEffect(() => {
    document.title = 'The Floral Edit | Flowers & Celebrations';
    const url = new URL(window.location.href);
    for (const key of ['concept', 'preview', 'v']) url.searchParams.delete(key);
    window.history.replaceState(null, '', url);
    document.documentElement.dataset.studioReady = 'true';
    return () => { delete document.documentElement.dataset.studioReady; };
  }, []);
  return <PresentationProvider><PortfolioProvider><StudioPage /><Interactions /></PortfolioProvider></PresentationProvider>;
}
