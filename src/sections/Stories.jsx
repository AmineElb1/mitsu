import { useRef } from 'react';
import { stories } from '../content/site.js';
import SectionLabel from '../components/ui/SectionLabel.jsx';
import Heading from '../components/ui/Heading.jsx';
import DemoBadge from '../components/ui/DemoBadge.jsx';
import Counter from '../components/ui/Counter.jsx';
import SpotlightCard from '../components/reactbits/SpotlightCard.jsx';
import { gsap, duration } from '../lib/motion.js';
import { useMotion } from '../hooks/useMotion.js';
import './Stories.css';

export default function Stories() {
  const root = useRef(null);

  useMotion(root, ({ full }) => {
    if (!full) return undefined;
    const q = gsap.utils.selector(root);
    gsap.from(q('.story'), {
      opacity: 0,
      y: '3em',
      duration: duration.slow * 1.3,
      stagger: 0.14,
      scrollTrigger: { trigger: q('.stories__grid')[0], start: 'top 85%', once: true }
    });
    gsap.from(q('.stat'), {
      opacity: 0,
      y: '2em',
      duration: duration.slow * 1.2,
      stagger: 0.14,
      scrollTrigger: { trigger: q('.stories__stats')[0], start: 'top 88%', once: true }
    });
    return undefined;
  });

  return (
    <section ref={root} id="verhalen" className="stories section" aria-labelledby="stories-title">
      <div className="container">
        <div className="stories__head">
          <div className="stories__titles">
            <SectionLabel n={6} total={8}>
              {stories.label}
            </SectionLabel>
            <Heading id="stories-title" className="stories__title" parts={stories.title} />
          </div>
          <div className="stories__demo">
            <DemoBadge>Voorbeeldcontent</DemoBadge>
            <p className="label">{stories.demoNote}</p>
          </div>
        </div>

        <ul className="stories__grid">
          {stories.quotes.map((q, i) => (
            <li key={i}>
              <SpotlightCard as="figure" tone={i === 1 ? 'white' : 'blue'} className="story">
                <svg className="story__mark" viewBox="0 0 48 36" aria-hidden="true" focusable="false">
                  <path d="M0 36V20C0 8 7 1 19 0v7c-6 1-9 5-9 10h9v19H0zm27 0V20C27 8 34 1 46 0v7c-6 1-9 5-9 10h9v19H27z" />
                </svg>
                <blockquote className="story__text">{q.text}</blockquote>
                <figcaption className="story__who">
                  <span className="story__avatar" aria-hidden="true" />
                  <span>
                    <strong>{q.who}</strong>
                    <span className="label">{q.role}</span>
                  </span>
                  {q.demo && <DemoBadge>Voorbeeld</DemoBadge>}
                </figcaption>
              </SpotlightCard>
            </li>
          ))}
        </ul>

        <dl className="stories__stats">
          {stories.stats.map(s => (
            <div className="stat" key={s.label}>
              <dt className="stat__label">
                {s.label} <span className="label">(voorbeeldcijfer)</span>
              </dt>
              <dd className="stat__value display">
                <Counter value={s.value} decimals={s.decimals} suffix={s.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
