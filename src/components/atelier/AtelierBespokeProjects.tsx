import React from 'react';
import { usePresentation } from '../../context/PresentationContext';
import { ArrowUpRight } from 'lucide-react';

export const AtelierBespokeProjects: React.FC = () => {
  const { openEnquiry } = usePresentation();

  return (
    <section id="atelier-projects" className="py-20 sm:py-28 bg-[#1E2B22] text-[#F8F6EF] border-b border-[#364D3D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-[#26382C] rounded-3xl p-8 sm:p-14 border border-[#3E5545] shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left 6 cols: Project Scope */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#B8A276] block">
                Private Commissions & Installations
              </span>

              <h3 className="text-3xl sm:text-5xl font-serif text-white leading-tight">
                Bespoke Floral Environments
              </h3>

              <p className="text-xs sm:text-sm text-[#C9D1B8] leading-relaxed">
                For clients seeking an uncompromising signature aesthetic for private celebrations, architectural residences, and luxury brand launches. We accept a limited calendar of 24 major commissions annually to ensure devoted creative directorship.
              </p>

              <div className="space-y-3 pt-2 text-xs text-[#E9E1D4]">
                <div className="flex items-start gap-2.5">
                  <span className="text-[#B8A276] font-mono text-sm">01</span>
                  <div>
                    <h5 className="font-semibold text-white">Full-Scale Spatial Floristry</h5>
                    <p className="text-[11px] text-[#AAB39A]">Ceremonial mandaps, suspended floral ceilings, dramatic entryways.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="text-[#B8A276] font-mono text-sm">02</span>
                  <div>
                    <h5 className="font-semibold text-white">Custom Stoneware Vessel Casting</h5>
                    <p className="text-[11px] text-[#AAB39A]">Exclusive glazes and ceramic silhouettes engineered to complement your venue.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="text-[#B8A276] font-mono text-sm">03</span>
                  <div>
                    <h5 className="font-semibold text-white">Private Residence Rotation</h5>
                    <p className="text-[11px] text-[#AAB39A]">Weekly architectural floral styling for estates and penthouses.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => openEnquiry('The Botanical Atelier · High-Value Bespoke Project')}
                  className="px-8 py-3.5 bg-[#B8A276] hover:bg-[#C9B386] text-[#26382C] rounded text-xs font-sans uppercase tracking-widest font-bold transition flex items-center gap-2 shadow-lg group"
                >
                  <span>Request Private Project Dossier</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right 6 cols: Visual Composition */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden aspect-[3/4] bg-[#162119] border border-[#3E5545] group">
                <img
                  src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=85"
                  alt="Curated celebration tablescape"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden aspect-square bg-[#162119] border border-[#3E5545] group">
                  <img
                    src="https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=85"
                    alt="Botanical stems in terracotta vessel"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 rounded-2xl bg-[#1F2E24] border border-[#364D3D] text-xs">
                  <span className="font-mono text-[10px] text-[#B8A276] uppercase tracking-wider block">
                    Lead Time
                  </span>
                  <p className="text-white font-medium mt-1">4 to 12 Weeks</p>
                  <p className="text-[10px] text-[#AAB39A] mt-0.5">Custom ceramic casting and botanical sourcing.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
