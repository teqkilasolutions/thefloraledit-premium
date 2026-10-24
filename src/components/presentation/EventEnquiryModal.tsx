import React, { useState } from 'react';
import { usePresentation } from '../../context/PresentationContext';
import { X, Sparkles, CheckCircle2 } from 'lucide-react';
import { FloralEditLogo } from '../brand/FloralEditLogo';

export const EventEnquiryModal: React.FC = () => {
  const { isEnquiryModalOpen, closeEnquiry, enquiryService } = usePresentation();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: enquiryService || 'Wedding Celebration',
    date: '',
    location: 'Delhi NCR',
    guestCount: '100 - 250 guests',
    budget: '₹2,00,000 – ₹5,00,000',
    notes: ''
  });

  if (!isEnquiryModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // keep message visible for 3 seconds then close
    }, 3000);
  };

  const handleClose = () => {
    setSubmitted(false);
    closeEnquiry();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md p-4 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-[#F8F6EF] text-[#292A25] rounded-2xl shadow-2xl overflow-hidden my-8 border border-[#E9E1D4] animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="p-6 bg-[#26382C] text-[#F8F6EF] flex items-center justify-between border-b border-[#34493B]">
          <div className="flex items-center gap-3">
            <FloralEditLogo variant="white-transparent" className="h-10 w-auto" />
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#AAB39A] font-medium block">
                Atelier Consultation
              </span>
              <h2 className="text-xl font-serif text-white">Event & Bespoke Floral Enquiry</h2>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-10 text-center space-y-4">
            <div className="w-16 h-16 bg-[#536336]/10 text-[#536336] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-serif text-[#292A25]">Enquiry Received</h3>
            <p className="text-sm font-sans text-[#5A6054] max-w-md mx-auto leading-relaxed">
              Thank you, <span className="font-semibold text-[#292A25]">{formData.name || 'Valued Client'}</span>. Our floral design directors review date availability and will contact you within 24 hours with an initial moodboard and consultation proposal.
            </p>
            <div className="p-4 bg-[#E9E1D4]/60 rounded-xl max-w-sm mx-auto text-xs text-[#292A25] space-y-1">
              <p><span className="font-semibold">Event:</span> {formData.eventType}</p>
              <p><span className="font-semibold">Location:</span> {formData.location}</p>
              <p><span className="font-semibold">Contact:</span> {formData.email || formData.phone}</p>
            </div>
            <button
              onClick={handleClose}
              className="mt-4 px-6 py-2.5 bg-[#536336] hover:bg-[#43502B] text-white rounded-lg text-xs font-medium tracking-wider uppercase transition"
            >
              Back to Prototype
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
            <p className="text-xs text-[#666B5F] leading-relaxed">
              Every arrangement is shaped with architectural thought and seasonal flowers. Share your vision below to receive a bespoke styling proposal.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-[#5A6054] mb-1.5">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Radhika Mehra"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#D5CEBF] rounded-lg text-xs text-[#292A25] focus:outline-none focus:border-[#536336]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-[#5A6054] mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. radhika@example.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#D5CEBF] rounded-lg text-xs text-[#292A25] focus:outline-none focus:border-[#536336]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-[#5A6054] mb-1.5">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#D5CEBF] rounded-lg text-xs text-[#292A25] focus:outline-none focus:border-[#536336]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-[#5A6054] mb-1.5">
                  Nature of Event
                </label>
                <select
                  value={formData.eventType}
                  onChange={e => setFormData({ ...formData, eventType: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#D5CEBF] rounded-lg text-xs text-[#292A25] focus:outline-none focus:border-[#536336]"
                >
                  <option value="Wedding Celebration">Wedding Celebration (Mandap, Stage, Tables)</option>
                  <option value="Private Dinner / Soirée">Private Dinner / Intimate Soirée</option>
                  <option value="Corporate Gala / Brand Launch">Corporate Gala / Brand Launch</option>
                  <option value="Residential Space Styling">Residential Space & Vessel Styling</option>
                  <option value="Bespoke Seasonal Commission">Bespoke Seasonal Floral Commission</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-[#5A6054] mb-1.5">
                  Estimated Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={e => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#D5CEBF] rounded-lg text-xs text-[#292A25] focus:outline-none focus:border-[#536336]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-[#5A6054] mb-1.5">
                  Location / City
                </label>
                <input
                  type="text"
                  placeholder="e.g. Delhi NCR / Chhatarpur"
                  value={formData.location}
                  onChange={e => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#D5CEBF] rounded-lg text-xs text-[#292A25] focus:outline-none focus:border-[#536336]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-[#5A6054] mb-1.5">
                  Expected Scale
                </label>
                <select
                  value={formData.guestCount}
                  onChange={e => setFormData({ ...formData, guestCount: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#D5CEBF] rounded-lg text-xs text-[#292A25] focus:outline-none focus:border-[#536336]"
                >
                  <option value="Under 50 guests">Intimate (&lt; 50 guests)</option>
                  <option value="50 - 150 guests">50 - 150 guests</option>
                  <option value="150 - 350 guests">150 - 350 guests</option>
                  <option value="350+ guests">Grand Scale (350+ guests)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-[#5A6054] mb-1.5">
                Vision & Floral Notes
              </label>
              <textarea
                rows={3}
                placeholder="Tell us about the atmosphere, desired color palette, venue architecture, or specific flowers you love..."
                value={formData.notes}
                onChange={e => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white border border-[#D5CEBF] rounded-lg text-xs text-[#292A25] focus:outline-none focus:border-[#536336]"
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-[11px] text-[#787E71] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#536336]" /> Confidential studio proposal
              </span>
              <button
                type="submit"
                className="px-6 py-3 bg-[#536336] hover:bg-[#43502B] text-white rounded-lg text-xs font-semibold tracking-widest uppercase transition shadow-md"
              >
                Submit Consultation Request
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
