import { useState, useMemo } from 'react';
import { X, Heart, Plus, Eye, SlidersHorizontal } from 'lucide-react';
import type { ShopifyProduct } from '../types/shopify';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface CollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  categoryFilter?: string;
  occasionFilter?: string;
  products: ShopifyProduct[];
  onQuickView: (product: ShopifyProduct) => void;
}

export const CollectionModal: React.FC<CollectionModalProps> = ({
  isOpen,
  onClose,
  title,
  categoryFilter,
  occasionFilter,
  products,
  onQuickView,
}) => {
  const [selectedSort, setSelectedSort] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [selectedFabric, setSelectedFabric] = useState<string>('all');

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (categoryFilter && categoryFilter !== 'all') {
      list = list.filter(p => p.category.toLowerCase().includes(categoryFilter.toLowerCase()) || p.productType.toLowerCase().includes(categoryFilter.toLowerCase()));
    }

    if (occasionFilter && occasionFilter !== 'all') {
      list = list.filter(p => p.atelierDetails?.occasion?.toLowerCase() === occasionFilter.toLowerCase());
    }

    if (selectedFabric !== 'all') {
      list = list.filter(p => p.atelierDetails?.fabric.toLowerCase().includes(selectedFabric.toLowerCase()));
    }

    if (selectedSort === 'price-asc') {
      list.sort((a, b) => parseFloat(a.priceRange.minVariantPrice.amount) - parseFloat(b.priceRange.minVariantPrice.amount));
    } else if (selectedSort === 'price-desc') {
      list.sort((a, b) => parseFloat(b.priceRange.minVariantPrice.amount) - parseFloat(a.priceRange.minVariantPrice.amount));
    }

    return list;
  }, [products, categoryFilter, occasionFilter, selectedFabric, selectedSort]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-[#321F25]/75 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="min-h-screen px-4 py-8 sm:py-12 flex justify-center">
        <div className="w-full max-w-6xl bg-[#F7F3EC] shadow-2xl p-6 sm:p-10 relative z-10 border border-[#241D1A]/10 self-start">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-[#241D1A]/10 mb-8">
            <div>
              <span className="text-[11px] font-sans tracking-[0.25em] uppercase text-[#5A2935] font-semibold block mb-1">
                VELVET LOOM CATALOGUE
              </span>
              <h2 className="font-editorial text-3xl sm:text-5xl text-[#241D1A] font-light">
                {title.toUpperCase()}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full flex items-center justify-center text-[#241D1A] hover:bg-[#E8DED1] transition-colors"
              aria-label="Close collection"
            >
              <X size={20} />
            </button>
          </div>

          {/* Filter and Sort Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#241D1A]/10 mb-8 gap-4 text-xs font-sans">
            <div className="flex items-center space-x-3 overflow-x-auto pb-1">
              <span className="text-[#82756C] flex items-center space-x-1 uppercase tracking-widest text-[10px]">
                <SlidersHorizontal size={12} />
                <span>FABRIC:</span>
              </span>
              {['all', 'Silk', 'Velvet', 'Chanderi', 'Organza'].map(fab => (
                <button
                  key={fab}
                  onClick={() => setSelectedFabric(fab)}
                  className={`px-3 py-1.5 uppercase tracking-wider text-[11px] border transition-colors ${
                    selectedFabric === fab
                      ? 'bg-[#321F25] text-[#F7F3EC] border-[#321F25]'
                      : 'bg-transparent text-[#241D1A] border-[#241D1A]/15 hover:border-[#241D1A]'
                  }`}
                >
                  {fab}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-[#82756C] uppercase tracking-widest text-[10px]">SORT BY:</span>
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value as any)}
                className="bg-transparent border border-[#241D1A]/20 py-1.5 px-3 text-xs font-sans text-[#241D1A] focus:outline-none focus:border-[#321F25]"
              >
                <option value="featured">Featured Atelier Pieces</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center text-[#82756C]">
              <p className="font-editorial text-2xl text-[#241D1A] italic mb-2">
                No matching silhouettes in this edit
              </p>
              <button
                onClick={() => setSelectedFabric('all')}
                className="text-xs font-sans uppercase tracking-widest text-[#5A2935] underline"
              >
                Reset fabric filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.map((product) => {
                const isFavorited = isInWishlist(product.id);
                return (
                  <div key={product.id} className="group flex flex-col justify-between">
                    <div className="relative aspect-[3/4] bg-[#E8DED1] overflow-hidden mb-3">
                      <img
                        src={product.featuredImage.url}
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-luxury group-hover:scale-105"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(product);
                        }}
                        className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-[#F7F3EC]/80 backdrop-blur-md flex items-center justify-center text-[#241D1A] hover:text-[#5A2935] transition-colors"
                      >
                        <Heart size={14} className={isFavorited ? 'fill-[#5A2935] text-[#5A2935]' : ''} />
                      </button>

                      <button
                        onClick={() => onQuickView(product)}
                        className="absolute bottom-2.5 left-2.5 right-2.5 py-2 bg-[#F7F3EC]/95 backdrop-blur-md text-[#241D1A] text-[10px] font-sans tracking-[0.2em] uppercase font-medium hidden sm:flex items-center justify-center space-x-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Eye size={12} />
                        <span>QUICK VIEW</span>
                      </button>
                    </div>

                    <div>
                      <span className="text-[10px] font-sans tracking-widest uppercase text-[#82756C] block">
                        {product.category}
                      </span>
                      <h4
                        onClick={() => onQuickView(product)}
                        className="font-editorial text-lg text-[#241D1A] font-light hover:text-[#5A2935] cursor-pointer truncate"
                      >
                        {product.title}
                      </h4>
                      <div className="flex items-center justify-between pt-1">
                        <span className="font-sans text-xs font-medium text-[#241D1A]">
                          ${parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}
                        </span>
                        <button
                          onClick={() => addToCart(product)}
                          className="text-[10px] font-sans tracking-widest uppercase text-[#5A2935] font-semibold flex items-center space-x-1"
                        >
                          <Plus size={11} />
                          <span>ADD</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
