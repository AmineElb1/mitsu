import { useEffect, useRef, useState } from 'react';
import { brand, cta, nav } from '../content/site.js';
import Logo from '../components/ui/Logo.jsx';
import Button from '../components/ui/Button.jsx';
import MenuIcon from '../components/ui/MenuIcon.jsx';
import { gsap, duration, EASE } from '../lib/motion.js';
import { CustomEase } from 'gsap/CustomEase';
import './Header.css';

/* dezelfde penseelstreep als onder de tweede knop (viewBox 200 × 12) */
const UNDER = 'M2 7C40 3 90 4 130 5C160 6 185 4 198 6L197 9C150 10 80 11 3 10Z';

/* Breedte van de gebogen rand links van het menu, in px (zelfde als in Header.css) */
const CURVE = 100;
/* Traag vertrekken, snel door het midden, zacht landen: voelt als een doek dat dichtschuift */
CustomEase.create('menu', 'M0,0 C0.76,0 0.24,1 1,1');

export default function Header() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const barRef = useRef(null);
  const toggleRef = useRef(null);
  const menuRef = useRef(null);
  const curveRef = useRef(null);
  const lastY = useRef(0);

  /* Intro: de balk zakt in na de hero-intro */
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      gsap.from(barRef.current, {
        yPercent: -140,
        opacity: 0,
        duration: duration.slow,
        delay: 0.4
      });
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

  /* Menu start buiten beeld rechts, met de bolle rand volledig uitgezet */
  useEffect(() => {
    gsap.set(menuRef.current, { xPercent: 100, x: CURVE });
    gsap.set(curveRef.current, { scaleX: 1 });
  }, []);

  /* Menu in- en uitschuiven. De bolle rand trekt zich recht door alleen te schalen (scaleX), geen padmorph. */
  const firstRun = useRef(true);
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return undefined;
    }
    const menu = menuRef.current;
    const curve = curveRef.current;
    const items = menu.querySelectorAll('[data-menu-item]');
    gsap.killTweensOf([menu, curve, items]);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(menu, {
        xPercent: 0,
        x: 0,
        visibility: open ? 'visible' : 'hidden'
      });
      gsap.set(curve, { scaleX: 0 });
      gsap.set(items, { opacity: 1, y: 0 });
      return undefined;
    }

    const tl = gsap.timeline();
    if (open) {
      tl.set(menu, { visibility: 'visible' })
        .to(menu, { xPercent: 0, x: 0, duration: 0.8, ease: 'menu' }, 0)
        .to(curve, { scaleX: 0, duration: 1, ease: 'menu' }, 0)
        .fromTo(
          items,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.06,
            duration: duration.slow,
            ease: EASE
          },
          0.35
        );
    } else {
      tl.to(menu, { xPercent: 100, x: CURVE, duration: 0.8, ease: 'menu' }, 0)
        .to(curve, { scaleX: 1, duration: 0.8, ease: 'menu' }, 0)
        .set(menu, { visibility: 'hidden' });
    }
    return () => tl.kill();
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
    /* focus naar de eerste link, zodat toetsenbord en schermlezer meteen in het menu zitten */
    menuRef.current?.querySelector('a')?.focus({ preventScroll: true });
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
                  <svg
                    className="header__under"
                    viewBox="0 0 200 12"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d={UNDER} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__actions">
          <Button className="header__cta" variant="primary" href={cta.header.href} sheen>
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
            <MenuIcon open={open} />
          </button>
        </div>
      </div>

      <div id="menu" ref={menuRef} className="menu" data-surface="night">
        <svg
          ref={curveRef}
          className="menu__curve"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M100 0 L100 100 Q-100 50 100 0" />
        </svg>
        {/* aparte scrollbox: overflow op .menu zelf zou de bolle rand wegknippen */}
        <div className="menu__inner" data-lenis-prevent>
          <nav className="menu__nav" aria-label="Mobiele navigatie">
            <ul>
              {nav.map((item, i) => (
                <li key={item.href} data-menu-item>
                  <a className="menu__link display" href={item.href} onClick={() => setOpen(false)}>
                    <span className="menu__num label">{String(i + 1).padStart(2, '0')}</span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="menu__cta" data-menu-item>
            <Button variant="primary" href={cta.header.href} onClick={() => setOpen(false)}>
              {cta.header.label}
            </Button>
          </div>
          <div className="menu__foot" data-menu-item>
            <p className="menu__kanji jp" lang="ja" aria-hidden="true">
              {brand.kanji} · {brand.kanjiLight}
            </p>
            <ul className="menu__socials">
              {brand.socials.map(s => (
                <li key={s.id}>
                  <a className="label" href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.label}
                  </a>
                </li>
              ))}
              <li>
                <a className="label" href={`mailto:${brand.email}`}>
                  E-mail
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
