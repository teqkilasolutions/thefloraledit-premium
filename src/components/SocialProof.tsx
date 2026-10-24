import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/fashionData';

const EDITORIAL_MOMENTS = [
  {
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&h=1000&q=85",
    caption: "@gayatri.singhania at the Jaipur Literature Festival",
    garment: "Aurelia Mulberry Anarkali"
  },
  {
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&h=1000&q=85",
    caption: "@ananya_m in Manhattan for private nuptials",
    garment: "Sultana Velvet Sharara"
  },
  {
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&h=1000&q=85",
    caption: "@tarachawla celebrating Diwali in Dubai",
    garment: "Soraya Tailored Straight Suit"
  },
  {
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&h=1000&q=85",
    caption: "@meera.atelier at royal polo reception",
    garment: "Noor Sculpted Cape Set"
  }
];

export const SocialProof = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const prev = () => {
    setCurrentTestimonial((p: number) => (p === 0 ? TESTIMONIALS_DATA.length - 1 : p - 1));
  };

  const next = () => {
    setCurrentTestimonial((p: number) => (p === TESTIMONIALS_DATA.length - 1 ? 0 : p + 1));
  };

  const activeReview = TESTIMONIALS_DATA[currentTestimonial];

  return (
    <section className="bg-[#E8DED1] py-24 sm:py-36 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
          <div className="inline-flex items-center space-x-2 text-xs font-sans tracking-[0.25em] uppercase text-[#5A2935] font-semibold mb-3">
            <Camera size={14} />
            <span>#VELVETLOOM</span>
          </div>
          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#241D1A] font-light tracking-tight">
            WORN WITH LOVE.
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#82756C] tracking-wide mt-3">
            Our atelier silhouettes photographed across London, New York, Dubai and New Delhi.
          </p>
          <div className="w-16 h-px bg-[#B9975B] mx-auto mt-6" />
        </div>

        {/* Editorial Patron Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-20">
          {EDITORIAL_MOMENTS.map((moment, idx) => (
            <div key={idx} className="group relative aspect-[3/4] overflow-hidden bg-[#241D1A]">
              <img
                src={moment.image}
                alt={moment.caption}
                className="w-full h-full object-cover transition-transform duration-1000 ease-luxury group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#241D1A]/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4">
                <span className="text-[10px] font-sans text-[#D4BD8A] tracking-[0.18em] uppercase mb-1">
                  {moment.garment}
                </span>
                <span className="text-xs font-sans text-[#F7F3EC] font-light">
                  {moment.caption}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Refined Testimonial Carousel */}
        <div className="max-w-3xl mx-auto bg-[#F7F3EC] p-8 sm:p-12 lg:p-16 border border-[#241D1A]/10 shadow-sm relative">
          
          <div className="flex justify-center space-x-1 mb-6">
            {[...Array(activeReview.rating)].map((_, i) => (
              <Star key={i} size={15} className="fill-[#B9975B] text-[#B9975B]" />
            ))}
          </div>

          <blockquote className="font-editorial text-xl sm:text-2xl lg:text-3xl text-center text-[#241D1A] italic font-light leading-relaxed mb-8">
            &ldquo;{activeReview.quote}&rdquo;
          </blockquote>

          <div className="text-center">
            <span className="block font-sans text-sm font-semibold tracking-[0.16em] uppercase text-[#321F25]">
              {activeReview.author}
            </span>
            <span className="text-xs font-sans tracking-[0.14em] text-[#82756C] uppercase">
              {activeReview.location} &middot; {activeReview.garment}
            </span>
          </div>

          {/* Carousel Buttons */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-[#241D1A]/10">
            <button
              onClick={prev}
              className="text-xs font-sans tracking-[0.2em] uppercase text-[#82756C] hover:text-[#241D1A] flex items-center space-x-1"
            >
              <ChevronLeft size={14} />
              <span>PREVIOUS</span>
            </button>
            <span className="text-[11px] font-sans text-[#82756C]">
              0{currentTestimonial + 1} / 0{TESTIMONIALS_DATA.length}
            </span>
            <button
              onClick={next}
              className="text-xs font-sans tracking-[0.2em] uppercase text-[#82756C] hover:text-[#241D1A] flex items-center space-x-1"
            >
              <span>NEXT</span>
              <ChevronRight size={14} />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
