import React from 'react';
import { Wifi, BatteryMedium, Signal } from 'lucide-react';

interface MobileDeviceFrameProps {
  children: React.ReactNode;
}

export const MobileDeviceFrame: React.FC<MobileDeviceFrameProps> = ({ children }) => {
  return (
    <div className="min-h-screen py-8 px-4 flex items-center justify-center bg-[#0D120E]">
      {/* iPhone 16 Pro Mockup Chassis */}
      <div className="relative w-full max-w-[390px] h-[844px] bg-black rounded-[52px] p-3 shadow-[0_25px_70px_rgba(0,0,0,0.85)] ring-1 ring-white/10 flex flex-col justify-between overflow-hidden">
        {/* Dynamic Island & Speaker */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-40 flex items-center justify-between px-2.5 pointer-events-none">
          <div className="w-2.5 h-2.5 rounded-full bg-[#111] ring-1 ring-white/10" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#0a120b] ring-1 ring-emerald-500/30" />
        </div>

        {/* Screen Content Wrapper */}
        <div className="w-full h-full bg-white rounded-[42px] overflow-hidden flex flex-col relative z-20">
          {/* iOS Top Status Bar */}
          <div className="h-11 bg-transparent px-7 flex items-center justify-between text-[11px] font-semibold text-[#1B231C] select-none z-30 shrink-0">
            <span>9:41</span>
            <div className="flex items-center gap-1.5 opacity-80">
              <Signal className="w-3.5 h-3.5" />
              <Wifi className="w-3.5 h-3.5" />
              <BatteryMedium className="w-4 h-4" />
            </div>
          </div>

          {/* Interactive Screen Scroll Container */}
          <div className="flex-1 overflow-y-auto overscroll-contain custom-scrollbar-subtle -mt-11 pt-11">
            {children}
          </div>

          {/* iOS Bottom Home Bar */}
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-[#1B231C]/40 rounded-full z-40 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};
