import { useRef } from 'react';
import { useInchworm } from '../../hooks/useInchworm.js';
import './TopicChoice.css';

const UNDER = 'M2 7C40 3 90 4 130 5C160 6 185 4 198 6L197 9C150 10 80 11 3 10Z';

/**
 * Keuze tussen een paar opties als gewone tekst, zonder pills. Echte radio's (toetsenbord, schermlezer).
 * Een penseelstreep onder de keuze kruipt als een rups naar de nieuwe keuze (zie hooks/useInchworm.js);
 * de gekozen tekst licht op.
 */
export default function TopicChoice({ name, options, value, onChange }) {
  const box = useRef(null);
  const stroke = useRef(null);
  const index = options.indexOf(value);

  useInchworm(box, '.topic-choice__text', index, ({ l, r, y, h }) => {
    if (!stroke.current) return;
    stroke.current.style.transform = `translate3d(${l}px, ${y + h}px, 0) scaleX(${(r - l) / 100})`;
  });

  return (
    <div ref={box} className="topic-choice">
      <svg
        ref={stroke}
        className="topic-choice__stroke"
        viewBox="0 0 200 12"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path d={UNDER} />
      </svg>
      {options.map(t => (
        <label className={`topic-choice__opt ${value === t ? 'is-on' : ''}`} key={t}>
          <input
            className="topic-choice__input"
            type="radio"
            name={name}
            value={t}
            checked={value === t}
            onChange={() => onChange(t)}
          />
          <span className="topic-choice__text">{t}</span>
        </label>
      ))}
    </div>
  );
}
