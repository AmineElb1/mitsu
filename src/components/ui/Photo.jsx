import { useRef } from 'react';
import { gsap, duration } from '../../lib/motion.js';
import { tokenValue } from '../../lib/tokens.js';
import { useMotion } from '../../hooks/useMotion.js';
import { imageConfig, photos } from '../../content/site.js';
import './Photo.css';

const src = (id, width) =>
  `${imageConfig.base}/photo-${id}?auto=format&fit=${imageConfig.fit}&q=${imageConfig.quality}&fm=${imageConfig.format}&w=${width}`;

/**
 * Eén beeld, één stijl.
 *  overlay  'blue' | 'pale' | 'none'            — lichtblauwe kleurlaag
 *  tone     'duotone' | 'natural'               — duotone = zwart-wit onder lichtblauw
 *  reveal   blur naar scherp bij in beeld komen
 *  parallax langzame verschuiving binnen het kader
 *  credit   toont de fotograaf (hover/focus), volledige lijst staat ook in de footer
 */
export default function Photo({
  name,
  sizes = '100vw',
  ratio,
  overlay = 'none',
  tone = 'natural',
  reveal = true,
  parallax = false,
  eager = false,
  credit = true,
  alt,
  className = '',
  style
}) {
  const photo = photos[name];
  const ref = useRef(null);
  const imgRef = useRef(null);

  useMotion(ref, ({ full }) => {
    const img = imgRef.current;
    if (!img || !full) return undefined;

    if (reveal) {
      // bij duotone staat het grijs in CSS; houd het tijdens de blur vast zodat er niets flitst
      const base = tone === 'duotone' ? 'grayscale(1) contrast(1.1) ' : '';
      gsap.fromTo(
        img,
        { filter: `${base}blur(${tokenValue('--blur-reveal')})`, scale: 1.08 },
        {
          filter: `${base}blur(0rem)`,
          scale: 1,
          duration: duration.slow * 2,
          clearProps: 'filter',
          scrollTrigger: { trigger: ref.current, start: 'top 92%', once: true }
        }
      );
    }
    if (parallax) {
      gsap.fromTo(
        img,
        { yPercent: -7 },
        {
          yPercent: 7,
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true }
        }
      );
    }
    return undefined;
  });

  if (!photo) return null;
  const local = Boolean(photo.src);

  return (
    <figure
      ref={ref}
      className={`photo photo--${tone} photo--overlay-${overlay} ${parallax ? 'photo--parallax' : ''} ${className}`}
      style={{ ...(ratio ? { aspectRatio: ratio } : null), ...style }}
    >
      <img
        ref={imgRef}
        className="photo__img"
        src={local ? photo.src : src(photo.id, 1200)}
        srcSet={local ? undefined : imageConfig.widths.map(w => `${src(photo.id, w)} ${w}w`).join(', ')}
        sizes={sizes}
        alt={alt ?? photo.alt}
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : 'auto'}
        decoding="async"
        style={{ objectPosition: photo.focus }}
      />
      <span className="photo__tint" aria-hidden="true" />
      {credit && photo.by && (
        <figcaption className="photo__credit label">
          <a href={photo.page} target="_blank" rel="noopener noreferrer">
            Foto: {photo.by} / Unsplash
          </a>
        </figcaption>
      )}
    </figure>
  );
}
