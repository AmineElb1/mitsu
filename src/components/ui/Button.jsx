import { useId } from 'react';
import './Button.css';

/* Penseelstreek achter de hoofdknop: ronde aanzet links, rechts zacht uitlopend (viewBox 200 × 60). */
const BRUSH =
  'M16 15C46 8 148 6 184 11C195 13 199 21 195 28C192 34 197 41 189 46C148 54 62 54 18 50C7 49 3 41 5 33C6 25 7 19 16 15Z';
/* Penseelstreep onder de tweede knop (viewBox 200 × 12). */
const UNDER = 'M2 7C40 3 90 4 130 5C160 6 185 4 198 6L197 9C150 10 80 11 3 10Z';

/**
 * Twee vormen, geen pills:
 *  primary — penseelstreek in lichtblauw (de hoofdknop)
 *  solid   — dezelfde streek in tekstkleur (op donkere vlakken)
 *  outline — tekst met een penseelstreep eronder (de tweede knop)
 * `sheen`: bij hover glijdt een strook licht door de streek. Alleen gebruiken bij de belangrijkste knoppen.
 * `wave` + `state` ('idle' | 'sending' | 'sent'): water loopt door de streek — een randje bij hover,
 *   traag doorlopen tijdens verzenden, volledig gevuld bij verzonden. Voor de verzendknop.
 * Met `href` een link, anders een knop. Labels zijn altijd concreet.
 */
export default function Button({
  variant = 'primary',
  href,
  sheen = false,
  wave = false,
  state = 'idle',
  className = '',
  children,
  ...rest
}) {
  const id = useId().replace(/:/g, '');
  const brush = variant !== 'outline';
  const classes = `button button--${variant} ${brush ? 'button--brush' : 'button--under'} ${
    sheen && brush ? 'has-sheen' : ''
  } ${wave && brush ? `has-wave is-${state}` : ''} ${className}`;

  const inner = brush ? (
    <>
      <svg className="button__brush" viewBox="0 0 200 60" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <defs>
          {/* lichte ruwheid op de rand, zoals papier dat inkt opzuigt (statisch filter, animeert niet) */}
          <filter id={`brush-rough-${id}`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.04 0.5" numOctaves="2" seed="7" />
            <feDisplacementMap in="SourceGraphic" scale="2" />
          </filter>
          {(sheen || wave) && (
            <clipPath id={`brush-clip-${id}`}>
              <path d={BRUSH} />
            </clipPath>
          )}
          {wave && (
            /* gooey: lichaam en ronde rand smelten samen tot één vloeibare golf */
            <filter id={`brush-goo-${id}`} x="-20%" y="-50%" width="140%" height="200%" colorInterpolationFilters="sRGB">
              <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8" />
            </filter>
          )}
          {sheen && (
            <>
              <linearGradient id={`brush-sheen-${id}`} x1="0" x2="1" y1="0" y2="0">
                <stop offset="0" className="button__sheen-stop button__sheen-stop--clear" />
                <stop offset="0.5" className="button__sheen-stop" />
                <stop offset="1" className="button__sheen-stop button__sheen-stop--clear" />
              </linearGradient>
            </>
          )}
        </defs>
        <path className="button__brush-fill" d={BRUSH} filter={`url(#brush-rough-${id})`} />
        {sheen && (
          <g clipPath={`url(#brush-clip-${id})`}>
            <rect className="button__sheen" x="-70" y="-10" width="60" height="80" fill={`url(#brush-sheen-${id})`} />
          </g>
        )}
        {wave && (
          <g clipPath={`url(#brush-clip-${id})`}>
            <g className="button__wave" filter={`url(#brush-goo-${id})`}>
              <rect x="-400" y="-10" width="400" height="80" />
              <circle cx="0" cy="12" r="14" />
              <circle cx="0" cy="34" r="16" />
              <circle cx="0" cy="54" r="12" />
            </g>
          </g>
        )}
      </svg>
      <span className="button__label">{children}</span>
    </>
  ) : (
    <>
      <span className="button__label">{children}</span>
      <svg className="button__under" viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path d={UNDER} />
      </svg>
    </>
  );

  const el = href ? (
    <a className={classes} href={href} {...rest}>
      {inner}
    </a>
  ) : (
    <button className={classes} type="button" {...rest}>
      {inner}
    </button>
  );
  return el;
}
