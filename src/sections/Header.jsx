import { useEffect, useRef, useState } from 'react';
import { brand, cta, nav } from '../content/site.js';
import Logo from '../components/ui/Logo.jsx';
import Button from '../components/ui/Button.jsx';
import ThemeToggle from '../components/ui/ThemeToggle.jsx';
import { gsap, duration } from '../lib/motion.js';
import './Header.css';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const barRef = useRef(null);
  const toggleRef = useRef(null);
  const lastY = useRef(0);

  /* Intro: de balk zakt in na de hero-intro */
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      gsap.from(barRef.current, { yPercent: -140, opacity: 0, duration: duration.slow, delay: 0.4 });
    }, barRef);
    return () => ctx.revert();
  }, []);

  /* Verberg bij omlaag scrollen, toon bij omhoog (alleen als het menu dicht is) */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > lastY.current && y > window.innerHeight * 0.6 && !open);
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [open]);

  /* Menu: Escape sluit, scrollen vergrendeld */
  useEffect(() => {
    if (!open) return undefined;
    const onKey = e => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    document.documentElement.classList.add('menu-open');
    return () => {
      document.removeEventListener('keydown', onKey);
      document.documentElement.classList.remove('menu-open');
    };
  }, [open]);

  return (
    <header className={`header ${hidden ? 'is-hidden' : ''}`}>
      <div ref={barRef} className="header__bar">
        <a className="header__logo" href="#top" aria-label="Mitsu, naar de top">
          <Logo label="Mitsu" />
        </a>

        <nav className="header__nav" aria-label="Hoofdnavigatie">
          <ul>
            {nav.map(item => (
              <li key={item.href}>
                <a className="header__link label" href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__actions">
          <ThemeToggle />
          <Button className="header__cta" variant="primary" href={cta.header.href}>
            {cta.header.label}
          </Button>
          <button
            ref={toggleRef}
            className="header__burger"
            type="button"
            aria-expanded={open}
            aria-controls="menu"
            onClick={() => setOpen(o => !o)}
          >
            <span className="sr-only">{open ? 'Sluit menu' : 'Open menu'}</span>
            <span className="header__burger-lines" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div id="menu" className="menu" data-surface="ink" hidden={!open}>
        <nav aria-label="Mobiele navigatie">
          <ul>
            {nav.map((item, i) => (
              <li key={item.href}>
                <a className="menu__link display" href={item.href} onClick={() => setOpen(false)}>
                  <span className="menu__num label">{String(i + 1).padStart(2, '0')}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p className="menu__kanji jp" lang="ja" aria-hidden="true">
          {brand.kanji} · {brand.kanjiLight}
        </p>
        <Button variant="primary" href={cta.header.href} onClick={() => setOpen(false)}>
          {cta.header.label}
        </Button>
      </div>
    </header>
  );
}
