import React from 'react';
import { usePresentation } from '../../context/PresentationContext';
import { FLORAL_SERVICES } from '../../data/floralData';
import { ArrowUpRight } from 'lucide-react';

export const CelebrationServices: React.FC = () => {
  const { openEnquiry } = usePresentation();

  return (
    <section id="celebration-services" className="py-20 sm:py-28 bg-[#FAF7F1] border-b border-[#E9E1D4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-20 space-y-3">
          <span className="text-[10px] uppercase font-sans tracking-[0.3em] text-[#AA8175] font-semibold block">
            Four Experiential Pathways
          </span>
          <h2 className="text-3xl sm:text-5xl font-playfair text-[#3B302C]">
            A setting for every story.
          </h2>
          <p className="text-xs sm:text-sm text-[#7A6B65] leading-relaxed">
            From hand-tied daily bouquets to grand wedding architectural installations, choose how you would like to collaborate with our design team.
          </p>
        </div>

        {/* 4 Image-Led Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FLORAL_SERVICES.map(service => (
            <div
              key={service.id}
              onClick={() => openEnquiry(service.title)}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-[#E9E1D4] shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-[#E9E1D4]">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                <span className="absolute top-3 left-3 bg-[#FAF7F1]/90 backdrop-blur-sm text-[#3B302C] text-[10px] font-mono px-2 py-0.5 rounded font-bold">
                  {service.number}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-lg font-playfair font-medium text-[#3B302C] group-hover:text-[#536336] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-[#7A6B65] line-clamp-2 mt-1 leading-relaxed">
                    {service.tagline}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E9E1D4] flex items-center justify-between text-xs font-sans text-[#AA8175] font-medium group-hover:text-[#536336]">
                  <span>Explore service</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
