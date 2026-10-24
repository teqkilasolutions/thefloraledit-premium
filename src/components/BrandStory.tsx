import React from 'react';
import { VelvetLoomLogo } from './VelvetLoomLogo';

export const BrandStory: React.FC = () => {
  return (
    <section id="brand-story" className="bg-[#321F25] text-[#F7F3EC] py-28 sm:py-36 lg:py-48 relative overflow-hidden scroll-mt-28">
      
      {/* Subtle background texture / ambient lighting */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#B9975B_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center relative z-10">
        
        {/* Thread and needle logo symbol placed subtly above the heading */}
        <div className="flex justify-center mb-10 opacity-90 hover:opacity-100 transition-opacity">
          <VelvetLoomLogo variant="dark" size="sm" />
        </div>

        {/* Small label */}
        <div className="inline-flex items-center space-x-3 mb-6">
          <span className="h-px w-8 bg-[#B9975B]" />
          <span className="text-xs font-sans tracking-[0.3em] uppercase text-[#B9975B] font-semibold">
            THE ATELIER MANIFESTO
          </span>
          <span className="h-px w-8 bg-[#B9975B]" />
        </div>

        {/* Large Headline */}
        <h2 className="font-editorial text-4xl sm:text-6xl lg:text-7xl leading-[1.06] text-[#F7F3EC] font-light mb-8">
          FROM THREAD<br />
          <span className="italic font-normal text-[#D4BD8A]">TO STATEMENT.</span>
        </h2>

        {/* Decorative Golden Thread Line */}
        <div className="w-20 h-px bg-[#B9975B] mx-auto mb-10 opacity-70" />

        {/* Core Body Statement */}
        <p className="font-editorial text-2xl sm:text-3xl lg:text-4xl text-[#F7F3EC]/90 font-light italic leading-relaxed mb-10 max-w-2xl mx-auto">
          Velvet Loom is a celebration of fashion, craftsmanship and individuality.
        </p>

        {/* Editorial Narrative */}
        <p className="font-sans text-sm sm:text-base text-[#F7F3EC]/70 leading-relaxed max-w-xl mx-auto font-light mb-12">
          Founded on the principle that true luxury whispers rather than shouts, our atelier reconciles centuries-old Indian textile techniques with the architectural precision of modern tailoring. Each creation honors the hands that spun the thread and the woman who brings it to life.
        </p>

        {/* Atelier Signature Details */}
        <div className="inline-flex flex-wrap items-center justify-center gap-8 text-[11px] font-sans tracking-[0.2em] text-[#D4BD8A] uppercase pt-8 border-t border-[#F7F3EC]/10">
          <span>NEW DELHI ATELIER</span>
          <span>&middot;</span>
          <span>ETHICAL HANDLOOM</span>
          <span>&middot;</span>
          <span>LIMITED EDITIONS</span>
        </div>

      </div>
    </section>
  );
};
