import React from 'react';
import { FloralEditLogo } from '../brand/FloralEditLogo';
import { usePresentation } from '../../context/PresentationContext';

export const CelebrationFooter: React.FC = () => {
  const { openEnquiry } = usePresentation();

  return (
    <footer className="bg-[#3B302C] text-[#FAF7F1] py-16 border-t border-[#4E413C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#4E413C]">
          <div className="md:col-span-5 space-y-4">
            <FloralEditLogo variant="white-transparent" className="h-12 w-auto" />
            <p className="text-xs text-[#D9B4A4] leading-relaxed max-w-sm pt-2">
              A romantic celebration floral house composing wedding mandaps, tablescapes, and handcrafted ceramic vessels for moments that deserve more.
            </p>
            <div className="pt-2 text-xs text-[#FAF7F1]/80 space-y-1">
              <p>Studio & Floral Kitchen: Chhatarpur, New Delhi</p>
              <p>celebrations@thefloraledit.com · +91 98110 34821</p>
            </div>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h4 className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#D9B4A4] font-semibold">
              Celebration Offerings
            </h4>
            <ul className="space-y-2 text-xs text-[#FAF7F1]/80">
              <li><button onClick={() => openEnquiry('Wedding Mandaps')} className="hover:text-white transition text-left">Wedding Mandaps & Stages</button></li>
              <li><button onClick={() => openEnquiry('Dining Tablescapes')} className="hover:text-white transition text-left">Dining Tablescapes & Candlelight</button></li>
              <li><button onClick={() => openEnquiry('Bespoke Gifting')} className="hover:text-white transition text-left">Celebration Floral Gifting</button></li>
              <li><button onClick={() => openEnquiry('Destination Floristry')} className="hover:text-white transition text-left">Destination Wedding Direction</button></li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3">
            <h4 className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#D9B4A4] font-semibold">
              The Celebration Journal
            </h4>
            <p className="text-xs text-[#FAF7F1]/70 leading-relaxed">
              Subscribe to receive seasonal flower arrival notices, tabletop styling guides, and private exhibition invitations.
            </p>
            <div className="flex gap-2 pt-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border border-white/20 rounded-full px-4 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#D9B4A4] flex-1"
              />
              <button className="px-5 py-2 bg-[#536336] hover:bg-[#43502B] text-white rounded-full text-xs font-semibold uppercase tracking-wider transition">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#D9B4A4] gap-4">
          <p>© 2026 THE FLORAL EDIT. All rights reserved.</p>
          <p className="font-mono text-[10px]">Framework 03: The Celebration House · Designed by TEQKILA</p>
        </div>
      </div>
    </footer>
  );
};
