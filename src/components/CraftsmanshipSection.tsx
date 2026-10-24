import React from 'react';
import { EDITORIAL_ASSETS } from '../data/fashionData';

export const CraftsmanshipSection: React.FC = () => {
  return (
    <section id="craftsmanship" className="bg-[#F7F3EC] py-24 sm:py-36 border-t border-[#241D1A]/10 scroll-mt-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 lg:mb-28">
          <span className="text-[11px] font-sans tracking-[0.28em] uppercase text-[#82756C] block mb-3">
            THE ATELIER STANDARD
          </span>
          <h2 className="font-editorial text-4xl sm:text-6xl lg:text-7xl leading-[1.05] text-[#241D1A] font-light">
            CRAFTED<br />
            <span className="italic font-normal text-[#5A2935]">WITH INTENTION.</span>
          </h2>
          <div className="w-16 h-px bg-[#B9975B] mx-auto mt-6" />
        </div>

        {/* Three Editorial Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Column 1: DETAIL */}
          <div className="group flex flex-col">
            <div className="relative aspect-[4/5] overflow-hidden bg-[#E8DED1] mb-8">
              <img
                src={EDITORIAL_ASSETS.craftDetail}
                alt="Velvet Loom Intricate Detail"
                className="w-full h-full object-cover transition-transform duration-1000 ease-luxury group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-4 border border-[#F7F3EC]/30 pointer-events-none" />
              <div className="absolute top-4 left-4 bg-[#321F25] text-[#F7F3EC] text-[10px] font-sans tracking-[0.2em] uppercase px-3 py-1">
                PILLAR 01
              </div>
            </div>

            <div className="pr-4">
              <h3 className="font-editorial text-3xl text-[#241D1A] font-normal mb-3 tracking-wide">
                DETAIL
              </h3>
              <p className="font-sans text-sm text-[#241D1A]/85 leading-relaxed mb-4">
                Intricate finishing and considered design.
              </p>
              <p className="font-sans text-xs text-[#82756C] leading-relaxed">
                From micro-embroidered thread work to French-bound hems and concealed mother-of-pearl closures, beauty is embedded where only the wearer perceives it.
              </p>
            </div>
          </div>

          {/* Column 2: FABRIC */}
          <div className="group flex flex-col">
            <div className="relative aspect-[4/5] overflow-hidden bg-[#E8DED1] mb-8">
              <img
                src={EDITORIAL_ASSETS.craftFabric}
                alt="Velvet Loom Textures & Fabric"
                className="w-full h-full object-cover transition-transform duration-1000 ease-luxury group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-4 border border-[#F7F3EC]/30 pointer-events-none" />
              <div className="absolute top-4 left-4 bg-[#321F25] text-[#F7F3EC] text-[10px] font-sans tracking-[0.2em] uppercase px-3 py-1">
                PILLAR 02
              </div>
            </div>

            <div className="pr-4">
              <h3 className="font-editorial text-3xl text-[#241D1A] font-normal mb-3 tracking-wide">
                FABRIC
              </h3>
              <p className="font-sans text-sm text-[#241D1A]/85 leading-relaxed mb-4">
                Textures chosen to move beautifully.
              </p>
              <p className="font-sans text-xs text-[#82756C] leading-relaxed">
                Spun mulberry silks, structured Chanderi weaves, and high-sheen crushed organzas. Sourced directly from hereditary master weavers across India.
              </p>
            </div>
          </div>

          {/* Column 3: SILHOUETTE */}
          <div className="group flex flex-col">
            <div className="relative aspect-[4/5] overflow-hidden bg-[#E8DED1] mb-8">
              <img
                src={EDITORIAL_ASSETS.craftSilhouette}
                alt="Velvet Loom Contemporary Silhouette"
                className="w-full h-full object-cover transition-transform duration-1000 ease-luxury group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-4 border border-[#F7F3EC]/30 pointer-events-none" />
              <div className="absolute top-4 left-4 bg-[#321F25] text-[#F7F3EC] text-[10px] font-sans tracking-[0.2em] uppercase px-3 py-1">
                PILLAR 03
              </div>
            </div>

            <div className="pr-4">
              <h3 className="font-editorial text-3xl text-[#241D1A] font-normal mb-3 tracking-wide">
                SILHOUETTE
              </h3>
              <p className="font-sans text-sm text-[#241D1A]/85 leading-relaxed mb-4">
                Traditional inspiration with a contemporary point of view.
              </p>
              <p className="font-sans text-xs text-[#82756C] leading-relaxed">
                Sculptural capes, architectural shoulder tailoring, and flowing thirty-two kali skirts engineered to float with unencumbered ease.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
