import { useRef } from 'react';
import { manifest } from '../content/site.js';
import SectionLabel from '../components/ui/SectionLabel.jsx';
import Photo from '../components/ui/Photo.jsx';
import SplitText from '../components/reactbits/SplitText.jsx';
import { gsap, duration } from '../lib/motion.js';
import { useMotion } from '../hooks/useMotion.js';
import './Manifest.css';

export default function Manifest() {
  const root = useRef(null);

  useMotion(root, ({ full }) => {
    if (!full) return undefined;
    const q = gsap.utils.selector(root);
    gsap.from(q('[data-manifest-copy] > *'), {
      opacity: 0,
      y: '1.2em',
      duration: duration.slow,
      stagger: 0.14,
      scrollTrigger: { trigger: q('[data-manifest-copy]')[0], start: 'top 85%', once: true }
    });
    /* de strook beelden schuift in verschillende snelheden, als lagen */
    q('.manifest__shot').forEach((el, i) =>
      gsap.fromTo(
        el,
        { yPercent: i % 2 ? 14 : -4 },
        {
          yPercent: i % 2 ? -4 : 12,
          ease: 'none',
          scrollTrigger: { trigger: q('.manifest__strip')[0], start: 'top bottom', end: 'bottom top', scrub: true }
        }
      )
    );
    return undefined;
  });

  return (
    <section ref={root} id="manifest" className="manifest section" aria-labelledby="manifest-title">
      <div className="container">
        <SectionLabel n={1} total={8}>
          {manifest.label}
        </SectionLabel>

        <div className="manifest__grid">
          <SplitText as="h2" id="manifest-title" className="manifest__title display" splitType="words">
            <span className="slash">/ </span>
            {manifest.title.strong} <em>{manifest.title.em}</em> {manifest.title.strongAfter}{' '}
            <span className="manifest__ghost">{manifest.ghost}</span>
          </SplitText>

          <div className="manifest__copy" data-manifest-copy>
            <p className="manifest__intro">{manifest.intro}</p>
            <p className="manifest__highlight">
              <span className="mark">{manifest.highlight}</span>
            </p>
            <p className="manifest__body">{manifest.body}</p>
          </div>
        </div>
      </div>

      <div className="manifest__strip">
        {manifest.strip.map((name, i) => (
          <div className={`manifest__shot manifest__shot--${i + 1}`} key={name}>
            <Photo name={name} sizes="(min-width: 900px) 25vw, 50vw" ratio="3 / 4" tone={name === 'studio' || name === 'torii' ? 'duotone' : 'natural'} />
          </div>
        ))}
      </div>
    </section>
  );
}
