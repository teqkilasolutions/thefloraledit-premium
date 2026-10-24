import React from 'react';
import { usePresentation, type FrameworkId } from '../../context/PresentationContext';
import { FRAMEWORK_SPECS } from '../../data/frameworkSpecs';
import { X, Check, Eye } from 'lucide-react';

export const ComparisonModal: React.FC = () => {
  const { isComparisonOpen, setIsComparisonOpen, activeFramework, setActiveFramework } = usePresentation();

  if (!isComparisonOpen) return null;

  const frameworks: FrameworkId[] = ['garden', 'atelier', 'celebration'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md p-4 sm:p-6 flex items-center justify-center">
      <div className="w-full max-w-6xl bg-[#151C16] border border-[#2E3C30] text-[#F8F6EF] rounded-2xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#2A372C] flex items-center justify-between bg-[#111712]">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#AAB39A] font-bold">
              EXECUTIVE EVALUATION MATRIX · 2026
            </span>
            <h2 className="text-xl sm:text-2xl font-serif text-white mt-1">
              Three Website Design Frameworks for The Floral Edit
            </h2>
            <p className="text-xs text-[#AAB39A] mt-1">
              Select any framework below to immediately load and interact with its full-scale prototype.
            </p>
          </div>
          <button
            onClick={() => setIsComparisonOpen(false)}
            className="p-2 rounded-full hover:bg-[#253026] text-[#AAB39A] hover:text-white transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* 3 Columns Comparison */}
        <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {frameworks.map(id => {
            const spec = FRAMEWORK_SPECS[id];
            const isSelected = activeFramework === id;

            return (
              <div
                key={id}
                className={`flex flex-col justify-between rounded-xl p-5 border transition-all ${
                  isSelected
                    ? 'border-[#536336] bg-[#1E2920] shadow-xl ring-2 ring-[#536336]'
                    : 'border-[#2E3C30] bg-[#18211A] hover:border-[#3E5040]'
                }`}
              >
                <div className="space-y-4">
                  {/* Top Badge */}
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-[#2E3C30] text-[#D8DACF]">
                      CONCEPT {spec.number}
                    </span>
                    {isSelected && (
                      <span className="text-[11px] font-medium text-emerald-400 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Currently Active
                      </span>
                    )}
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h3 className="text-xl font-serif text-white">{spec.name}</h3>
                    <p className="text-xs text-[#AAB39A] mt-0.5">{spec.tagline}</p>
                  </div>

                  {/* Positioning */}
                  <p className="text-xs text-[#E9E1D4] leading-relaxed">
                    {spec.positioning}
                  </p>

                  {/* Color Chips */}
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#AAB39A] font-semibold block mb-1.5">
                      Signature Palette
                    </span>
                    <div className="flex gap-1.5">
                      {spec.colors.slice(0, 5).map(c => (
                        <div
                          key={c.hex}
                          className="w-7 h-7 rounded border border-black/30 shadow-sm flex items-center justify-center text-[8px] font-mono"
                          style={{ backgroundColor: c.hex }}
                          title={`${c.name}: ${c.hex}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Typography Pairing */}
                  <div className="p-3 rounded-lg bg-[#121813] border border-[#243026]">
                    <span className="text-[10px] uppercase tracking-wider text-[#AAB39A] font-semibold block mb-1">
                      Typography Hierarchy
                    </span>
                    <div className="text-sm font-serif text-white">{spec.typography.headlineFont}</div>
                    <div className="text-xs font-sans text-[#AAB39A] mt-0.5">{spec.typography.bodyFont}</div>
                  </div>

                  {/* Key Differentiators */}
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#AAB39A] font-semibold block mb-1.5">
                      Visual Signature
                    </span>
                    <ul className="space-y-1.5 text-xs text-[#D8DACF]">
                      {spec.keyDifferentiators.map((diff, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-[#536336] mt-0.5">▪</span>
                          <span>{diff}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Strategic Fit */}
                  <div className="pt-2 border-t border-[#2A372C]">
                    <span className="text-[10px] uppercase tracking-wider text-[#AAB39A] font-semibold block mb-1">
                      Best Suited For
                    </span>
                    <p className="text-[11px] text-[#AAB39A] italic">
                      {spec.bestSuitedFor}
                    </p>
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="mt-6 pt-4 border-t border-[#2A372C]">
                  <button
                    onClick={() => {
                      setActiveFramework(id);
                      setIsComparisonOpen(false);
                    }}
                    className={`w-full py-2.5 px-4 rounded-lg text-xs font-semibold tracking-wider uppercase transition flex items-center justify-center gap-2 ${
                      isSelected
                        ? 'bg-[#536336] text-white hover:bg-[#627540]'
                        : 'bg-[#2E3C30] text-[#F8F6EF] hover:bg-[#3D4F40]'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    {isSelected ? 'Continue In This View' : `Select Concept ${spec.number}`}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
