import React from 'react';
import { usePresentation } from '../../context/PresentationContext';
import { ArrowDown, ArrowUpRight, Sparkles } from 'lucide-react';

export const AtelierHero: React.FC = () => {
  const { openEnquiry } = usePresentation();

  return (
    <section className="relative bg-[#26382C] text-[#F8F6EF] flex flex-col justify-between overflow-hidden border-b border-[#364D3D] pt-6 sm:pt-14 pb-8 sm:pb-12">
      {/* Background radial depth glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#536336]/25 rounded-full blur-[130px] pointer-events-none" />

      {/* Top Hero Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-12 items-center">
          
          {/* Right Dramatic Sculptural Imagery (Order 1 on mobile for immediate visual drama) */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="relative aspect-[4/5] sm:aspect-[3/4] rounded-3xl overflow-hidden bg-[#1D2B22] shadow-2xl border border-[#3E5545] group">
              <img
                src="https://images.unsplash.com/photo-1507290439931-a861b5a38200?auto=format&fit=crop&w=1200&q=85"
                alt="Dramatic dark botanical floral composition with sculptural stems"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#26382C] via-transparent to-transparent opacity-75" />

              {/* Floating Artistic Tag */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-[#26382C]/90 backdrop-blur-md border border-[#3E5545] text-left">
                <span className="text-[9px] uppercase tracking-widest font-mono text-[#B8A276] block">
                  Composition No. 04
                </span>
                <h4 className="text-xs sm:text-sm font-serif text-white mt-0.5 truncate">
                  The Sable Urn in Black Stoneware & White Calla
                </h4>
              </div>
            </div>
          </div>

          {/* Left Hero Statement & Typography (Order 2 on mobile) */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-7 order-2 lg:order-1 text-left">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.3em] text-[#B8A276] font-semibold border-b border-[#B8A276]/30 pb-1">
                <Sparkles className="w-3 h-3 text-[#B8A276]" />
                A Floral Design Studio · Delhi NCR
              </span>

              {/* Oversized Expressive Cormorant Garamond */}
              <h1 className="text-4xl sm:text-6xl lg:text-8xl font-serif font-light text-white leading-[1.02] tracking-tight">
                Where floral <br />
                <span className="italic font-normal text-[#E9E1D4]">meets feeling.</span>
              </h1>
            </div>

            <p className="text-xs sm:text-sm lg:text-base font-sans text-[#C9D1B8] leading-relaxed max-w-lg">
              We bring together flowers, form and thoughtful design to create arrangements and environments that feel distinctly yours.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <a
                href="#atelier-work"
                className="px-8 py-3.5 bg-[#B8A276] hover:bg-[#C9B386] text-[#26382C] rounded-xl text-xs font-sans uppercase tracking-widest font-bold transition text-center shadow-lg flex items-center justify-center gap-2 group active:scale-[0.98]"
              >
                <span>Discover Our Work</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>

              <button
                onClick={() => openEnquiry('The Botanical Atelier · Bespoke Commission')}
                className="px-8 py-3.5 bg-transparent hover:bg-white/5 text-[#F8F6EF] border border-[#F8F6EF]/40 rounded-xl text-xs font-sans uppercase tracking-widest font-semibold transition text-center flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <span>Create Something Bespoke</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#B8A276]" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Ticker Bar */}
      <div className="w-full bg-[#1F2E24] border-t border-[#364D3D] py-2.5 px-4 sm:px-8 mt-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[10px] sm:text-[11px] font-sans text-[#AAB39A]">
          <div className="flex items-center gap-3 sm:gap-6 overflow-x-auto">
            <span>01 / SIGNATURE FLORALS</span>
            <span className="text-[#B8A276]">·</span>
            <span>02 / BESPOKE EVENTS</span>
            <span className="text-[#B8A276]">·</span>
            <span>03 / STYLED SPACES</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-[#E9E1D4]">
            <span>Explore</span>
            <ArrowDown className="w-3 h-3 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};
