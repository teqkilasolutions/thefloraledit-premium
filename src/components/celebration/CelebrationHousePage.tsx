import React from 'react';
import { CelebrationNav } from './CelebrationNav';
import { CelebrationHero } from './CelebrationHero';
import { CelebrationServices } from './CelebrationServices';
import { CelebrationSignatureGallery } from './CelebrationSignatureGallery';
import { CelebrationProcess } from './CelebrationProcess';
import { CelebrationEnquirySection } from './CelebrationEnquirySection';
import { CelebrationFeaturedShop } from './CelebrationFeaturedShop';
import { CelebrationFooter } from './CelebrationFooter';

export const CelebrationHousePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAF7F1] text-[#3B302C] font-sans antialiased selection:bg-[#D9B4A4] selection:text-[#3B302C]">
      <CelebrationNav />
      <main>
        <CelebrationHero />
        <CelebrationServices />
        <CelebrationSignatureGallery />
        <CelebrationProcess />
        <CelebrationEnquirySection />
        <CelebrationFeaturedShop />
      </main>
      <CelebrationFooter />
    </div>
  );
};
