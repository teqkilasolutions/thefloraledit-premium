import React from 'react';
import { Sparkles, Flower2 } from 'lucide-react';

export const AtelierPhilosophy: React.FC = () => {

  return (
    <section id="atelier-philosophy" className="py-24 sm:py-32 bg-[#F8F6EF] text-[#26382C] relative overflow-hidden border-b border-[#E9E1D4]">
      {/* Decorative hairline grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Manifesto (7 cols) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <span className="text-[11px] font-sans uppercase tracking-[0.3em] text-[#536336] font-semibold block">
              Atelier Manifesto · Volume I
            </span>

            <h2 className="text-4xl sm:text-6xl font-serif text-[#26382C] leading-[1.05]">
              Flowers are not decoration. <br />
              <span className="italic font-light text-[#536336]">They are emotional architecture.</span>
            </h2>

            <p className="text-base sm:text-lg font-serif text-[#3E5244] leading-relaxed">
              In an age of synthetic saturation, true luxury is the quiet presence of living beauty: the arch of a single stem, the textured cool of raw clay, the deliberate pause between blooms.
            </p>

            <div className="space-y-4 pt-4 text-xs sm:text-sm text-[#556458] leading-relaxed border-t border-[#E9E1D4]">
              <p>
                We do not create symmetrical, crowded bouquets that wilt into uniformity. We sculpt with wild lines, negative space, and heirloom botanicals that breathe with the architecture of your home.
              </p>
              <p>
                Every stoneware vessel is wheel-thrown in our Delhi studio and fired to an exacting vitrification point, allowing it to hold water indefinitely while remaining matte and tactile to the touch.
              </p>
            </div>

            <div className="pt-4 flex items-center gap-8 text-xs font-mono text-[#536336]">
              <span className="flex items-center gap-2">
                <Flower2 className="w-4 h-4" />
                Raw Earth Stoneware
              </span>
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                No Floral Foam Ever
              </span>
            </div>
          </div>

          {/* Right Editorial Image Panel (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-[#E9E1D4] aspect-[4/5] border-4 border-white group">
              <img
                src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1000&q=85"
                alt="Wren bud vase in morning studio light"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                <p className="text-xs font-serif italic">
                  “The stem chooses where it wishes to lean. We merely provide the vessel.”
                </p>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#E9E1D4] mt-1">
                  The Floral Edit Studio Notebook
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
