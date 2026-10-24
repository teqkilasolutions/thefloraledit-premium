import React, { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setTimeout(() => {
        // Keeps state clean
      }, 5000);
    }
  };

  return (
    <section className="bg-[#E8DED1] py-24 sm:py-32 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center relative z-10">
        
        <span className="text-[11px] font-sans tracking-[0.28em] uppercase text-[#5A2935] font-semibold block mb-4">
          PRIVATE CLIENT CIRCLE
        </span>

        {/* Headline */}
        <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#241D1A] font-light tracking-tight leading-tight mb-6">
          ENTER THE WORLD<br />
          <span className="italic font-normal text-[#5A2935]">OF VELVET LOOM.</span>
        </h2>

        {/* Body */}
        <p className="font-sans text-sm sm:text-base text-[#241D1A]/80 max-w-lg mx-auto mb-10 leading-relaxed font-light">
          Discover new collections, exclusive edits and stories from the studio.
        </p>

        {/* Form */}
        {submitted ? (
          <div className="bg-[#F7F3EC] p-6 max-w-md mx-auto border border-[#B9975B]/30 flex items-center justify-center space-x-3 text-xs font-sans tracking-[0.16em] uppercase text-[#321F25]">
            <Check size={16} className="text-[#B9975B]" />
            <span>Welcome to the Studio Circle. Check your inbox.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row items-stretch border-b border-[#241D1A]/30 focus-within:border-[#321F25] transition-colors pb-1">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="YOUR EMAIL ADDRESS"
                className="bg-transparent text-xs font-sans tracking-[0.18em] uppercase text-[#241D1A] placeholder-[#82756C] px-3 py-3.5 focus:outline-none flex-1 text-center sm:text-left"
              />
              <button
                type="submit"
                className="min-h-[44px] px-6 py-3.5 bg-[#321F25] hover:bg-[#5A2935] text-[#F7F3EC] text-xs font-sans font-medium tracking-[0.2em] uppercase transition-colors flex items-center justify-center space-x-2 mt-2 sm:mt-0"
              >
                <span>JOIN THE STUDIO</span>
                <ArrowRight size={13} className="text-[#B9975B]" />
              </button>
            </div>
            <p className="text-[10px] font-sans text-[#82756C] tracking-wider mt-3">
              We respect your privacy. Unsubscribe at any moment.
            </p>
          </form>
        )}

      </div>
    </section>
  );
};
