import React from 'react';
import { ArrowRight } from 'lucide-react';
import { EDITORIAL_ASSETS } from '../data/fashionData';

interface BrandIntroProps {
  onLearnMore: () => void;
}

export const BrandIntro: React.FC<BrandIntroProps> = ({ onLearnMore }) => {
  return (
    <section id="brand-intro" className="bg-[#F7F3EC] py-20 sm:py-28 lg:py-36 relative overflow-hidden scroll-mt-28">
      {/* Decorative fine-line thread transition element */}
      <div className="max-w-7xl mx-auto px-6 mb-16 lg:mb-24">
        <div className="thread-accent-line w-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Responsive Layout: On mobile 'image first, text second'; on desktop 2 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Editorial Image: Order 1 on mobile, Order 2 on desktop */}
          <div className="order-1 lg:order-2 lg:col-span-6 relative">
            <div className="relative overflow-hidden aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] shadow-lg group">
              <img
                src={EDITORIAL_ASSETS.brandIntroImage}
                alt="Velvet Loom Atelier Muse"
                className="w-full h-full object-cover img-zoom"
                loading="lazy"
              />
              {/* Subtle inner gold frame accent */}
              <div className="absolute inset-4 sm:inset-6 border border-[#B9975B]/30 pointer-events-none" />
              
              {/* Editorial bottom caption */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 bg-[#F7F3EC]/90 backdrop-blur-md p-4 border border-[#241D1A]/10">
                <span className="text-[10px] font-sans tracking-[0.25em] text-[#5A2935] uppercase block mb-1">
                  ATELIER ARCHIVE NO. 04
                </span>
                <span className="font-editorial text-lg text-[#241D1A] italic">
                  Mulberry silk woven with architectural symmetry
                </span>
              </div>
            </div>
          </div>

          {/* Editorial Typography Column: Order 2 on mobile, Order 1 on desktop */}
          <div className="order-2 lg:order-1 lg:col-span-6 flex flex-col justify-center">
            
            <div className="flex items-center space-x-3 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#B9975B]" />
              <span className="text-xs font-sans tracking-[0.24em] uppercase text-[#82756C]">
                THE PHILOSOPHY
              </span>
            </div>

            {/* Large Serif Headline */}
            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl leading-[1.08] text-[#241D1A] font-light mb-8">
              WHERE EVERY THREAD<br />
              <span className="italic text-[#5A2935]">TELLS A STORY.</span>
            </h2>

            {/* Body Text */}
            <p className="font-sans text-base sm:text-lg text-[#241D1A]/80 font-normal leading-relaxed mb-8 max-w-xl">
              Velvet Loom brings together the richness of Indian craftsmanship and the elegance of contemporary fashion, creating pieces designed for the woman who carries tradition with her own sense of style.
            </p>

            <p className="font-sans text-sm text-[#82756C] leading-relaxed mb-10 max-w-lg">
              In our studio, garments are not simply assembled—they are composed. From hand-selected mulberry silks to zardozi embroidery executed with micrometer-fine needles, every element is curated to transcend ephemeral trends.
            </p>

            {/* CTA */}
            <div>
              <button
                onClick={onLearnMore}
                className="inline-flex items-center space-x-4 text-xs font-sans tracking-[0.22em] uppercase text-[#321F25] hover:text-[#5A2935] font-semibold group transition-colors py-2 border-b border-[#321F25]/30 hover:border-[#5A2935]"
              >
                <span>OUR STORY</span>
                <ArrowRight size={16} className="text-[#B9975B] transform group-hover:translate-x-2 transition-transform duration-300" />
              </button>
            </div>

            {/* Atelier Details Grid */}
            <div className="grid grid-cols-2 gap-6 mt-14 pt-8 border-t border-[#241D1A]/10">
              <div>
                <span className="block font-editorial text-3xl text-[#5A2935] font-light mb-1">
                  100%
                </span>
                <span className="text-[11px] font-sans tracking-[0.16em] uppercase text-[#82756C]">
                  Hand-spun Silks
                </span>
              </div>
              <div>
                <span className="block font-editorial text-3xl text-[#5A2935] font-light mb-1">
                  120+
                </span>
                <span className="text-[11px] font-sans tracking-[0.16em] uppercase text-[#82756C]">
                  Artisan Hours Per Kali
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
