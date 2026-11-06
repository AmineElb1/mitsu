import { useEffect, useMemo, useState } from 'react';
import Aurora from '../reactbits/Aurora.jsx';
import { tokenColor } from '../../lib/tokens.js';
import { useTheme } from '../../lib/theme.jsx';
import { useReducedMotion } from '../../hooks/useReducedMotion.js';

/* gsm en tablet: het canvas op dpr 1 en 30 fps, en stil tijdens het scrollen.
   Gemeten: de shader was de oorzaak van bijna alle gemiste frames in de hero. */
const COMPACT = '(max-width: 899px), (pointer: coarse)';
function useCompact() {
  const [compact, setCompact] = useState(() => typeof window !== 'undefined' && window.matchMedia(COMPACT).matches);
  useEffect(() => {
    const mq = window.matchMedia(COMPACT);
    const sync = () => setCompact(mq.matches);
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);
  return compact;
}

/**
 * React Bits Aurora, met kleuren uit de design tokens: lichtblauw en wit, als een zachte gloed.
 */
export default function Glow({ height = 0.5, layers = 2, amplitude = 1, blend = 0.6, direction = 'top', opacity = 0.9 }) {
  const { theme } = useTheme();
  const reduced = useReducedMotion();
  const compact = useCompact();
  // opnieuw uitlezen wanneer het thema wisselt
  const stops = useMemo(
    () => [tokenColor('--ref-blue-300'), tokenColor('--ref-white'), tokenColor('--ref-blue-300')],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme]
  );
  return (
    <Aurora
      colorStops={stops}
      height={height}
      layers={layers}
      amplitude={amplitude}
      blend={blend}
      direction={direction}
      opacity={opacity}
      glow={0.7}
      speed={0.6}
      mouseInteraction={!reduced}
      paused={reduced}
      dpr={compact ? 1 : undefined}
      maxFps={compact ? 30 : undefined}
      pauseOnScroll={compact}
    />
  );
}
