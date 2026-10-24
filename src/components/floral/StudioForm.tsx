import { useState, type FormEvent } from 'react';
import { ArrowUpRight, Check, Download } from 'lucide-react';

const STORAGE_KEY = 'floral-edit-enquiry-v1';
type EnquiryDraft = { name: string; email: string; phone: string; service: string; date: string; location: string; notes: string };
export function StudioForm({ service = 'Event flowers', compact = false }: { service?: string; compact?: boolean }) {
  const [saved, setSaved] = useState(false);
  const [storageError, setStorageError] = useState(false);
  const [savedDraft] = useState<EnquiryDraft | null>(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if (!stored || typeof stored !== 'object' || Array.isArray(stored) || typeof stored.service !== 'string') return null;
      const draft: EnquiryDraft = { name: '', email: '', phone: '', service: '', date: '', location: '', notes: '' };
      for (const key of Object.keys(draft) as (keyof EnquiryDraft)[]) if (typeof stored[key] === 'string') draft[key] = stored[key].slice(0, key === 'notes' ? 3000 : 500);
      return draft;
    } catch { return null; }
  });
  const [restored, setRestored] = useState(false);
  const [form, setForm] = useState<EnquiryDraft>(() => ({ name: savedDraft?.name || '', email: savedDraft?.email || '', phone: savedDraft?.phone || '', service, date: '', location: '', notes: '' }));
  const change = (key: keyof typeof form, value: string) => { setForm(p => ({ ...p, [key]: value })); setSaved(false); };
  const summary = `THE FLORAL EDIT\nEnquiry draft — not yet sent\n\n${Object.entries(form).map(([key, value]) => `${key[0].toUpperCase() + key.slice(1)}: ${value || 'To discuss'}`).join('\n')}\n`;
  function download() {
    const url = URL.createObjectURL(new Blob([summary], { type: 'text/plain;charset=utf-8' }));
    const a = document.createElement('a'); a.href = url; a.download = 'the-floral-edit-enquiry.txt'; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  function submit(e: FormEvent) {
    e.preventDefault();
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(form)); setStorageError(false); } catch { setStorageError(true); }
    setSaved(true);
  }
  if (saved) return <div className="form-saved" role="status"><span className="saved-icon"><Check size={25} /></span><h3>Your vision, beautifully noted.</h3><p>{storageError ? 'Your browser could not save this draft. Download a copy to keep your details.' : 'Your enquiry draft is saved on this device. You can return to it or download a copy.'}</p><p className="form-note">This presentation does not send enquiries. Your request has not been delivered to the studio.</p><button className="studio-button" onClick={download}><Download size={16} /> Download enquiry</button><button className="text-button" onClick={() => setSaved(false)}>Continue editing</button></div>;
  return <form className={`studio-form ${compact ? 'form-compact' : ''}`} onSubmit={submit}>
    {savedDraft && !restored && <div className="draft-recovery"><p>You have a saved enquiry on this device.</p><button type="button" className="text-button" onClick={() => { setForm(savedDraft); setRestored(true); }}>Restore saved enquiry <ArrowUpRight size={15} /></button></div>}
    <div className="form-grid">
      <label>Your name<input autoComplete="name" required maxLength={100} value={form.name} onChange={e => change('name', e.target.value)} placeholder="Full name" /></label>
      <label>Email address<input type="email" autoComplete="email" required maxLength={200} value={form.email} onChange={e => change('email', e.target.value)} placeholder="you@example.com" /></label>
      <label>Phone <span>(optional)</span><input type="tel" autoComplete="tel" maxLength={30} value={form.phone} onChange={e => change('phone', e.target.value)} placeholder="+91" /></label>
      <label>Event date <span>(optional)</span><input type="date" value={form.date} onChange={e => change('date', e.target.value)} /></label>
      <label className="full-width">I'm interested in<input required maxLength={500} value={form.service} onChange={e => change('service', e.target.value)} /></label>
      {!compact && <label className="full-width">Venue or city <span>(optional)</span><input maxLength={200} value={form.location} onChange={e => change('location', e.target.value)} placeholder="Where shall we create something beautiful?" /></label>}
      <label className="full-width">A little about your vision<textarea rows={3} maxLength={3000} value={form.notes} onChange={e => change('notes', e.target.value)} placeholder="The occasion, the atmosphere, the flowers you love…" /></label>
    </div>
    <p className="form-note">Save a private draft on this device. No enquiry is sent from this presentation.</p>
    <button className="studio-button" type="submit">Save enquiry draft <ArrowUpRight size={17} /></button>
  </form>;
}
