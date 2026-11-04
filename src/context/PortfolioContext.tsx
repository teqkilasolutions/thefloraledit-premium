import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { PHOTO_BY_ID, PHOTO_IDS, PORTFOLIO_PROJECTS } from '../data/portfolio';
import { INSPIRATION_KEY, INSPIRATION_LIMIT, readInspiration, toggleInspiration } from '../lib/inspiration';

type Viewer = { projectId: string; index: number } | null;
type PortfolioState = {
  viewer: Viewer; savedIds: string[]; boardOpen: boolean; storageUnavailable: boolean; announcement: string;
  openProject: (projectId: string, photoId?: string) => void; closeViewer: () => void; movePhoto: (direction: number) => void;
  toggleSaved: (id: string) => void; replaceSaved: (ids: readonly string[]) => void;
  openBoard: () => void; closeBoard: () => void;
};
const PortfolioContext = createContext<PortfolioState | null>(null);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [initial] = useState(() => {
    try { return { ids: readInspiration(localStorage.getItem(INSPIRATION_KEY), PHOTO_IDS), unavailable: false }; }
    catch { return { ids: [], unavailable: true }; }
  });
  const [savedIds, setSavedIds] = useState<string[]>(initial.ids);
  const [storageUnavailable, setStorageUnavailable] = useState(initial.unavailable);
  const [viewer, setViewer] = useState<Viewer>(null);
  const [boardOpen, setBoardOpen] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  const persist = (ids: string[]) => {
    setSavedIds(ids);
    try { localStorage.setItem(INSPIRATION_KEY, JSON.stringify(ids)); setStorageUnavailable(false); }
    catch { setStorageUnavailable(true); }
  };
  useEffect(() => {
    const sync = (event: StorageEvent) => {
      if (event.key === INSPIRATION_KEY || event.key === null) setSavedIds(readInspiration(event.newValue, PHOTO_IDS));
    };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);
  const openProject = useCallback((projectId: string, photoId?: string) => {
    const project = PORTFOLIO_PROJECTS.find(item => item.id === projectId);
    if (!project) return;
    setBoardOpen(false);
    setViewer({ projectId, index: Math.max(0, project.photos.findIndex(item => item.id === photoId)) });
  }, []);
  const closeViewer = useCallback(() => setViewer(null), []);
  const movePhoto = useCallback((direction: number) => setViewer(current => {
    const project = PORTFOLIO_PROJECTS.find(item => item.id === current?.projectId);
    return current && project ? { ...current, index: (current.index + direction + project.photos.length) % project.photos.length } : current;
  }), []);
  const toggleSaved = (id: string) => {
    if (!PHOTO_BY_ID[id]) return;
    const removing = savedIds.includes(id);
    if (!removing && savedIds.length >= INSPIRATION_LIMIT) { setAnnouncement('Your edit holds eight photographs. Remove one to make room for another.'); return; }
    persist(toggleInspiration(savedIds, id, PHOTO_IDS));
    setAnnouncement(removing ? 'Photograph removed from your inspiration.' : 'Photograph saved to your inspiration.');
  };
  const replaceSaved = (ids: readonly string[]) => persist(readInspiration(JSON.stringify(ids), PHOTO_IDS));
  return <PortfolioContext.Provider value={{ viewer, savedIds, boardOpen, storageUnavailable, announcement, openProject, closeViewer, movePhoto, toggleSaved, replaceSaved, openBoard: () => { setViewer(null); setBoardOpen(true); }, closeBoard: () => setBoardOpen(false) }}>
    {children}<span className="portfolio-sr-only" role="status">{announcement}</span>
  </PortfolioContext.Provider>;
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) throw new Error('PortfolioProvider is required');
  return context;
}
