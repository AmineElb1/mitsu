import { useRef, useState } from 'react';
import { contact } from '../content/site.js';
import SectionLabel from '../components/ui/SectionLabel.jsx';
import Heading from '../components/ui/Heading.jsx';
import Photo from '../components/ui/Photo.jsx';
import Button from '../components/ui/Button.jsx';
import { brand } from '../content/site.js';
import { gsap, duration } from '../lib/motion.js';
import { useMotion } from '../hooks/useMotion.js';
import './Contact.css';

const emailOk = v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

export default function Contact() {
  const root = useRef(null);
  const form = useRef(null);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | failed
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

  const onSubmit = async event => {
    event.preventDefault();
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

    if (!contact.endpoint) {
      setStatus('sent');
      form.current.reset();
      setTopic(contact.topics[0]);
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch(contact.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('sent');
      form.current.reset();
      setTopic(contact.topics[0]);
    } catch {
      setStatus('failed');
    }
  };

  const f = contact.fields;
  const field = (id, label, props = {}) => {
    const { as: Tag = 'input', ...rest } = props;
    return (
      <div className={`field ${errors[id] ? 'has-error' : ''}`}>
        <label className="field__label label" htmlFor={`contact-${id}`}>
          {label}
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
    <section ref={root} id="contact" className="contact section" data-surface="blue" aria-labelledby="contact-title">
      <div className="contact__bg" aria-hidden="true">
        <Photo name="mossrock" sizes="100vw" overlay="none" parallax credit={false} className="contact__photo" />
        <div className="contact__veil" />
      </div>

      <div className="container contact__grid">
        <div className="contact__intro">
          <SectionLabel n={8} total={8}>
            {contact.label}
          </SectionLabel>
          <Heading id="contact-title" className="contact__title" parts={contact.title} />
          <p className="contact__text">{contact.text}</p>
          <p className="contact__mail label">
            <span>Liever mailen?</span>
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
            <span className="contact__demo">(voorbeeldadres)</span>
          </p>
        </div>

        <form ref={form} className="contact__card" onSubmit={onSubmit} noValidate aria-describedby="contact-privacy">
          {field('name', f.name, { type: 'text', autoComplete: 'name', required: true })}
          {field('email', f.email, { type: 'email', autoComplete: 'email', required: true, inputMode: 'email' })}

          <fieldset className="topics">
            <legend className="field__label label">{f.topic}</legend>
            <div className="topics__row">
              {contact.topics.map(t => (
                <label className="topic" key={t}>
                  <input
                    className="topic__input"
                    type="radio"
                    name="topic"
                    value={t}
                    checked={topic === t}
                    onChange={() => setTopic(t)}
                  />
                  <span className="topic__pill">{t}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {field('message', f.message, { as: 'textarea', rows: 4, required: true })}

          <div className="contact__submit">
            <Button variant="primary" type="submit" disabled={status === 'sending'} magnetic>
              {status === 'sending' ? 'Even geduld…' : contact.submit}
            </Button>
            <p className="contact__privacy label" id="contact-privacy">
              {contact.privacy}
            </p>
          </div>

          <div className="contact__status" role="status" aria-live="polite">
            {status === 'sent' && (
              <p className="contact__sent">{contact.endpoint ? contact.success.live : contact.success.demo}</p>
            )}
            {status === 'failed' && (
              <p className="contact__failed">Er ging iets mis bij het versturen. Probeer het zo nog eens.</p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
