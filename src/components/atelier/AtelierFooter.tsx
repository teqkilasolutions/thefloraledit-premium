import React from 'react';
import { FloralEditLogo } from '../brand/FloralEditLogo';

export const AtelierFooter: React.FC = () => {

  return (
    <footer className="bg-[#18231C] text-[#F8F6EF] py-16 border-t border-[#2A3B2F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#2A3B2F]">
          <div className="md:col-span-6 space-y-4">
            <FloralEditLogo variant="white-transparent" className="h-12 w-auto" />
            <p className="text-xs text-[#AAB39A] leading-relaxed max-w-md pt-2">
              An immersive botanical atelier celebrating sculptural flowers, raw stoneware, and monumental scale. Based in Delhi NCR, available for destination weddings and commissions worldwide.
            </p>
          </div>

          <div className="md:col-span-3 space-y-3">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#B8A276] block">
              Direct Contact
            </span>
            <div className="text-xs text-[#E9E1D4] space-y-1">
              <p>Private Atelier: Chhatarpur, New Delhi</p>
              <p>commissions@thefloraledit.com</p>
              <p>+91 (011) 4820-EDIT</p>
            </div>
          </div>

          <div className="md:col-span-3 space-y-3">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#B8A276] block">
              Atelier Calendar
            </span>
            <p className="text-xs text-[#C9D1B8] leading-relaxed">
              2026 Autumn & Winter wedding commissions currently open. Private consultations by appointment.
            </p>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#AAB39A] gap-4">
          <p>© 2026 THE FLORAL EDIT · Where Floral Meets Design</p>
          <p className="font-mono text-[10px] text-[#B8A276]">
            Framework 02: The Botanical Atelier · Presentation by TEQKILA
          </p>
        </div>
      </div>
    </footer>
  );
};
