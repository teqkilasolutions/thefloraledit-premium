import React from 'react';
import { usePresentation } from '../../context/PresentationContext';
import { Palette, DraftingCompass, Sparkles, HeartHandshake } from 'lucide-react';

export const CelebrationProcess: React.FC = () => {
  const { openEnquiry } = usePresentation();

  const steps = [
    {
      step: '01',
      title: 'Consultation & Botanical Palette',
      icon: Palette,
      desc: 'We meet in our studio or virtually to explore your celebration aesthetic, venue architecture, lighting, and sentimental flower favorites.'
    },
    {
      step: '02',
      title: 'Spatial Blueprint & Ceramic Curation',
      icon: DraftingCompass,
      desc: 'Our floral architects draft detailed 3D tablescapes, mandap elevations, and vessel selections tailored to the proportions of your venue.'
    },
    {
      step: '03',
      title: 'Day-Of On-Site Floristry & Styling',
      icon: Sparkles,
      desc: 'Our master florists condition seasonal blooms overnight and assemble installations live on-site, ensuring optimal peak bloom and freshness.'
    }
  ];

  return (
    <section id="celebration-experience" className="py-20 sm:py-28 bg-[#FAF7F1] border-b border-[#E9E1D4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="max-w-2xl mb-14 sm:mb-20 space-y-3">
          <span className="text-[10px] uppercase font-sans tracking-[0.3em] text-[#AA8175] font-semibold block">
            The Bespoke Journey
          </span>
          <h2 className="text-3xl sm:text-5xl font-playfair text-[#3B302C]">
            From concept to unforgettable celebration.
          </h2>
          <p className="text-xs sm:text-sm text-[#7A6B65] leading-relaxed">
            Planning event florals should be an inspiring, serene experience. Here is how we bring your celebration vision into bloom.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map(s => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="bg-white rounded-2xl p-8 border border-[#E9E1D4] shadow-sm hover:shadow-lg transition-all duration-300 relative space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-full bg-[#FAF7F1] border border-[#D9B4A4] flex items-center justify-center text-[#536336]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-2xl font-light text-[#D9B4A4]">
                    {s.step}
                  </span>
                </div>

                <h3 className="text-xl font-playfair text-[#3B302C]">
                  {s.title}
                </h3>

                <p className="text-xs text-[#7A6B65] leading-relaxed">
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Reassurance banner */}
        <div className="mt-14 p-6 sm:p-8 bg-[#E9E1D4]/40 rounded-2xl border border-[#E9E1D4] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <HeartHandshake className="w-6 h-6 text-[#536336]" />
            <div>
              <h4 className="text-sm font-playfair font-semibold text-[#3B302C]">
                Dedicated Single-Wedding Calendar
              </h4>
              <p className="text-xs text-[#7A6B65]">
                We dedicate our complete floral direction to one celebration per weekend to ensure undivided artistry.
              </p>
            </div>
          </div>
          <button
            onClick={() => openEnquiry('The Celebration House · Check Date Availability')}
            className="px-6 py-2.5 bg-[#536336] text-white rounded-full text-xs font-sans uppercase tracking-widest font-semibold hover:bg-[#43502B] transition whitespace-nowrap"
          >
            Check Date Availability
          </button>
        </div>
      </div>
    </section>
  );
};
