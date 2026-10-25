import { useRef } from 'react';
import { quote } from '../content/site.js';
import SectionLabel from '../components/ui/SectionLabel.jsx';
import { gsap, SplitText } from '../lib/motion.js';
import { useMotion } from '../hooks/useMotion.js';
import './Quote.css';

/** Groot serif-citaat op een lichte, zacht oplichtende achtergrond. Woorden lichten op tijdens het scrollen. */
export default function Quote() {
  const root = useRef(null);
  const text = useRef(null);

  useMotion(root, ({ full }) => {
    const el = text.current;
    if (!el) return undefined;
    if (!full) {
      el.setAttribute('data-reveal-ready', '');
      return undefined;
    }
    let split;
    let cancelled = false;
    (document.fonts?.ready ?? Promise.resolve()).then(() => {
      if (cancelled) return;
      split = SplitText.create(el, {
        type: 'words',
        aria: 'auto',
        autoSplit: true,
        onSplit(self) {
          el.setAttribute('data-reveal-ready', '');
          return gsap.fromTo(
            self.words,
            { opacity: 0.18 },
            {
              opacity: 1,
              ease: 'none',
              stagger: 0.5,
              scrollTrigger: { trigger: el, start: 'top 78%', end: 'bottom 48%', scrub: true }
            }
          );
        }
      });
    });
    gsap.fromTo(
      '.quote__glow',
      { yPercent: 25, scale: 0.9 },
      {
        yPercent: -25,
        scale: 1.1,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true }
      }
    );
    return () => {
      cancelled = true;
      split?.revert();
    };
  });

  return (
    <section ref={root} id="citaat" className="quote section" data-surface="paper" aria-labelledby="quote-label">
      <div className="quote__bg" aria-hidden="true">
        <span className="quote__glow quote__glow--soft" />
        <span className="quote__glow quote__glow--white" />
      </div>
      <div className="container quote__inner">
        <div id="quote-label">
          <SectionLabel n={7} total={8}>
            {quote.label}
          </SectionLabel>
        </div>
        <figure className="quote__figure">
          <blockquote>
            <p ref={text} data-reveal className="quote__text display">
              “{quote.text.before} <em>{quote.text.em}</em> {quote.text.after}”
            </p>
          </blockquote>
          <figcaption className="quote__by">
            <span className="quote__dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span className="label">{quote.by}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
