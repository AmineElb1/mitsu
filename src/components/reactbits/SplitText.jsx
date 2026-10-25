/* React Bits — SplitText (https://github.com/DavidHDev/react-bits), aangepast voor Mitsu:
   - accepteert children (zodat één <em> in een kop behouden blijft)
   - easing, duur en blur komen uit de design tokens
   - respecteert prefers-reduced-motion (tekst staat dan meteen goed) en ruimt zichzelf op */
import { useRef } from 'react';
import { gsap, SplitText as GsapSplitText, duration } from '../../lib/motion.js';
import { tokenValue } from '../../lib/tokens.js';
import { useMotion } from '../../hooks/useMotion.js';
import './SplitText.css';

export default function SplitText({
  as: Tag = 'div',
  children,
  className = '',
  splitType = 'words', // 'chars' | 'words' | 'lines'
  effect = 'rise', // 'rise' | 'blur' | 'fade'
  trigger = 'view', // 'view' | 'load'
  stagger = 0.06,
  delay = 0,
  start = 'top 88%',
  ...rest
}) {
  const ref = useRef(null);

  useMotion(ref, ({ full }) => {
    const el = ref.current;
    if (!el) return undefined;
    if (!full) {
      el.setAttribute('data-reveal-ready', '');
      return undefined;
    }

    let split;
    let cancelled = false;
    const masked = effect === 'rise';
    const types = masked ? `lines,${splitType === 'lines' ? '' : splitType}`.replace(/,$/, '') : splitType;

    const run = () => {
      if (cancelled) return;
      split = GsapSplitText.create(el, {
        type: types,
        mask: masked ? 'lines' : undefined,
        linesClass: 'split-line',
        autoSplit: true,
        aria: 'auto',
        onSplit(self) {
          const targets = self[splitType];
          const from =
            effect === 'blur'
              ? { opacity: 0, filter: `blur(${tokenValue('--blur-reveal')})`, yPercent: 14 }
              : effect === 'fade'
                ? { opacity: 0 }
                : { yPercent: 110 };
          el.setAttribute('data-reveal-ready', '');
          return gsap.from(targets, {
            ...from,
            duration: duration.slow,
            stagger,
            delay,
            clearProps: 'filter,opacity,transform',
            scrollTrigger: trigger === 'view' ? { trigger: el, start, once: true } : undefined
          });
        }
      });
    };

    (document.fonts?.ready ?? Promise.resolve()).then(run);

    return () => {
      cancelled = true;
      split?.revert();
    };
  });

  return (
    <Tag ref={ref} className={className} data-reveal {...rest}>
      {children}
    </Tag>
  );
}
