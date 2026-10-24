import React from 'react';
import { VelvetLoomLogo } from './VelvetLoomLogo';

interface FooterProps {
  onOpenSizeGuide: () => void;
  onSelectCategory: (category: string) => void;
  onSelectOccasion: (occasion: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenSizeGuide,
  onSelectCategory,
  onSelectOccasion,
}) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#321F25] text-[#F7F3EC] pt-20 sm:pt-28 pb-16 border-t border-[#B9975B]/20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Five Footer Columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-8 pb-16 border-b border-[#F7F3EC]/10">
          
          {/* SHOP */}
          <div>
            <h4 className="text-[11px] font-sans tracking-[0.25em] text-[#B9975B] uppercase font-semibold mb-6">
              SHOP
            </h4>
            <ul className="space-y-3 font-sans text-xs tracking-wider text-[#F7F3EC]/80">
              <li>
                <button
                  onClick={() => scrollTo('new-arrivals')}
                  className="hover:text-[#D4BD8A] transition-colors"
                >
                  New Arrivals
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Anarkalis')}
                  className="hover:text-[#D4BD8A] transition-colors"
                >
                  Anarkalis
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Shararas')}
                  className="hover:text-[#D4BD8A] transition-colors"
                >
                  Sharara Suits
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Straight Suits')}
                  className="hover:text-[#D4BD8A] transition-colors"
                >
                  Straight Suits
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Indo-Westerns')}
                  className="hover:text-[#D4BD8A] transition-colors"
                >
                  Indo-Westerns
                </button>
              </li>
            </ul>
          </div>

          {/* COLLECTIONS */}
          <div>
            <h4 className="text-[11px] font-sans tracking-[0.25em] text-[#B9975B] uppercase font-semibold mb-6">
              COLLECTIONS
            </h4>
            <ul className="space-y-3 font-sans text-xs tracking-wider text-[#F7F3EC]/80">
              <li>
                <button
                  onClick={() => onSelectOccasion('THE WEDDING EDIT')}
                  className="hover:text-[#D4BD8A] transition-colors"
                >
                  Wedding
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectOccasion('THE FESTIVE EDIT')}
                  className="hover:text-[#D4BD8A] transition-colors"
                >
                  Festive
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectOccasion('THE CELEBRATION EDIT')}
                  className="hover:text-[#D4BD8A] transition-colors"
                >
                  Celebration
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectOccasion('THE EVERYDAY EDIT')}
                  className="hover:text-[#D4BD8A] transition-colors"
                >
                  Everyday
                </button>
              </li>
            </ul>
          </div>

          {/* HELP */}
          <div>
            <h4 className="text-[11px] font-sans tracking-[0.25em] text-[#B9975B] uppercase font-semibold mb-6">
              HELP
            </h4>
            <ul className="space-y-3 font-sans text-xs tracking-wider text-[#F7F3EC]/80">
              <li>
                <button
                  onClick={onOpenSizeGuide}
                  className="hover:text-[#D4BD8A] transition-colors"
                >
                  Size Guide
                </button>
              </li>
              <li>
                <a href="#shipping" className="hover:text-[#D4BD8A] transition-colors">
                  Shipping & Courier
                </a>
              </li>
              <li>
                <a href="#track" className="hover:text-[#D4BD8A] transition-colors">
                  Track Order
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#D4BD8A] transition-colors">
                  Atelier Concierge
                </a>
              </li>
            </ul>
          </div>

          {/* ABOUT */}
          <div>
            <h4 className="text-[11px] font-sans tracking-[0.25em] text-[#B9975B] uppercase font-semibold mb-6">
              ABOUT
            </h4>
            <ul className="space-y-3 font-sans text-xs tracking-wider text-[#F7F3EC]/80">
              <li>
                <button
                  onClick={() => scrollTo('brand-story')}
                  className="hover:text-[#D4BD8A] transition-colors"
                >
                  Our Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('craftsmanship')}
                  className="hover:text-[#D4BD8A] transition-colors"
                >
                  Craftsmanship
                </button>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#D4BD8A] transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#D4BD8A] transition-colors">
                  Studio Appointments
                </a>
              </li>
            </ul>
          </div>

          {/* LEGAL */}
          <div className="col-span-2 sm:col-span-1">
            <h4 className="text-[11px] font-sans tracking-[0.25em] text-[#B9975B] uppercase font-semibold mb-6">
              LEGAL
            </h4>
            <ul className="space-y-3 font-sans text-xs tracking-wider text-[#F7F3EC]/80">
              <li>
                <a href="#privacy" className="hover:text-[#D4BD8A] transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-[#D4BD8A] transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#refund" className="hover:text-[#D4BD8A] transition-colors">
                  Refund Policy
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Section with Centered Logo Brand Identity */}
        <div className="pt-16 flex flex-col items-center justify-center text-center">
          
          <div className="mb-6 opacity-95">
            <VelvetLoomLogo variant="dark" size="md" />
          </div>

          <div className="w-12 h-px bg-[#B9975B] mb-6 opacity-60" />

          <p className="text-[11px] font-sans tracking-[0.24em] uppercase text-[#D4BD8A] mb-2 font-medium">
            WEAVING STYLE, DEFINING ELEGANCE
          </p>

          <p className="text-[10px] font-sans tracking-[0.18em] text-[#F7F3EC]/50 uppercase">
            &copy; {new Date().getFullYear()} VELVET LOOM ATELIER. ALL RIGHTS RESERVED.
          </p>

          <div className="flex items-center space-x-4 mt-6 text-[10px] font-sans tracking-widest text-[#F7F3EC]/40 uppercase">
            <span>SECURE CHECKOUT</span>
            <span>&middot;</span>
            <span>WORLDWIDE DHL EXPRESS</span>
            <span>&middot;</span>
            <span>AUTHENTIC HANDLOOM CERTIFIED</span>
          </div>

        </div>

      </div>
    </footer>
  );
};
