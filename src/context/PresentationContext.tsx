import React, { createContext, useContext, useState, useEffect } from 'react';
import { type FloralProduct, FLORAL_PRODUCTS } from '../data/floralData';
import { CART_KEY, readBag } from '../lib/floralStorage';

export type FrameworkId = 'garden' | 'atelier' | 'celebration';
export type ViewportMode = 'desktop' | 'mobile';

interface CartItem {
  product: FloralProduct;
  quantity: number;
}

interface PresentationContextType {
  activeFramework: FrameworkId;
  setActiveFramework: (framework: FrameworkId) => void;
  viewportMode: ViewportMode;
  setViewportMode: (mode: ViewportMode) => void;
  isSpecsOpen: boolean;
  setIsSpecsOpen: (open: boolean) => void;
  isComparisonOpen: boolean;
  setIsComparisonOpen: (open: boolean) => void;
  isEnquiryModalOpen: boolean;
  enquiryService: string;
  openEnquiry: (serviceName?: string) => void;
  closeEnquiry: () => void;
  quickViewProduct: FloralProduct | null;
  openQuickView: (product: FloralProduct) => void;
  closeQuickView: () => void;
  cartItems: CartItem[];
  addToCart: (product: FloralProduct) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const PresentationContext = createContext<PresentationContextType | undefined>(undefined);

export const PresentationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeFramework, setActiveFramework] = useState<FrameworkId>('celebration');
  const [viewportMode, setViewportMode] = useState<ViewportMode>('desktop');
  const [isSpecsOpen, setIsSpecsOpen] = useState(false);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [enquiryService, setEnquiryService] = useState('Event Florals & Celebrations');
  const [quickViewProduct, setQuickViewProduct] = useState<FloralProduct | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try { return readBag(localStorage.getItem(CART_KEY)).map(item => ({ product: FLORAL_PRODUCTS.find(p => p.id === item.id)!, quantity: item.quantity })); } catch { return []; }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  useEffect(() => {
    try { localStorage.setItem(CART_KEY, JSON.stringify(cartItems.map(item => ({ id: item.product.id, quantity: item.quantity })))); } catch { /* Keep shopping usable when browser storage is unavailable. */ }
  }, [cartItems]);
  useEffect(() => {
    function sync(event: StorageEvent) {
      if (event.key === CART_KEY || event.key === null) setCartItems(readBag(event.newValue).map(item => ({ product: FLORAL_PRODUCTS.find(p => p.id === item.id)!, quantity: item.quantity })));
    }
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);

  const openEnquiry = (serviceName?: string) => {
    setEnquiryService(serviceName || 'Event flowers & celebrations');
    setIsEnquiryModalOpen(true);
  };

  const closeEnquiry = () => {
    setIsEnquiryModalOpen(false);
  };

  const openQuickView = (product: FloralProduct) => {
    setQuickViewProduct(product);
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

  const addToCart = (product: FloralProduct) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id ? { ...item, quantity: Math.min(99, item.quantity + 1) } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };
  const updateQuantity = (productId: string, quantity: number) => {
    if (!Number.isInteger(quantity)) return;
    if (quantity <= 0) return removeFromCart(productId);
    setCartItems(prev => prev.map(item => item.product.id === productId ? { ...item, quantity: Math.min(99, quantity) } : item));
  };

  return (
    <PresentationContext.Provider
      value={{
        activeFramework,
        setActiveFramework,
        viewportMode,
        setViewportMode,
        isSpecsOpen,
        setIsSpecsOpen,
        isComparisonOpen,
        setIsComparisonOpen,
        isEnquiryModalOpen,
        enquiryService,
        openEnquiry,
        closeEnquiry,
        quickViewProduct,
        openQuickView,
        closeQuickView,
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        isCartOpen,
        setIsCartOpen
      }}
    >
      {children}
    </PresentationContext.Provider>
  );
};

export const usePresentation = () => {
  const context = useContext(PresentationContext);
  if (!context) {
    throw new Error('usePresentation must be used within a PresentationProvider');
  }
  return context;
};

