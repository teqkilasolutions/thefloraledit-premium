import { ArrowRight } from 'lucide-react';
import { COLLECTIONS_DATA } from '../data/fashionData';
import type { ShopifyCollection } from '../types/shopify';

interface CollectionsGridProps {
  onSelectCollection: (handle: string, title: string) => void;
}

export const CollectionsGrid: React.FC<CollectionsGridProps> = ({ onSelectCollection }) => {
  return (
    <section id="collections" className="bg-[#F7F3EC] py-24 sm:py-32 lg:py-40 scroll-mt-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
          <span className="text-[11px] font-sans tracking-[0.28em] uppercase text-[#82756C] block mb-3">
            CURATED SILHOUETTES
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#241D1A] font-light tracking-tight">
            THE VELVET LOOM EDIT
          </h2>
          <div className="w-16 h-px bg-[#B9975B] mx-auto mt-6" />
        </div>

        {/* Collections Container: Desktop 4 cards grid, Mobile horizontal swipe */}
        <div className="flex lg:grid lg:grid-cols-4 gap-6 sm:gap-8 overflow-x-auto lg:overflow-x-visible pb-6 lg:pb-0 scrollbar-none snap-x snap-mandatory">
          {COLLECTIONS_DATA.map((col: ShopifyCollection) => (
            <div
              key={col.id}
              onClick={() => onSelectCollection(col.handle, col.title)}
              className="flex-shrink-0 w-[82vw] sm:w-[45vw] lg:w-auto snap-center group relative cursor-pointer overflow-hidden aspect-[4/5] bg-[#E8DED1]"
            >
              {/* 4:5 Large Fashion Photography with 1.05 hover zoom */}
              <img
                src={col.image.url}
                alt={col.title}
                className="w-full h-full object-cover transition-transform duration-1000 ease-luxury group-hover:scale-105"
                loading="lazy"
              />

              {/* Gradient overlay: subtle initially, darker on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#241D1A]/90 via-[#241D1A]/35 to-transparent opacity-75 group-hover:opacity-90 transition-opacity duration-700 ease-luxury" />

              {/* Delicate gold border frame */}
              <div className="absolute inset-3 sm:inset-4 border border-[#F7F3EC]/20 group-hover:border-[#B9975B]/60 transition-colors duration-700 pointer-events-none" />

              {/* Content overlay: text moves upward slightly on hover */}
              <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end transition-transform duration-700 ease-luxury group-hover:-translate-y-2">
                <span className="text-[10px] font-sans tracking-[0.25em] text-[#D4BD8A] uppercase mb-1.5 opacity-90">
                  {col.productsCount} ATELIER PIECES
                </span>
                
                <h3 className="font-editorial text-2xl sm:text-3xl text-[#F7F3EC] font-normal tracking-wide mb-2">
                  {col.title}
                </h3>

                <p className="font-sans text-xs text-[#F7F3EC]/80 line-clamp-2 mb-4 font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden sm:block">
                  {col.description}
                </p>

                <div className="inline-flex items-center space-x-2 text-xs font-sans tracking-[0.2em] uppercase text-[#F7F3EC] group-hover:text-[#D4BD8A] transition-colors">
                  <span>EXPLORE</span>
                  <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Swipe Cue */}
        <div className="lg:hidden text-center mt-4">
          <span className="text-[10px] font-sans tracking-[0.2em] text-[#82756C] uppercase">
            &larr; SWIPE TO EXPLORE COLLECTIONS &rarr;
          </span>
        </div>

      </div>
    </section>
  );
};
