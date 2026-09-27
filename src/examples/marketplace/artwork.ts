// Deterministic abstract artwork as SVG data URLs, so the example needs no image files.
// The same seed always gives the same picture. These colors are content, not UI tokens.

const PALETTES = [
  ['#1E1B4B', '#6D28D9', '#C4B5FD', '#F5F3FF'],
  ['#0F172A', '#2563EB', '#93C5FD', '#FDE68A'],
  ['#064E3B', '#16A34A', '#BBF7D0', '#FEF3C7'],
  ['#7C2D12', '#EA580C', '#FDBA74', '#FFF7ED'],
  ['#831843', '#DB2777', '#F9A8D4', '#FDF2F8'],
  ['#134E4A', '#0D9488', '#99F6E4', '#F0FDFA'],
  ['#422006', '#CA8A04', '#FDE047', '#FEFCE8'],
  ['#1F2937', '#64748B', '#CBD5E1', '#F8FAFC'],
];

function hash(text: string) {
  let value = 2166136261;
  for (const char of text) {
    value ^= char.charCodeAt(0);
    value = Math.imul(value, 16777619);
  }
  return value >>> 0;
}

// mulberry32: a tiny seeded random number generator.
function seededRandom(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function artwork(seed: string, { width = 400, height = 400 } = {}) {
  const random = seededRandom(hash(seed));
  const [deep, main, light, pale] = PALETTES[Math.floor(random() * PALETTES.length)];
  const angle = Math.floor(random() * 360);
  const unit = Math.min(width, height);

  const blobs = [main, light, pale, deep, light]
    .map((fill) => {
      const x = Math.round(random() * width);
      const y = Math.round(random() * height);
      const r = Math.round(unit * (0.18 + random() * 0.32));
      return `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" opacity="${(0.55 + random() * 0.4).toFixed(2)}"/>`;
    })
    .join('');
  const ring =
    random() > 0.45
      ? `<circle cx="${Math.round(width * (0.3 + random() * 0.4))}" cy="${Math.round(height * (0.3 + random() * 0.4))}" r="${Math.round(unit * 0.28)}" fill="none" stroke="${pale}" stroke-width="${Math.max(2, Math.round(unit * 0.012))}" opacity="0.7"/>`
      : '';

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid slice">` +
    `<defs><linearGradient id="g" gradientTransform="rotate(${angle} .5 .5)"><stop offset="0" stop-color="${deep}"/><stop offset="1" stop-color="${main}"/></linearGradient>` +
    `<filter id="b" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="${Math.round(unit * 0.07)}"/></filter></defs>` +
    `<rect width="100%" height="100%" fill="url(#g)"/><g filter="url(#b)">${blobs}</g>${ring}</svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
