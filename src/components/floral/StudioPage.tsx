import { BotanicalTypes, ContactPanel, FloralForms, HouseIntroduction, OpeningHero, StudioExtras, StudioListening, StudioNotes, StudioPrinciples, StudioScale } from './ReferenceHome';
import { ReferenceFooter, ReferenceNavigation } from './ReferenceNavigation';
import { ScrollGallery } from './ScrollGallery';

export function StudioPage() {
  return <div className="floral-site theme-celebration reference-home" id="home">
    <a className="skip-link" href="#main-content">Skip to content</a>
    <ReferenceNavigation />
    <main id="main-content">
      <OpeningHero />
      <ScrollGallery />
      <HouseIntroduction />
      <FloralForms />
      <BotanicalTypes />
      <StudioListening />
      <StudioScale />
      <StudioPrinciples />
      <StudioNotes />
      <StudioExtras />
      <ContactPanel />
    </main>
    <ReferenceFooter />
  </div>;
}
