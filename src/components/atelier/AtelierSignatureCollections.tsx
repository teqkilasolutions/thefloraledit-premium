import React from 'react';
import { usePresentation } from '../../context/PresentationContext';
import { ArrowUpRight } from 'lucide-react';

export const AtelierSignatureCollections: React.FC = () => {
  const { openEnquiry } = usePresentation();

  const offerings = [
    {
      num: '01',
      title: 'Signature Florals',
      subtitle: 'Living sculptures for discerning interiors',
      desc: 'Composed of heirloom blooms, unglazed earthenware, and sculptural silhouettes. Each piece is treated as an original artwork.',
      image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=85',
      action: () => openEnquiry('01 Signature Florals')
    },
    {
      num: '02',
      title: 'Bespoke Events',
      subtitle: 'Atmospheric installations & spatial scenography',
      desc: 'Architectural floral design for private dinners, contemporary Indian weddings, and intimate galas. Bold scale with meticulous restraint.',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=85',
      action: () => openEnquiry('02 Bespoke Events')
    },
    {
      num: '03',
      title: 'Styled Spaces',
      subtitle: 'Curated vessel & botanical rotations',
      desc: 'Ongoing botanical architecture partnerships for luxury residences, penthouses, architectural firms, and boutique hotels.',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=85',
      action: () => openEnquiry('03 Styled Spaces')
    }
  ];

  return (
    <section id="atelier-collections" className="py-20 sm:py-28 bg-[#26382C] text-[#F8F6EF] border-b border-[#364D3D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 border-b border-[#364D3D] pb-6">
          <div>
            <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-[#B8A276] font-semibold block mb-2">
              Three Distinct Pillars
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif text-white">
              Signature Offerings
            </h2>
          </div>
          <p className="text-xs text-[#AAB39A] font-sans mt-3 sm:mt-0 max-w-sm">
            Disciplined floristry where every stem, ceramic texture, and negative space is meticulously calculated.
          </p>
        </div>

        {/* 3 Compact Distinct Offerings */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offerings.map(item => (
            <div
              key={item.num}
              onClick={item.action}
              className="group cursor-pointer bg-[#1F2E24] rounded-2xl overflow-hidden border border-[#364D3D] hover:border-[#B8A276] transition-all duration-500 flex flex-col justify-between shadow-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#18251C]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F2E24] via-transparent to-transparent" />
                <span className="absolute top-4 left-4 font-mono text-xs font-bold text-[#B8A276] bg-[#26382C]/90 px-2.5 py-1 rounded backdrop-blur-sm border border-[#3E5545]">
                  {item.num}
                </span>
              </div>

              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-serif text-white group-hover:text-[#B8A276] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#B8A276] mt-1 font-sans">
                    {item.subtitle}
                  </p>
                  <p className="text-xs text-[#C9D1B8] leading-relaxed mt-3">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#364D3D] flex items-center justify-between text-xs text-[#E9E1D4] font-medium group-hover:text-white">
                  <span>Commission this service</span>
                  <ArrowUpRight className="w-4 h-4 text-[#B8A276] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
