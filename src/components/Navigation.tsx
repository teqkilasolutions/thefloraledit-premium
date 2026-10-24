import React, { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, User, Menu, X, ArrowRight } from 'lucide-react';
import { VelvetLoomLogo } from './VelvetLoomLogo';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface NavigationProps {
  onOpenSearch: () => void;
  onOpenAccount: () => void;
  onSelectCategory?: (category: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  onOpenSearch,
  onOpenAccount,
  onSelectCategory
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const { openCart, totalItems } = useCart();
  const { openWishlist, totalWishlistItems } = useWishlist();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string, category?: string) => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    if (category && onSelectCategory) {
      onSelectCategory(category);
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* 1. Announcement Bar */}
      <div className="bg-[#5A2935] text-[#F7F3EC] text-[11px] font-sans tracking-[0.2em] py-2 px-4 text-center z-50 relative select-none">
        <div className="flex items-center justify-center space-x-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B9975B] inline-block animate-pulse"></span>
          <span>WORLDWIDE SHIPPING &middot; NEW COLLECTION NOW LIVE</span>
          <span className="hidden sm:inline text-[#D4BD8A]">&middot; COMPLIMENTARY ATELIER PACKAGING</span>
        </div>
      </div>

      {/* 2. Primary Luxury Navigation Header */}
      <header
        className={`sticky top-0 w-full z-40 transition-all duration-500 ease-luxury ${
          isScrolled
            ? 'nav-scrolled py-2'
            : 'bg-transparent py-2.5 sm:py-3 border-b border-[rgba(36,29,26,0.08)] backdrop-blur-[3px]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop Navigation Layout */}
          <div className="hidden lg:grid grid-cols-12 items-center">
            
            {/* LEFT LINKS */}
            <nav className="col-span-4 flex items-center space-x-7 font-sans text-xs tracking-[0.16em] uppercase text-[#241D1A]">
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('shop')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  onClick={() => handleNavClick('collections')}
                  className="luxury-link font-medium hover:text-[#5A2935] transition-colors py-2"
                >
                  SHOP
                </button>
                {/* Micro Dropdown */}
                {activeDropdown === 'shop' && (
                  <div className="absolute top-full left-0 w-56 bg-[#F7F3EC] border border-[#241D1A]/10 shadow-xl p-4 flex flex-col space-y-3 animate-fadeIn">
                    <button onClick={() => handleNavClick('collections', 'Anarkalis')} className="text-left text-xs tracking-wider text-[#241D1A] hover:text-[#B9975B] transition-colors">ANARKALIS</button>
                    <button onClick={() => handleNavClick('collections', 'Shararas')} className="text-left text-xs tracking-wider text-[#241D1A] hover:text-[#B9975B] transition-colors">SHARARA SUITS</button>
                    <button onClick={() => handleNavClick('collections', 'Straight Suits')} className="text-left text-xs tracking-wider text-[#241D1A] hover:text-[#B9975B] transition-colors">STRAIGHT SUITS</button>
                    <button onClick={() => handleNavClick('collections', 'Indo-Westerns')} className="text-left text-xs tracking-wider text-[#241D1A] hover:text-[#B9975B] transition-colors">INDO-WESTERNS</button>
                  </div>
                )}
              </div>

              <button
                onClick={() => handleNavClick('new-arrivals')}
                className="luxury-link font-medium hover:text-[#5A2935] transition-colors"
              >
                NEW IN
              </button>

              <button
                onClick={() => handleNavClick('collections')}
                className="luxury-link font-medium hover:text-[#5A2935] transition-colors"
              >
                COLLECTIONS
              </button>

              <button
                onClick={() => handleNavClick('occasions')}
                className="luxury-link font-medium hover:text-[#5A2935] transition-colors"
              >
                OCCASION
              </button>
            </nav>

            {/* CENTER: VELVET LOOM LOGO */}
            <div className="col-span-4 flex justify-center">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="focus:outline-none transition-transform duration-500 hover:opacity-95"
                title="Velvet Loom Atelier Home"
              >
                <VelvetLoomLogo variant="ivory" size={isScrolled ? 'xs' : 'sm'} isScrolled={isScrolled} />
              </a>
            </div>

            {/* RIGHT ICONS & UTILITIES */}
            <div className="col-span-4 flex items-center justify-end space-x-6 text-[#241D1A]">
              <button
                onClick={onOpenSearch}
                className="flex items-center space-x-2 text-xs tracking-[0.16em] uppercase hover:text-[#5A2935] transition-colors py-2 focus:outline-none"
                aria-label="Search"
              >
                <Search size={16} strokeWidth={1.5} />
                <span className="hidden xl:inline">SEARCH</span>
              </button>

              <button
                onClick={openWishlist}
                className="relative flex items-center space-x-2 text-xs tracking-[0.16em] uppercase hover:text-[#5A2935] transition-colors py-2 focus:outline-none"
                aria-label="Wishlist"
              >
                <Heart size={16} strokeWidth={1.5} />
                <span className="hidden xl:inline">WISHLIST</span>
                {totalWishlistItems > 0 && (
                  <span className="absolute -top-1 -right-2 bg-[#5A2935] text-[#F7F3EC] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-sans font-semibold">
                    {totalWishlistItems}
                  </span>
                )}
              </button>

              <button
                onClick={onOpenAccount}
                className="flex items-center space-x-2 text-xs tracking-[0.16em] uppercase hover:text-[#5A2935] transition-colors py-2 focus:outline-none"
                aria-label="Account"
              >
                <User size={16} strokeWidth={1.5} />
                <span className="hidden xl:inline">ACCOUNT</span>
              </button>

              <button
                onClick={openCart}
                className="relative flex items-center space-x-2 text-xs tracking-[0.16em] uppercase hover:text-[#5A2935] transition-colors py-2 focus:outline-none font-medium"
                aria-label="Bag"
              >
                <ShoppingBag size={17} strokeWidth={1.5} />
                <span>BAG</span>
                <span className="bg-[#241D1A] text-[#F7F3EC] text-[10px] min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center font-sans font-semibold ml-1">
                  {totalItems}
                </span>
              </button>
            </div>
          </div>

          {/* Mobile Header (Strict requirement: MENU | VELVET LOOM | BAG, >= 44px touch targets) */}
          <div className="flex lg:hidden items-center justify-between h-14">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="min-h-[44px] min-w-[44px] flex items-center justify-start text-[#241D1A] hover:text-[#5A2935] focus:outline-none"
              aria-label="Open Navigation Menu"
            >
              <div className="flex items-center space-x-2">
                <Menu size={22} strokeWidth={1.5} />
                <span className="text-[11px] tracking-[0.18em] uppercase font-sans font-medium">MENU</span>
              </div>
            </button>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="focus:outline-none flex-1 flex justify-center py-1"
            >
              <VelvetLoomLogo variant="ivory" size="xs" isScrolled={isScrolled} />
            </a>

            <div className="flex items-center space-x-1">
              <button
                onClick={onOpenSearch}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center text-[#241D1A]"
                aria-label="Search"
              >
                <Search size={19} strokeWidth={1.5} />
              </button>

              <button
                onClick={openCart}
                className="min-h-[44px] min-w-[44px] flex items-center justify-end text-[#241D1A] relative"
                aria-label="Cart"
              >
                <div className="flex items-center space-x-1">
                  <ShoppingBag size={20} strokeWidth={1.5} />
                  <span className="bg-[#241D1A] text-[#F7F3EC] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-sans font-bold">
                    {totalItems}
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#321F25]/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#F7F3EC] shadow-2xl p-6 flex flex-col justify-between overflow-y-auto z-10 border-r border-[#241D1A]/10">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#241D1A]/10">
                <VelvetLoomLogo variant="ivory" size="sm" />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center text-[#241D1A]"
                  aria-label="Close menu"
                >
                  <X size={22} strokeWidth={1.5} />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="py-6 flex flex-col space-y-4">
                <span className="text-[10px] font-sans tracking-[0.25em] text-[#82756C] uppercase">COLLECTIONS</span>
                <button
                  onClick={() => handleNavClick('collections', 'Anarkalis')}
                  className="text-left font-editorial text-2xl text-[#241D1A] hover:text-[#B9975B] transition-colors flex items-center justify-between py-1"
                >
                  <span>Anarkalis</span>
                  <ArrowRight size={16} className="text-[#B9975B]" />
                </button>
                <button
                  onClick={() => handleNavClick('collections', 'Shararas')}
                  className="text-left font-editorial text-2xl text-[#241D1A] hover:text-[#B9975B] transition-colors flex items-center justify-between py-1"
                >
                  <span>Shararas</span>
                  <ArrowRight size={16} className="text-[#B9975B]" />
                </button>
                <button
                  onClick={() => handleNavClick('collections', 'Straight Suits')}
                  className="text-left font-editorial text-2xl text-[#241D1A] hover:text-[#B9975B] transition-colors flex items-center justify-between py-1"
                >
                  <span>Straight Suits</span>
                  <ArrowRight size={16} className="text-[#B9975B]" />
                </button>
                <button
                  onClick={() => handleNavClick('collections', 'Indo-Westerns')}
                  className="text-left font-editorial text-2xl text-[#241D1A] hover:text-[#B9975B] transition-colors flex items-center justify-between py-1"
                >
                  <span>Indo-Westerns</span>
                  <ArrowRight size={16} className="text-[#B9975B]" />
                </button>
              </div>

              <div className="py-4 border-t border-[#241D1A]/10 flex flex-col space-y-3">
                <span className="text-[10px] font-sans tracking-[0.25em] text-[#82756C] uppercase">EXPLORE</span>
                <button
                  onClick={() => handleNavClick('new-arrivals')}
                  className="text-left text-sm tracking-[0.14em] uppercase text-[#241D1A] py-1"
                >
                  NEW IN ATELIER
                </button>
                <button
                  onClick={() => handleNavClick('occasions')}
                  className="text-left text-sm tracking-[0.14em] uppercase text-[#241D1A] py-1"
                >
                  OCCASION EDIT
                </button>
                <button
                  onClick={() => handleNavClick('craftsmanship')}
                  className="text-left text-sm tracking-[0.14em] uppercase text-[#241D1A] py-1"
                >
                  CRAFTSMANSHIP & ATELIER
                </button>
                <button
                  onClick={() => handleNavClick('brand-story')}
                  className="text-left text-sm tracking-[0.14em] uppercase text-[#241D1A] py-1"
                >
                  OUR STORY
                </button>
              </div>
            </div>

            {/* Bottom Utilities */}
            <div className="pt-6 border-t border-[#241D1A]/10 space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openWishlist();
                }}
                className="w-full py-3 flex items-center justify-center space-x-2 text-xs tracking-[0.18em] uppercase border border-[#241D1A]/20 text-[#241D1A]"
              >
                <Heart size={15} />
                <span>WISHLIST ({totalWishlistItems})</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAccount();
                }}
                className="w-full py-3 flex items-center justify-center space-x-2 text-xs tracking-[0.18em] uppercase bg-[#321F25] text-[#F7F3EC]"
              >
                <User size={15} />
                <span>CLIENT CONCIERGE</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
