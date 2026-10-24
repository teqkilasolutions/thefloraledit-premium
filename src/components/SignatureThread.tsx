import React, { useState } from 'react';
import { ArrowRight, Eye, Sparkles } from 'lucide-react';
import { EDITORIAL_ASSETS } from '../data/fashionData';

interface SignatureThreadProps {
  onDiscoverCraft: () => void;
}

const MACRO_SLIDES = [
  {
    id: 'embroidery',
    title: 'THE EMBROIDERY',
    technique: 'Marodi & Zardozi Needlework',
    description: 'Gold-dipped bullion wire guided by a 0.4mm needle, looped through silk without breaking the delicate warp.',
    image: EDITORIAL_ASSETS.macroEmbroidery,
    spec: '42,000 Micro-Stitches'
  },
  {
    id: 'silk',
    title: 'THE RAW SILK',
    technique: 'Handloom Mulberry Weave',
    description: 'Unprocessed natural filaments capturing ambient sunlight with irregular, tactile texture and soft drape.',
    image: EDITORIAL_ASSETS.macroFabric,
    spec: 'Grade 6A Mulberry Silk'
  },
  {
    id: 'tailoring',
    title: 'THE FINISHING',
    technique: 'French Seams & Bias Binding',
    description: 'Every internal edge is wrapped in pure habotai silk binding, ensuring garments feel as sublime on the skin as they appear in motion.',
    image: EDITORIAL_ASSETS.macroStitch,
    spec: 'Zero Raw Interior Seams'
  },
  {
    id: 'thread',
    title: 'THE THREAD SPOOL',
    technique: 'Double-Spun Lustre Yarn',
    description: 'Custom-dyed antique gold and champagne threads crafted exclusively for the Velvet Loom studio palette.',
    image: EDITORIAL_ASSETS.macroThread,
    spec: 'Custom Loom Gauge'
  }
];

export const SignatureThread: React.FC<SignatureThreadProps> = ({ onDiscoverCraft }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <section id="signature-thread" className="bg-[#E8DED1] py-24 sm:py-32 lg:py-40 relative overflow-hidden scroll-mt-28">
      
      {/* Subtle fine-line thread SVG illustration inspired by the logo needle/thread motif */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Continuous looping thread wave */}
          <path
            d="M-50,250 C300,100 550,550 850,300 C1100,100 1350,450 1500,280"
            stroke="#B9975B"
            strokeWidth="1.2"
            strokeDasharray="6 6"
            strokeOpacity="0.7"
          />
          <path
            d="M-100,600 C200,750 450,350 750,550 C1050,750 1300,400 1550,520"
            stroke="#B9975B"
            strokeWidth="0.8"
            strokeOpacity="0.5"
          />
          {/* Subtle needle emblem accent */}
          <g transform="translate(845, 298) rotate(-28)">
            <line x1="0" y1="0" x2="60" y2="0" stroke="#B9975B" strokeWidth="1.5" />
            <circle cx="5" cy="0" r="1.5" fill="#B9975B" />
          </g>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header & Headline */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <div className="inline-flex items-center space-x-3 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B9975B]" />
            <span className="text-xs font-sans tracking-[0.28em] uppercase text-[#5A2935] font-semibold">
              THE ATELIER CRAFT
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#B9975B]" />
          </div>

          <h2 className="font-editorial text-4xl sm:text-6xl lg:text-7xl leading-[1.05] text-[#241D1A] font-light mb-8">
            IT STARTS<br />
            <span className="italic font-normal text-[#5A2935]">WITH A THREAD.</span>
          </h2>

          <div className="max-w-lg mx-auto mb-10 space-y-2">
            <p className="font-editorial text-xl sm:text-2xl text-[#241D1A] italic font-light">
              A single thread becomes a detail.
            </p>
            <p className="font-editorial text-xl sm:text-2xl text-[#241D1A] italic font-light">
              A detail becomes a silhouette.
            </p>
            <p className="font-editorial text-xl sm:text-2xl text-[#5A2935] italic font-normal">
              A silhouette becomes your story.
            </p>
          </div>

          <button
            onClick={onDiscoverCraft}
            className="inline-flex items-center space-x-3 text-xs font-sans tracking-[0.24em] uppercase text-[#321F25] hover:text-[#5A2935] font-semibold transition-colors py-2 border-b border-[#321F25]/40 group"
          >
            <span>DISCOVER THE CRAFT</span>
            <ArrowRight size={15} className="text-[#B9975B] group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>

        {/* Interactive Macro Textile Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#F7F3EC]/70 backdrop-blur-sm p-6 sm:p-10 border border-[#B9975B]/20 shadow-sm">
          
          {/* Left: Active Macro Detail Image (4:3 or 1:1 on mobile, 4:5 on desktop) */}
          <div className="lg:col-span-7 relative overflow-hidden aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] group">
            <img
              src={MACRO_SLIDES[activeSlide].image}
              alt={MACRO_SLIDES[activeSlide].title}
              className="w-full h-full object-cover transition-transform duration-1000 ease-luxury group-hover:scale-105"
            />
            {/* Delicate border outline */}
            <div className="absolute inset-4 border border-[#F7F3EC]/40 pointer-events-none" />
            
            {/* Floating badge */}
            <div className="absolute top-6 left-6 bg-[#321F25]/90 text-[#F7F3EC] px-3.5 py-1.5 text-[10px] font-sans tracking-[0.2em] uppercase backdrop-blur-sm flex items-center space-x-2">
              <Eye size={12} className="text-[#B9975B]" />
              <span>MACRO INSPECTION</span>
            </div>

            <div className="absolute bottom-6 right-6 bg-[#F7F3EC]/90 text-[#241D1A] px-4 py-2 text-xs font-sans tracking-[0.16em] uppercase backdrop-blur-sm border border-[#241D1A]/10">
              <span className="font-semibold text-[#5A2935]">{MACRO_SLIDES[activeSlide].spec}</span>
            </div>
          </div>

          {/* Right: Interactive Craft Selectors & Story */}
          <div className="lg:col-span-5 flex flex-col justify-between py-2">
            <div>
              <span className="text-[11px] font-sans tracking-[0.2em] text-[#82756C] uppercase block mb-3">
                STEP 0{activeSlide + 1} OF 04 &middot; MATERIAL CHRONICLE
              </span>
              <h3 className="font-editorial text-3xl sm:text-4xl text-[#241D1A] font-light mb-2">
                {MACRO_SLIDES[activeSlide].title}
              </h3>
              <p className="text-xs font-sans tracking-[0.18em] text-[#B9975B] uppercase font-semibold mb-6">
                {MACRO_SLIDES[activeSlide].technique}
              </p>
              <p className="text-sm font-sans text-[#241D1A]/85 leading-relaxed mb-8">
                {MACRO_SLIDES[activeSlide].description}
              </p>
            </div>

            {/* Selector Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-2.5 pt-6 border-t border-[#241D1A]/10">
              {MACRO_SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => setActiveSlide(idx)}
                  className={`text-left p-3 text-[11px] font-sans tracking-[0.14em] uppercase transition-all duration-300 border ${
                    activeSlide === idx
                      ? 'bg-[#321F25] text-[#F7F3EC] border-[#321F25] shadow-sm'
                      : 'bg-transparent text-[#241D1A]/70 border-[#241D1A]/15 hover:border-[#241D1A]/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{slide.title.replace('THE ', '')}</span>
                    {activeSlide === idx && <Sparkles size={11} className="text-[#B9975B]" />}
                  </div>
                </button>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
