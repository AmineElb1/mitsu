import { useRef } from 'react';
import { brand, cta, hero, makers } from '../content/site.js';
import Photo from '../components/ui/Photo.jsx';
import Button from '../components/ui/Button.jsx';
import Glow from '../components/ui/Glow.jsx';
import LightFigure from '../components/ui/LightFigure.jsx';
import SplitText from '../components/reactbits/SplitText.jsx';
import { gsap, duration } from '../lib/motion.js';
import { tokenValue } from '../lib/tokens.js';
import { useMotion } from '../hooks/useMotion.js';
import './Hero.css';

/**
 * Hero: blauwe lucht, de enorme wordmark en — wazig, achter de letters — drie mensen in licht.
 * De figuren blijven bewust onscherp: ze zijn aanwezig, niet in beeld.
 */
export default function Hero() {
  const root = useRef(null);

  useMotion(root, ({ full }) => {
    const q = gsap.utils.selector(root);
    if (!full) {
      gsap.set(q('[data-hero-fade]'), { opacity: 1 });
      return undefined;
    }
    const blur = tokenValue('--blur-reveal');

    /* Intro: wordmark wordt scherp, de drie wazige figuren verschijnen erachter, rest fade in */
    const tl = gsap.timeline({ delay: 0.15 });
    tl.from(
      q('.hero__word-char'),
      { opacity: 0, yPercent: 24, filter: `blur(${blur})`, duration: duration.slow * 1.8, stagger: 0.1 },
      0.3
    )
      .from(q('.hero__person .figure'), { opacity: 0, yPercent: 12, duration: duration.slow * 2.2, stagger: 0.2 }, 0.8)
      .from(q('[data-hero-fade]'), { opacity: 0, y: '1.5em', duration: duration.slow, stagger: 0.12 }, 1.2);

    /* de figuren blijven wazig en ademen zacht (ze worden nooit scherp) */
    q('.hero__person .figure').forEach((el, i) =>
      gsap.to(el, { yPercent: -2.5, duration: duration.slow * 5 + i, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: i * 0.5 })
    );

    /* parallax bij het wegscrollen: de titel trekt sneller weg dan de figuren erachter */
    const scrub = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true };
    if (q('.hero__sky').length) gsap.to(q('.hero__sky'), { yPercent: 12, ease: 'none', scrollTrigger: scrub });
    gsap.to(q('.hero__word'), { yPercent: -16, ease: 'none', scrollTrigger: scrub });
    return undefined;
  });

  const word = brand.name.split('');

  return (
    <section ref={root} id="top" className="hero" data-surface="ink" aria-labelledby="hero-title">
      {hero.image && (
        <div className="hero__sky" aria-hidden="true">
          <Photo name={hero.image} sizes="100vw" eager reveal={false} credit={false} className="hero__photo" />
        </div>
      )}
      <div className="hero__aurora" aria-hidden="true">
        <Glow height={0.5} layers={2} opacity={0.7} />
      </div>
      <div className="hero__veil" aria-hidden="true" />

      <div className="container hero__inner">
        <p className="hero__eyebrow label" data-hero-fade>
          <span className="jp" lang="ja">
            {brand.kanji} · {brand.kanjiLight}
          </span>
        </p>

        <h1 id="hero-title" className="hero__title">
          <span className="sr-only">Mitsu: {brand.idea}</span>
          <span className="hero__word display" aria-hidden="true">
            {word.map((c, i) => (
              <span className="hero__word-char" key={i}>
                {c}
              </span>
            ))}
          </span>
        </h1>

        <div className="hero__foot">
          <p className="hero__lead" data-hero-fade>
            {hero.lead}
          </p>
          <div className="hero__cta" data-hero-fade>
            <Button variant="primary" href={cta.primary.href} magnetic>
              {cta.primary.label}
            </Button>
            <Button variant="outline" href={cta.secondary.href}>
              {cta.secondary.label}
            </Button>
          </div>
          <SplitText as="p" className="hero__tagline display" splitType="words" trigger="load" delay={1.4}>
            {hero.tagline.before} <em>{hero.tagline.em}</em>
            {hero.tagline.after}
          </SplitText>
        </div>
      </div>

      <div className="hero__people" aria-hidden="true">
        {makers.items.map((m, i) => (
          <div className={`hero__person hero__person--${i + 1}`} key={m.name}>
            <LightFigure variant={m.figure} />
          </div>
        ))}
      </div>
    </section>
  );
}
