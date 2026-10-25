import { useTheme } from '../../lib/theme.jsx';
import './ThemeToggle.css';

/** Wisselt licht/donker via de semantische tokens. */
export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const dark = theme === 'dark';
  return (
    <button
      className="theme-toggle"
      type="button"
      role="switch"
      aria-checked={dark}
      onClick={toggle}
    >
      <span className="sr-only">Donker thema</span>
      <span className="theme-toggle__track" aria-hidden="true">
        <span className="theme-toggle__thumb" />
      </span>
    </button>
  );
}
