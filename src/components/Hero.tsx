import React from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';
import { EDITORIAL_ASSETS } from '../data/fashionData';

interface HeroProps {
  onExploreCollection: () => void;
  onDiscoverStory: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreCollection,
  onDiscoverStory,
}) => {
  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] lg:min-h-[calc(100vh-80px)] w-full flex items-center overflow-hidden bg-[#F7F3EC]">
      {/* Background Editorial Image with cinematic warm lighting */}
      <div className="absolute inset-0 z-0">
        <img
          src={EDITORIAL_ASSETS.heroImage}
          alt="Velvet Loom Atelier Editorial Campaign"
          className="w-full h-full object-cover object-top lg:object-center transform scale-100 transition-transform duration-1000 ease-luxury"
          loading="eager"
        />
        {/* Editorial ambient gradient overlays for readability and luxury warmth */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F7F3EC]/95 via-[#F7F3EC]/75 to-transparent lg:w-[65%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F7F3EC] via-transparent to-transparent h-40 bottom-0" />
        <div className="absolute inset-0 bg-[#321F25]/10 mix-blend-multiply" />
      </div>

      {/* Hero Content Container with Generous Negative Space */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-24 w-full">
        <div className="max-w-2xl lg:max-w-2xl">
          
          {/* Small Label */}
          <div className="inline-flex items-center space-x-3 mb-6">
            <span className="h-px w-8 bg-[#B9975B]" />
            <span className="text-[11px] sm:text-xs font-sans tracking-[0.28em] uppercase text-[#5A2935] font-semibold">
              LUXURY FASHION STUDIO
            </span>
            <span className="h-px w-8 bg-[#B9975B]" />
          </div>

          {/* Main Headline (Cormorant Garamond, 48-58px on mobile, 64-84px desktop) */}
          <h1 className="font-editorial text-[44px] sm:text-[56px] lg:text-[76px] leading-[1.04] text-[#241D1A] font-light mb-8 tracking-tight">
            WEAVING STYLE.<br />
            <span className="italic font-normal text-[#5A2935]">DEFINING ELEGANCE.</span>
          </h1>

          {/* Fine-line Golden Thread Accent */}
          <div className="w-24 h-[1.5px] bg-[#B9975B] mb-8 opacity-80" />

          {/* Subtext */}
          <p className="text-base sm:text-lg lg:text-xl text-[#321F25]/85 font-sans font-light leading-relaxed mb-10 max-w-lg tracking-wide">
            Contemporary silhouettes, timeless craftsmanship, and the art of dressing beautifully.
          </p>

          {/* CTA Buttons (>= 44px touch targets) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-5">
            <button
              onClick={onExploreCollection}
              className="min-h-[48px] px-8 py-3.5 bg-[#321F25] hover:bg-[#5A2935] text-[#F7F3EC] text-xs font-sans font-medium tracking-[0.2em] uppercase transition-all duration-500 ease-luxury shadow-sm hover:shadow-lg flex items-center justify-center space-x-3 group"
            >
              <span>EXPLORE COLLECTION</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#B9975B] group-hover:scale-150 transition-transform duration-300" />
            </button>

            <button
              onClick={onDiscoverStory}
              className="min-h-[48px] px-8 py-3.5 bg-transparent hover:bg-[#E8DED1]/60 text-[#241D1A] border border-[#241D1A]/30 hover:border-[#241D1A] text-xs font-sans font-medium tracking-[0.2em] uppercase transition-all duration-500 ease-luxury flex items-center justify-center"
            >
              <span>DISCOVER OUR STORY</span>
            </button>
          </div>

          {/* Editorial Atelier Meta Note */}
          <div className="mt-12 pt-6 border-t border-[#241D1A]/10 flex items-center space-x-6 text-[11px] font-sans tracking-[0.16em] text-[#82756C] uppercase">
            <span className="flex items-center space-x-1.5">
              <Sparkles size={12} className="text-[#B9975B]" />
              <span>HAND-SPUN MULBERRY SILKS</span>
            </span>
            <span className="hidden sm:inline">&middot;</span>
            <span className="hidden sm:inline">BESPOKE ATELIER CUTS</span>
          </div>

        </div>
      </div>

      {/* Smooth Scroll Prompt */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 hidden sm:flex flex-col items-center opacity-70 hover:opacity-100 transition-opacity">
        <span className="text-[10px] font-sans tracking-[0.25em] text-[#82756C] uppercase mb-2">SCROLL</span>
        <ArrowDown size={14} className="text-[#B9975B] animate-bounce" />
      </div>
    </section>
  );
};
