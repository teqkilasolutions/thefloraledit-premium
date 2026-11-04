import { PORTFOLIO_ASSETS } from './portfolioAssets';
import { base } from './studio';

export type PortfolioPhoto = { id: string; caption: string; alt: string; width: number; height: number; smallWidth: number };
export type PortfolioProject = { id: string; title: string; mood: string; description: string; note: string; coverId: string; photos: PortfolioPhoto[] };
const photo = (id: string, caption: string, alt: string): PortfolioPhoto => ({ id, caption, alt, ...PORTFOLIO_ASSETS[id] });

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'room-in-bloom', title: 'A room in bloom', mood: 'Botanical daylight', coverId: 'day-room',
    description: 'White flowers, trailing greenery and a room made for gathering.',
    note: 'From the first floral arch to the little things on the table, a closer look at one botanical celebration.',
    photos: [
      photo('day-room', 'A room in bloom', 'A complete white-and-green botanical lounge with floral windows, cane seating and low tables'),
      photo('day-passage', 'The botanical passage', 'A passage framed by hanging greenery and white flowers, leading towards an open doorway'),
      photo('day-arch', 'A garden welcome', 'The complete white floral entrance arch and its welcome panel'),
      photo('day-lounge', 'A little room to gather', 'A flower-framed window above cane lounge seating and a low table'),
      photo('day-flowers', 'Petal by petal', 'Red and white flowers arranged in sculptural vessels, with their stems and shapes visible'),
      photo('day-candles', 'Flowers and candlelight', 'A close floral-and-candle composition from the botanical celebration'),
      photo('day-materials', 'The little things', 'Shells, pearl strands and decorative objects in a layered table vignette'),
      photo('day-wide', 'The finished setting', 'A wider view of the completed botanical room and its seating arrangement'),
    ],
  },
  {
    id: 'after-dark', title: 'After dark', mood: 'Colour after sunset', coverId: 'night-room',
    description: 'Sculptural flowers, warm light and a richer kind of colour.',
    note: 'A floral arch, a statement arrangement and the details that bring an evening setting together.',
    photos: [
      photo('night-room', 'An evening in full bloom', 'A colourful floral arch framed by black lounge seating, warm hanging lights and decorative crystal strands'),
      photo('night-arrangement', 'Sculpted in flowers', 'A tall red, pink and purple floral arrangement with long trailing strands and candlelight'),
      photo('night-table', 'Set the mood', 'A sculptural table composition with red vessels, flowers, moss, candles and decorative details'),
      photo('night-detail', 'Every little detail', 'A close study of red vessels, flowers and textured styling from the same evening setting'),
    ],
  },
  {
    id: 'rooted-in-story', title: 'Rooted in story', mood: 'Heritage and texture', coverId: 'heritage-room',
    description: 'Crafted objects, layered textiles and flowers with a sense of place.',
    note: 'Heritage references and floral details, considered together as part of a complete setting.',
    photos: [
      photo('heritage-room', 'A layered setting', 'A finished lounge with repeated patterned panels, tables and coordinated heritage-inspired details'),
      photo('heritage-entrance', 'The first impression', 'A complete event entrance with coordinated floral signage and its doorway'),
      photo('heritage-objects', 'Stories in the details', 'Shelves, niches, pottery and crafted objects arranged as a heritage-inspired vignette'),
      photo('heritage-lounge', 'A place to gather', 'A lounge grouping with a textile backdrop and a low styled table'),
      photo('heritage-stems', 'A quieter floral moment', 'Delicate red stems in a slim terracotta vessel beside candles'),
    ],
  },
];

export const PORTFOLIO_PHOTOS = PORTFOLIO_PROJECTS.flatMap(project => project.photos);
export const PHOTO_BY_ID = Object.fromEntries(PORTFOLIO_PHOTOS.map(item => [item.id, item])) as Record<string, PortfolioPhoto>;
export const PHOTO_IDS = PORTFOLIO_PHOTOS.map(item => item.id);
export const projectForPhoto = (id: string) => PORTFOLIO_PROJECTS.find(project => project.photos.some(item => item.id === id));
export const photoUrl = (item: PortfolioPhoto, small = false) => `${base}assets/portfolio/${item.id}${small ? '-small' : ''}.webp`;
