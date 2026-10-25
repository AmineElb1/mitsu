/* Leest design tokens uit de CSS, zodat JavaScript nooit eigen waarden hoeft te kennen. */

const root = () => document.documentElement;

export const tokenValue = (name, el = root()) => getComputedStyle(el).getPropertyValue(name).trim();

/** '700ms' of '0.7s' → seconden */
export const tokenSeconds = name => {
  const raw = tokenValue(name);
  return raw.endsWith('ms') ? parseFloat(raw) / 1000 : parseFloat(raw);
};

/** 'cubic-bezier(.2,.8,.2,1)' → '.2,.8,.2,1' (formaat dat GSAP CustomEase begrijpt) */
export const tokenBezier = name => {
  const match = /cubic-bezier\(([^)]+)\)/.exec(tokenValue(name));
  return match ? match[1].replace(/\s+/g, '') : '0.2,0.8,0.2,1';
};

/** Opgelost kleurwaarde van een token (voor canvas/WebGL, bv. Aurora). */
export const tokenColor = name => tokenValue(name);

export const breakpoint = name => tokenValue(`--bp-${name}`);
