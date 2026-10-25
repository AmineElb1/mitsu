import { createContext, useContext, useEffect, useMemo, useRef } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './motion.js';

const ScrollContext = createContext({ scrollTo: () => {}, lenis: () => null });
export const useScroll = () => useContext(ScrollContext);

/**
 * Lenis voor vloeiend scrollen, gekoppeld aan GSAP ScrollTrigger via de GSAP-ticker.
 * Bij prefers-reduced-motion wordt Lenis niet gestart (of direct vernietigd).
 */
export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    let tick = null;
    let onScroll = null;

    const start = () => {
      if (lenisRef.current) return;
      const lenis = new Lenis({ autoRaf: false, smoothWheel: true, anchors: false });
      lenisRef.current = lenis;
      onScroll = ScrollTrigger.update;
      lenis.on('scroll', onScroll);
      tick = time => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    };

    const stop = () => {
      if (tick) gsap.ticker.remove(tick);
      lenisRef.current?.off('scroll', onScroll);
      lenisRef.current?.destroy();
      lenisRef.current = null;
      tick = null;
      onScroll = null;
      gsap.ticker.lagSmoothing(500, 33);
      ScrollTrigger.refresh();
    };

    const sync = () => (mq.matches ? stop() : start());
    sync();
    mq.addEventListener('change', sync);

    return () => {
      mq.removeEventListener('change', sync);
      stop();
    };
  }, []);

  const value = useMemo(
    () => ({
      lenis: () => lenisRef.current,
      scrollTo: (target, options = {}) => {
        const lenis = lenisRef.current;
        if (lenis) lenis.scrollTo(target, options);
        else if (typeof target === 'number') window.scrollTo({ top: target });
        else document.querySelector(target)?.scrollIntoView();
      }
    }),
    []
  );

  /* Hash-links: vloeiend met Lenis, native zonder; focus verhuist mee voor toetsenbordgebruikers */
  useEffect(() => {
    const onClick = event => {
      const link = event.target.closest?.('a[href^="#"]');
      if (!link || event.defaultPrevented || event.metaKey || event.ctrlKey) return;
      const hash = link.getAttribute('href');
      if (hash.length < 2) return;
      const target = document.querySelector(hash);
      if (!target) return;
      event.preventDefault();
      value.scrollTo(target, { offset: 0 });
      history.pushState(null, '', hash);
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [value]);

  return <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>;
}
