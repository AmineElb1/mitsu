import { useMemo } from 'react';
import Aurora from '../reactbits/Aurora.jsx';
import { tokenColor } from '../../lib/tokens.js';
import { useTheme } from '../../lib/theme.jsx';
import { useReducedMotion } from '../../hooks/useReducedMotion.js';

/**
 * React Bits Aurora, met kleuren uit de design tokens: lichtblauw en wit, als een zachte gloed.
 */
export default function Glow({ height = 0.5, layers = 2, amplitude = 1, blend = 0.6, direction = 'top', opacity = 0.9 }) {
  const { theme } = useTheme();
  const reduced = useReducedMotion();
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
    />
  );
}
