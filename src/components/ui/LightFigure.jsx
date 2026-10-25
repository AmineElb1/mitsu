import { useId } from 'react';
import './LightFigure.css';

/**
 * Een persoon, volledig in licht: een zachte witte figuur met gloed.
 * Zonder `cutout` een getekend silhouet (a, b of c); met `cutout` (een vrijgestelde PNG met
 * transparante achtergrond) wordt de foto automatisch een lichtfiguur.
 */
const SHAPES = {
  // lang jas, armen langs het lichaam
  a: {
    head: { cx: 70, cy: 40, rx: 20, ry: 25 },
    body: 'M60 62h20v14H60z M30 92C38 76 56 72 70 72s32 4 40 20l8 122c0 4-6 6-10 4l-8-68-2 180H42l-2-180-8 68c-4 2-10 0-10-4z',
    legs: 'M44 326l-2 110h22l4-110z M72 326l4 110h22l-2-110z'
  },
  // kortere jas, handen in de zakken
  b: {
    head: { cx: 70, cy: 42, rx: 18, ry: 23 },
    body: 'M60 62h20v14H60z M28 94C36 78 54 74 70 74s34 4 42 20l8 76-16 44-6-24v114H42V190l-6 24-16-44z',
    legs: 'M44 298l-4 138h24l4-138z M72 298l4 138h24l-4-138z'
  },
  // slank, uitlopende lange jas
  c: {
    head: { cx: 70, cy: 38, rx: 19, ry: 24 },
    body: 'M60 60h20v14H60z M36 90C44 76 58 72 70 72s26 4 34 18l6 110 14 130H16l14-130z',
    legs: 'M46 326v110h20V326z M74 326v110h20V326z'
  }
};

export default function LightFigure({ variant = 'a', cutout = '', className = '' }) {
  const id = useId();
  const shape = SHAPES[variant] ?? SHAPES.a;

  if (cutout) {
    return <img className={`figure figure--cutout ${className}`} src={cutout} alt="" aria-hidden="true" />;
  }

  return (
    <svg className={`figure ${className}`} viewBox="0 0 140 440" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}-fade`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" className="figure__stop figure__stop--solid" />
          <stop offset="0.62" className="figure__stop figure__stop--solid" />
          <stop offset="1" className="figure__stop figure__stop--clear" />
        </linearGradient>
      </defs>
      <g fill={`url(#${id}-fade)`}>
        <ellipse cx={shape.head.cx} cy={shape.head.cy} rx={shape.head.rx} ry={shape.head.ry} />
        <path d={shape.body} />
        <path d={shape.legs} />
      </g>
    </svg>
  );
}
