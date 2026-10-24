import React, { useState } from 'react';
import { FloralEditLogo } from '../brand/FloralEditLogo';
import { usePresentation } from '../../context/PresentationContext';
import { ShoppingBag, ArrowUpRight, Menu, X } from 'lucide-react';

export const AtelierNav: React.FC = () => {
  const { openEnquiry, cartItems, setIsCartOpen } = usePresentation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 bg-[#26382C]/95 backdrop-blur-md border-b border-[#364D3D] text-[#F8F6EF] py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
        {/* Brand Logo & Wordmark (Luminous White Variant) */}
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center gap-2 group">
            <FloralEditLogo
              variant="white-transparent"
              className="h-8 sm:h-11 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </a>
        </div>

        {/* Minimal Editorial Links (Desktop) */}
        <div className="hidden md:flex items-center gap-9 text-xs font-sans tracking-[0.25em] uppercase text-[#E9E1D4]">
          <a href="#atelier-collections" className="hover:text-white transition">
            Collections
          </a>
          <a href="#atelier-work" className="hover:text-white transition">
            Selected Work
          </a>
          <a href="#atelier-philosophy" className="hover:text-white transition">
            Philosophy
          </a>
          <a href="#atelier-projects" className="hover:text-white transition">
            Bespoke Projects
          </a>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4 sm:gap-6">
          <button
            onClick={() => openEnquiry('The Botanical Atelier')}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 border border-[#B8A276]/60 text-[#B8A276] hover:bg-[#B8A276] hover:text-[#26382C] rounded text-xs font-sans uppercase tracking-widest font-semibold transition"
          >
            <span>Enquire</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Bag */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-[#F8F6EF] hover:text-[#B8A276] transition"
            aria-label="Shopping Bag"
          >
            <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
            {cartItems.length > 0 && (
              <span className="absolute top-1 right-0 w-4 h-4 rounded-full bg-[#B8A276] text-[#26382C] text-[9px] font-mono font-bold flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </button>

          {/* Mobile menu */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-white hover:text-[#B8A276]"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 bg-[#26382C] border-b border-[#364D3D] p-6 space-y-4 text-xs uppercase tracking-widest text-[#E9E1D4] animate-in fade-in slide-in-from-top-2">
          <a
            href="#atelier-collections"
            onClick={() => setMenuOpen(false)}
            className="block py-2 border-b border-[#364D3D] hover:text-white"
          >
            01 Signature Collections
          </a>
          <a
            href="#atelier-work"
            onClick={() => setMenuOpen(false)}
            className="block py-2 border-b border-[#364D3D] hover:text-white"
          >
            02 Selected Work & Gallery
          </a>
          <a
            href="#atelier-philosophy"
            onClick={() => setMenuOpen(false)}
            className="block py-2 border-b border-[#364D3D] hover:text-white"
          >
            03 Our Philosophy
          </a>
          <a
            href="#atelier-projects"
            onClick={() => setMenuOpen(false)}
            className="block py-2 border-b border-[#364D3D] hover:text-white"
          >
            04 Bespoke Commissions
          </a>
          <button
            onClick={() => {
              setMenuOpen(false);
              openEnquiry();
            }}
            className="w-full py-3 bg-[#B8A276] text-[#26382C] rounded font-semibold text-center text-xs tracking-widest uppercase transition mt-2"
          >
            Create Something Bespoke ↗
          </button>
        </div>
      )}
    </nav>
  );
};
