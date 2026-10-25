import { useLayoutEffect } from 'react';
import { gsap } from '../lib/motion.js';

/**
 * Bindt GSAP-animaties aan een scope en ruimt alles netjes op bij unmount.
 * Draait opnieuw wanneer prefers-reduced-motion of een extra conditie wisselt.
 *
 * setup({ full, reduced, ...extra }) mag een cleanup-functie teruggeven.
 * `full` = gebruiker heeft geen voorkeur voor minder beweging.
 */
export function useMotion(scopeRef, setup, extraConditions = {}, deps = []) {
  useLayoutEffect(() => {
    const mm = gsap.matchMedia(scopeRef.current ?? undefined);
    mm.add(
      {
        full: '(prefers-reduced-motion: no-preference)',
        reduced: '(prefers-reduced-motion: reduce)',
        ...extraConditions
      },
      ctx => setup(ctx.conditions, ctx)
    );
    return () => mm.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
