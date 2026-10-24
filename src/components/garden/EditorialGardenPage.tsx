import React from 'react';
import { GardenNav } from './GardenNav';
import { GardenHero } from './GardenHero';
import { GardenCollections } from './GardenCollections';
import { GardenGallery } from './GardenGallery';
import { GardenStudioPhilosophy } from './GardenStudioPhilosophy';
import { GardenEventServices } from './GardenEventServices';
import { GardenClosingCta } from './GardenClosingCta';
import { GardenFooter } from './GardenFooter';

export const EditorialGardenPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8F6EF] text-[#292A25] font-sans antialiased selection:bg-[#536336] selection:text-[#F8F6EF]">
      <GardenNav />
      <main>
        <GardenHero />
        <GardenCollections />
        <GardenGallery />
        <GardenStudioPhilosophy />
        <GardenEventServices />
        <GardenClosingCta />
      </main>
      <GardenFooter />
    </div>
  );
};
