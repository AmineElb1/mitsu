import { clients } from '../content/site.js';
import LogoLoop from '../components/reactbits/LogoLoop.jsx';
import SplitText from '../components/reactbits/SplitText.jsx';
import './Clients.css';

/** Doorlopende rij logo's van projecten waaraan we werkten: alleen de logo's, geen kaders. */
export default function Clients() {
  const items = clients.items.map(c => (
    <img
      className={`client client--${c.shape} ${c.invert ? 'is-inverted' : ''}`}
      key={c.name}
      src={c.logo}
      alt={c.name}
      loading="lazy"
      decoding="async"
    />
  ));

  return (
    <section id="projecten" className="clients section" data-surface="paper" aria-labelledby="clients-title">
      <div className="container clients__head">
        <SplitText as="h2" id="clients-title" className="clients__title display" splitType="words">
          {clients.title}
        </SplitText>
      </div>

      <div className="clients__band">
        <div className="clients__loop">
          <LogoLoop items={items} repeat={3} speed={44} label="Logo's van projecten waaraan we werkten" />
        </div>
      </div>
    </section>
  );
}
