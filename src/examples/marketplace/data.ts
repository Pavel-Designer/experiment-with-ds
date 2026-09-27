// Fictional sample data for the marketplace example. Names, creators and prices are made up.

export type Category = 'Art' | 'PFPs' | 'Photography' | 'Gaming' | 'Music';
export type Chain = 'Ethereum' | 'Solana' | 'Base';

export type Collection = {
  name: string;
  creator: string;
  category: Category;
  chain: Chain;
  /** Floor price in ETH. */
  floor: number;
  /** 24h floor change in percent. */
  change: number;
  items: number;
  /** Total volume in ETH. */
  volume: number;
  /** Share of items listed for sale, in percent. */
  listed: number;
  verified?: boolean;
};

export const COLLECTIONS: Collection[] = [
  { name: 'Prism Drifters', creator: 'studiokite', chain: 'Ethereum', category: 'Art', floor: 1.42, change: 12.4, items: 8888, volume: 18240, listed: 3.1, verified: true },
  { name: 'Moss Guardians', creator: 'fernlab', chain: 'Ethereum', category: 'PFPs', floor: 0.38, change: -4.2, items: 10000, volume: 9310, listed: 6.8, verified: true },
  { name: 'Neon Koi', creator: 'ripple', chain: 'Ethereum', category: 'Art', floor: 2.9, change: 28.5, items: 777, volume: 4120, listed: 1.2, verified: true },
  { name: 'Paper Planets', creator: 'atlas', chain: 'Base', category: 'Photography', floor: 0.12, change: 3.3, items: 4200, volume: 1180, listed: 9.4 },
  { name: 'Orbit Cats', creator: 'orbital', chain: 'Ethereum', category: 'PFPs', floor: 0.64, change: -1.2, items: 6969, volume: 7450, listed: 4.5, verified: true },
  { name: 'Glass Garden', creator: 'lumen', chain: 'Ethereum', category: 'Art', floor: 4.75, change: 7.7, items: 512, volume: 3890, listed: 0.8, verified: true },
  { name: 'Low Poly Peaks', creator: 'vertex', chain: 'Base', category: 'Gaming', floor: 0.09, change: 66.6, items: 20000, volume: 2270, listed: 12.3 },
  { name: 'Signal Birds', creator: 'morse', chain: 'Base', category: 'Music', floor: 0.21, change: -7.3, items: 3333, volume: 860, listed: 7.1 },
  { name: 'Velvet Static', creator: 'hum', chain: 'Ethereum', category: 'Music', floor: 0.55, change: 187.6, items: 1024, volume: 1540, listed: 2.9 },
  { name: 'Tidal Glyphs', creator: 'marea', chain: 'Ethereum', category: 'Art', floor: 1.08, change: 0, items: 2048, volume: 2610, listed: 3.6, verified: true },
  { name: 'Copper Moths', creator: 'ferrum', chain: 'Base', category: 'Photography', floor: 0.33, change: 59.8, items: 1500, volume: 740, listed: 5.2 },
  { name: 'Quiet Machines', creator: 'idle', chain: 'Ethereum', category: 'Gaming', floor: 0.74, change: -5.1, items: 5000, volume: 3120, listed: 4.4 },
];

export type Token = { name: string; symbol: string; price: number; change: number };

export const TOKENS: Token[] = [
  { name: 'Lumen', symbol: 'LUM', price: 1.84, change: 38.2 },
  { name: 'Driftwood', symbol: 'DRFT', price: 0.042, change: 58.1 },
  { name: 'Kite', symbol: 'KITE', price: 12.6, change: 6.2 },
  { name: 'Mossbit', symbol: 'MOSS', price: 0.0031, change: 423 },
  { name: 'Pixel Rye', symbol: 'RYE', price: 3.27, change: -5 },
];

export type Drop = { name: string; creator: string; price: number; status: 'live' | 'upcoming' };

export const DROPS: Drop[] = [
  { name: 'Early Lanterns', creator: 'kiln', price: 0.02, status: 'live' },
  { name: 'Art Blocks of Salt', creator: 'saltworks', price: 0.05, status: 'live' },
  { name: 'Moon Terraces', creator: 'selene', price: 0.08, status: 'live' },
  { name: 'Harbor Nights', creator: 'dock9', price: 0.03, status: 'upcoming' },
  { name: 'Folded Suns', creator: 'origami', price: 0.1, status: 'upcoming' },
];

export const CATEGORIES = ['All', 'Art', 'PFPs', 'Photography', 'Gaming', 'Music'] as const;
export const CHAINS = ['All chains', 'Ethereum', 'Solana', 'Base'] as const;

export const formatEth = (value: number) =>
  `${value.toLocaleString('en-US', { maximumFractionDigits: value < 1 ? 3 : 2 })} ETH`;

export const formatCompactEth = (value: number) =>
  `${value.toLocaleString('en-US', { notation: 'compact', maximumFractionDigits: 1 })} ETH`;

export const formatUsd = (value: number) =>
  value.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumSignificantDigits: value < 1 ? 2 : 6 });
