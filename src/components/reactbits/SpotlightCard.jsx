/* React Bits — SpotlightCard (https://github.com/DavidHDev/react-bits), aangepast voor Mitsu:
   gloed in lichtblauw, wit of diepblauw (token-kleuren), volgt de aanwijzer, ook zichtbaar bij toetsenbordfocus. */
import { useRef } from 'react';
import './SpotlightCard.css';

/** layer 'under' = gloed achter de tekst (kaarten), 'over' = gloed over een beeld. */
export default function SpotlightCard({ as: Tag = 'div', tone = 'blue', layer = 'under', className = '', children, ...rest }) {
  const ref = useRef(null);

  const onPointerMove = event => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--spot-x', `${((event.clientX - rect.left) / rect.width) * 100}%`);
    el.style.setProperty('--spot-y', `${((event.clientY - rect.top) / rect.height) * 100}%`);
  };

  return (
    <Tag
      ref={ref}
      className={`spotlight spotlight--${tone} spotlight--${layer} ${className}`}
      onPointerMove={onPointerMove}
      {...rest}
    >
      <span className="spotlight__glow" aria-hidden="true" />
      {children}
    </Tag>
  );
}
