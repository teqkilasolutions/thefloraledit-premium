import React from 'react';
import { usePresentation } from '../../context/PresentationContext';
import { X, ShoppingBag } from 'lucide-react';

export const FloralQuickViewModal: React.FC = () => {
  const { quickViewProduct, closeQuickView, addToCart, openEnquiry } = usePresentation();

  if (!quickViewProduct) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm p-4 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-[#F8F6EF] text-[#292A25] rounded-2xl shadow-2xl overflow-hidden my-8 border border-[#E9E1D4] animate-in fade-in zoom-in-95 duration-200">
        <div className="relative grid grid-cols-1 md:grid-cols-2">
          {/* Close button */}
          <button
            onClick={closeQuickView}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-[#292A25] shadow-md transition"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Product Image */}
          <div className="relative h-72 md:h-full min-h-[360px] bg-[#E9E1D4] overflow-hidden">
            <img
              src={quickViewProduct.image}
              alt={quickViewProduct.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <span className="px-2.5 py-1 bg-[#536336] text-white text-[10px] uppercase tracking-widest font-medium rounded-full">
                Studio Collection
              </span>
            </div>
          </div>

          {/* Details */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#536336] font-semibold block mb-1">
                  {quickViewProduct.subtitle}
                </span>
                <h2 className="text-2xl font-serif text-[#292A25]">
                  {quickViewProduct.name}
                </h2>
                <p className="text-lg font-medium text-[#26382C] mt-1 font-mono">
                  ₹{quickViewProduct.price.toLocaleString('en-IN')}
                </p>
              </div>

              <p className="text-xs text-[#5A6054] leading-relaxed">
                {quickViewProduct.description}
              </p>

              {/* Specs */}
              <div className="space-y-2 py-3 border-y border-[#E9E1D4] text-xs">
                <div className="flex justify-between">
                  <span className="text-[#787E71]">Dimensions:</span>
                  <span className="font-medium text-[#292A25]">{quickViewProduct.dimensions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#787E71]">Material & Glaze:</span>
                  <span className="font-medium text-[#292A25]">{quickViewProduct.material}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#787E71]">Delivery:</span>
                  <span className="font-medium text-emerald-700">In Stock · Ships within 24h</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {quickViewProduct.tags.map(t => (
                  <span key={t} className="px-2 py-0.5 bg-[#E9E1D4]/80 text-[#536336] text-[10px] rounded">
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 space-y-2.5">
              <button
                onClick={() => {
                  addToCart(quickViewProduct);
                  closeQuickView();
                }}
                className="w-full py-3 bg-[#536336] hover:bg-[#43502B] text-white rounded-lg text-xs font-semibold tracking-widest uppercase transition flex items-center justify-center gap-2 shadow-md"
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Bag · ₹{quickViewProduct.price.toLocaleString('en-IN')}
              </button>

              <button
                onClick={() => {
                  closeQuickView();
                  openEnquiry(`Vessel Styling: ${quickViewProduct.name}`);
                }}
                className="w-full py-2.5 bg-transparent hover:bg-[#E9E1D4]/40 text-[#536336] border border-[#536336]/30 rounded-lg text-xs font-medium tracking-wide transition flex items-center justify-center gap-1.5"
              >
                Book with Flower Arrangement ↗
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
