import React from 'react';
import { usePresentation } from '../../context/PresentationContext';
import { ArrowRight, Leaf, Sparkles, Feather } from 'lucide-react';

export const GardenStudioPhilosophy: React.FC = () => {
  const { openEnquiry } = usePresentation();

  return (
    <section id="studio" className="py-20 sm:py-28 bg-[#E9E1D4]/40 border-b border-[#E9E1D4]">
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        <div className="bg-[#F8F6EF] rounded-3xl p-8 sm:p-14 border border-[#E9E1D4] shadow-xl relative overflow-hidden">
          {/* Subtle botanical watermark decoration */}
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#536336]/5 rounded-full pointer-events-none" />

          <div className="max-w-3xl space-y-6 relative z-10">
            <span className="text-[11px] font-sans uppercase tracking-[0.28em] text-[#536336] font-semibold block">
              The Studio Philosophy
            </span>

            <h2 className="text-3xl sm:text-5xl font-serif text-[#292A25] leading-tight">
              A little more thought in every detail.
            </h2>

            <p className="text-sm sm:text-base font-sans text-[#5A6054] leading-relaxed">
              We founded The Floral Edit with a simple conviction: flowers should not simply fill a room, but converse with it. We approach floral design with an architect's eye for proportion and a gardener's reverence for the natural season.
            </p>

            <p className="text-xs sm:text-sm font-sans text-[#787E71] leading-relaxed">
              Every stoneware vase is wheel-thrown or hand-cast with weighted bottoms so tall branches stand firm. Every stem is conditioned overnight in clean mountain water. Whether styling an intimate bedside bud or an immersive wedding pavilion, we believe restraint is the truest luxury.
            </p>

            {/* Three Pillar Points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[#E9E1D4]">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-[#536336]">
                  <Leaf className="w-4 h-4" />
                  <h4 className="text-xs font-serif font-semibold text-[#292A25]">Heirloom Stems</h4>
                </div>
                <p className="text-[11px] text-[#787E71] leading-normal">
                  Sourced ethically from organic cultivators and heritage farms.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-[#536336]">
                  <Feather className="w-4 h-4" />
                  <h4 className="text-xs font-serif font-semibold text-[#292A25]">Architectural Form</h4>
                </div>
                <p className="text-[11px] text-[#787E71] leading-normal">
                  Designed around natural line, asymmetric balance, and negative space.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-[#536336]">
                  <Sparkles className="w-4 h-4" />
                  <h4 className="text-xs font-serif font-semibold text-[#292A25]">Bespoke Vessels</h4>
                </div>
                <p className="text-[11px] text-[#787E71] leading-normal">
                  Hand-glazed ceramics made exclusively for our floral compositions.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => openEnquiry('Studio Consultation')}
                className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-[#536336] font-semibold hover:text-[#26382C] transition group"
              >
                <span>Get to know our studio approach</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
