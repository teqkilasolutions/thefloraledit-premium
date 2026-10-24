import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ShopifyProduct } from '../types/shopify';

interface WishlistContextType {
  wishlist: ShopifyProduct[];
  isOpen: boolean;
  openWishlist: () => void;
  closeWishlist: () => void;
  toggleWishlist: (product: ShopifyProduct) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  totalWishlistItems: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<ShopifyProduct[]>(() => {
    try {
      const saved = localStorage.getItem('velvet_loom_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('velvet_loom_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.warn('Failed to persist wishlist to localStorage', e);
    }
  }, [wishlist]);

  const openWishlist = () => setIsOpen(true);
  const closeWishlist = () => setIsOpen(false);

  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item.id === productId);
  };

  const toggleWishlist = (product: ShopifyProduct) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist(prev => prev.filter(item => item.id !== productId));
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        isOpen,
        openWishlist,
        closeWishlist,
        toggleWishlist,
        removeFromWishlist,
        isInWishlist,
        totalWishlistItems: wishlist.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
