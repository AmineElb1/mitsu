import { useRef } from 'react';
import { work } from '../content/site.js';
import SectionLabel from '../components/ui/SectionLabel.jsx';
import Heading from '../components/ui/Heading.jsx';
import Photo from '../components/ui/Photo.jsx';
import Button from '../components/ui/Button.jsx';
import SpotlightCard from '../components/reactbits/SpotlightCard.jsx';
import SplitText from '../components/reactbits/SplitText.jsx';
import { gsap, duration } from '../lib/motion.js';
import { useMotion } from '../hooks/useMotion.js';
import './Work.css';

/** Eén project groot (Mitsu-werk), de rest compact: eerder werk van de makers. */
export default function Work() {
  const root = useRef(null);
  const [featured, ...earlier] = work.items;

  useMotion(root, ({ full }) => {
    if (!full) return undefined;
    const q = gsap.utils.selector(root);
    q('.work-item__copy').forEach(el =>
      gsap.from(el, {
        opacity: 0,
        y: '4em',
        duration: duration.slow * 1.4,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true }
      })
    );
    gsap.from(q('.work-mini'), {
      opacity: 0,
      y: '3em',
      duration: duration.slow * 1.3,
      stagger: 0.12,
      scrollTrigger: { trigger: q('.work__earlier')[0], start: 'top 85%', once: true }
    });
    return undefined;
  });

  return (
    <section ref={root} id="werk" className="work section" aria-labelledby="work-title">
      <div className="container">
        <div className="work__head">
          <SectionLabel n={4} total={5}>
            {work.label}
          </SectionLabel>
        </div>
        <Heading id="work-title" className="work__title" parts={work.title} />
        <p className="work__note label">{work.intro}</p>

        {/* projectfiche: beeld links, korte feiten in rijen ernaast */}
        <article className="work-item" aria-labelledby={`work-${featured.id}`}>
          <SpotlightCard tone="blue" layer="over" className="work-item__media">
            <Photo name={featured.image} sizes="(min-width: 900px) 58vw, 100vw" ratio={featured.ratio} parallax />
          </SpotlightCard>

          <div className="work-item__copy">
            <SplitText as="h3" id={`work-${featured.id}`} className="work-item__title display" splitType="chars" stagger={0.03}>
              {featured.title}
            </SplitText>
            <p className="work-item__text">{featured.text}</p>
            <dl className="work-item__facts">
              <div>
                <dt className="label">{work.facts.kind}</dt>
                <dd>{featured.kind}</dd>
              </div>
              <div>
                <dt className="label">{work.facts.tags}</dt>
                <dd>{featured.tags.join(', ')}</dd>
              </div>
              {featured.status && (
                <div>
                  <dt className="label">{work.facts.status}</dt>
                  <dd className="work-item__status">{featured.status}</dd>
                </div>
              )}
            </dl>
            {featured.href && (
              <Button variant="outline" href={featured.href} target="_blank" rel="noopener noreferrer">
                {featured.cta || 'Bekijk de site'}
              </Button>
            )}
          </div>
        </article>

        {earlier.length > 0 && (
          <div className="work__earlier">
            <h3 className="work__earlier-title label">{work.earlier.label}</h3>
            <ul className="work__earlier-grid">
              {earlier.map(item => (
                <li key={item.id}>
                  <article className="work-mini" aria-labelledby={`work-${item.id}`}>
                    <SpotlightCard tone="blue" layer="over" className="work-mini__media">
                      <Photo name={item.image} sizes="(min-width: 900px) 30vw, 100vw" ratio="4 / 3" />
                    </SpotlightCard>
                    <p className="work-mini__kind label">{item.kind}</p>
                    <h4 id={`work-${item.id}`} className="work-mini__title display">
                      {item.title}
                    </h4>
                    <p className="work-mini__text">{item.text}</p>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
