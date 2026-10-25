import { useRef } from 'react';
import { brand, footer, photos } from '../content/site.js';
import Logo from '../components/ui/Logo.jsx';
import { gsap, duration } from '../lib/motion.js';
import { useMotion } from '../hooks/useMotion.js';
import './Footer.css';

export default function Footer() {
  const root = useRef(null);

  useMotion(root, ({ full }) => {
    if (!full) return undefined;
    const q = gsap.utils.selector(root);
    gsap.from(q('.footer__char'), {
      yPercent: 70,
      opacity: 0,
      duration: duration.slow * 2,
      stagger: 0.1,
      scrollTrigger: { trigger: q('.footer__mega')[0], start: 'top 95%', once: true }
    });
    return undefined;
  });

  /* unieke fotografen, in volgorde van voorkomen */
  const credits = [...new Map(Object.values(photos).filter(p => p.by).map(p => [p.by, p])).values()];

  return (
    <footer ref={root} className="footer" data-surface="blue">
      <div className="container footer__top">
        <div className="footer__brand">
          <Logo label="Mitsu" />
          <p className="footer__blurb">{footer.blurb}</p>
          <p className="footer__kanji jp" lang="ja" aria-hidden="true">
            {brand.kanji} · {brand.kanjiLight}
          </p>
        </div>

        <nav className="footer__cols" aria-label="Footer">
          {footer.columns.map(col => (
            <div key={col.title}>
              <h2 className="footer__col-title label">{col.title}</h2>
              <ul>
                {col.links.map(l => (
                  <li key={l.href}>
                    <a href={l.href}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="footer__credits">
          <h2 className="footer__col-title label">{footer.creditsTitle}</h2>
          <p>{footer.creditsText}</p>
          <ul className="footer__credit-list">
            {credits.map(p => (
              <li key={p.by}>
                <a href={p.profile} target="_blank" rel="noopener noreferrer">
                  {p.by}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="container footer__demo label">{brand.demoNotice}</p>

      <p className="footer__mega display" aria-hidden="true">
        {brand.name.split('').map((c, i) => (
          <span className="footer__char" key={i}>
            {c}
          </span>
        ))}
      </p>
    </footer>
  );
}
