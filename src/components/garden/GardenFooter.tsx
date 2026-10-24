import React from 'react';
import { FloralEditLogo } from '../brand/FloralEditLogo';
import { usePresentation } from '../../context/PresentationContext';

export const GardenFooter: React.FC = () => {
  const { openEnquiry } = usePresentation();

  return (
    <footer className="bg-[#26382C] text-[#F8F6EF] pt-16 pb-12 border-t border-[#34493B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 sm:gap-14 pb-12 border-b border-[#34493B]">
          {/* Brand info (4 cols) */}
          <div className="md:col-span-5 space-y-4">
            <FloralEditLogo variant="white-transparent" className="h-12 w-auto" />
            <p className="text-xs text-[#AAB39A] leading-relaxed max-w-sm pt-2">
              A contemporary floral design atelier based in Delhi NCR. Composing hand-glazed stoneware vessels, bespoke bouquets, and architectural event installations.
            </p>
            <div className="pt-2 text-xs text-[#E9E1D4] space-y-1">
              <p>Studio: Chhatarpur & Defence Colony, New Delhi</p>
              <p>Direct: atelier@thefloraledit.com</p>
            </div>
          </div>

          {/* Nav links (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#AAB39A] font-semibold">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-[#E9E1D4]">
              <li><a href="#collections" className="hover:text-white transition">Stoneware Vases</a></li>
              <li><a href="#collections" className="hover:text-white transition">Bespoke Bouquets</a></li>
              <li><a href="#collections" className="hover:text-white transition">The Amphora Series</a></li>
              <li><a href="#collections" className="hover:text-white transition">Theme Pots & Vases</a></li>
            </ul>
          </div>

          {/* Services (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#AAB39A] font-semibold">
              Services
            </h4>
            <ul className="space-y-2 text-xs text-[#E9E1D4]">
              <li>
                <button onClick={() => openEnquiry('Wedding Florals')} className="hover:text-white transition text-left">
                  Weddings & Celebrations
                </button>
              </li>
              <li>
                <button onClick={() => openEnquiry('Private Dinners')} className="hover:text-white transition text-left">
                  Private Dinner Tablescapes
                </button>
              </li>
              <li>
                <button onClick={() => openEnquiry('Hospitality & Space')} className="hover:text-white transition text-left">
                  Hospitality & Commercial Spaces
                </button>
              </li>
              <li>
                <button onClick={() => openEnquiry('Corporate Gifting')} className="hover:text-white transition text-left">
                  Corporate Floral Gifting
                </button>
              </li>
            </ul>
          </div>

          {/* Atelier Note (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#AAB39A] font-semibold">
              Atelier Hours
            </h4>
            <div className="text-xs text-[#E9E1D4] space-y-1">
              <p>Tuesday — Sunday</p>
              <p className="text-[#AAB39A]">10:00 AM — 7:00 PM</p>
              <p className="text-[10px] text-[#AAB39A] pt-1">Consultations by private appointment</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#AAB39A] gap-4">
          <p>© 2026 THE FLORAL EDIT. All rights reserved.</p>
          <p className="font-mono text-[10px]">Framework 01: The Editorial Garden · Designed for TEQKILA</p>
        </div>
      </div>
    </footer>
  );
};
