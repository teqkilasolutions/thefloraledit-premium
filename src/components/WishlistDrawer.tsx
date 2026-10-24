import React from 'react';
import { X, Trash2, Heart, ShoppingBag } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export const WishlistDrawer: React.FC = () => {
  const { wishlist, isOpen, closeWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#321F25]/60 backdrop-blur-sm transition-opacity duration-500"
        onClick={closeWishlist}
      />

      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-[#F7F3EC] shadow-2xl flex flex-col z-10 border-l border-[#241D1A]/10">
        
        {/* Header */}
        <div className="p-6 border-b border-[#241D1A]/10 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart size={18} className="text-[#5A2935] fill-[#5A2935]" />
            <h3 className="font-editorial text-2xl text-[#241D1A] font-light">
              SAVED PIECES ({wishlist.length})
            </h3>
          </div>
          <button
            onClick={closeWishlist}
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#241D1A] hover:bg-[#E8DED1] transition-colors"
            aria-label="Close Wishlist"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {wishlist.length === 0 ? (
            <div className="py-20 text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#E8DED1] flex items-center justify-center text-[#82756C] mb-4">
                <Heart size={24} />
              </div>
              <p className="font-editorial text-2xl text-[#241D1A] italic mb-2">
                Your wishlist is empty
              </p>
              <p className="font-sans text-xs text-[#82756C] max-w-xs mx-auto mb-6">
                Curate your personal collection of timeless silhouettes.
              </p>
              <button
                onClick={closeWishlist}
                className="px-6 py-3 bg-[#321F25] text-[#F7F3EC] text-xs font-sans tracking-[0.2em] uppercase hover:bg-[#5A2935] transition-colors"
              >
                EXPLORE COLLECTION
              </button>
            </div>
          ) : (
            wishlist.map((product) => (
              <div
                key={product.id}
                className="flex space-x-4 pb-6 border-b border-[#241D1A]/10 last:border-b-0"
              >
                {/* Thumbnail */}
                <div className="w-20 h-28 bg-[#E8DED1] overflow-hidden flex-shrink-0">
                  <img
                    src={product.featuredImage.url}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info & Move to Bag */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="font-editorial text-lg text-[#241D1A] font-light leading-snug">
                        {product.title}
                      </h4>
                      <button
                        onClick={() => removeFromWishlist(product.id)}
                        className="text-[#82756C] hover:text-[#5A2935] transition-colors ml-2"
                        aria-label="Remove from wishlist"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <div className="text-xs font-sans text-[#82756C] mt-1">
                      <span>{product.category}</span>
                      <span className="mx-2">&middot;</span>
                      <span className="text-[#241D1A] font-medium">
                        ${parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      addToCart(product);
                      removeFromWishlist(product.id);
                    }}
                    className="w-full py-2.5 bg-[#321F25] hover:bg-[#5A2935] text-[#F7F3EC] text-[11px] font-sans tracking-[0.18em] uppercase transition-colors flex items-center justify-center space-x-2 mt-3"
                  >
                    <ShoppingBag size={13} />
                    <span>MOVE TO BAG</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
