import { useId } from 'react';
import './Button.css';

/* Verfvlak achter de hoofdknop: een rechthoek binnen de knop; de ruwe rand komt van het filter (viewBox 200 × 60). */
const BRUSH = 'M9 6H191Q196 6 196 11V49Q196 54 191 54H9Q4 54 4 49V11Q4 6 9 6Z';
/* Penseelstreep onder de tweede knop (viewBox 200 × 12). */
const UNDER = 'M2 7C40 3 90 4 130 5C160 6 185 4 198 6L197 9C150 10 80 11 3 10Z';

/**
 * Twee vormen, geen pills:
 *  primary — verfvlak in lichtblauw met een licht ruwe rand (de hoofdknop)
 *  solid   — hetzelfde vlak in tekstkleur (op donkere vlakken)
 *  outline — tekst met een penseelstreep eronder (de tweede knop)
 * `sheen`: bij hover glijdt een strook licht door de streek. Alleen gebruiken bij de belangrijkste knoppen.
 * `status` ('idle' | 'sending' | 'sent' | 'failed'): voor een verzendknop. Elke toestand heeft een eigen
 *   label in dezelfde cel, zodat de knop niet van breedte verspringt. Verzonden = groen vlak met vinkje
 *   en een kleine veer, mislukt = inktvlak met een korte schud. Labels via `statusLabels`.
 * Met `href` een link, anders een knop. Labels zijn altijd concreet.
 */
export default function Button({
  variant = 'primary',
  href,
  sheen = false,
  status,
  statusLabels = {},
  className = '',
  children,
  ...rest
}) {
  const id = useId().replace(/:/g, '');
  const brush = variant !== 'outline';
  const classes = `button button--${variant} ${brush ? 'button--brush' : 'button--under'} ${
    sheen && brush ? 'has-sheen' : ''
  } ${status && brush ? `has-status is-${status}` : ''} ${className}`;

  const inner = brush ? (
    <>
      <svg className="button__brush" viewBox="0 0 200 60" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <defs>
          {/* licht ruwe rand, zoals verf op papier (statisch filter, animeert niet) */}
          <filter id={`brush-rough-${id}`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.09 0.6" numOctaves="2" seed="3" />
            <feDisplacementMap in="SourceGraphic" scale="2.5" />
          </filter>
          {sheen && (
            <clipPath id={`brush-clip-${id}`}>
              <path d={BRUSH} />
            </clipPath>
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
        {status && (
          /* toestandsvlakken boven het blauw: enkel hun opacity verandert, nooit de kleur zelf */
          <>
            <path className="button__state button__state--sent" d={BRUSH} filter={`url(#brush-rough-${id})`} />
            <path className="button__state button__state--failed" d={BRUSH} filter={`url(#brush-rough-${id})`} />
          </>
        )}
      </svg>
      {status ? (
        <span className="button__label button__faces">
          <span className="button__face" data-face="idle" aria-hidden={status !== 'idle' || undefined}>
            {children}
          </span>
          <span className="button__face" data-face="sending" aria-hidden={status !== 'sending' || undefined}>
            <svg className="button__icon button__spinner" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <circle cx="12" cy="12" r="9" />
            </svg>
            {statusLabels.sending ?? 'Versturen…'}
          </span>
          <span className="button__face" data-face="sent" aria-hidden={status !== 'sent' || undefined}>
            <svg className="button__icon button__check" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M5 12.5l4.5 4.5L19 7.5" />
            </svg>
            {statusLabels.sent ?? 'Verzonden'}
          </span>
          <span className="button__face" data-face="failed" aria-hidden={status !== 'failed' || undefined}>
            <svg className="button__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7.5v5.5M12 16.5v.01" />
            </svg>
            {statusLabels.failed ?? 'Niet verzonden'}
          </span>
        </span>
      ) : (
        <span className="button__label">{children}</span>
      )}
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
