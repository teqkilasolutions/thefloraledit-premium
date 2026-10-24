import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ShieldCheck, Gift } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    totalItems,
    subtotal,
    freeShippingThreshold,
    freeShippingProgress,
    isGiftWrap,
    setIsGiftWrap,
    orderNote,
    setOrderNote,
    checkoutUrl,
  } = useCart();

  if (!isOpen) return null;

  const amountRemaining = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#321F25]/60 backdrop-blur-sm transition-opacity duration-500 ease-luxury"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-[#F7F3EC] shadow-2xl flex flex-col z-10 border-l border-[#241D1A]/10">
        
        {/* Header */}
        <div className="p-6 border-b border-[#241D1A]/10 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShoppingBag size={18} className="text-[#5A2935]" />
            <h3 className="font-editorial text-2xl text-[#241D1A] font-light">
              YOUR ATELIER BAG ({totalItems})
            </h3>
          </div>
          <button
            onClick={closeCart}
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#241D1A] hover:bg-[#E8DED1] transition-colors"
            aria-label="Close Bag"
          >
            <X size={18} />
          </button>
        </div>

        {/* Complimentary Express Shipping Meter */}
        <div className="bg-[#E8DED1]/70 px-6 py-3.5 border-b border-[#241D1A]/10">
          <div className="flex items-center justify-between text-xs font-sans tracking-wide text-[#241D1A] mb-2">
            {amountRemaining > 0 ? (
              <span>Add <strong className="text-[#5A2935] font-semibold">${amountRemaining.toFixed(2)}</strong> for complimentary express delivery</span>
            ) : (
              <span className="text-[#5A2935] font-semibold flex items-center space-x-1">
                <span>&check; Complimentary Worldwide Express Shipping unlocked</span>
              </span>
            )}
            <span className="text-[10px] text-[#82756C]">{Math.round(freeShippingProgress)}%</span>
          </div>
          <div className="w-full bg-[#241D1A]/10 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#5A2935] h-full transition-all duration-700 ease-luxury"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Bag Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="py-20 text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#E8DED1] flex items-center justify-center text-[#82756C] mb-4">
                <ShoppingBag size={24} />
              </div>
              <p className="font-editorial text-2xl text-[#241D1A] italic mb-2">
                Your bag is empty
              </p>
              <p className="font-sans text-xs text-[#82756C] max-w-xs mx-auto mb-6">
                Discover pieces tailored with timeless Indian craftsmanship.
              </p>
              <button
                onClick={closeCart}
                className="px-6 py-3 bg-[#321F25] text-[#F7F3EC] text-xs font-sans tracking-[0.2em] uppercase hover:bg-[#5A2935] transition-colors"
              >
                EXPLORE COLLECTION
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex space-x-4 pb-6 border-b border-[#241D1A]/10 last:border-b-0"
              >
                {/* Thumbnail */}
                <div className="w-20 h-26 bg-[#E8DED1] overflow-hidden flex-shrink-0">
                  <img
                    src={item.product.featuredImage.url}
                    alt={item.product.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="font-editorial text-lg text-[#241D1A] font-light leading-snug">
                        {item.product.title}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#82756C] hover:text-[#5A2935] transition-colors ml-2"
                        aria-label="Remove item"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <div className="flex items-center space-x-3 text-xs font-sans text-[#82756C] mt-1">
                      <span>Size: <strong className="text-[#241D1A]">{item.selectedSize}</strong></span>
                      <span>&middot;</span>
                      <span className="text-[#241D1A] font-medium">
                        ${parseFloat(item.variant.price.amount).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center border border-[#241D1A]/20 bg-[#F7F3EC]">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center text-[#241D1A] hover:bg-[#E8DED1] transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-8 text-center text-xs font-sans font-medium text-[#241D1A]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center text-[#241D1A] hover:bg-[#E8DED1] transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <span className="text-xs font-sans font-semibold text-[#241D1A]">
                      ${(parseFloat(item.variant.price.amount) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Gift Packaging Option */}
          {cart.length > 0 && (
            <div className="pt-4 border-t border-[#241D1A]/10">
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={isGiftWrap}
                  onChange={(e) => setIsGiftWrap(e.target.checked)}
                  className="rounded border-[#241D1A]/30 text-[#5A2935] focus:ring-0"
                />
                <div className="flex items-center space-x-2 text-xs font-sans text-[#241D1A]">
                  <Gift size={14} className="text-[#B9975B]" />
                  <span>Signature Atelier Gift Box & Ribbon (+$15.00)</span>
                </div>
              </label>

              {/* Order Note */}
              <div className="mt-4">
                <label className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#82756C] block mb-1">
                  SPECIAL ATELIER INSTRUCTIONS / SIZING NOTE
                </label>
                <textarea
                  value={orderNote}
                  onChange={(e) => setOrderNote(e.target.value)}
                  placeholder="Provide custom height, delivery date preferences, or gifting note..."
                  rows={2}
                  className="w-full text-xs font-sans bg-transparent border border-[#241D1A]/20 p-2.5 text-[#241D1A] placeholder-[#82756C] focus:outline-none focus:border-[#321F25]"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer / Subtotal & Checkout */}
        {cart.length > 0 && (
          <div className="p-6 bg-[#F7F3EC] border-t border-[#241D1A]/10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-sans tracking-[0.2em] uppercase text-[#82756C]">
                SUBTOTAL
              </span>
              <span className="font-editorial text-2xl text-[#241D1A] font-normal">
                ${subtotal.toFixed(2)} USD
              </span>
            </div>

            <p className="text-[11px] font-sans text-[#82756C]">
              Taxes calculated at checkout. Complimentary duties on international orders.
            </p>

            <a
              href={checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 bg-[#321F25] hover:bg-[#5A2935] text-[#F7F3EC] text-xs font-sans tracking-[0.22em] uppercase font-medium transition-all duration-300 flex items-center justify-center space-x-2 text-center"
            >
              <span>PROCEED TO ATELIER CHECKOUT</span>
            </a>

            <div className="flex items-center justify-center space-x-2 text-[10px] font-sans tracking-wider text-[#82756C] uppercase pt-1">
              <ShieldCheck size={13} className="text-[#B9975B]" />
              <span>GUARANTEED SHOPIFY SECURE ENCRYPTION</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
