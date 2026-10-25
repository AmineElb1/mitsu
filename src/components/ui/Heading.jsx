import SplitText from '../reactbits/SplitText.jsx';

/**
 * Display-kop: Fraunces light, met precies één cursief nadrukwoord.
 * parts = { before, em, after } — de losse stukken staan in content/site.js.
 */
export default function Heading({ as = 'h2', parts, className = '', splitType = 'words', effect = 'rise', slash = true, ...rest }) {
  const { before = '', em, after = '' } = parts;
  return (
    <SplitText as={as} className={`display ${className}`} splitType={splitType} effect={effect} {...rest}>
      {slash && <span className="slash">/ </span>}
      {before}
      {before && ' '}
      {em && <em>{em}</em>}
      {after && ' '}
      {after}
    </SplitText>
  );
}
