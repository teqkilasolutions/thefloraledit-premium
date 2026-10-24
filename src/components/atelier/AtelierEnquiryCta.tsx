import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

export const AtelierEnquiryCta: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    contact: '',
    projectType: 'Bespoke Celebration Floral',
    timeline: 'Within 3 Months'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="py-20 sm:py-28 bg-[#26382C] text-[#F8F6EF] border-b border-[#364D3D]">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center">
        <span className="text-[10px] font-sans uppercase tracking-[0.35em] text-[#B8A276] font-semibold block mb-2">
          Direct Atelier Line
        </span>

        <h2 className="text-3xl sm:text-5xl font-serif text-white leading-tight">
          Commission a work of floral art.
        </h2>

        <p className="text-xs sm:text-sm text-[#C9D1B8] max-w-xl mx-auto mt-3 leading-relaxed">
          From a curated series of vessels for your private sanctuary to the floral direction of your wedding celebration, begin the dialogue here.
        </p>

        {submitted ? (
          <div className="mt-8 p-8 bg-[#1F2E24] rounded-2xl border border-[#3E5545] max-w-lg mx-auto text-center space-y-3">
            <CheckCircle2 className="w-8 h-8 text-[#B8A276] mx-auto" />
            <h4 className="text-xl font-serif text-white">Your Dialogue Has Commenced</h4>
            <p className="text-xs text-[#AAB39A]">
              We have received your details, <span className="text-white font-medium">{form.name}</span>. An atelier director will contact you directly within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-10 bg-[#1F2E24] p-6 sm:p-10 rounded-3xl border border-[#3E5545] text-left max-w-2xl mx-auto space-y-4 shadow-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase font-mono tracking-widest text-[#B8A276] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#26382C] border border-[#364D3D] rounded-lg text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#B8A276]"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-mono tracking-widest text-[#B8A276] mb-1">
                  Email or Phone
                </label>
                <input
                  type="text"
                  required
                  placeholder="contact@domain.com"
                  value={form.contact}
                  onChange={e => setForm({ ...form, contact: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#26382C] border border-[#364D3D] rounded-lg text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#B8A276]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase font-mono tracking-widest text-[#B8A276] mb-1">
                  Nature of Interest
                </label>
                <select
                  value={form.projectType}
                  onChange={e => setForm({ ...form, projectType: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#26382C] border border-[#364D3D] rounded-lg text-xs text-white focus:outline-none focus:border-[#B8A276]"
                >
                  <option value="Bespoke Celebration Floral">Bespoke Wedding / Celebration</option>
                  <option value="Private Dining Tablescape">Private Dining Tablescape</option>
                  <option value="Residential Space Styling">Residential Space & Vessels</option>
                  <option value="Curated Ceramic Order">Curated Ceramic Vessel Order</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-mono tracking-widest text-[#B8A276] mb-1">
                  Target Timeline
                </label>
                <select
                  value={form.timeline}
                  onChange={e => setForm({ ...form, timeline: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#26382C] border border-[#364D3D] rounded-lg text-xs text-white focus:outline-none focus:border-[#B8A276]"
                >
                  <option value="Next 30 Days">Next 30 Days</option>
                  <option value="Within 3 Months">Within 3 Months</option>
                  <option value="6 - 12 Months Ahead">6 - 12 Months Ahead</option>
                </select>
              </div>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                className="w-full py-3.5 bg-[#B8A276] hover:bg-[#C9B386] text-[#26382C] rounded-lg text-xs font-sans uppercase tracking-widest font-bold transition flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Initiate Atelier Commission</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
