import type { FrameworkId } from '../context/PresentationContext';

export const base = import.meta.env.BASE_URL;
export const floralImage = (name: string) => `${base}assets/floral/${name}`;
export const money = (amount: number) => `₹${amount.toLocaleString('en-IN')}`;
export const YEAR = new Date().getFullYear();
export const CONCEPTS: { id: FrameworkId; name: string; short: string; description: string }[] = [
  { id: 'garden', name: 'The Editorial Garden', short: 'Garden', description: 'A light, considered balance of everyday flowers, beautiful objects and meaningful gatherings.' },
  { id: 'atelier', name: 'The Botanical Atelier', short: 'Atelier', description: 'An immersive botanical gallery for sculptural arrangements and private commissions.' },
  { id: 'celebration', name: 'The Celebration House', short: 'Celebration', description: 'A romantic, welcoming world built around weddings, intimate dinners and the joy of gathering.' },
];
