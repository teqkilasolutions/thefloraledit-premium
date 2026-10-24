import React, { useState } from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export const CelebrationEnquirySection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: 'Wedding Celebration',
    date: '',
    venue: 'Delhi NCR / Private Farmhouse',
    budget: '₹2,50,000 – ₹5,00,000',
    details: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="celebration-enquiry" className="py-20 sm:py-28 bg-[#FAF7F1] border-b border-[#E9E1D4]">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-14 border border-[#E9E1D4] shadow-xl space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="text-[10px] uppercase font-sans tracking-[0.3em] text-[#AA8175] font-semibold block">
              Event Consultation & Lead Capture
            </span>
            <h2 className="text-3xl sm:text-4xl font-playfair text-[#3B302C]">
              Tell us about your celebration.
            </h2>
            <p className="text-xs text-[#7A6B65] leading-relaxed">
              We design custom floral atmospheres across India and internationally. Complete the form below to receive a private styling dossier.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 bg-[#FAF7F1] rounded-2xl border border-[#D9B4A4] text-center space-y-3">
              <CheckCircle2 className="w-8 h-8 text-[#536336] mx-auto" />
              <h3 className="text-xl font-playfair text-[#3B302C]">
                Thank you, {formData.name}
              </h3>
              <p className="text-xs text-[#7A6B65] max-w-md mx-auto">
                Our lead creative director will review date availability and respond within 24 hours with a custom moodboard.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-medium text-[#3B302C] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ananya Singhania"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F1] border border-[#E9E1D4] rounded-lg text-xs text-[#3B302C] focus:outline-none focus:border-[#536336]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[#3B302C] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="ananya@domain.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F1] border border-[#E9E1D4] rounded-lg text-xs text-[#3B302C] focus:outline-none focus:border-[#536336]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-medium text-[#3B302C] mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F1] border border-[#E9E1D4] rounded-lg text-xs text-[#3B302C] focus:outline-none focus:border-[#536336]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[#3B302C] mb-1">
                    Celebration Type
                  </label>
                  <select
                    value={formData.eventType}
                    onChange={e => setFormData({ ...formData, eventType: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F1] border border-[#E9E1D4] rounded-lg text-xs text-[#3B302C] focus:outline-none focus:border-[#536336]"
                  >
                    <option value="Wedding Celebration">Wedding Celebration (Multi-Day or Reception)</option>
                    <option value="Private Dinner / Anniversary">Private Dinner / Milestone Anniversary</option>
                    <option value="Cocktail Soirée">Cocktail Soirée / Engagement</option>
                    <option value="Brand Gala / Luxury Launch">Brand Gala / Luxury Launch</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-medium text-[#3B302C] mb-1">
                    Date of Event
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F1] border border-[#E9E1D4] rounded-lg text-xs text-[#3B302C] focus:outline-none focus:border-[#536336]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[#3B302C] mb-1">
                    Venue / City
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. The Oberoi Gurgaon"
                    value={formData.venue}
                    onChange={e => setFormData({ ...formData, venue: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F1] border border-[#E9E1D4] rounded-lg text-xs text-[#3B302C] focus:outline-none focus:border-[#536336]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[#3B302C] mb-1">
                    Estimated Budget Tier
                  </label>
                  <select
                    value={formData.budget}
                    onChange={e => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F1] border border-[#E9E1D4] rounded-lg text-xs text-[#3B302C] focus:outline-none focus:border-[#536336]"
                  >
                    <option value="₹1,00,000 – ₹2,50,000">₹1,00,000 – ₹2,50,000</option>
                    <option value="₹2,50,000 – ₹5,00,000">₹2,50,000 – ₹5,00,000</option>
                    <option value="₹5,00,000 – ₹10,00,000">₹5,00,000 – ₹10,00,000</option>
                    <option value="₹10,00,000+">₹10,00,000+ (Grand Scale)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#3B302C] mb-1">
                  Vision & Aesthetic Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="Share details on your chosen color palette, preferred floral varieties, or overall atmosphere..."
                  value={formData.details}
                  onChange={e => setFormData({ ...formData, details: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F1] border border-[#E9E1D4] rounded-lg text-xs text-[#3B302C] focus:outline-none focus:border-[#536336]"
                />
              </div>

              <div className="pt-2 text-center">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-10 py-3.5 bg-[#536336] hover:bg-[#43502B] text-white rounded-full text-xs font-sans uppercase tracking-widest font-semibold transition shadow-md inline-flex items-center justify-center gap-2"
                >
                  <span>Submit Event Consultation Enquiry</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
