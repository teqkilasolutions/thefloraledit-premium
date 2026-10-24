import React from 'react';
import { usePresentation, type FrameworkId } from '../../context/PresentationContext';
import { Monitor, Smartphone, Sliders, SplitSquareVertical, ArrowUpRight } from 'lucide-react';

export const PresentationHeader: React.FC = () => {
  const {
    activeFramework,
    setActiveFramework,
    viewportMode,
    setViewportMode,
    isSpecsOpen,
    setIsSpecsOpen,
    setIsComparisonOpen,
    openEnquiry
  } = usePresentation();

  const frameworks: { id: FrameworkId; label: string; short: string; number: string }[] = [
    { id: 'garden', number: '01', label: 'The Editorial Garden', short: 'Garden' },
    { id: 'atelier', number: '02', label: 'The Botanical Atelier', short: 'Atelier' },
    { id: 'celebration', number: '03', label: 'The Celebration House', short: 'Celebration' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#121813] border-b border-[#263528] text-[#F8F6EF] px-3 sm:px-6 py-2 shadow-2xl backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5">
        {/* Top row on mobile / Left on desktop */}
        <div className="flex items-center justify-between w-full md:w-auto gap-2">
          <div className="flex items-center gap-2">
            <span className="h-5 px-1.5 text-[9px] uppercase tracking-widest font-bold bg-[#536336] text-[#F8F6EF] rounded flex items-center">
              TEQKILA
            </span>
            <span className="text-[11px] sm:text-xs font-semibold tracking-wide text-white">
              THE FLORAL EDIT <span className="text-[#AAB39A] font-normal hidden lg:inline">· 2026 Frameworks</span>
            </span>
          </div>

          {/* Quick utility buttons on mobile */}
          <div className="flex items-center gap-1.5 md:hidden">
            <button
              onClick={() => setIsSpecsOpen(!isSpecsOpen)}
              className="px-2 py-1 bg-[#1E2920] border border-[#2E3C30] text-[10px] uppercase tracking-wider text-[#AAB39A] rounded hover:text-white flex items-center gap-1"
            >
              <Sliders className="w-3 h-3 text-[#536336]" />
              Specs
            </button>
            <button
              onClick={() => setIsComparisonOpen(true)}
              className="px-2 py-1 bg-[#1E2920] border border-[#2E3C30] text-[10px] uppercase tracking-wider text-[#AAB39A] rounded hover:text-white flex items-center gap-1"
            >
              <SplitSquareVertical className="w-3 h-3" />
              Compare
            </button>
            <button
              onClick={() => openEnquiry()}
              className="px-2 py-1 bg-[#536336] text-white text-[10px] uppercase tracking-wider font-semibold rounded flex items-center gap-0.5"
            >
              Enquire
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Center: Framework Switcher (Optimized for Mobile Touch) */}
        <div className="flex items-center justify-center w-full md:w-auto bg-[#182119] p-1 rounded-full border border-[#29382B]">
          {frameworks.map(fw => {
            const isActive = activeFramework === fw.id;
            return (
              <button
                key={fw.id}
                onClick={() => setActiveFramework(fw.id)}
                className={`flex-1 md:flex-none px-2.5 sm:px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-medium tracking-wide transition-all whitespace-nowrap flex items-center justify-center gap-1.5 ${
                  isActive
                    ? 'bg-[#536336] text-white shadow font-semibold'
                    : 'text-[#AAB39A] hover:text-white'
                }`}
              >
                <span className={`text-[9px] font-mono px-1 py-0.2 rounded ${
                  isActive ? 'bg-[#3A4526] text-white' : 'bg-[#121813] text-[#AAB39A]'
                }`}>
                  {fw.number}
                </span>
                <span className="sm:hidden">{fw.short}</span>
                <span className="hidden sm:inline">{fw.label}</span>
                {isActive && (
                  <span className="h-1.5 w-1.5 rounded-full bg-[#E9E1D4] animate-pulse hidden sm:inline-block" />
                )}
              </button>
            );
          })}
        </div>

        {/* Desktop-only Right Tools */}
        <div className="hidden md:flex items-center gap-2">
          {/* Viewport switch */}
          <div className="flex items-center bg-[#182119] p-0.5 rounded-lg border border-[#29382B]">
            <button
              onClick={() => setViewportMode('desktop')}
              className={`p-1.5 rounded flex items-center gap-1 text-xs transition ${
                viewportMode === 'desktop'
                  ? 'bg-[#536336] text-white font-medium'
                  : 'text-[#AAB39A] hover:text-white'
              }`}
              title="Desktop View"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="text-[11px]">Desktop</span>
            </button>
            <button
              onClick={() => setViewportMode('mobile')}
              className={`p-1.5 rounded flex items-center gap-1 text-xs transition ${
                viewportMode === 'mobile'
                  ? 'bg-[#536336] text-white font-medium'
                  : 'text-[#AAB39A] hover:text-white'
              }`}
              title="Simulated iPhone Frame"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="text-[11px]">iPhone Preview</span>
            </button>
          </div>

          {/* Specs */}
          <button
            onClick={() => setIsSpecsOpen(!isSpecsOpen)}
            className={`p-1.5 px-2.5 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition ${
              isSpecsOpen
                ? 'bg-[#E9E1D4] text-[#141A15] border-[#E9E1D4]'
                : 'bg-[#182119] text-[#F8F6EF] border-[#29382B] hover:border-[#536336]'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span className="text-[11px]">Design Specs</span>
          </button>

          {/* Compare */}
          <button
            onClick={() => setIsComparisonOpen(true)}
            className="p-1.5 px-2.5 rounded-lg border border-[#29382B] bg-[#182119] text-[#F8F6EF] hover:border-[#536336] text-xs font-medium flex items-center gap-1.5 transition"
          >
            <SplitSquareVertical className="w-3.5 h-3.5" />
            <span className="text-[11px]">Compare</span>
          </button>
        </div>
      </div>
    </header>
  );
};
