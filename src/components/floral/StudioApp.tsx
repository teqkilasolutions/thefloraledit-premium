import { useEffect } from 'react';
import { PresentationProvider } from '../../context/PresentationContext';
import { StudioPage } from './StudioPage';
import { StudioOverlays } from './StudioOverlays';
import './studio.css';
import './references.css';
import './celebration.css';
import './portfolio.css';
import { PortfolioProvider } from '../../context/PortfolioContext';
import { PortfolioOverlays } from './PortfolioOverlays';

export function StudioApp() {
  useEffect(() => {
    document.title = 'The Floral Edit | Flowers & Celebrations';
    const url = new URL(window.location.href);
    for (const key of ['concept', 'preview', 'v']) url.searchParams.delete(key);
    window.history.replaceState(null, '', url);
  }, []);
  return <PresentationProvider><PortfolioProvider><StudioPage /><StudioOverlays /><PortfolioOverlays /></PortfolioProvider></PresentationProvider>;
}
