/* React Bits — Magnet (https://github.com/DavidHDev/react-bits), aangepast voor Mitsu:
   GSAP quickTo met merk-easing en motion-duur, uit bij prefers-reduced-motion en op aanraakschermen. */
import { useRef } from 'react';
import { gsap, EASE, duration } from '../../lib/motion.js';
import { useMotion } from '../../hooks/useMotion.js';

export default function Magnet({ children, strength = 0.3, reach = 0.9, className = '', ...rest }) {
  const ref = useRef(null);

  useMotion(
    ref,
    ({ full, fine }) => {
      const el = ref.current;
      if (!el || !full || !fine) return undefined;
      const x = gsap.quickTo(el, 'x', { duration: duration.base, ease: EASE });
      const y = gsap.quickTo(el, 'y', { duration: duration.base, ease: EASE });

      const onMove = event => {
        const rect = el.getBoundingClientRect();
        const dx = event.clientX - (rect.left + rect.width / 2);
        const dy = event.clientY - (rect.top + rect.height / 2);
        const within = Math.abs(dx) < rect.width * (0.5 + reach / 2) && Math.abs(dy) < rect.height * (0.5 + reach);
        x(within ? dx * strength : 0);
        y(within ? dy * strength : 0);
      };
      const reset = () => {
        x(0);
        y(0);
      };
      window.addEventListener('pointermove', onMove, { passive: true });
      el.addEventListener('pointerleave', reset);
      return () => {
        window.removeEventListener('pointermove', onMove);
        el.removeEventListener('pointerleave', reset);
        gsap.set(el, { clearProps: 'transform' });
      };
    },
    { fine: '(hover: hover) and (pointer: fine)' }
  );

  return (
    <span ref={ref} className={`magnet ${className}`} style={{ display: 'inline-flex' }} {...rest}>
      {children}
    </span>
  );
}
