import React from 'react';
import { usePresentation } from '../../context/PresentationContext';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';

export const FloralCartDrawer: React.FC = () => {
  const { isCartOpen, setIsCartOpen, cartItems, removeFromCart, openEnquiry } = usePresentation();

  if (!isCartOpen) return null;

  const total = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end transition-opacity">
      <div className="w-full max-w-md bg-[#F8F6EF] text-[#292A25] h-full shadow-2xl flex flex-col border-l border-[#E9E1D4] animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-5 border-b border-[#E9E1D4] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-[#536336]" />
            <h2 className="text-base font-serif font-medium text-[#292A25]">
              Shopping Bag ({cartItems.length})
            </h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 rounded-full hover:bg-[#E9E1D4] text-[#787E71] hover:text-[#292A25] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center">
              <ShoppingBag className="w-10 h-10 text-[#AAB39A] mb-3 stroke-[1.2]" />
              <p className="text-sm font-serif text-[#292A25]">Your shopping bag is empty</p>
              <p className="text-xs text-[#787E71] mt-1">Explore our hand-glazed stoneware vessels and bouquets.</p>
            </div>
          ) : (
            cartItems.map(item => (
              <div
                key={item.product.id}
                className="p-3.5 bg-white rounded-xl border border-[#E9E1D4] flex gap-3.5 shadow-sm"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-20 object-cover rounded-lg bg-[#E9E1D4]"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="text-xs font-serif font-medium text-[#292A25] line-clamp-1">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-[#AAB39A] hover:text-rose-600 p-0.5 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-[10px] text-[#787E71]">{item.product.subtitle}</p>
                  </div>

                  <div className="flex justify-between items-center text-xs mt-2">
                    <span className="text-[11px] text-[#787E71]">Qty: {item.quantity}</span>
                    <span className="font-mono font-medium text-[#26382C]">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-[#E9E1D4] bg-white space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#787E71]">
                <span>Subtotal</span>
                <span className="font-mono text-[#292A25]">₹{total.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-[#787E71]">
                <span>Delhi NCR Shipping</span>
                <span className="text-emerald-700 font-medium">Complimentary</span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-[#292A25] pt-2 border-t border-[#E9E1D4]">
                <span>Estimated Total</span>
                <span className="font-mono text-[#26382C]">₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              onClick={() => {
                alert('Demo Mode: Prototype checkout initiated. In production, this links to Shopify Storefront checkout.');
              }}
              className="w-full py-3 bg-[#536336] hover:bg-[#43502B] text-white rounded-lg text-xs font-semibold tracking-widest uppercase transition flex items-center justify-center gap-2 shadow-md"
            >
              Proceed to Checkout
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => {
                setIsCartOpen(false);
                openEnquiry('Vessel Order with Event Styling');
              }}
              className="w-full py-2 bg-transparent text-[#536336] text-[11px] font-medium tracking-wide hover:underline"
            >
              Need this arranged with fresh flowers for an event? Enquire ↗
            </button>

            <div className="pt-2 flex items-center justify-center gap-1.5 text-[10px] text-[#787E71]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#536336]" />
              <span>Handcrafted Stoneware · Guaranteed Safe Studio Transit</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
