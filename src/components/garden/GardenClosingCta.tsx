import React from 'react';
import { usePresentation } from '../../context/PresentationContext';
import { ArrowUpRight } from 'lucide-react';

export const GardenClosingCta: React.FC = () => {
  const { openEnquiry } = usePresentation();

  return (
    <section className="py-20 sm:py-28 bg-[#536336] text-[#F8F6EF] relative overflow-hidden">
      {/* Subtle organic texture */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F8F6EF_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center space-y-6 relative z-10">
        <span className="text-[11px] font-sans uppercase tracking-[0.3em] text-[#E9E1D4] font-medium block">
          Begin Your Floral Journey
        </span>

        <h2 className="text-3xl sm:text-5xl font-serif font-light text-white leading-tight">
          Let’s compose something extraordinary.
        </h2>

        <p className="text-sm sm:text-base font-sans text-[#E9E1D4]/90 max-w-xl mx-auto leading-relaxed">
          Whether you need a signature vase for your living room or a dedicated floral design team for an upcoming celebration, our studio is ready to collaborate.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => openEnquiry('The Editorial Garden · Bespoke Project')}
            className="w-full sm:w-auto px-8 py-4 bg-[#F8F6EF] hover:bg-white text-[#26382C] rounded text-xs font-sans uppercase tracking-widest font-semibold transition shadow-lg flex items-center justify-center gap-2 group"
          >
            <span>Enquire About An Event</span>
            <ArrowUpRight className="w-4 h-4 text-[#536336] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          <a
            href="#collections"
            className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-white/10 text-white border border-[#F8F6EF]/40 rounded text-xs font-sans uppercase tracking-widest font-medium transition text-center"
          >
            Explore Catalogue
          </a>
        </div>
      </div>
    </section>
  );
};
