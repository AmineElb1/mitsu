import './SectionLabel.css';

/** Mono-label met nummering in de stijl “01 /08”. */
export default function SectionLabel({ n, total, children }) {
  return (
    <p className="section-label label">
      <span className="section-label__num">
        {String(n).padStart(2, '0')}
        <i className="section-label__total"> /{String(total).padStart(2, '0')}</i>
      </span>
      <span className="section-label__rule" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}
