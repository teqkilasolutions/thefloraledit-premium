import React from 'react';
import { usePresentation } from '../../context/PresentationContext';
import { ArrowUpRight, Sparkles } from 'lucide-react';

export const CelebrationHero: React.FC = () => {
  const { openEnquiry } = usePresentation();

  return (
    <section className="relative min-h-[85vh] sm:min-h-[92vh] bg-[#FAF7F1] flex items-center justify-center p-4 sm:p-8 lg:p-12 overflow-hidden border-b border-[#E9E1D4]">
      {/* Full-width cinematic celebration background */}
      <div className="absolute inset-0 bg-[#E9E1D4]">
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=85"
          alt="Romantic celebration tablescape with candlelight and ivory roses"
          className="w-full h-full object-cover filter brightness-[0.92]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3B302C]/75 via-[#3B302C]/25 to-black/20" />
      </div>

      {/* Layered Floating Editorial Panel (Mobile Optimized) */}
      <div className="relative z-10 max-w-xl w-full bg-[#FAF7F1]/95 backdrop-blur-md p-6 sm:p-12 rounded-3xl border border-white/70 shadow-[0_15px_45px_rgba(59,48,44,0.3)] text-center space-y-4 sm:space-y-6 my-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D9B4A4]/40 border border-[#D9B4A4] text-[9px] sm:text-[10px] font-sans uppercase tracking-[0.25em] text-[#3B302C] font-semibold">
          <Sparkles className="w-3 h-3 text-[#536336]" />
          Flowers For Every Kind of Occasion
        </div>

        {/* Romantic Playfair Display Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-playfair font-normal text-[#3B302C] leading-[1.1] tracking-tight">
          For moments that <br />
          <span className="italic font-normal text-[#AA8175]">deserve more.</span>
        </h1>

        <p className="text-xs sm:text-sm font-sans text-[#5A4E49] leading-relaxed max-w-md mx-auto">
          From thoughtful bouquets to unforgettable celebrations, we create floral experiences shaped around your vision.
        </p>

        {/* Dual CTAs */}
        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3.5">
          <button
            onClick={() => openEnquiry('The Celebration House · Event Enquiry')}
            className="w-full sm:w-auto px-7 py-3.5 bg-[#536336] hover:bg-[#43502B] text-white rounded-full text-xs font-sans uppercase tracking-widest font-semibold transition shadow-md flex items-center justify-center gap-2 group active:scale-[0.98]"
          >
            <span>Enquire About Your Event</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          <a
            href="#celebration-services"
            className="w-full sm:w-auto px-6 py-3.5 bg-white/90 hover:bg-white text-[#3B302C] border border-[#D9B4A4] rounded-full text-xs font-sans uppercase tracking-widest font-semibold transition text-center shadow-sm active:scale-[0.98]"
          >
            Explore Bouquets
          </a>
        </div>

        {/* Micro Credibility */}
        <div className="pt-3 border-t border-[#E9E1D4] flex items-center justify-center gap-4 sm:gap-6 text-[10px] sm:text-[11px] text-[#7A6B65]">
          <span>Weddings & Mandaps</span>
          <span className="text-[#D9B4A4]">·</span>
          <span>Intimate Dinners</span>
          <span className="text-[#D9B4A4]">·</span>
          <span>Bespoke Gifting</span>
        </div>
      </div>
    </section>
  );
};
