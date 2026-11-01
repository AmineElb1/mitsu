import { useEffect } from 'react';
import { ThemeProvider } from './lib/theme.jsx';
import SmoothScroll from './lib/SmoothScroll.jsx';
import { ScrollTrigger } from './lib/motion.js';
import Header from './sections/Header.jsx';
import Hero from './sections/Hero.jsx';
import Manifest from './sections/Manifest.jsx';
import Idea from './sections/Idea.jsx';
import Work from './sections/Work.jsx';
import Services from './sections/Services.jsx';
import Clients from './sections/Clients.jsx';
import Contact from './sections/Contact.jsx';
import Footer from './sections/Footer.jsx';

export default function App() {
  /* Na het laden van lettertypen en beelden de scroll-posities opnieuw meten */
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener('load', refresh);
    return () => window.removeEventListener('load', refresh);
  }, []);

  return (
    <ThemeProvider>
      <SmoothScroll>
        <a className="skip-link" href="#main">
          Ga naar de inhoud
        </a>
        <Header />
        <main id="main">
          <Hero />
          <Manifest />
          <Idea />
          <Services />
          <Work />
          <Clients />
          <Contact />
        </main>
        <Footer />
      </SmoothScroll>
    </ThemeProvider>
  );
}
