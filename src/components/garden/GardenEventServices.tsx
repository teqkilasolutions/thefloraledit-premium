import React from 'react';
import { usePresentation } from '../../context/PresentationContext';
import { ArrowUpRight } from 'lucide-react';

export const GardenEventServices: React.FC = () => {
  const { openEnquiry } = usePresentation();

  return (
    <section id="services" className="py-16 sm:py-24 bg-[#F8F6EF] border-b border-[#E9E1D4]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Wide Event Card */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-[#26382C] text-[#F8F6EF]">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
            {/* Left Image (7 cols) */}
            <div className="lg:col-span-7 relative min-h-[320px] lg:min-h-full">
              <img
                src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85"
                alt="Luxury wedding event installation with candlelight tablescape"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/70 via-black/20 to-transparent" />
            </div>

            {/* Right Information (5 cols) */}
            <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between bg-[#26382C]">
              <div className="space-y-4">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#AAB39A] font-medium block">
                  Celebrations & Event Installations
                </span>

                <h3 className="text-3xl sm:text-4xl font-serif text-white leading-tight">
                  Floral architecture for moments of consequence.
                </h3>

                <p className="text-xs sm:text-sm text-[#D8DACF] leading-relaxed">
                  We conceptualise and orchestrate complete floral environments for weddings, high-table private dinners, and brand galas. Our team handles every element from custom vessel curation and floral palette testing to day-of architectural on-site styling.
                </p>

                <div className="space-y-2.5 pt-3 text-xs text-[#E9E1D4]">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#AAB39A]" />
                    <span>Mandap & ceremonial stage floral architecture</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#AAB39A]" />
                    <span>Suspended botanical clouds & candlelight tablescapes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#AAB39A]" />
                    <span>Full on-site floristry team across India & international destinations</span>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => openEnquiry('The Editorial Garden · Event Florals')}
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#536336] hover:bg-[#627540] text-white rounded text-xs font-sans uppercase tracking-widest font-semibold transition flex items-center justify-center gap-2 shadow-lg group"
                >
                  <span>Book Event Consultation</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
