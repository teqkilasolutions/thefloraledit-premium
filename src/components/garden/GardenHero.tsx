import React from 'react';
import { usePresentation } from '../../context/PresentationContext';
import { ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react';

export const GardenHero: React.FC = () => {
  const { openEnquiry } = usePresentation();

  return (
    <section className="relative bg-[#F8F6EF] pt-5 sm:pt-14 pb-14 sm:pb-24 overflow-hidden border-b border-[#E9E1D4]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* On Mobile: Visual first with overlaid poise, or seamless editorial rhythm */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-14 items-center">
          
          {/* Main Hero Imagery - Mobile Optimized (Full presence & high emotional impact) */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative">
              {/* Primary Visual */}
              <div className="relative h-[48vh] sm:h-[58vh] lg:h-auto lg:aspect-[16/13] rounded-3xl overflow-hidden bg-[#E9E1D4] shadow-xl group">
                <img
                  src="https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1600&q=85"
                  alt="Sculptural Calla Lily Composition in Matte Stoneware Vase"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />

                {/* Floating Studio Badge */}
                <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-[#F8F6EF]/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-[#E9E1D4] shadow-lg flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#536336] animate-pulse shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[9px] uppercase tracking-widest text-[#536336] font-bold">
                      Studio Vessel No. 01
                    </p>
                    <p className="text-xs font-serif text-[#292A25] truncate">
                      The Aurelia Amphora in Ivory & Gold Lustre
                    </p>
                  </div>
                </div>
              </div>

              {/* Inset Secondary Visual (Desktop & Tablet) */}
              <div className="hidden sm:block absolute -bottom-8 -left-8 w-44 sm:w-52 aspect-[3/4] rounded-2xl overflow-hidden bg-[#E9E1D4] border-4 border-[#F8F6EF] shadow-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=85"
                  alt="Wren Sage Bud Vase"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-2 left-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-[9px] text-[#F8F6EF] text-center font-mono uppercase tracking-wider">
                  Hand-crafted in studio
                </div>
              </div>
            </div>
          </div>

          {/* Text Column */}
          <div className="lg:col-span-5 space-y-5 sm:space-y-7 order-2 lg:order-1 text-left">
            <div className="space-y-2.5">
              <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.28em] text-[#536336] font-semibold bg-[#E9E1D4]/60 px-3 py-1 rounded-full">
                <Sparkles className="w-3 h-3 text-[#536336]" />
                Flowers · Spaces · Meaningful Moments
              </span>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-light text-[#292A25] leading-[1.1] tracking-tight">
                Flowers, <br className="hidden sm:inline" />
                <span className="italic font-normal">thoughtfully composed.</span>
              </h1>
            </div>

            <p className="text-xs sm:text-sm lg:text-base font-sans text-[#5E6457] leading-relaxed max-w-md">
              From everyday bouquets to thoughtfully designed celebrations, discover floral arrangements that bring quiet beauty into every space.
            </p>

            {/* Touch-Friendly CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <a
                href="#collections"
                className="px-7 py-3.5 bg-[#536336] hover:bg-[#43502B] text-white rounded-xl text-xs font-sans uppercase tracking-widest font-semibold transition text-center shadow-md flex items-center justify-center gap-2 group active:scale-[0.98]"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={() => openEnquiry('The Editorial Garden · Event Floral')}
                className="px-7 py-3.5 bg-transparent hover:bg-[#E9E1D4]/60 text-[#292A25] border border-[#292A25]/30 rounded-xl text-xs font-sans uppercase tracking-widest font-semibold transition text-center flex items-center justify-center gap-1.5 active:scale-[0.98]"
              >
                <span>Plan Your Event</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#536336]" />
              </button>
            </div>

            {/* Mobile-Friendly Micro-Credentials */}
            <div className="pt-4 border-t border-[#E9E1D4] flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] font-sans text-[#787E71]">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#536336]" />
                Hand-Glazed Stoneware
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#536336]" />
                Seasonal Stems
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#536336]" />
                Delhi NCR Atelier
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
