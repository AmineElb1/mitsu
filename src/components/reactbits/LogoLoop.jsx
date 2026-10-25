/* React Bits — LogoLoop (https://github.com/DavidHDev/react-bits), aangepast voor Mitsu:
   pure CSS-lus (geen JS per frame), pauzeert bij hover/focus, wordt bij reduced motion een swipebare rij. */
import './LogoLoop.css';

export default function LogoLoop({ items, speed = 40, label, repeat = 1, className = '' }) {
  const render = (hidden = false) => (
    <ul className="loop__list" aria-hidden={hidden || undefined}>
      {Array.from({ length: repeat }, (_, r) =>
        items.map((node, i) => (
          <li className="loop__item" key={`${r}-${i}`} aria-hidden={r > 0 ? true : undefined}>
            {node}
          </li>
        ))
      )}
    </ul>
  );

  return (
    <div
      className={`loop ${className}`}
      style={{ '--loop-duration': `${speed}s` }}
      role="region"
      aria-label={label}
      tabIndex={0}
    >
      <div className="loop__track">
        {render()}
        {render(true)}
      </div>
    </div>
  );
}
