import { useRef } from 'react';
import { work } from '../content/site.js';
import SectionLabel from '../components/ui/SectionLabel.jsx';
import Heading from '../components/ui/Heading.jsx';
import Photo from '../components/ui/Photo.jsx';
import Button from '../components/ui/Button.jsx';
import DemoBadge from '../components/ui/DemoBadge.jsx';
import SpotlightCard from '../components/reactbits/SpotlightCard.jsx';
import SplitText from '../components/reactbits/SplitText.jsx';
import { gsap, duration } from '../lib/motion.js';
import { useMotion } from '../hooks/useMotion.js';
import './Work.css';

const pad = n => String(n).padStart(2, '0');

export default function Work() {
  const root = useRef(null);

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
    q('.work-item__index').forEach(el =>
      gsap.from(el, {
        opacity: 0,
        xPercent: -12,
        duration: duration.slow * 1.4,
        scrollTrigger: { trigger: el, start: 'top 90%', once: true }
      })
    );
    return undefined;
  });

  return (
    <section ref={root} id="werk" className="work section" aria-labelledby="work-title">
      <p className="work__ghost display" aria-hidden="true">
        mitsu
      </p>
      <div className="container">
        <div className="work__head">
          <SectionLabel n={3} total={8}>
            {work.label}
          </SectionLabel>
        </div>
        <Heading id="work-title" className="work__title" parts={work.title} />
        <p className="work__note label">{work.intro}</p>

        <ol className="work__list">
          {work.items.map((item, i) => (
            <li key={item.id}>
              <article className={`work-item work-item--${i % 2 ? 'b' : 'a'}`} aria-labelledby={`work-${item.id}`}>
                <p className="work-item__index display" aria-hidden="true">
                  {pad(i + 1)}
                  <i> /{pad(work.items.length)}</i>
                </p>

                <SpotlightCard tone="blue" layer="over" className="work-item__media">
                  <Photo
                    name={item.image}
                    sizes="(min-width: 900px) 58vw, 100vw"
                    ratio={item.ratio}
                    parallax
                  />
                </SpotlightCard>

                <div className="work-item__copy">
                  <p className="work-item__kind label">
                    <span>{item.kind}</span>
                    {item.status && <DemoBadge>{item.status}</DemoBadge>}
                  </p>
                  <SplitText as="h3" id={`work-${item.id}`} className="work-item__title display" splitType="chars" stagger={0.03}>
                    {item.title}
                  </SplitText>
                  <p className="work-item__text">{item.text}</p>
                  <ul className="work-item__tags" aria-label="Disciplines">
                    {item.tags.map(t => (
                      <li className="label" key={t}>
                        {t}
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" href="#contact">
                    Vraag naar vergelijkbaar werk
                  </Button>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
