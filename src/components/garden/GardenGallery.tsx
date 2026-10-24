import React from 'react';
import { GALLERY_ITEMS } from '../../data/floralData';

export const GardenGallery: React.FC = () => {

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-[#F8F6EF] border-b border-[#E9E1D4]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#536336] font-medium block mb-2">
            Selected Commissions
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#292A25]">
            Craftsmanship in bloom.
          </h2>
          <p className="text-xs sm:text-sm text-[#787E71] mt-2 font-sans leading-relaxed">
            From single-stem stoneware studies to grand candlelit wedding receptions across Delhi NCR and beyond.
          </p>
        </div>

        {/* Asymmetric Editorial Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Item 1 (Tall 5 cols) */}
          <div className="md:col-span-5 group relative rounded-2xl overflow-hidden bg-[#E9E1D4] shadow-md aspect-[3/4]">
            <img
              src={GALLERY_ITEMS[0].image}
              alt={GALLERY_ITEMS[0].title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
              <span className="text-[10px] uppercase tracking-widest text-[#E9E1D4] font-mono">
                {GALLERY_ITEMS[0].category}
              </span>
              <h3 className="text-xl font-serif mt-1">{GALLERY_ITEMS[0].title}</h3>
              <p className="text-xs text-[#E9E1D4]/90 mt-0.5">{GALLERY_ITEMS[0].subtitle}</p>
            </div>
          </div>

          {/* Item 2 (Wide 7 cols) */}
          <div className="md:col-span-7 space-y-6">
            <div className="group relative rounded-2xl overflow-hidden bg-[#E9E1D4] shadow-md aspect-[16/10]">
              <img
                src={GALLERY_ITEMS[1].image}
                alt={GALLERY_ITEMS[1].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-[10px] uppercase tracking-widest text-[#E9E1D4] font-mono">
                  {GALLERY_ITEMS[1].category}
                </span>
                <h3 className="text-xl font-serif mt-1">{GALLERY_ITEMS[1].title}</h3>
                <p className="text-xs text-[#E9E1D4]/90 mt-0.5">{GALLERY_ITEMS[1].subtitle}</p>
              </div>
            </div>

            {/* Split row under Item 2 */}
            <div className="grid grid-cols-2 gap-6">
              <div className="group relative rounded-xl overflow-hidden bg-[#E9E1D4] shadow-sm aspect-square">
                <img
                  src={GALLERY_ITEMS[2].image}
                  alt={GALLERY_ITEMS[2].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                  <h4 className="text-xs font-serif">{GALLERY_ITEMS[2].title}</h4>
                  <p className="text-[10px] text-[#E9E1D4]/80">{GALLERY_ITEMS[2].category}</p>
                </div>
              </div>

              <div className="group relative rounded-xl overflow-hidden bg-[#E9E1D4] shadow-sm aspect-square">
                <img
                  src={GALLERY_ITEMS[4].image}
                  alt={GALLERY_ITEMS[4].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                  <h4 className="text-xs font-serif">{GALLERY_ITEMS[4].title}</h4>
                  <p className="text-[10px] text-[#E9E1D4]/80">{GALLERY_ITEMS[4].category}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
