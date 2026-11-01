import { useEffect } from 'react';
import { gsap } from '../lib/motion.js';

/**
 * Vloeibare bol langs een rail (gooey-effect), gedeeld door Diensten (verticaal) en het formulier (horizontaal).
 * De rail bevat .goo__dot per optie, twee .goo__trail-druppels en een .goo__ball. De bol veert naar het midden
 * van het actieve doel; de druppels volgen elk de vorige, zodat er een staart ontstaat die het filter op de rail
 * laat samensmelten. Posities worden elke frame gemeten (de inhoud kan intussen verschuiven).
 * Alleen transform; de lus stopt zodra alles stilstaat. Bij minder beweging springt de bol meteen.
 *
 * railRef   — de rail (draagt het filter)
 * getTargets — functie die de doel-elementen teruggeeft, één per optie
 * active    — index van de actieve optie
 * axis      — 'x' of 'y'
 */
export function useGooRail(railRef, getTargets, active, axis, reduced) {
  useEffect(() => {
    const host = railRef.current;
    const targets = getTargets();
    if (!host || !targets?.length) return undefined;
    const dots = host.querySelectorAll('.goo__dot');
    const ball = host.querySelector('.goo__ball');
    const trail = host.querySelectorAll('.goo__trail');
    const move = v => (axis === 'x' ? `translate3d(${v}px, 0, 0)` : `translate3d(0, ${v}px, 0)`);

    const centers = () => {
      const h = host.getBoundingClientRect();
      return [...targets].map(el => {
        const r = el.getBoundingClientRect();
        return axis === 'x' ? r.left + r.width / 2 - h.left : r.top + r.height * 0.55 - h.top;
      });
    };
    const state = host.__goo ?? (host.__goo = { v: null, t: [null, null], still: 0 });

    const step = () => {
      const vs = centers();
      vs.forEach((v, i) => dots[i] && (dots[i].style.transform = move(v)));
      const target = vs[active] ?? 0;
      if (state.v === null || reduced) {
        state.v = target;
        state.t = [target, target];
      } else {
        state.v += (target - state.v) * 0.1;
        state.t[0] += (state.v - state.t[0]) * 0.22;
        state.t[1] += (state.t[0] - state.t[1]) * 0.22;
      }
      ball.style.transform = move(state.v);
      trail.forEach((el, i) => (el.style.transform = move(state.t[i])));
      const moving = Math.abs(target - state.v) + Math.abs(state.v - state.t[1]) > 0.2;
      state.still = moving ? 0 : state.still + 1;
      /* nog even doorlopen na stilstand: inhoud kan nog verschuiven (panelen, lettertypes) */
      if (state.still > 50) gsap.ticker.remove(step);
    };
    const run = () => {
      state.still = 0;
      gsap.ticker.remove(step);
      gsap.ticker.add(step);
    };
    run();
    window.addEventListener('resize', run);
    return () => {
      gsap.ticker.remove(step);
      window.removeEventListener('resize', run);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, axis, reduced]);
}
