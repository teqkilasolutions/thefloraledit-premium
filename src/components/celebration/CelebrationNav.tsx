import React, { useState } from 'react';
import { FloralEditLogo } from '../brand/FloralEditLogo';
import { usePresentation } from '../../context/PresentationContext';
import { ShoppingBag, ArrowUpRight, Menu, X } from 'lucide-react';

export const CelebrationNav: React.FC = () => {
  const { openEnquiry, cartItems, setIsCartOpen } = usePresentation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 bg-[#FAF7F1]/95 backdrop-blur-md border-b border-[#E9E1D4] text-[#3B302C] py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
        {/* Left Nav (Desktop) */}
        <div className="hidden md:flex items-center gap-7 text-xs font-sans tracking-widest uppercase text-[#3B302C]">
          <a href="#celebration-services" className="hover:text-[#536336] transition">
            Bouquets
          </a>
          <a href="#celebration-services" className="hover:text-[#536336] transition">
            Events & Weddings
          </a>
          <a href="#celebration-gallery" className="hover:text-[#536336] transition">
            Gallery
          </a>
          <a href="#celebration-experience" className="hover:text-[#536336] transition">
            The Process
          </a>
        </div>

        {/* Center Logo */}
        <div className="flex flex-col items-center">
          <a href="#" className="flex flex-col items-center group">
            <FloralEditLogo
              variant="dark-transparent"
              className="h-8 sm:h-11 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </a>
        </div>

        {/* Right CTA */}
        <div className="flex items-center gap-4 sm:gap-6">
          <button
            onClick={() => openEnquiry('The Celebration House · Event Consultation')}
            className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#536336] hover:bg-[#43502B] text-white rounded-full text-xs font-sans uppercase tracking-widest font-semibold transition shadow-sm"
          >
            <span>Enquire</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Bag */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-[#3B302C] hover:text-[#536336] transition"
            aria-label="Shopping Bag"
          >
            <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
            {cartItems.length > 0 && (
              <span className="absolute top-1 right-0 w-4 h-4 rounded-full bg-[#D9B4A4] text-[#3B302C] text-[9px] font-mono font-bold flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </button>

          {/* Mobile menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#3B302C]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 bg-[#FAF7F1] border-b border-[#E9E1D4] p-6 space-y-4 text-xs uppercase tracking-widest text-[#3B302C] shadow-lg animate-in fade-in slide-in-from-top-2">
          <a
            href="#celebration-services"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 border-b border-[#E9E1D4] hover:text-[#536336]"
          >
            Our Services & Bouquets
          </a>
          <a
            href="#celebration-gallery"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 border-b border-[#E9E1D4] hover:text-[#536336]"
          >
            Celebration Gallery
          </a>
          <a
            href="#celebration-experience"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 border-b border-[#E9E1D4] hover:text-[#536336]"
          >
            Custom Floral Process
          </a>
          <a
            href="#celebration-enquiry"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 border-b border-[#E9E1D4] hover:text-[#536336]"
          >
            Event Enquiry Form
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              openEnquiry();
            }}
            className="w-full py-3 bg-[#536336] text-white rounded-full text-center text-xs font-semibold tracking-widest uppercase transition mt-2"
          >
            Enquire About An Event ↗
          </button>
        </div>
      )}
    </nav>
  );
};
