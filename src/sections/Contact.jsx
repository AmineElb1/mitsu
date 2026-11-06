import { useEffect, useRef, useState } from 'react';
import { contact } from '../content/site.js';
import SectionLabel from '../components/ui/SectionLabel.jsx';
import Heading from '../components/ui/Heading.jsx';
import Button from '../components/ui/Button.jsx';
import TopicChoice from '../components/ui/TopicChoice.jsx';
import { brand } from '../content/site.js';
import { gsap, duration } from '../lib/motion.js';
import { useMotion } from '../hooks/useMotion.js';
import { insertAanvraag, supabaseReady } from '../lib/supabase.js';
import './Contact.css';

const emailOk = v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

export default function Contact() {
  const root = useRef(null);
  const form = useRef(null);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | failed (de melding onder het formulier)
  const [button, setButton] = useState('idle'); // zelfde toestanden, maar de knop keert na even terug naar idle
  const resetTimer = useRef(0);
  const [topic, setTopic] = useState(contact.topics[0]);

  useMotion(root, ({ full }) => {
    if (!full) return undefined;
    const q = gsap.utils.selector(root);
    gsap.from(q('.contact__card'), {
      opacity: 0,
      y: '4em',
      duration: duration.slow * 1.4,
      scrollTrigger: { trigger: q('.contact__card')[0], start: 'top 88%', once: true }
    });
    return undefined;
  });

  /* knop toont het resultaat even, en is daarna weer klaar; de melding eronder blijft staan */
  const showResult = result => {
    setStatus(result);
    setButton(result);
    clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setButton('idle'), result === 'sent' ? 2000 : 2500);
  };
  useEffect(() => () => clearTimeout(resetTimer.current), []);

  const onSubmit = async event => {
    event.preventDefault();
    if (button === 'sending') return;
    const data = Object.fromEntries(new FormData(form.current));
    const next = {};
    if (!data.name?.trim()) next.name = contact.errors.name;
    if (!emailOk(data.email?.trim() ?? '')) next.email = contact.errors.email;
    if (!data.message?.trim()) next.message = contact.errors.message;
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) {
      form.current.elements[first]?.focus();
      return;
    }

    /* honeypot: een verborgen veld dat enkel bots invullen; dan doen we alsof alles lukte */
    if (data.website) {
      showResult('sent');
      return;
    }

    clearTimeout(resetTimer.current);
    setStatus('idle');
    setButton('sending');
    // spinner minstens even tonen: een flits van een halve tel leest als een fout
    const minimum = new Promise(r => setTimeout(r, 700));
    try {
      // niet gekoppeld = eerlijk mislukken, nooit doen alsof het verstuurd is
      if (!supabaseReady) throw new Error('niet gekoppeld');
      await Promise.all([
        insertAanvraag({
          naam: data.name.trim(),
          email: data.email.trim(),
          onderwerp: topic,
          bericht: data.message.trim()
        }),
        minimum
      ]);
      showResult('sent');
      form.current.reset();
      setTopic(contact.topics[0]);
    } catch {
      await minimum;
      showResult('failed');
    }
  };

  const f = contact.fields;
  const field = (id, label, props = {}) => {
    const { as: Tag = 'input', ...rest } = props;
    return (
      <div className={`field ${errors[id] ? 'has-error' : ''}`}>
        <label className="field__label label" htmlFor={`contact-${id}`}>
          {label}
          {/* sterretje alleen voor het oog; schermlezers krijgen 'verplicht' via het required-attribuut */}
          {rest.required && (
            <span className="field__req" aria-hidden="true">
              {' '}*
            </span>
          )}
        </label>
        <Tag
          id={`contact-${id}`}
          name={id}
          className="field__control"
          aria-invalid={errors[id] ? 'true' : undefined}
          aria-describedby={errors[id] ? `contact-${id}-error` : undefined}
          {...rest}
        />
        {errors[id] && (
          <p className="field__error" id={`contact-${id}-error`}>
            {errors[id]}
          </p>
        )}
      </div>
    );
  };

  return (
    <section ref={root} id="contact" className="contact section" data-surface="deep" aria-labelledby="contact-title">
      {/* water: een rustig diepblauw vlak, waar de druppel uit de hero in valt */}
      <div className="contact__bg" aria-hidden="true">
        <div className="contact__water" />
      </div>

      <div className="container contact__grid">
        <div className="contact__intro">
          <SectionLabel n={5} total={5}>
            {contact.label}
          </SectionLabel>
          <Heading id="contact-title" className="contact__title" parts={contact.title} />
          <p className="contact__text">{contact.text}</p>
          <p className="contact__mail label">
            <span>Liever mailen?</span>
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
          </p>
        </div>

        <form ref={form} className="contact__card" onSubmit={onSubmit} noValidate aria-describedby="contact-privacy">
          <p className="contact__required label" aria-hidden="true">
            {contact.requiredNote}
          </p>
          {field('name', f.name, { type: 'text', autoComplete: 'name', required: true, maxLength: 120 })}
          {field('email', f.email, { type: 'email', autoComplete: 'email', required: true, inputMode: 'email', maxLength: 200 })}

          <fieldset className="topics">
            <legend className="field__label label">{f.topic}</legend>
            <TopicChoice name="topic" options={contact.topics} value={topic} onChange={setTopic} />
          </fieldset>

          {field('message', f.message, { as: 'textarea', rows: 4, required: true, maxLength: 4000 })}

          {/* voor bots: onzichtbaar en niet bereikbaar met toetsenbord of schermlezer */}
          <div className="contact__hp" aria-hidden="true">
            <label htmlFor="contact-website">Website</label>
            <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="contact__submit">
            <Button variant="primary" type="submit" status={button} aria-disabled={button === 'sending' || undefined}>
              {contact.submit}
            </Button>
            <p className="contact__privacy label" id="contact-privacy">
              {contact.privacy}
            </p>
          </div>

          <div className="contact__status" role="status" aria-live="polite">
            {status === 'sent' && <p className="contact__sent">{contact.sent}</p>}
            {status === 'failed' && (
              <p className="contact__failed">
                {contact.failed} <a href={`mailto:${brand.email}`}>{brand.email}</a>.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
