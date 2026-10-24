import React from 'react';
import { usePresentation } from '../../context/PresentationContext';
import { FLORAL_PRODUCTS } from '../../data/floralData';
import { ArrowUpRight, Eye } from 'lucide-react';

export const GardenCollections: React.FC = () => {
  const { openQuickView, openEnquiry } = usePresentation();

  const collections = [
    {
      id: 'c-bouquets',
      title: 'Bespoke Bouquets',
      tagline: 'Hand-tied with intention & seasonal stems',
      image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=85',
      action: () => openEnquiry('Bespoke Bouquets')
    },
    {
      id: 'c-events',
      title: 'Event Florals',
      tagline: 'Celebrations, tablescapes & installations',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=85',
      action: () => openEnquiry('Event Florals & Installations')
    },
    {
      id: 'c-decor',
      title: 'Home Décor & Vases',
      tagline: 'Hand-glazed stoneware, sold ready to style',
      image: 'https://images.unsplash.com/photo-1546842931-886c185b4c8c?auto=format&fit=crop&w=800&q=85',
      action: () => openQuickView(FLORAL_PRODUCTS[0])
    }
  ];

  return (
    <section id="collections" className="py-16 sm:py-24 bg-[#F8F6EF] border-b border-[#E9E1D4]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-14 pb-4 border-b border-[#E9E1D4]">
          <div>
            <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#536336] font-medium block mb-1">
              The Curated Offerings
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#292A25]">
              Considered details. Natural beauty.
            </h2>
          </div>
          <p className="text-xs text-[#787E71] mt-2 sm:mt-0 font-sans max-w-xs">
            Vessels and florals composed to elevate dining tables, celebratory spaces, and modern interiors.
          </p>
        </div>

        {/* Three Editorial Image Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {collections.map(col => (
            <div
              key={col.id}
              onClick={col.action}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-[#E9E1D4] shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-[#E9E1D4]">
                <img
                  src={col.image}
                  alt={col.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#292A25] group-hover:bg-[#536336] group-hover:text-white transition shadow">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-serif text-[#292A25] group-hover:text-[#536336] transition-colors">
                  {col.title}
                </h3>
                <p className="text-xs text-[#787E71] mt-1 font-sans">
                  {col.tagline}
                </p>
                <div className="pt-4 mt-4 border-t border-[#E9E1D4]/60 flex items-center justify-between text-xs font-sans text-[#536336] font-medium tracking-wide">
                  <span>Explore category</span>
                  <span>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Stoneware Vessels Strip */}
        <div className="mt-16 sm:mt-20">
          <div className="flex items-center justify-between mb-6">
            <span className="text-[11px] uppercase tracking-widest text-[#292A25] font-semibold">
              The Studio Stoneware Collection (Ready to Style)
            </span>
            <span className="text-xs text-[#536336]">Click any piece for studio specifications</span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {FLORAL_PRODUCTS.slice(0, 4).map(product => (
              <div
                key={product.id}
                onClick={() => openQuickView(product)}
                className="group cursor-pointer bg-white p-3 sm:p-4 rounded-xl border border-[#E9E1D4] hover:border-[#536336] transition-all duration-300"
              >
                <div className="relative aspect-square rounded-lg overflow-hidden bg-[#E9E1D4] mb-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-2 right-2 p-1.5 rounded-full bg-white/80 backdrop-blur-sm text-[#292A25] opacity-0 group-hover:opacity-100 transition shadow">
                    <Eye className="w-3.5 h-3.5" />
                  </div>
                </div>
                <h4 className="text-xs font-serif font-medium text-[#292A25] line-clamp-1 group-hover:text-[#536336] transition">
                  {product.name}
                </h4>
                <p className="text-[10px] text-[#787E71] mt-0.5">{product.dimensions}</p>
                <p className="text-xs font-mono font-medium text-[#26382C] mt-2">
                  ₹{product.price.toLocaleString('en-IN')}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
