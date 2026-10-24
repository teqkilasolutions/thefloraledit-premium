import { useState } from 'react';
import { Heart, ChevronLeft, ChevronRight, Plus, Eye } from 'lucide-react';
import type { ShopifyProduct } from '../types/shopify';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface NewArrivalsProps {
  products: ShopifyProduct[];
  onQuickView: (product: ShopifyProduct) => void;
}

export const NewArrivals: React.FC<NewArrivalsProps> = ({ products, onQuickView }) => {
  const [scrollIndex, setScrollIndex] = useState(0);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // Filter or take products for New Arrivals
  const newArrivals = products.slice(0, 6);

  const handlePrev = () => {
    setScrollIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setScrollIndex(prev => Math.min(newArrivals.length - 2, prev + 1));
  };

  return (
    <section id="new-arrivals" className="bg-[#F7F3EC] py-24 sm:py-32 border-t border-[#241D1A]/5 scroll-mt-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Header and Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div>
            <span className="text-[11px] font-sans tracking-[0.28em] uppercase text-[#5A2935] font-semibold block mb-3">
              SPRING / SUMMER ATELIER
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#241D1A] font-light tracking-tight mb-4">
              THE NEW EDIT
            </h2>
            <div className="space-y-0.5">
              <p className="font-sans text-xs sm:text-sm text-[#82756C] tracking-wide">
                Fresh silhouettes. &middot; Thoughtful details. &middot; Made to be remembered.
              </p>
            </div>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center space-x-3 mt-6 md:mt-0">
            <button
              onClick={handlePrev}
              disabled={scrollIndex === 0}
              className="w-11 h-11 rounded-full border border-[#241D1A]/20 flex items-center justify-center text-[#241D1A] hover:bg-[#321F25] hover:text-[#F7F3EC] hover:border-[#321F25] disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[#241D1A] disabled:hover:border-[#241D1A]/20 transition-all duration-300"
              aria-label="Previous Products"
            >
              <ChevronLeft size={18} strokeWidth={1.5} />
            </button>
            <button
              onClick={handleNext}
              disabled={scrollIndex >= newArrivals.length - 4}
              className="w-11 h-11 rounded-full border border-[#241D1A]/20 flex items-center justify-center text-[#241D1A] hover:bg-[#321F25] hover:text-[#F7F3EC] hover:border-[#321F25] disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[#241D1A] disabled:hover:border-[#241D1A]/20 transition-all duration-300"
              aria-label="Next Products"
            >
              <ChevronRight size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Responsive Product Grid / Carousel */}
        {/* Desktop: 4 products, Tablet: 3 products, Mobile: 2 products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {newArrivals.slice(scrollIndex, scrollIndex + 4).map((product) => {
            const isFavorited = isInWishlist(product.id);
            const secondaryImage = product.images[1]?.url || product.featuredImage.url;

            return (
              <div key={product.id} className="group flex flex-col justify-between">
                
                {/* Image Container with secondary hover crossfade & actions */}
                <div className="relative aspect-[3/4] bg-[#E8DED1] overflow-hidden mb-4">
                  {/* Primary Image */}
                  <img
                    src={product.featuredImage.url}
                    alt={product.title}
                    className="w-full h-full object-cover transition-opacity duration-700 ease-luxury group-hover:opacity-0"
                    loading="lazy"
                  />
                  {/* Secondary Alternate Editorial Angle on Hover */}
                  <img
                    src={secondaryImage}
                    alt={`${product.title} alternate view`}
                    className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-700 ease-luxury group-hover:opacity-100 group-hover:scale-103"
                    loading="lazy"
                  />

                  {/* Wishlist Icon Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product);
                    }}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-[#F7F3EC]/80 backdrop-blur-md flex items-center justify-center text-[#241D1A] hover:bg-[#F7F3EC] hover:text-[#5A2935] transition-all duration-300 z-10"
                    aria-label="Add to Wishlist"
                  >
                    <Heart
                      size={15}
                      strokeWidth={1.8}
                      className={isFavorited ? 'fill-[#5A2935] text-[#5A2935]' : ''}
                    />
                  </button>

                  {/* Quick View Button */}
                  <button
                    onClick={() => onQuickView(product)}
                    className="absolute bottom-3 left-3 right-3 py-2.5 bg-[#F7F3EC]/95 backdrop-blur-md text-[#241D1A] hover:bg-[#321F25] hover:text-[#F7F3EC] text-[10px] font-sans tracking-[0.2em] uppercase font-medium transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 hidden sm:flex items-center justify-center space-x-1.5 shadow-sm"
                  >
                    <Eye size={13} />
                    <span>QUICK VIEW</span>
                  </button>
                </div>

                {/* Product Metadata */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#82756C]">
                      {product.category}
                    </span>
                    {product.atelierDetails?.bestseller && (
                      <span className="text-[9px] font-sans tracking-[0.16em] uppercase text-[#B9975B] font-semibold">
                        STUDIO ICON
                      </span>
                    )}
                  </div>

                  <h3
                    onClick={() => onQuickView(product)}
                    className="font-editorial text-lg sm:text-xl text-[#241D1A] font-light hover:text-[#5A2935] transition-colors cursor-pointer truncate mb-1"
                  >
                    {product.title}
                  </h3>

                  <div className="flex items-center justify-between pt-1">
                    <span className="font-sans text-xs sm:text-sm font-medium text-[#241D1A]">
                      ${parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}
                    </span>

                    {/* Quick Add Button */}
                    <button
                      onClick={() => addToCart(product)}
                      className="text-[11px] font-sans tracking-[0.16em] uppercase text-[#5A2935] hover:text-[#241D1A] font-semibold flex items-center space-x-1 transition-colors py-1"
                    >
                      <Plus size={12} strokeWidth={2.5} />
                      <span>QUICK ADD</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
