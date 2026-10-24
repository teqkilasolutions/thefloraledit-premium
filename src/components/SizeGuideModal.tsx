import React, { useState } from 'react';
import { X, Sparkles } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');

  if (!isOpen) return null;

  const sizingData = [
    { size: 'XS', bustIn: '32 - 33', waistIn: '25 - 26', hipIn: '35 - 36', lengthIn: '48', bustCm: '81 - 84', waistCm: '64 - 66', hipCm: '89 - 91', lengthCm: '122' },
    { size: 'S', bustIn: '34 - 35', waistIn: '27 - 28', hipIn: '37 - 38', lengthIn: '48', bustCm: '86 - 89', waistCm: '69 - 71', hipCm: '94 - 97', lengthCm: '122' },
    { size: 'M', bustIn: '36 - 37', waistIn: '29 - 30', hipIn: '39 - 40', lengthIn: '49', bustCm: '91 - 94', waistCm: '74 - 76', hipCm: '99 - 102', lengthCm: '124' },
    { size: 'L', bustIn: '38 - 40', waistIn: '31 - 33', hipIn: '41 - 43', lengthIn: '49', bustCm: '97 - 102', waistCm: '79 - 84', hipCm: '104 - 109', lengthCm: '124' },
    { size: 'XL', bustIn: '41 - 43', waistIn: '34 - 36', hipIn: '44 - 46', lengthIn: '50', bustCm: '104 - 109', waistCm: '86 - 91', hipCm: '112 - 117', lengthCm: '127' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-[#321F25]/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="min-h-screen px-4 flex items-center justify-center py-10">
        <div className="w-full max-w-2xl bg-[#F7F3EC] shadow-2xl p-6 sm:p-10 relative z-10 border border-[#241D1A]/10">
          
          <div className="flex items-center justify-between pb-6 border-b border-[#241D1A]/10 mb-6">
            <div>
              <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#5A2935] font-semibold block mb-1">
                ATELIER STANDARDS
              </span>
              <h3 className="font-editorial text-3xl text-[#241D1A] font-light">
                SIZE & FIT GUIDE
              </h3>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full flex items-center justify-center text-[#241D1A] hover:bg-[#E8DED1] transition-colors"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>

          {/* Unit Toggle */}
          <div className="flex justify-end mb-6">
            <div className="inline-flex border border-[#241D1A]/20 p-0.5 bg-white/40">
              <button
                onClick={() => setUnit('inches')}
                className={`px-3 py-1 text-xs font-sans tracking-wider uppercase transition-colors ${
                  unit === 'inches' ? 'bg-[#321F25] text-[#F7F3EC]' : 'text-[#241D1A]'
                }`}
              >
                INCHES
              </button>
              <button
                onClick={() => setUnit('cm')}
                className={`px-3 py-1 text-xs font-sans tracking-wider uppercase transition-colors ${
                  unit === 'cm' ? 'bg-[#321F25] text-[#F7F3EC]' : 'text-[#241D1A]'
                }`}
              >
                CENTIMETERS
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-left font-sans text-xs">
              <thead>
                <tr className="border-b border-[#241D1A]/15 text-[#82756C] tracking-widest uppercase text-[10px]">
                  <th className="py-3 px-2">SIZE</th>
                  <th className="py-3 px-2">BUST</th>
                  <th className="py-3 px-2">WAIST</th>
                  <th className="py-3 px-2">HIP</th>
                  <th className="py-3 px-2">LENGTH</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#241D1A]/10 text-[#241D1A]">
                {sizingData.map((row) => (
                  <tr key={row.size} className="hover:bg-white/40">
                    <td className="py-3 px-2 font-semibold text-[#5A2935]">{row.size}</td>
                    <td className="py-3 px-2">{unit === 'inches' ? row.bustIn : row.bustCm}</td>
                    <td className="py-3 px-2">{unit === 'inches' ? row.waistIn : row.waistCm}</td>
                    <td className="py-3 px-2">{unit === 'inches' ? row.hipIn : row.hipCm}</td>
                    <td className="py-3 px-2">{unit === 'inches' ? row.lengthIn : row.lengthCm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bespoke Made-to-Measure Note */}
          <div className="bg-[#E8DED1]/70 p-5 border border-[#B9975B]/20 flex items-start space-x-3 text-xs font-sans">
            <Sparkles size={16} className="text-[#B9975B] flex-shrink-0 mt-0.5" />
            <div>
              <strong className="block text-[#321F25] uppercase tracking-wider mb-1 font-semibold">
                BESPOKE ATELIER FIT
              </strong>
              <p className="text-[#241D1A]/80 leading-relaxed font-light">
                Prefer made-to-measure? Select &quot;Custom Atelier&quot; on any garment or leave your exact bust, waist, high hip, and height measurements in the cart notes. Our New Delhi studio tailors will verify specifications prior to cutting.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
