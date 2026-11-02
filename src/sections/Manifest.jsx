import { useRef } from 'react';
import { manifest } from '../content/site.js';
import SectionLabel from '../components/ui/SectionLabel.jsx';
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
    return undefined;
  });

  return (
    <section ref={root} id="manifest" className="manifest section" aria-labelledby="manifest-title">
      <div className="container">
        <SectionLabel n={1} total={5}>
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
            {manifest.body && <p className="manifest__body">{manifest.body}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
