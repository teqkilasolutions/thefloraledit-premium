import { useEffect } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Heart, X } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { usePresentation } from '../../context/PresentationContext';
import { INSPIRATION_LIMIT } from '../../lib/inspiration';
import { PHOTO_BY_ID, PORTFOLIO_PROJECTS, projectForPhoto } from '../../data/portfolio';
import { StudioDialog } from './StudioDialog';
import { PortfolioImage } from './PortfolioSections';

function ProjectViewer() {
  const { viewer, closeViewer, movePhoto, savedIds, toggleSaved, storageUnavailable } = usePortfolio();
  const { openEnquiry } = usePresentation();
  useEffect(() => {
    if (!viewer) return;
    const navigate = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey || /INPUT|TEXTAREA|SELECT/.test((event.target as HTMLElement)?.tagName)) return;
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); movePhoto(event.key === 'ArrowRight' ? 1 : -1); }
    };
    document.addEventListener('keydown', navigate);
    return () => document.removeEventListener('keydown', navigate);
  }, [viewer, movePhoto]);
  if (!viewer) return null;
  const project = PORTFOLIO_PROJECTS.find(item => item.id === viewer.projectId)!;
  const photo = project.photos[viewer.index];
  const saved = savedIds.includes(photo.id);
  const full = !saved && savedIds.length >= INSPIRATION_LIMIT;
  return <StudioDialog title={project.title} onClose={closeViewer} wide className="project-dialog"><div className="project-viewer">
    <div className="viewer-intro"><p>{project.mood}</p><span>{viewer.index + 1} / {project.photos.length}</span></div>
    <figure className="viewer-figure"><div className="viewer-image"><PortfolioImage photo={photo} priority sizes="(max-width: 700px) 94vw, 80vw" /></div><figcaption aria-live="polite">{photo.caption}</figcaption></figure>
    <div className="viewer-controls"><div className="viewer-arrows"><button className="icon-button" aria-label="Previous photograph" onClick={() => movePhoto(-1)}><ArrowLeft size={21} /></button><button className="icon-button" aria-label="Next photograph" onClick={() => movePhoto(1)}><ArrowRight size={21} /></button></div><button className={`save-photo-button ${saved ? 'is-saved' : ''}`} aria-label={saved ? 'Remove saved photograph' : 'Save photograph'} aria-pressed={saved} disabled={full} onClick={() => toggleSaved(photo.id)}><Heart size={18} fill={saved ? 'currentColor' : 'none'} />{saved ? 'Saved to your inspiration' : 'Save inspiration'}</button></div>
    {full && <p className="portfolio-storage-note">Your edit holds eight photographs. Remove one from your inspiration to save another.</p>}
    {storageUnavailable && <p className="portfolio-storage-note" role="status">Saved for this visit. Your browser couldn’t keep these photographs for later.</p>}
    <div className="viewer-footer"><p>{project.note}</p><button className="text-button" onClick={() => { closeViewer(); openEnquiry(`Floral design inspired by ${project.title}`); }}>Enquire about your occasion <ArrowUpRight size={16} /></button></div>
  </div></StudioDialog>;
}

function InspirationBoard() {
  const { boardOpen, closeBoard, savedIds, toggleSaved, openProject, storageUnavailable } = usePortfolio();
  const { openEnquiry } = usePresentation();
  if (!boardOpen) return null;
  return <StudioDialog title="Your inspiration" onClose={closeBoard} drawer className="inspiration-dialog"><div className="inspiration-board">
    {savedIds.length ? <><p className="board-intro">A little edit of what speaks to you.<br />{savedIds.length} of {INSPIRATION_LIMIT} photographs saved.</p><ul className="saved-photo-list">{savedIds.map(id => { const photo = PHOTO_BY_ID[id]; const project = projectForPhoto(id)!; return <li key={id}><button className="saved-photo-open" aria-label={`View ${photo.caption}`} onClick={() => openProject(project.id, id)}><PortfolioImage photo={photo} sizes="110px" /></button><div><span>{project.title}</span><h3>{photo.caption}</h3></div><button className="icon-button" onClick={() => toggleSaved(id)} aria-label={`Remove ${photo.caption}`}><X size={18} /></button></li>; })}</ul><div className="board-actions"><p>Your selected photographs will be included in your enquiry draft.</p><button className="studio-button" onClick={() => { closeBoard(); openEnquiry('Floral design inspired by your saved edit'); }}>Use these in my enquiry <ArrowUpRight size={16} /></button><button className="text-button" onClick={closeBoard}>Keep exploring <ArrowRight size={15} /></button></div></> : <div className="inspiration-empty"><Heart size={37} strokeWidth={1.1} /><h3>Keep a little inspiration.</h3><p>Open a celebration and save the photographs you love. They’ll come together here.</p><button className="studio-button" onClick={() => { closeBoard(); document.getElementById('work')?.scrollIntoView(); }}>Explore the celebrations <ArrowRight size={16} /></button></div>}
    {storageUnavailable && <p className="portfolio-storage-note" role="status">Saved for this visit. Your browser couldn’t keep this edit for later; include it in a downloaded enquiry brief to retain a copy.</p>}
  </div></StudioDialog>;
}

export function PortfolioOverlays() { return <><ProjectViewer /><InspirationBoard /></>; }
