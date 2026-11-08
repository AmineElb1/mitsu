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

    /* overlappende vlakken: elk paneel schuift onder het volgende, wordt kleiner en donkerder.
       We rekenen dat elke frame uit de echte positie van de volgende kaart, in plaats van met
       ScrollTrigger-posities die bij het laden worden opgemeten: op iOS werden die soms opgemeten
       terwijl de sticky kaarten vastzaten, waardoor kaart 1 en 2 donker bleven tot een refresh. */
    const panels = q('.idea__panel');
    const shades = q('.idea__shade');
    const update = () => {
      const vh = window.innerHeight;
      // eerst alles lezen, dan alles schrijven: geen gedwongen herberekening van de layout
      const tops = cards.slice(1).map(card => card.getBoundingClientRect().top);
      tops.forEach((top, i) => {
        const p = gsap.utils.clamp(0, 1, (vh * 0.85 - top) / (vh * 0.67));
        gsap.set(panels[i], { scale: 1 - 0.08 * p });
        gsap.set(shades[i], { opacity: 0.62 * p });
      });
    };
    update();
    // enkel elke frame rekenen terwijl de sectie in beeld is; de browser meldt dat zelf, zonder opgemeten posities
    const io = new IntersectionObserver(([entry]) => {
      update();
      if (entry.isIntersecting) gsap.ticker.add(update);
      else gsap.ticker.remove(update);
    });
    io.observe(root.current);

    /* de grote spookwoorden drijven langzaam tegen de scroll in; ze eindigen links op de rand van de pagina,
       zodat de eerste letter altijd zichtbaar blijft */
    gsap.fromTo(
      q('.idea__ghost'),
      { xPercent: 12 },
      {
        xPercent: 0,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true }
      }
    );
    return () => {
      io.disconnect();
      gsap.ticker.remove(update);
      gsap.set(panels, { clearProps: 'transform' });
      gsap.set(shades, { clearProps: 'opacity' });
    };
  });

  return (
    <section ref={root} id="idee" className="idea section" data-surface="night" aria-labelledby="idea-title">
      <div className="idea__bg" aria-hidden="true">
        <span className="idea__glow idea__glow--strong" />
        <span className="idea__glow idea__glow--soft" />
        <p className="idea__ghost display">{idea.ghost}</p>
      </div>

      <div className="container">
        <SectionLabel n={2} total={5}>
          {idea.label}
        </SectionLabel>
        <Heading id="idea-title" className="idea__title" parts={idea.title} />

        <ol className="idea__stack">
          {idea.points.map((p, i) => (
            <li className="idea__card" style={{ '--i': i, '--word': p.word }} key={p.n}>
              {/* elk punt een eigen ondergrond; het woord draagt de kleur */}
              <article className={`idea__panel idea__panel--${p.surface}`} data-surface={p.surface}>
                <div className="idea__head">
                  <span className="label idea__meta">{p.n}</span>
                </div>
                <h3 className="idea__name display">{p.name}</h3>
                <p className="idea__text">{p.text}</p>
                <span className="idea__shade" aria-hidden="true" />
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
