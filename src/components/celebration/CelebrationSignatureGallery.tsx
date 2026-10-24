import React from 'react';
import { GALLERY_ITEMS } from '../../data/floralData';
import { usePresentation } from '../../context/PresentationContext';

export const CelebrationSignatureGallery: React.FC = () => {
  const { openEnquiry } = usePresentation();

  return (
    <section id="celebration-gallery" className="py-20 sm:py-28 bg-[#FAF7F1] border-b border-[#E9E1D4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 border-b border-[#E9E1D4] pb-6">
          <div>
            <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-[#AA8175] font-semibold block mb-2">
              Celebration Archives
            </span>
            <h2 className="text-3xl sm:text-5xl font-playfair text-[#3B302C]">
              Moments we have had the honor to frame.
            </h2>
          </div>
          <p className="text-xs text-[#7A6B65] mt-3 sm:mt-0 font-sans max-w-xs">
            From Jaipur palace mandaps to intimate Delhi rooftop celebrations.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {GALLERY_ITEMS.map(item => (
            <div
              key={item.id}
              onClick={() => openEnquiry(`Gallery Inspiration: ${item.title}`)}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-[#E9E1D4] shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-[#E9E1D4]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#D9B4A4]">
                    {item.category}
                  </span>
                  <h3 className="text-xl font-playfair mt-1 text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#FAF7F1]/80 mt-0.5">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
