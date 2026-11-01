import { useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from '../lib/motion.js';
import { useReducedMotion } from './useReducedMotion.js';

/**
 * "Rups"-beweging tussen opties: de voorste rand gaat eerst en snel, de achterste volgt trager,
 * zodat een markering uitrekt en weer samentrekt in plaats van stijf te verschuiven.
 * `apply({ l, r, y, h })` tekent de markering; waarden in px t.o.v. de container.
 * Zonder beweging (prefers-reduced-motion) springt de markering meteen.
 */
export function useInchworm(containerRef, selector, index, apply, { lead = 0.32, trail = 0.5 } = {}) {
  const reduced = useReducedMotion();
  const state = useRef(null);
  const measure = () => {
    const box = containerRef.current.getBoundingClientRect();
    const el = containerRef.current.querySelectorAll(selector)[index];
    const r = el.getBoundingClientRect();
    return { l: r.left - box.left, r: r.right - box.left, y: r.top - box.top, h: r.height };
  };

  useLayoutEffect(() => {
    if (!containerRef.current || index < 0) return undefined;
    const to = measure();
    if (!state.current || reduced) {
      state.current = { ...to };
      apply(state.current);
      return undefined;
    }
    const s = state.current;
    gsap.killTweensOf(s);
    const right = to.r > s.r;
    const draw = () => apply(s);
    gsap.to(s, { [right ? 'r' : 'l']: right ? to.r : to.l, duration: lead, ease: 'power2.out', onUpdate: draw });
    gsap.to(s, { [right ? 'l' : 'r']: right ? to.l : to.r, duration: trail, delay: 0.1, ease: 'power3.inOut', onUpdate: draw });
    gsap.to(s, { y: to.y, h: to.h, duration: trail, ease: 'power3.inOut', onUpdate: draw });
    return () => gsap.killTweensOf(s);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, reduced]);

  /* opnieuw meten als de breedte of het lettertype verandert */
  useEffect(() => {
    const sync = () => {
      if (!state.current || !containerRef.current || index < 0) return;
      Object.assign(state.current, measure());
      apply(state.current);
    };
    window.addEventListener('resize', sync);
    document.fonts?.ready.then(sync);
    return () => window.removeEventListener('resize', sync);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);
}
