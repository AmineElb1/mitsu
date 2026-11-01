import { useRef, useState } from 'react';
import { services } from '../content/site.js';
import SectionLabel from '../components/ui/SectionLabel.jsx';
import Heading from '../components/ui/Heading.jsx';
import Button from '../components/ui/Button.jsx';
import { gsap, duration } from '../lib/motion.js';
import { useMotion } from '../hooks/useMotion.js';
import { useReducedMotion } from '../hooks/useReducedMotion.js';
import { useGooRail } from '../hooks/useGooRail.js';
import './Services.css';

/** Diensten als grote titellijst: alleen de actieve titel is helder, de rest is spookachtig. */
export default function Services() {
  const root = useRef(null);
  const list = useRef(null);
  const rail = useRef(null);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  /* vloeibare bol naast de titels (zie hooks/useGooRail.js) */
  useGooRail(rail, () => list.current?.querySelectorAll('.services__title-text'), active, 'y', reduced);

  useMotion(root, ({ full }) => {
    if (!full) return undefined;
    const q = gsap.utils.selector(root);
    gsap.from(q('.services__item'), {
      opacity: 0,
      y: '2.5em',
      duration: duration.slow * 1.3,
      stagger: 0.12,
      scrollTrigger: { trigger: q('.services__list')[0], start: 'top 82%', once: true }
    });
    gsap.fromTo(
      q('.services__glow'),
      { yPercent: 20 },
      {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true }
      }
    );
    return undefined;
  });

  return (
    <section ref={root} id="diensten" className="services section" data-surface="ink" aria-labelledby="services-title">
      <div className="services__bg" aria-hidden="true">
        <span className="services__glow" />
        <span className="services__glow services__glow--soft" />
      </div>

      <div className="container services__grid">
        <div className="services__intro">
          <SectionLabel n={3} total={5}>
            {services.label}
          </SectionLabel>
          <Heading id="services-title" className="services__title" parts={services.title} />
          <p className="services__lead">{services.intro}</p>
          <Button variant="solid" href={services.cta.href}>
            {services.cta.label}
          </Button>
        </div>

        <div ref={list} className="services__list-wrap">
          <svg className="services__goo-def" aria-hidden="true" focusable="false">
            <filter id="services-goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8" result="goo" />
              <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
          </svg>
          <div ref={rail} className="services__rail" aria-hidden="true">
            {services.items.map(item => (
              <span className="goo__dot services__dot" key={item.n} />
            ))}
            <span className="goo__trail services__trail" />
            <span className="goo__trail services__trail services__trail--small" />
            <span className="goo__ball services__ball" />
          </div>
        <ul className="services__list">
          {services.items.map((item, i) => {
            const open = active === i;
            return (
              <li
                key={item.n}
                className={`services__item ${open ? 'is-active' : ''}`}
                onMouseEnter={() => setActive(i)}
              >
                <h3 className="services__heading">
                  <button
                    type="button"
                    className="services__trigger"
                    aria-expanded={open}
                    aria-controls={`service-${i}`}
                    id={`service-btn-${i}`}
                    onClick={() => setActive(i)}
                    onFocus={() => setActive(i)}
                  >
                    <span className="services__title-text display">{item.title}</span>
                    <span className="services__num label">{item.n}</span>
                  </button>
                </h3>
                <div
                  id={`service-${i}`}
                  className="services__panel"
                  role="region"
                  aria-labelledby={`service-btn-${i}`}
                >
                  <div className="services__panel-inner">
                    <p className="services__text">{item.text}</p>
                    <ul className="services__tags" aria-label="Onderdelen">
                      {item.tags.map(t => (
                        <li className="label" key={t}>
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        </div>
      </div>
    </section>
  );
}
