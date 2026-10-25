import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { CustomEase } from 'gsap/CustomEase';
import { tokenBezier, tokenSeconds } from './tokens.js';

gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);

export const EASE = 'mitsu';

/** Moet na het laden van tokens.css draaien. Registreert de merk-easing en motion-duren. */
export function initMotion() {
  CustomEase.create(EASE, tokenBezier('--ease'));
  const fast = tokenSeconds('--motion-fast');
  const base = tokenSeconds('--motion-base');
  const slow = tokenSeconds('--motion-slow');
  gsap.defaults({ ease: EASE, duration: base });
  return { fast, base, slow };
}

export const duration = {
  get fast() {
    return tokenSeconds('--motion-fast');
  },
  get base() {
    return tokenSeconds('--motion-base');
  },
  get slow() {
    return tokenSeconds('--motion-slow');
  }
};

export { gsap, ScrollTrigger, SplitText };
