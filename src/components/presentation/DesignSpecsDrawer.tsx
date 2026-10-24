import React, { useState } from 'react';
import { usePresentation } from '../../context/PresentationContext';
import { FRAMEWORK_SPECS } from '../../data/frameworkSpecs';
import { X, Copy, Check, Palette, Type, Layers } from 'lucide-react';

export const DesignSpecsDrawer: React.FC = () => {
  const { activeFramework, isSpecsOpen, setIsSpecsOpen } = usePresentation();
  const spec = FRAMEWORK_SPECS[activeFramework];
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  if (!isSpecsOpen) return null;

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end transition-opacity">
      <div className="w-full max-w-xl bg-[#18211A] text-[#F8F6EF] h-full shadow-2xl flex flex-col border-l border-[#2E3C30] animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#2A372C] flex items-center justify-between bg-[#131A14]">
          <div className="flex items-center gap-2.5">
            <span className="h-6 px-2 text-[11px] font-mono font-bold bg-[#536336] text-white rounded flex items-center">
              CONCEPT {spec.number}
            </span>
            <div>
              <h2 className="text-base font-serif font-medium text-white">{spec.name}</h2>
              <p className="text-xs text-[#AAB39A]">{spec.tagline}</p>
            </div>
          </div>
          <button
            onClick={() => setIsSpecsOpen(false)}
            className="p-2 rounded-full hover:bg-[#253026] text-[#AAB39A] hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-7 custom-scrollbar text-xs">
          {/* Positioning & Mood */}
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#AAB39A] font-semibold block mb-2">
              Creative Positioning
            </span>
            <p className="text-sm font-sans text-[#E9E1D4] leading-relaxed mb-3">
              {spec.positioning}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {spec.mood.map((m, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-[#232E24] text-[#C9D1B8] rounded-full text-[11px] border border-[#2E3C30]"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>

          {/* Color System */}
          <div className="border-t border-[#2A372C] pt-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] uppercase tracking-widest text-[#AAB39A] font-semibold flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-[#536336]" />
                Colour System & Swatches
              </span>
              <span className="text-[10px] text-[#AAB39A]">Click hex to copy</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {spec.colors.map(c => (
                <div
                  key={c.hex}
                  onClick={() => handleCopy(c.hex)}
                  className="p-3 rounded-lg border border-[#2E3C30] bg-[#1E271F] flex flex-col justify-between cursor-pointer hover:border-[#536336] transition group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-white text-xs">{c.name}</span>
                    <button className="text-[10px] font-mono text-[#AAB39A] group-hover:text-white flex items-center gap-1">
                      {copiedHex === c.hex ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                      )}
                      {c.hex}
                    </button>
                  </div>
                  <div
                    className="h-8 rounded w-full border border-black/20 flex items-center px-2 text-[10px] font-mono shadow-inner"
                    style={{ backgroundColor: c.hex, color: c.textColor }}
                  >
                    Preview
                  </div>
                  <p className="text-[10px] text-[#AAB39A] mt-2 line-clamp-1">{c.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Typography System */}
          <div className="border-t border-[#2A372C] pt-5">
            <span className="text-[10px] uppercase tracking-widest text-[#AAB39A] font-semibold flex items-center gap-1.5 mb-3">
              <Type className="w-3.5 h-3.5 text-[#536336]" />
              Typography System
            </span>
            <div className="space-y-3 bg-[#1E271F] p-4 rounded-lg border border-[#2E3C30]">
              <div>
                <span className="text-[10px] text-[#AAB39A] block mb-1">Headline Typography</span>
                <p className="text-xl font-serif text-white">{spec.typography.headlineSample}</p>
                <p className="text-[10px] text-[#C9D1B8] font-mono mt-0.5">{spec.typography.headlineFont}</p>
              </div>
              <div className="border-t border-[#2A372C] pt-2.5">
                <span className="text-[10px] text-[#AAB39A] block mb-1">Body & Interface Typography</span>
                <p className="text-xs font-sans text-[#E9E1D4] leading-relaxed">{spec.typography.bodySample}</p>
                <p className="text-[10px] text-[#C9D1B8] font-mono mt-0.5">{spec.typography.bodyFont}</p>
              </div>
              <p className="text-[11px] text-[#AAB39A] italic pt-1 border-t border-[#2A372C]">
                {spec.typography.rationale}
              </p>
            </div>
          </div>

          {/* Section-by-Section Plan */}
          <div className="border-t border-[#2A372C] pt-5">
            <span className="text-[10px] uppercase tracking-widest text-[#AAB39A] font-semibold flex items-center gap-1.5 mb-3">
              <Layers className="w-3.5 h-3.5 text-[#536336]" />
              Section-by-Section Wireframe Strategy
            </span>
            <div className="space-y-2">
              {spec.sectionPlan.map((s, idx) => (
                <div key={idx} className="p-3 bg-[#1E271F] rounded-lg border border-[#2E3C30]">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-[10px] text-[#536336] bg-[#2E3C30] px-1.5 py-0.5 rounded font-bold">
                      {s.number}
                    </span>
                    <span className="font-medium text-white text-xs">{s.name}</span>
                    <span className="text-[10px] text-[#AAB39A] ml-auto">({s.purpose})</span>
                  </div>
                  <p className="text-[11px] text-[#D8DACF] pl-6">{s.treatment}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Copy Deck & Motion */}
          <div className="border-t border-[#2A372C] pt-5 space-y-3">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#AAB39A] font-semibold block mb-1.5">
                Motion & Interaction Design
              </span>
              <p className="text-xs text-[#E9E1D4] leading-relaxed bg-[#1E271F] p-3 rounded-lg border border-[#2E3C30]">
                {spec.motionAndInteraction}
              </p>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#AAB39A] font-semibold block mb-1.5">
                Strategic Fit (Best Suited For)
              </span>
              <div className="p-3 rounded-lg bg-[#536336]/20 border border-[#536336]/40 text-xs text-[#F8F6EF]">
                {spec.bestSuitedFor}
              </div>
            </div>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-[#2A372C] bg-[#131A14] flex items-center justify-between">
          <span className="text-[11px] text-[#AAB39A]">TEQKILA Brand Strategy · 2026</span>
          <button
            onClick={() => setIsSpecsOpen(false)}
            className="px-4 py-2 bg-[#536336] hover:bg-[#61743F] text-white rounded text-xs font-medium transition"
          >
            Close Specs
          </button>
        </div>
      </div>
    </div>
  );
};
