import './DemoBadge.css';

/** Markeert voorbeeldcontent duidelijk, in lichtblauw. */
export default function DemoBadge({ children = 'Voorbeeld' }) {
  return <span className="demo-badge label">{children}</span>;
}
