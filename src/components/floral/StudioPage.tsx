import { BotanicalTypes, ContactPanel, FloralForms, HouseIntroduction, OpeningHero, StudioExtras, StudioListening, StudioNotes, StudioPrinciples, StudioScale } from './ReferenceHome';
import { ReferenceFooter, ReferenceNavigation } from './ReferenceNavigation';
import { ScrollGallery } from './ScrollGallery';
import { SelectedProjects } from './PortfolioSections';
import { Suspense } from 'react';

export function StudioPage() {
  return <div className="floral-site theme-celebration reference-home" id="home">
    <a className="skip-link" href="#main-content">Skip to content</a>
    <ReferenceNavigation />
    <main id="main-content">
      <OpeningHero />
      <Suspense fallback={null}><ScrollGallery /></Suspense>
      <Suspense fallback={null}><HouseIntroduction /></Suspense>
      <Suspense fallback={null}><FloralForms /></Suspense>
      <Suspense fallback={null}><BotanicalTypes /></Suspense>
      <Suspense fallback={null}><StudioListening /></Suspense>
      <Suspense fallback={null}><StudioScale /></Suspense>
      <Suspense fallback={null}><SelectedProjects sectionId="celebrations" /></Suspense>
      <Suspense fallback={null}><StudioPrinciples /></Suspense>
      <Suspense fallback={null}><StudioNotes /></Suspense>
      <Suspense fallback={null}><StudioExtras /></Suspense>
      <Suspense fallback={null}><ContactPanel /></Suspense>
    </main>
    <ReferenceFooter />
  </div>;
}
