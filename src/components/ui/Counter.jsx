import { useRef } from 'react';
import { gsap, duration } from '../../lib/motion.js';
import { useMotion } from '../../hooks/useMotion.js';

const format = (n, decimals) =>
  new Intl.NumberFormat('nl-NL', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(n);

/** Cijfer dat optelt zodra het in beeld komt. Zonder beweging staat meteen de eindwaarde. */
export default function Counter({ value, decimals = 0, suffix = '', className = '' }) {
  const ref = useRef(null);
  const textRef = useRef(null);

  useMotion(ref, ({ full }) => {
    const target = textRef.current;
    if (!target) return undefined;
    if (!full) {
      target.textContent = format(value, decimals);
      return undefined;
    }
    const state = { n: 0 };
    target.textContent = format(0, decimals);
    gsap.to(state, {
      n: value,
      duration: duration.slow * 3,
      onUpdate: () => (target.textContent = format(state.n, decimals)),
      scrollTrigger: { trigger: ref.current, start: 'top 90%', once: true }
    });
    return undefined;
  });

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">
        {format(value, decimals)}
        {suffix}
      </span>
      <span aria-hidden="true">
        <span ref={textRef}>{format(value, decimals)}</span>
        {suffix && <span className="counter__suffix">{suffix}</span>}
      </span>
    </span>
  );
}
