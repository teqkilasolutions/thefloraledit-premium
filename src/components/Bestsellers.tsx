import { Heart, Plus, Eye } from 'lucide-react';
import type { ShopifyProduct } from '../types/shopify';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface BestsellersProps {
  products: ShopifyProduct[];
  onQuickView: (product: ShopifyProduct) => void;
}

export const Bestsellers: React.FC<BestsellersProps> = ({ products, onQuickView }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // Bestseller items
  const bestsellers = products.filter(p => p.atelierDetails?.bestseller).slice(0, 4);

  return (
    <section id="bestsellers" className="bg-[#F7F3EC] py-24 sm:py-32 scroll-mt-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Editorial Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <span className="text-[11px] font-sans tracking-[0.28em] uppercase text-[#82756C] block mb-3">
            HER COVETED WARDROBE
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#241D1A] font-light tracking-tight leading-tight">
            THE PIECES<br />
            <span className="italic font-normal text-[#5A2935]">SHE KEEPS COMING BACK TO.</span>
          </h2>
          <div className="w-16 h-px bg-[#B9975B] mx-auto mt-6" />
        </div>

        {/* 4 Bestseller Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {bestsellers.map((product) => {
            const isFavorited = isInWishlist(product.id);
            const secondaryImage = product.images[1]?.url || product.featuredImage.url;

            return (
              <div key={product.id} className="group flex flex-col justify-between">
                
                {/* Image Container with subtle BESTSELLER badge */}
                <div className="relative aspect-[3/4] bg-[#E8DED1] overflow-hidden mb-4">
                  <img
                    src={product.featuredImage.url}
                    alt={product.title}
                    className="w-full h-full object-cover transition-opacity duration-700 ease-luxury group-hover:opacity-0"
                    loading="lazy"
                  />
                  <img
                    src={secondaryImage}
                    alt={`${product.title} alternate view`}
                    className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-700 ease-luxury group-hover:opacity-100 group-hover:scale-103"
                    loading="lazy"
                  />

                  {/* Subtle, non-loud BESTSELLER badge */}
                  <div className="absolute top-3 left-3 bg-[#F7F3EC]/90 text-[#321F25] px-2.5 py-1 text-[9px] font-sans tracking-[0.22em] uppercase backdrop-blur-sm border border-[#241D1A]/10">
                    BESTSELLER
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product);
                    }}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#F7F3EC]/80 backdrop-blur-md flex items-center justify-center text-[#241D1A] hover:bg-[#F7F3EC] hover:text-[#5A2935] transition-all z-10"
                    aria-label="Wishlist"
                  >
                    <Heart
                      size={14}
                      strokeWidth={1.8}
                      className={isFavorited ? 'fill-[#5A2935] text-[#5A2935]' : ''}
                    />
                  </button>

                  {/* Quick View Button on Desktop */}
                  <button
                    onClick={() => onQuickView(product)}
                    className="absolute bottom-3 left-3 right-3 py-2 bg-[#F7F3EC]/95 backdrop-blur-md text-[#241D1A] hover:bg-[#321F25] hover:text-[#F7F3EC] text-[10px] font-sans tracking-[0.2em] uppercase font-medium transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 hidden sm:flex items-center justify-center space-x-1.5 shadow-sm"
                  >
                    <Eye size={12} />
                    <span>QUICK VIEW</span>
                  </button>
                </div>

                {/* Info */}
                <div>
                  <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#82756C] block mb-1">
                    {product.category}
                  </span>

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
