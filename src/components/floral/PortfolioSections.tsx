import { useState } from 'react';
import { ArrowRight, ArrowUpRight, Heart, Minus, Plus } from 'lucide-react';
import { PHOTO_BY_ID, PORTFOLIO_PROJECTS, type PortfolioPhoto } from '../../data/portfolio';
import { usePortfolio } from '../../context/PortfolioContext';
import { base } from '../../data/studio';
import { responsivePhotoSet, responsivePhotoUrl } from '../../lib/responsiveImages';

export function PortfolioImage({ photo, className = '', priority = false, sizes = '(max-width: 700px) 100vw, 40vw' }: { photo: PortfolioPhoto; className?: string; priority?: boolean; sizes?: string }) {
  return <img className={className} src={responsivePhotoUrl(base, photo.id)} srcSet={responsivePhotoSet(base, photo.id)} sizes={sizes} alt={photo.alt} width={photo.width} height={photo.height} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} decoding="async" />;
}

export function InspirationButton({ onBeforeOpen }: { onBeforeOpen?: () => void } = {}) {
  const { savedIds, openBoard } = usePortfolio();
  return <button className="icon-button inspiration-button" onClick={() => { onBeforeOpen?.(); openBoard(); }} aria-label={`Saved inspiration, ${savedIds.length} ${savedIds.length === 1 ? 'photograph' : 'photographs'}`}><Heart size={20} strokeWidth={1.4} /><span className="inspiration-count" aria-hidden="true">{savedIds.length}</span></button>;
}

export function SelectedProjects({ sectionId = 'work' }: { sectionId?: string } = {}) {
  const { openProject } = usePortfolio();
  return <section id={sectionId} className="section-shell portfolio-section celebration-projects" aria-labelledby="portfolio-heading">
    <div className="portfolio-intro"><div><span className="eyebrow">The celebrations we create</span><h2 id="portfolio-heading">A feeling, made floral.</h2></div><p>Different places. Different palettes.<br />A few of the settings we’ve brought into bloom.</p></div>
    <div className="project-grid">{PORTFOLIO_PROJECTS.map(project => <article className={`project-story project-${project.id}`} key={project.id}>
      <button className="project-cover" onClick={() => openProject(project.id)} aria-label={`Explore ${project.title}`}><PortfolioImage photo={PHOTO_BY_ID[project.coverId]} sizes="(max-width: 700px) 100vw, 34vw" /><span className="project-view-label">Step inside <ArrowUpRight size={17} /></span></button>
      <div className="project-caption"><span className="project-mood">{project.mood}</span><h3>{project.title}</h3><p>{project.description}</p><button className="text-button" onClick={() => openProject(project.id)} aria-label={`View the ${project.title} story`}>View the story <ArrowRight size={15} /></button></div>
    </article>)}</div>
    <div className="portfolio-note"><Heart size={16} strokeWidth={1.4} /><p>See something you love? Save a photograph to your inspiration as you explore.</p></div>
  </section>;
}

export function CloserLook() {
  const { openProject } = usePortfolio();
  const ids = ['day-passage', 'day-lounge', 'day-flowers'];
  return <section id="details" className="closer-section" aria-labelledby="closer-heading"><div className="section-shell">
    <div className="closer-intro"><span className="eyebrow">One celebration, a little closer</span><h2 id="closer-heading">The whole room.<br />The smallest detail.</h2><p>A garden welcome. A place to gather.<br />Flowers that make every corner feel considered.</p></div>
    <div className="detail-triptych">{ids.map((id, index) => <figure key={id} className={`detail-print detail-print-${index + 1}`}><button onClick={() => openProject('room-in-bloom', id)} aria-label={`View ${PHOTO_BY_ID[id].caption} in A room in bloom`}><PortfolioImage photo={PHOTO_BY_ID[id]} sizes="(max-width: 700px) 90vw, 30vw" /><span className="detail-open"><Plus size={22} strokeWidth={1.3} /></span></button><figcaption>{['The arrival', 'Room to gather', 'Petal by petal'][index]}</figcaption></figure>)}</div>
    <div className="closer-link"><button className="text-button" onClick={() => openProject('room-in-bloom')}>Explore this celebration <ArrowUpRight size={16} /></button></div>
  </div></section>;
}

const QUESTIONS = [
  ['What should I include in my enquiry?', 'Start with the occasion, your date if you know it, and the venue or city. A few words about the atmosphere you love—and photographs saved from our work—make a useful starting point.'],
  ['Can I save ideas while I browse?', 'Yes. Open a project and choose “Save inspiration” on the photographs you like. Your edit can hold up to eight images and can be included with your enquiry brief.'],
  ['What if my date or venue isn’t decided?', 'You can leave those details open. Begin with your ideas, save a draft and return to it as your plans take shape.'],
  ['Where can I see different floral styles?', 'Our selected celebrations bring together botanical daylight, richer evening colour and heritage-inspired details. Open each story to explore the full setting and its closer details.'],
  ['What happens after I prepare an enquiry?', 'You can save your details and inspiration on this device, then download a brief to share with the studio. Preparing a draft here does not send a message.'],
];

export function PortfolioFAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return <section className="section-shell portfolio-faq" aria-labelledby="faq-heading"><div className="faq-intro"><span className="eyebrow">Before we begin</span><h2 id="faq-heading">A few little<br />questions.</h2><p>A little clarity for the first conversation.</p></div><div className="faq-list">{QUESTIONS.map(([question, answer], index) => <div className="faq-item" key={question}><h3><button id={`faq-question-${index}`} aria-expanded={open === index} aria-controls={`faq-answer-${index}`} onClick={() => setOpen(open === index ? null : index)}>{question}{open === index ? <Minus size={18} /> : <Plus size={18} />}</button></h3><div id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-question-${index}`} hidden={open !== index}><p>{answer}</p></div></div>)}</div></section>;
}
