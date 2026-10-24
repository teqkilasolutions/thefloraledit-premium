import React from 'react';

interface ThreadDividerProps {
  className?: string;
}

export const ThreadDivider: React.FC<ThreadDividerProps> = ({ className = '' }) => {
  return (
    <div className={`relative w-full py-8 overflow-hidden select-none pointer-events-none ${className}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-center">
        {/* Animated thin gold thread running across */}
        <div className="relative w-full flex items-center justify-center">
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#B9975B]/40 to-transparent" />
          {/* Subtle central stitch node */}
          <div className="absolute w-2 h-2 rounded-full border border-[#B9975B]/60 bg-[#F7F3EC] flex items-center justify-center">
            <div className="w-0.5 h-0.5 rounded-full bg-[#B9975B]" />
          </div>
        </div>
      </div>
    </div>
  );
};
