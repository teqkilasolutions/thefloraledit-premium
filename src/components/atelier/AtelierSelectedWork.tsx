import React from 'react';
import { usePresentation } from '../../context/PresentationContext';
import { ArrowUpRight } from 'lucide-react';

export const AtelierSelectedWork: React.FC = () => {
  const { openEnquiry } = usePresentation();

  return (
    <section id="atelier-work" className="py-20 sm:py-32 bg-[#26382C] text-[#F8F6EF] border-b border-[#364D3D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-14 sm:mb-20">
          <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-[#B8A276] font-semibold block mb-2">
            Selected Portfolio
          </span>
          <h2 className="text-4xl sm:text-6xl font-serif text-white leading-tight">
            Nature, interpreted through design.
          </h2>
          <p className="text-xs sm:text-sm text-[#C9D1B8] mt-3 font-sans leading-relaxed">
            Our compositions do not imitate nature; they distill its purest geometric tensions and poetic asymmetries.
          </p>
        </div>

        {/* Large Editorial Compositions Grid */}
        <div className="space-y-12 sm:space-y-16">
          {/* Row 1: Massive Feature (9 cols) + Side Editorial (3 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 group relative rounded-3xl overflow-hidden bg-[#1B271F] shadow-2xl aspect-[16/10] border border-[#364D3D]">
              <img
                src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1600&q=85"
                alt="Architectural wedding chandelier with suspended greenery"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#B8A276]">
                  Case Study · Imperial Hotel New Delhi
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif text-white mt-1">
                  The Suspended Botanical Canopy
                </h3>
                <p className="text-xs text-[#E9E1D4]/80 mt-1 max-w-lg">
                  Over 1,200 stems of white garden roses, ivy, and olive branches suspended above an 80-seat banquet table.
                </p>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="bg-[#1F2E24] p-8 rounded-2xl border border-[#364D3D] space-y-4">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#B8A276]">
                  Atelier Method
                </span>
                <h4 className="text-xl font-serif text-white">
                  Sculptural Weight & Light
                </h4>
                <p className="text-xs text-[#C9D1B8] leading-relaxed">
                  We study venue ambient lighting at hourly intervals before finalizing botanical species. What looks luminous at 4 PM must deepen into dramatic drama by candlelight at 9 PM.
                </p>
                <div className="pt-2 text-xs font-mono text-[#AAB39A]">
                  01 / Light Studies<br />
                  02 / Monochromatic Depth<br />
                  03 / Architectural Scale
                </div>
              </div>

              <div className="group relative rounded-2xl overflow-hidden bg-[#1B271F] aspect-[4/3] border border-[#364D3D]">
                <img
                  src="https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=800&q=85"
                  alt="Low blush bowl for private dinner"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-5">
                  <h5 className="text-sm font-serif text-white">The Orla Low Bowl Study</h5>
                  <p className="text-[10px] text-[#B8A276] font-mono">Private Salon Tablescape</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-14 text-center">
          <button
            onClick={() => openEnquiry('The Botanical Atelier · Portfolio Enquiry')}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-transparent border border-[#B8A276] text-[#B8A276] hover:bg-[#B8A276] hover:text-[#26382C] rounded-lg text-xs uppercase tracking-widest font-semibold transition"
          >
            <span>Explore the Complete Portfolio</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
