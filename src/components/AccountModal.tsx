import React, { useState } from 'react';
import { X, User, Package, MessageSquare, Check } from 'lucide-react';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose }) => {
  const [tab, setTab] = useState<'signin' | 'track'>('signin');
  const [email, setEmail] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [messageSubmitted, setMessageSubmitted] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-[#321F25]/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="min-h-screen px-4 flex items-center justify-center py-10">
        <div className="w-full max-w-md bg-[#F7F3EC] shadow-2xl p-6 sm:p-8 relative z-10 border border-[#241D1A]/10">
          
          <div className="flex items-center justify-between pb-4 border-b border-[#241D1A]/10 mb-6">
            <div className="flex items-center space-x-2">
              <User size={18} className="text-[#5A2935]" />
              <h3 className="font-editorial text-2xl text-[#241D1A] font-light">
                CLIENT CONCIERGE
              </h3>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full flex items-center justify-center text-[#241D1A] hover:bg-[#E8DED1] transition-colors"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>

          {/* Tabs */}
          <div className="grid grid-cols-2 gap-2 mb-6">
            <button
              onClick={() => setTab('signin')}
              className={`py-2 text-xs font-sans tracking-wider uppercase transition-colors border ${
                tab === 'signin'
                  ? 'bg-[#321F25] text-[#F7F3EC] border-[#321F25]'
                  : 'bg-transparent text-[#241D1A] border-[#241D1A]/20'
              }`}
            >
              CLIENT LOGIN
            </button>
            <button
              onClick={() => setTab('track')}
              className={`py-2 text-xs font-sans tracking-wider uppercase transition-colors border ${
                tab === 'track'
                  ? 'bg-[#321F25] text-[#F7F3EC] border-[#321F25]'
                  : 'bg-transparent text-[#241D1A] border-[#241D1A]/20'
              }`}
            >
              TRACK ORDER
            </button>
          </div>

          {tab === 'signin' ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setMessageSubmitted(true);
              }}
              className="space-y-4"
            >
              <div>
                <label className="text-[10px] font-sans tracking-widest uppercase text-[#82756C] block mb-1">
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full text-xs font-sans bg-transparent border border-[#241D1A]/20 p-3 text-[#241D1A] focus:outline-none focus:border-[#321F25]"
                />
              </div>

              <div>
                <label className="text-[10px] font-sans tracking-widest uppercase text-[#82756C] block mb-1">
                  PASSWORD
                </label>
                <input
                  type="password"
                  placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                  className="w-full text-xs font-sans bg-transparent border border-[#241D1A]/20 p-3 text-[#241D1A] focus:outline-none focus:border-[#321F25]"
                />
              </div>

              {messageSubmitted ? (
                <div className="bg-[#E8DED1] p-3 text-xs font-sans text-[#321F25] flex items-center space-x-2">
                  <Check size={14} className="text-[#B9975B]" />
                  <span>Client access authenticated. Redirecting to account...</span>
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#321F25] hover:bg-[#5A2935] text-[#F7F3EC] text-xs font-sans tracking-[0.2em] uppercase transition-colors mt-2"
                >
                  ENTER CLIENT SUITE
                </button>
              )}

              <div className="pt-4 text-center">
                <a href="#forgot" className="text-[11px] font-sans text-[#82756C] hover:text-[#241D1A] underline">
                  Forgot your password?
                </a>
              </div>
            </form>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert(`Querying live atelier logistics for order ${orderNumber}...`);
              }}
              className="space-y-4"
            >
              <div>
                <label className="text-[10px] font-sans tracking-widest uppercase text-[#82756C] block mb-1">
                  ORDER NUMBER
                </label>
                <input
                  type="text"
                  required
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="VL-8492"
                  className="w-full text-xs font-sans bg-transparent border border-[#241D1A]/20 p-3 text-[#241D1A] focus:outline-none focus:border-[#321F25]"
                />
              </div>

              <div>
                <label className="text-[10px] font-sans tracking-widest uppercase text-[#82756C] block mb-1">
                  EMAIL OR PHONE
                </label>
                <input
                  type="text"
                  required
                  placeholder="Email registered with order"
                  className="w-full text-xs font-sans bg-transparent border border-[#241D1A]/20 p-3 text-[#241D1A] focus:outline-none focus:border-[#321F25]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#321F25] hover:bg-[#5A2935] text-[#F7F3EC] text-xs font-sans tracking-[0.2em] uppercase transition-colors flex items-center justify-center space-x-2"
              >
                <Package size={14} />
                <span>TRACK ATELIER SHIPMENT</span>
              </button>
            </form>
          )}

          {/* Concierge contact footer */}
          <div className="mt-8 pt-6 border-t border-[#241D1A]/10 text-center">
            <div className="inline-flex items-center space-x-2 text-[11px] font-sans text-[#82756C]">
              <MessageSquare size={13} className="text-[#B9975B]" />
              <span>Direct Studio WhatsApp: +91 (0) 9871 000 000</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
