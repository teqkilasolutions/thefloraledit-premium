import { useState, useMemo } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import type { ShopifyProduct } from '../types/shopify';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: ShopifyProduct[];
  onSelectProduct: (product: ShopifyProduct) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');

  const trendingQueries = [
    'Mulberry Silk',
    'Sharara',
    'Deep Velvet',
    'Anarkalis',
    'Tissue Organza',
    'Straight Suits'
  ];

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter(
      p =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.atelierDetails?.fabric.toLowerCase().includes(q) ||
        p.atelierDetails?.technique.toLowerCase().includes(q)
    );
  }, [query, products]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#321F25]/70 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="min-h-screen px-4 pt-20 pb-12 flex justify-center">
        <div className="w-full max-w-3xl bg-[#F7F3EC] shadow-2xl p-6 sm:p-10 relative z-10 border border-[#241D1A]/10 self-start">
          
          {/* Header & Input */}
          <div className="flex items-center justify-between pb-6 border-b border-[#241D1A]/10 mb-6">
            <div className="flex items-center space-x-3 flex-1">
              <Search size={22} className="text-[#5A2935]" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="SEARCH ATELIER COLLECTIONS, SILHOUETTES, FABRICS..."
                className="w-full bg-transparent text-sm sm:text-base font-sans tracking-[0.12em] text-[#241D1A] placeholder-[#82756C] focus:outline-none"
              />
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full flex items-center justify-center text-[#241D1A] hover:bg-[#E8DED1] transition-colors ml-4"
              aria-label="Close search"
            >
              <X size={20} />
            </button>
          </div>

          {/* Trending searches pill buttons */}
          {!query && (
            <div>
              <span className="text-[11px] font-sans tracking-[0.24em] uppercase text-[#82756C] block mb-3">
                TRENDING ATELIER SEARCHES
              </span>
              <div className="flex flex-wrap gap-2">
                {trendingQueries.map((item) => (
                  <button
                    key={item}
                    onClick={() => setQuery(item)}
                    className="px-4 py-2 border border-[#241D1A]/15 hover:border-[#321F25] text-xs font-sans tracking-wider uppercase text-[#241D1A] transition-colors bg-white/40"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results Display */}
          {query && (
            <div>
              <span className="text-[11px] font-sans tracking-[0.24em] uppercase text-[#82756C] block mb-4">
                RESULTS ({results.length})
              </span>

              {results.length === 0 ? (
                <div className="py-12 text-center text-[#82756C]">
                  <p className="font-editorial text-2xl text-[#241D1A] italic mb-1">
                    No silhouettes found
                  </p>
                  <p className="font-sans text-xs">
                    Try searching for &quot;Silk&quot;, &quot;Sharara&quot;, &quot;Velvet&quot;, or &quot;Anarkali&quot;.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-2">
                  {results.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => {
                        onSelectProduct(product);
                        onClose();
                      }}
                      className="flex space-x-4 p-3 bg-white/40 hover:bg-[#E8DED1]/60 transition-colors cursor-pointer border border-[#241D1A]/5 group"
                    >
                      <img
                        src={product.featuredImage.url}
                        alt={product.title}
                        className="w-16 h-22 object-cover bg-[#E8DED1]"
                      />
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <span className="text-[10px] font-sans uppercase tracking-widest text-[#82756C] block">
                            {product.category}
                          </span>
                          <h4 className="font-editorial text-lg text-[#241D1A] font-light group-hover:text-[#5A2935] transition-colors">
                            {product.title}
                          </h4>
                        </div>
                        <div className="flex items-center justify-between text-xs font-sans">
                          <span className="font-medium text-[#241D1A]">
                            ${parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}
                          </span>
                          <span className="text-[#B9975B] text-[10px] tracking-wider uppercase flex items-center space-x-1">
                            <span>VIEW</span>
                            <ArrowRight size={11} />
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
