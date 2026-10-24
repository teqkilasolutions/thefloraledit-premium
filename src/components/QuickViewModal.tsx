import { useState } from 'react';
import { X, Heart, ShoppingBag, Ruler, Check } from 'lucide-react';
import type { ShopifyProduct } from '../types/shopify';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface QuickViewModalProps {
  product: ShopifyProduct | null;
  onClose: () => void;
  onOpenSizeGuide: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onOpenSizeGuide,
}) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('S');
  const [added, setAdded] = useState(false);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  if (!product) return null;

  const isFavorited = isInWishlist(product.id);
  const images = product.images.length > 0 ? product.images : [product.featuredImage];
  const sizeOptions = product.options.find(o => o.name === 'Size')?.values || ['XS', 'S', 'M', 'L', 'XL'];

  const handleAddToCart = () => {
    const variant = product.variants.find(v =>
      v.selectedOptions.some(o => o.name === 'Size' && o.value === selectedSize)
    ) || product.variants[0];

    addToCart(product, variant, selectedSize, 1);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#321F25]/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="min-h-screen px-4 text-center flex items-center justify-center p-0 sm:p-6">
        <div className="inline-block w-full max-w-4xl my-8 text-left align-middle transition-all transform bg-[#F7F3EC] shadow-2xl relative z-10 border border-[#241D1A]/10 overflow-hidden">
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#F7F3EC]/80 backdrop-blur-md flex items-center justify-center text-[#241D1A] hover:bg-[#321F25] hover:text-[#F7F3EC] transition-colors"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Gallery Column */}
            <div className="p-6 sm:p-8 bg-[#E8DED1]/50 flex flex-col justify-between">
              <div className="aspect-[3/4] bg-[#E8DED1] overflow-hidden relative shadow-sm mb-4">
                <img
                  src={images[selectedImage]?.url || product.featuredImage.url}
                  alt={product.title}
                  className="w-full h-full object-cover transition-all duration-700 ease-luxury"
                />
                {product.atelierDetails?.bestseller && (
                  <div className="absolute top-4 left-4 bg-[#321F25] text-[#F7F3EC] text-[10px] font-sans tracking-[0.2em] uppercase px-3 py-1">
                    STUDIO ICON
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex space-x-3 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={img.id || idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-16 h-20 flex-shrink-0 overflow-hidden border transition-all ${
                        selectedImage === idx ? 'border-[#5A2935] scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img.url} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details Column */}
            <div className="p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-sans tracking-[0.24em] uppercase text-[#82756C]">
                    {product.category} &middot; VELVET LOOM
                  </span>
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="text-[#82756C] hover:text-[#5A2935] transition-colors"
                    aria-label="Wishlist"
                  >
                    <Heart
                      size={18}
                      className={isFavorited ? 'fill-[#5A2935] text-[#5A2935]' : ''}
                    />
                  </button>
                </div>

                <h2 className="font-editorial text-3xl sm:text-4xl text-[#241D1A] font-light mb-3">
                  {product.title}
                </h2>

                <div className="font-sans text-xl font-medium text-[#241D1A] mb-6">
                  ${parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)} USD
                </div>

                <p className="font-sans text-xs sm:text-sm text-[#241D1A]/85 leading-relaxed mb-6 font-light">
                  {product.description}
                </p>

                {/* Size Selector */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-[11px] font-sans tracking-[0.2em] uppercase text-[#241D1A] font-medium">
                      SELECT SIZE: <strong className="text-[#5A2935]">{selectedSize}</strong>
                    </span>
                    <button
                      onClick={onOpenSizeGuide}
                      className="text-[11px] font-sans tracking-[0.16em] uppercase text-[#82756C] hover:text-[#5A2935] flex items-center space-x-1"
                    >
                      <Ruler size={13} />
                      <span>ATELIER SIZE GUIDE</span>
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {sizeOptions.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`min-h-[40px] px-4 text-xs font-sans tracking-wider uppercase transition-all duration-300 border ${
                          selectedSize === sz
                            ? 'bg-[#321F25] text-[#F7F3EC] border-[#321F25]'
                            : 'bg-transparent text-[#241D1A] border-[#241D1A]/20 hover:border-[#241D1A]'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Atelier Specifications */}
                {product.atelierDetails && (
                  <div className="space-y-2 py-4 border-t border-b border-[#241D1A]/10 text-xs font-sans text-[#241D1A]/80 mb-6">
                    <div>
                      <strong className="text-[#241D1A] uppercase tracking-wider text-[10px]">Fabric:</strong>{' '}
                      {product.atelierDetails.fabric}
                    </div>
                    <div>
                      <strong className="text-[#241D1A] uppercase tracking-wider text-[10px]">Technique:</strong>{' '}
                      {product.atelierDetails.technique}
                    </div>
                    <div>
                      <strong className="text-[#241D1A] uppercase tracking-wider text-[10px]">Model:</strong>{' '}
                      {product.atelierDetails.modelStats}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div>
                <button
                  onClick={handleAddToCart}
                  disabled={added}
                  className="w-full py-4 bg-[#321F25] hover:bg-[#5A2935] text-[#F7F3EC] text-xs font-sans tracking-[0.22em] uppercase font-medium transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  {added ? (
                    <>
                      <Check size={16} className="text-[#B9975B]" />
                      <span>ADDED TO BAG</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={16} />
                      <span>ADD TO BAG &middot; ${parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}</span>
                    </>
                  )}
                </button>

                <p className="text-[10px] font-sans tracking-wide text-center text-[#82756C] mt-3">
                  Complimentary worldwide express shipping &middot; Handcrafted to order
                </p>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
