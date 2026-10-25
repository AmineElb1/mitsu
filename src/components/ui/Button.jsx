import Magnet from '../reactbits/Magnet.jsx';
import './Button.css';

/**
 * Drie varianten, altijd pill-vormig:
 *  primary   — lichtblauw, de enige gekleurde knop
 *  outline   — randje in tekstkleur
 *  solid     — zwart (of wit op donker)
 * Met `href` een link, anders een knop. Labels zijn altijd concreet.
 */
export default function Button({
  variant = 'primary',
  href,
  magnetic = false,
  className = '',
  children,
  ...rest
}) {
  const classes = `button button--${variant} ${className}`;
  const inner = <span className="button__label">{children}</span>;
  const el = href ? (
    <a className={classes} href={href} {...rest}>
      {inner}
    </a>
  ) : (
    <button className={classes} type="button" {...rest}>
      {inner}
    </button>
  );
  return magnetic ? <Magnet>{el}</Magnet> : el;
}
