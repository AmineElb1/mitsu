import './MenuIcon.css';

/**
 * Hamburgericoon dat in één lijn naar een kruis vloeit. De bovenste en onderste streep zijn
 * één doorlopend pad: bij openen schuift het zichtbare stuk (dasharray) over dat pad naar de diagonaal,
 * terwijl het geheel 45° draait. Dat is de enige plek waar we niet met transform/opacity animeren:
 * het icoon is klein, dus het herschilderen kost niets.
 */
export default function MenuIcon({ open }) {
  return (
    <svg className={`menu-icon ${open ? 'is-open' : ''}`} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <path
        className="menu-icon__loop"
        d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
      />
      <path d="M7 16 27 16" />
    </svg>
  );
}
