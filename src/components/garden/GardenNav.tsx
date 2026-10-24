import React, { useState, useEffect } from 'react';
import { FloralEditLogo } from '../brand/FloralEditLogo';
import { usePresentation } from '../../context/PresentationContext';
import { ShoppingBag, Menu, X, ArrowUpRight } from 'lucide-react';

export const GardenNav: React.FC = () => {
  const { openEnquiry, cartItems, setIsCartOpen } = usePresentation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`sticky top-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#F8F6EF]/95 backdrop-blur-md shadow-sm border-b border-[#E9E1D4] py-3'
            : 'bg-[#F8F6EF] border-b border-[#E9E1D4]/60 py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          {/* Left Menu (Desktop) */}
          <div className="hidden md:flex items-center gap-7 text-xs font-sans tracking-widest uppercase text-[#292A25]">
            <a href="#collections" className="hover:text-[#536336] transition relative group py-1">
              Shop Collections
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#536336] group-hover:w-full transition-all duration-300" />
            </a>
            <a href="#services" className="hover:text-[#536336] transition relative group py-1">
              Event Services
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#536336] group-hover:w-full transition-all duration-300" />
            </a>
            <a href="#studio" className="hover:text-[#536336] transition relative group py-1">
              The Studio
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#536336] group-hover:w-full transition-all duration-300" />
            </a>
          </div>

          {/* Center Brand Identity (Original Logo reference, uncompressed and undistorted) */}
          <div className="flex flex-col items-center">
            <a href="#" className="flex flex-col items-center group">
              <FloralEditLogo
                variant="dark-transparent"
                className="h-8 sm:h-11 w-auto transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </a>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() => openEnquiry()}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-sans tracking-widest uppercase text-[#536336] hover:text-[#26382C] transition font-medium"
            >
              <span>Enquire</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Shopping Bag */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-[#292A25] hover:text-[#536336] transition"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
              {cartItems.length > 0 && (
                <span className="absolute top-1 right-0 w-4 h-4 rounded-full bg-[#536336] text-white text-[9px] font-mono flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#292A25] hover:text-[#536336] transition"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Slide-out */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-14 z-30 bg-[#F8F6EF] border-b border-[#E9E1D4] px-6 py-6 shadow-xl space-y-4 text-xs uppercase tracking-widest text-[#292A25] animate-in fade-in slide-in-from-top-2 duration-200">
          <a
            href="#collections"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 border-b border-[#E9E1D4]/40 hover:text-[#536336]"
          >
            Shop Collections
          </a>
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 border-b border-[#E9E1D4]/40 hover:text-[#536336]"
          >
            Event Services & Weddings
          </a>
          <a
            href="#gallery"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 border-b border-[#E9E1D4]/40 hover:text-[#536336]"
          >
            Featured Work
          </a>
          <a
            href="#studio"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 border-b border-[#E9E1D4]/40 hover:text-[#536336]"
          >
            The Studio Story
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              openEnquiry();
            }}
            className="w-full py-3 bg-[#536336] text-white rounded text-center text-xs font-medium tracking-widest uppercase transition mt-2"
          >
            Enquire About An Event ↗
          </button>
        </div>
      )}
    </>
  );
};
