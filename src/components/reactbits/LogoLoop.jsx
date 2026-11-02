/* React Bits — LogoLoop (https://github.com/DavidHDev/react-bits), aangepast voor Mitsu:
   pure CSS-lus, pauzeert bij hover/focus, wordt bij reduced motion een swipebare rij.
   Met `scrollBoost` versnelt de lus tijdelijk terwijl je scrolt. */
import { useEffect, useRef } from 'react';
import './LogoLoop.css';

/* hoeveel extra snelheid per px/ms scrollsnelheid, en het maximum bovenop de basissnelheid */
const BOOST_PER_SPEED = 2.5;
const BOOST_MAX = 3;

export default function LogoLoop({ items, speed = 40, label, repeat = 1, scrollBoost = false, className = '' }) {
  const trackRef = useRef(null);

  /* Met scrollBoost sturen we de lus zelf aan (transform per frame) in plaats van via de CSS-animatie:
     elke frame de playbackRate van een CSS-animatie aanpassen deed hem even haperen bij op en neer scrollen. */
  useEffect(() => {
    if (!scrollBoost) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const track = trackRef.current;
    const root = track?.parentElement;
    if (!track || !root) return undefined;
    track.style.animation = 'none';

    let visible = false;
    let paused = false;
    let raf = 0;
    let rate = 1;
    let offset = 0;
    let lastY = window.scrollY;
    let lastT = performance.now();

    const tick = t => {
      const dt = Math.min(64, Math.max(1, t - lastT));
      const y = window.scrollY;
      const v = Math.abs(y - lastY) / dt;
      lastY = y;
      lastT = t;
      const target = paused ? 0 : 1 + Math.min(v * BOOST_PER_SPEED, BOOST_MAX);
      /* zacht naar de doelsnelheid toe, zodat het uitbolt in plaats van te stoppen */
      rate += (target - rate) * 0.08;
      const half = track.scrollWidth / 2;
      offset = (offset + (half / (speed * 1000)) * rate * dt) % half;
      track.style.transform = `translate3d(${-offset}px, 0, 0)`;
      raf = visible ? requestAnimationFrame(tick) : 0;
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf) {
        lastY = window.scrollY;
        lastT = performance.now();
        raf = requestAnimationFrame(tick);
      }
    });
    io.observe(root);

    const pause = () => (paused = true);
    const resume = () => (paused = false);
    root.addEventListener('pointerenter', pause);
    root.addEventListener('pointerleave', resume);
    root.addEventListener('focusin', pause);
    root.addEventListener('focusout', resume);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      root.removeEventListener('pointerenter', pause);
      root.removeEventListener('pointerleave', resume);
      root.removeEventListener('focusin', pause);
      root.removeEventListener('focusout', resume);
      track.style.animation = '';
      track.style.transform = '';
    };
  }, [scrollBoost, speed]);

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
      <div ref={trackRef} className="loop__track">
        {render()}
        {render(true)}
      </div>
    </div>
  );
}
