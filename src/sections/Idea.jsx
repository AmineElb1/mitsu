import { useRef } from 'react';
import { idea } from '../content/site.js';
import SectionLabel from '../components/ui/SectionLabel.jsx';
import Heading from '../components/ui/Heading.jsx';
import { gsap } from '../lib/motion.js';
import { useMotion } from '../hooks/useMotion.js';
import './Idea.css';

export default function Idea() {
  const root = useRef(null);

  useMotion(root, ({ full }) => {
    if (!full) return undefined;
    const q = gsap.utils.selector(root);
    const cards = q('.idea__card');

    /* overlappende vlakken: elk paneel schuift onder het volgende en wordt kleiner */
    cards.slice(0, -1).forEach((card, i) => {
      gsap.to(q('.idea__panel')[i], {
        scale: 0.92,
        '--dim': 0.62,
        ease: 'none',
        scrollTrigger: { trigger: cards[i + 1], start: 'top 85%', end: 'top 18%', scrub: true }
      });
    });
    /* de grote spookwoorden drijven langzaam tegen de scroll in */
    gsap.fromTo(
      q('.idea__ghost'),
      { xPercent: 8 },
      {
        xPercent: -22,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true }
      }
    );
    gsap.from(q('.idea__orb'), {
      scale: 0,
      stagger: 0.12,
      scrollTrigger: { trigger: q('.idea__stack')[0], start: 'top 80%', once: true }
    });
    return undefined;
  });

  return (
    <section ref={root} id="idee" className="idea section" data-surface="ink" aria-labelledby="idea-title">
      <div className="idea__bg" aria-hidden="true">
        <span className="idea__glow idea__glow--strong" />
        <span className="idea__glow idea__glow--soft" />
        <p className="idea__ghost display">{idea.ghost}</p>
      </div>

      <div className="container">
        <SectionLabel n={2} total={8}>
          {idea.label}
        </SectionLabel>
        <Heading id="idea-title" className="idea__title" parts={idea.title} />

        <ol className="idea__stack">
          {idea.points.map((p, i) => (
            <li className="idea__card" style={{ '--i': i, '--point': p.token }} key={p.n}>
              <article className="idea__panel" data-surface="paper">
                <div className="idea__head">
                  <span className="idea__orb" aria-hidden="true" />
                  <span className="label idea__meta">
                    {p.n} · {p.colour}
                  </span>
                </div>
                <h3 className="idea__name display">{p.name}</h3>
                <p className="idea__text">{p.text}</p>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
