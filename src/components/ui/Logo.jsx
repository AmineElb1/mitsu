import './Logo.css';

/** Drie stijgende cirkels (diepblauw, lichtblauw, wit licht) + de wordmark “mitsu” in lowercase Fraunces. */
export default function Logo({ className = '', showWord = true, label = 'Mitsu, naar de top' }) {
  return (
    <span className={`logo ${className}`} role="img" aria-label={label}>
      <svg className="logo__mark" viewBox="0 0 36 36" aria-hidden="true" focusable="false">
        <circle className="logo__dot logo__dot--1" cx="7" cy="28" r="5" />
        <circle className="logo__dot logo__dot--2" cx="18" cy="18" r="5.5" />
        <circle className="logo__dot logo__dot--3" cx="29" cy="8" r="6" />
      </svg>
      {showWord && (
        <span className="logo__word" aria-hidden="true">
          mitsu
        </span>
      )}
    </span>
  );
}
