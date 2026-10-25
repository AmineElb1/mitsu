import { useRef } from 'react';
import { makers } from '../content/site.js';
import SectionLabel from '../components/ui/SectionLabel.jsx';
import Heading from '../components/ui/Heading.jsx';
import Button from '../components/ui/Button.jsx';
import Photo from '../components/ui/Photo.jsx';
import { gsap, duration } from '../lib/motion.js';
import { useMotion } from '../hooks/useMotion.js';
import './Makers.css';

const pad = n => String(n).padStart(2, '0');

/** Drie makers: Amine, Zayd en Haider, met echte foto's in zwart-wit en lichtblauw. */
export default function Makers() {
  const root = useRef(null);

  useMotion(root, ({ full }) => {
    if (!full) return undefined;
    const q = gsap.utils.selector(root);
    gsap.from(q('.maker'), {
      opacity: 0,
      y: '4em',
      duration: duration.slow * 1.4,
      stagger: 0.16,
      scrollTrigger: { trigger: q('.makers__grid')[0], start: 'top 82%', once: true }
    });
    return undefined;
  });

  return (
    <section ref={root} id="makers" className="makers section" data-surface="blue" aria-labelledby="makers-title">
      <div className="container">
        <div className="makers__head">
          <div className="makers__titles">
            <SectionLabel n={5} total={8}>
              {makers.label}
            </SectionLabel>
            <Heading id="makers-title" className="makers__title" parts={makers.title} slash />
          </div>
          <div className="makers__aside">
            <p className="makers__intro">{makers.intro}</p>
            <Button variant="outline" href={makers.link.href}>
              {makers.link.label}
            </Button>
          </div>
        </div>

        <ul className="makers__grid">
          {makers.items.map((m, i) => (
            <li className="maker" key={m.name}>
              <Photo
                name={m.photo}
                sizes="(min-width: 900px) 30vw, 90vw"
                ratio="4 / 5"
                tone="duotone"
                parallax
                className="maker__photo"
              />
              <p className="maker__num label">
                {pad(i + 1)}
                <i> /{pad(makers.items.length)}</i>
              </p>
              <h3 className="maker__name display">{m.name}</h3>
              <p className="maker__line">{m.line}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
