import { useId } from 'react';
import { useTheme } from '../../lib/theme.jsx';
import './ThemeToggle.css';

/**
 * Wisselt licht/donker. Een yin-yang als pil: het zwart schuift met een ronde kop naar de andere kant,
 * de oogjes wisselen van grootte. Licht = wit groot, donker = zwart groot. Alleen transform.
 */
export default function ThemeToggle({ className = '' }) {
  const { theme, toggle } = useTheme();
  const dark = theme === 'dark';
  const id = useId().replace(/:/g, '');
  return (
    <button
      className={`theme-toggle ${dark ? 'is-dark' : ''} ${className}`}
      type="button"
      role="switch"
      aria-checked={dark}
      onClick={toggle}
    >
      <span className="sr-only">Donker thema</span>
      <svg viewBox="0 0 80 40" aria-hidden="true" focusable="false">
        <defs>
          <clipPath id={`theme-clip-${id}`}>
            <rect x="1" y="1" width="78" height="38" rx="19" />
          </clipPath>
        </defs>
        <g clipPath={`url(#theme-clip-${id})`}>
          <rect className="theme-toggle__paper" x="0" y="0" width="80" height="40" />
          {/* zwart deel: links een rechthoek, rechts een ronde kop; schuift via transform */}
          <g className="theme-toggle__ink">
            <rect x="-80" y="0" width="110" height="40" />
            <circle cx="30" cy="20" r="20" />
          </g>
          <circle className="theme-toggle__eye theme-toggle__eye--paper" cx="20" cy="20" r="4" />
          <circle className="theme-toggle__eye theme-toggle__eye--ink" cx="60" cy="20" r="4" />
        </g>
        <rect className="theme-toggle__rim" x="1" y="1" width="78" height="38" rx="19" />
      </svg>
    </button>
  );
}
