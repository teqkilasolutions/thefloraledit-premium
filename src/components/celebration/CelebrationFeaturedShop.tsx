import React from 'react';
import { usePresentation } from '../../context/PresentationContext';
import { FLORAL_PRODUCTS } from '../../data/floralData';
import { ShoppingBag, Eye } from 'lucide-react';

export const CelebrationFeaturedShop: React.FC = () => {
  const { openQuickView, addToCart } = usePresentation();

  return (
    <section className="py-20 sm:py-28 bg-[#FAF7F1] border-b border-[#E9E1D4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 border-b border-[#E9E1D4] pb-6">
          <div>
            <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-[#AA8175] font-semibold block mb-1">
              The Celebration Boutique
            </span>
            <h2 className="text-3xl sm:text-4xl font-playfair text-[#3B302C]">
              Vessels for giving and keeping.
            </h2>
          </div>
          <p className="text-xs text-[#7A6B65] mt-2 sm:mt-0 font-sans">
            Ready-to-style handcrafted ceramic vessels and seasonal bouquet deliveries.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {FLORAL_PRODUCTS.slice(0, 4).map(product => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl overflow-hidden border border-[#E9E1D4] p-3.5 shadow-sm hover:shadow-lg transition flex flex-col justify-between"
            >
              <div
                onClick={() => openQuickView(product)}
                className="relative aspect-square rounded-xl overflow-hidden bg-[#E9E1D4] mb-3 cursor-pointer"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <button
                  className="absolute bottom-2 right-2 p-1.5 rounded-full bg-white/90 text-[#3B302C] opacity-0 group-hover:opacity-100 transition shadow"
                  title="Quick View"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-1">
                <span className="text-[9px] uppercase tracking-wider text-[#AA8175] font-medium block">
                  {product.subtitle}
                </span>
                <h4
                  onClick={() => openQuickView(product)}
                  className="text-xs font-playfair font-semibold text-[#3B302C] line-clamp-1 cursor-pointer hover:text-[#536336]"
                >
                  {product.name}
                </h4>
                <div className="flex items-center justify-between pt-2">
                  <span className="font-mono text-xs font-medium text-[#536336]">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  <button
                    onClick={() => addToCart(product)}
                    className="p-1.5 rounded-full bg-[#FAF7F1] hover:bg-[#536336] text-[#3B302C] hover:text-white transition"
                    title="Add to Bag"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
