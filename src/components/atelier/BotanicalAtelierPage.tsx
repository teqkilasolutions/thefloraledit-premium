import React from 'react';
import { AtelierNav } from './AtelierNav';
import { AtelierHero } from './AtelierHero';
import { AtelierSignatureCollections } from './AtelierSignatureCollections';
import { AtelierSelectedWork } from './AtelierSelectedWork';
import { AtelierPhilosophy } from './AtelierPhilosophy';
import { AtelierBespokeProjects } from './AtelierBespokeProjects';
import { AtelierEnquiryCta } from './AtelierEnquiryCta';
import { AtelierFooter } from './AtelierFooter';

export const BotanicalAtelierPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#26382C] text-[#F8F6EF] font-sans antialiased selection:bg-[#B8A276] selection:text-[#26382C]">
      <AtelierNav />
      <main>
        <AtelierHero />
        <AtelierSignatureCollections />
        <AtelierSelectedWork />
        <AtelierPhilosophy />
        <AtelierBespokeProjects />
        <AtelierEnquiryCta />
      </main>
      <AtelierFooter />
    </div>
  );
};
