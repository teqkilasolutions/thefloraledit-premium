import React, { createContext, useContext, useState, useEffect } from 'react';
import type { CartItem, ShopifyProduct, ShopifyProductVariant } from '../types/shopify';
import { buildShopifyCheckoutUrl } from '../lib/shopify';

interface CartContextType {
  cart: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: ShopifyProduct, variant?: ShopifyProductVariant, size?: string, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  freeShippingThreshold: number;
  freeShippingProgress: number;
  isGiftWrap: boolean;
  setIsGiftWrap: (val: boolean) => void;
  orderNote: string;
  setOrderNote: (note: string) => void;
  checkoutUrl: string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('velvet_loom_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isGiftWrap, setIsGiftWrap] = useState(false);
  const [orderNote, setOrderNote] = useState('');

  const freeShippingThreshold = 350;

  useEffect(() => {
    try {
      localStorage.setItem('velvet_loom_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('Failed to persist cart to localStorage', e);
    }
  }, [cart]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addToCart = (
    product: ShopifyProduct,
    variant?: ShopifyProductVariant,
    size?: string,
    quantity = 1
  ) => {
    const selectedVariant = variant || product.variants[0];
    const selectedSize = size || selectedVariant.selectedOptions.find(o => o.name === 'Size')?.value || 'S';
    const itemId = `${product.id}-${selectedVariant.id}-${selectedSize}`;

    setCart(prev => {
      const existing = prev.find(item => item.id === itemId);
      if (existing) {
        return prev.map(item =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          product,
          variant: selectedVariant,
          quantity,
          selectedSize,
        }
      ];
    });

    setIsOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cart.reduce((sum, item) => {
    const price = parseFloat(item.variant.price.amount) || 0;
    return sum + price * item.quantity;
  }, 0) + (isGiftWrap ? 15 : 0);

  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const checkoutUrl = buildShopifyCheckoutUrl(
    cart.map(item => ({ variantId: item.variant.id, quantity: item.quantity }))
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        isOpen,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        freeShippingThreshold,
        freeShippingProgress,
        isGiftWrap,
        setIsGiftWrap,
        orderNote,
        setOrderNote,
        checkoutUrl,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
