import { useRef, useState } from 'react';
import { contact } from '../content/site.js';
import SectionLabel from '../components/ui/SectionLabel.jsx';
import Heading from '../components/ui/Heading.jsx';
import Button from '../components/ui/Button.jsx';
import TopicChoice from '../components/ui/TopicChoice.jsx';
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
      /* demo-modus: kort "verzenden" tonen zodat de knop zijn golf kan laten zien, er wordt niets verstuurd */
      setStatus('sending');
      await new Promise(r => setTimeout(r, 1600));
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
          {field('name', f.name, { type: 'text', autoComplete: 'name', required: true })}
          {field('email', f.email, { type: 'email', autoComplete: 'email', required: true, inputMode: 'email' })}

          <fieldset className="topics">
            <legend className="field__label label">{f.topic}</legend>
            <TopicChoice name="topic" options={contact.topics} value={topic} onChange={setTopic} />
          </fieldset>

          {field('message', f.message, { as: 'textarea', rows: 4, required: true })}

          <div className="contact__submit">
            <Button
              variant="primary"
              type="submit"
              wave
              state={status === 'sending' || status === 'sent' ? status : 'idle'}
              aria-disabled={status === 'sending' || undefined}
            >
              {status === 'sending' ? 'Even geduld…' : status === 'sent' ? 'Verzonden' : contact.submit}
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
