import React from 'react';
import { ArrowRight } from 'lucide-react';
import { OCCASION_EDITS } from '../data/fashionData';

interface OccasionEditProps {
  onSelectOccasion: (title: string) => void;
}

export const OccasionEdit: React.FC<OccasionEditProps> = ({ onSelectOccasion }) => {
  return (
    <section id="occasions" className="bg-[#E8DED1] py-24 sm:py-32 lg:py-40 relative scroll-mt-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Headline */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 lg:mb-20">
          <div>
            <div className="inline-flex items-center space-x-3 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B9975B]" />
              <span className="text-xs font-sans tracking-[0.28em] uppercase text-[#5A2935] font-semibold">
                EVENT DRESSING
              </span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-6xl lg:text-7xl leading-[1.05] text-[#241D1A] font-light">
              DRESSED FOR<br />
              <span className="italic font-normal text-[#5A2935]">THE MOMENT.</span>
            </h2>
          </div>

          <p className="font-sans text-sm sm:text-base text-[#82756C] max-w-md mt-6 md:mt-0 font-light leading-relaxed">
            From regal ceremonies under starry canopies to contemporary cocktail celebrations, curate garments tailored to every chapter.
          </p>
        </div>

        {/* Four Occasion Cards: Desktop 4 columns, Mobile swipe */}
        <div className="flex lg:grid lg:grid-cols-4 gap-6 overflow-x-auto lg:overflow-x-visible pb-6 lg:pb-0 scrollbar-none snap-x snap-mandatory">
          {OCCASION_EDITS.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectOccasion(item.title)}
              className="flex-shrink-0 w-[84vw] sm:w-[48vw] lg:w-auto snap-center group cursor-pointer relative overflow-hidden aspect-[9/14] bg-[#241D1A]"
            >
              {/* Distinct Photography and Mood */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-1000 ease-luxury group-hover:scale-105"
                loading="lazy"
              />

              {/* Editorial Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#241D1A]/95 via-[#241D1A]/40 to-transparent transition-opacity duration-500" />

              {/* Border Detail */}
              <div className="absolute inset-4 border border-[#B9975B]/20 group-hover:border-[#B9975B]/60 transition-colors duration-700 pointer-events-none" />

              {/* Card Text Content */}
              <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end">
                <span className="text-[10px] font-sans tracking-[0.25em] text-[#D4BD8A] uppercase mb-1">
                  {item.tagline}
                </span>

                <h3 className="font-editorial text-2xl sm:text-3xl text-[#F7F3EC] font-normal mb-3">
                  {item.title}
                </h3>

                <p className="font-sans text-xs text-[#F7F3EC]/75 leading-relaxed mb-6 font-light line-clamp-3">
                  {item.description}
                </p>

                <div className="inline-flex items-center space-x-2 text-xs font-sans tracking-[0.2em] uppercase text-[#F7F3EC] group-hover:text-[#D4BD8A] transition-colors">
                  <span>DISCOVER EDIT</span>
                  <ArrowRight size={13} className="transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Swipe Cue */}
        <div className="lg:hidden text-center mt-4">
          <span className="text-[10px] font-sans tracking-[0.2em] text-[#82756C] uppercase">
            &larr; SWIPE TO VIEW EDITS &rarr;
          </span>
        </div>

      </div>
    </section>
  );
};
