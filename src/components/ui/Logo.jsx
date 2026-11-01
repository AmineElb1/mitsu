import './Logo.css';

/** De wordmark "mitsu" in lowercase Fraunces; geen beeldmerk (de drie bolletjes zijn afgevoerd). */
export default function Logo({ className = '', label = 'Mitsu, naar de top' }) {
  return (
    <span className={`logo ${className}`} role="img" aria-label={label}>
      <span className="logo__word" aria-hidden="true">
        mitsu
      </span>
    </span>
  );
}
