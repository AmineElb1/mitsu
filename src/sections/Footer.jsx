import { brand, footer, nav, photos } from '../content/site.js';
import ThemeToggle from '../components/ui/ThemeToggle.jsx';
import './Footer.css';

/* eenvoudige lijnicoontjes, zelf getekend (geen icon-library nodig) */
const icons = {
  mail: (
    <path d="M3 6.5h18v11H3z M3.5 7l8.5 6.5L20.5 7" />
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" className="footer__icon-dot" />
    </>
  ),
  tiktok: <path d="M14 4v10.5a3.5 3.5 0 1 1-3.5-3.5 M14 4c.4 2.6 2.2 4.3 5 4.5" />
};
const Icon = ({ name }) => (
  <svg className="footer__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    {icons[name]}
  </svg>
);

export default function Footer() {
  /* unieke fotografen, in volgorde van voorkomen */
  const credits = [...new Map(Object.values(photos).filter(p => p.by).map(p => [p.by, p])).values()];
  const year = new Date().getFullYear();

  return (
    <footer className="footer" data-surface="blue">
      <div className="container footer__grid">
        <div className="footer__brand">
          <p className="footer__name display">{brand.name}</p>
          <p className="footer__blurb">{footer.blurb}</p>
          <p className="footer__kanji jp" lang="ja" aria-hidden="true">
            {brand.kanji} · {brand.kanjiLight}
          </p>
        </div>

        <nav className="footer__col" aria-label="Footer">
          <h2 className="footer__title">{footer.links.title}</h2>
          <ul className="footer__list">
            {footer.links.items.map(l => (
              <li key={l.href}>
                <a className="footer__link" href={l.href}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__col">
          <h2 className="footer__title">{footer.contactTitle}</h2>
          <ul className="footer__list">
            <li>
              <a className="footer__link footer__link--icon" href={`mailto:${brand.email}`}>
                <Icon name="mail" />
                {brand.email}
              </a>
            </li>
            {brand.socials.map(s => (
              <li key={s.id}>
                <a className="footer__link footer__link--icon" href={s.href} target="_blank" rel="noopener noreferrer">
                  <Icon name={s.id} />
                  <span className="sr-only">{s.label}: </span>
                  {s.handle}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h2 className="footer__title">{footer.creditsTitle}</h2>
          <p className="footer__small">{footer.creditsText}</p>
          <ul className="footer__credits">
            {credits.map(p => (
              <li key={p.by}>
                <a className="footer__link" href={p.profile} target="_blank" rel="noopener noreferrer">
                  {p.by}
                </a>
              </li>
            ))}
          </ul>
          <div className="footer__theme">
            <span className="footer__small" aria-hidden="true">
              {footer.themeLabel}
            </span>
            <ThemeToggle />
          </div>
        </div>
      </div>

      <div className="container footer__bottom">
        <p className="footer__small">
          © {year} {footer.copyright}
        </p>
        <a className="footer__link footer__small" href="#top">
          Naar boven ↑
        </a>
      </div>
    </footer>
  );
}
