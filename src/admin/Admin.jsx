import { useCallback, useEffect, useRef, useState } from 'react';
import Button from '../components/ui/Button.jsx';
import ThemeToggle from '../components/ui/ThemeToggle.jsx';
import { ThemeProvider } from '../lib/theme.jsx';
import { deleteAanvraag, listAanvragen, signIn, supabaseReady, updateAanvraag } from '../lib/supabase.js';

/* sessionStorage: na het sluiten van de tab moet je opnieuw inloggen (gedeelde laptops) */
const KEY = 'mitsu-admin';
const readSession = () => {
  try {
    const s = JSON.parse(sessionStorage.getItem(KEY) ?? 'null');
    return s && s.expiresAt > Date.now() ? s : null;
  } catch {
    return null;
  }
};

const COLUMNS = [
  { id: 'nieuw', label: 'Nieuw' },
  { id: 'bezig', label: 'Bezig' },
  { id: 'klaar', label: 'Afgerond' }
];

const lang = new Intl.DateTimeFormat('nl-BE', { dateStyle: 'long', timeStyle: 'short' });
const kort = new Intl.DateTimeFormat('nl-BE', { day: 'numeric', month: 'short' });
const relatief = new Intl.RelativeTimeFormat('nl-BE', { numeric: 'auto' });

/* "vandaag 14:02", "gisteren", "3 dagen geleden", daarna gewoon de datum */
function wanneer(iso) {
  const d = new Date(iso);
  const dagen = Math.round((new Date().setHours(0, 0, 0, 0) - new Date(iso).setHours(0, 0, 0, 0)) / 864e5);
  if (dagen === 0) return `vandaag ${d.toLocaleTimeString('nl-BE', { hour: '2-digit', minute: '2-digit' })}`;
  if (dagen < 7) return relatief.format(-dagen, 'day');
  return kort.format(d);
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3" />
    </svg>
  );
}

/* bevestigen in een popup (<dialog>): focus zit erin, Escape of klik ernaast annuleert */
function ConfirmDelete({ row, onConfirm, onCancel }) {
  const ref = useRef(null);
  const cancel = useRef(null);

  useEffect(() => {
    const dialog = ref.current;
    if (row && !dialog.open) {
      dialog.showModal();
      cancel.current?.focus(); // veilige knop eerst: per ongeluk Enter wist niets
    }
    if (!row && dialog.open) dialog.close();
  }, [row]);

  return (
    <dialog
      ref={ref}
      className="confirm"
      aria-labelledby="confirm-title"
      aria-describedby="confirm-text"
      onClose={onCancel}
      onClick={event => {
        if (event.target === ref.current) ref.current.close();
      }}
    >
      {row && (
        <div className="confirm__inner">
          <h2 id="confirm-title" className="confirm__title">
            Aanvraag van {row.naam} verwijderen?
          </h2>
          <p id="confirm-text" className="confirm__text">
            Ze verdwijnt definitief, ook het bericht en de notitie. Dit kan je niet ongedaan maken.
          </p>
          <div className="confirm__actions">
            <button type="button" ref={cancel} className="confirm__no" onClick={() => ref.current.close()}>
              Annuleer
            </button>
            <button type="button" className="confirm__yes" onClick={() => onConfirm(row.id)}>
              Verwijder
            </button>
          </div>
        </div>
      )}
    </dialog>
  );
}

function CardBody({ row }) {
  if (!row) return null;
  return (
    <>
      <span className="card__top">
        <span className="card__topic">{row.onderwerp}</span>
        <time dateTime={row.created_at}>{wanneer(row.created_at)}</time>
      </span>
      <span className="card__name">{row.naam}</span>
      <span className="card__msg">{row.bericht}</span>
      {row.notitie && <span className="card__note">Notitie</span>}
    </>
  );
}

const isExpired = e => /JWT|401|expired/i.test(e.message);

export default function Admin() {
  return (
    <ThemeProvider>
      <AdminApp />
    </ThemeProvider>
  );
}

function AdminApp() {
  const [session, setSession] = useState(readSession);

  const logout = useCallback(() => {
    try {
      sessionStorage.removeItem(KEY);
    } catch {
      /* niets te wissen */
    }
    setSession(null);
  }, []);

  if (!supabaseReady) {
    return (
      <Shell>
        <p className="admin__note">
          Supabase is nog niet gekoppeld. Vul de URL en de key in <code>src/lib/supabase.js</code>.
        </p>
      </Shell>
    );
  }
  if (!session) {
    return (
      <Shell>
        <Login onLogin={setSession} />
      </Shell>
    );
  }
  return <Board session={session} onLogout={logout} />;
}

function Shell({ children, actions }) {
  return (
    <div className="admin">
      <header className="admin__head">
        <h1 className="admin__title display">
          Aanvragen<span className="admin__brand"> · mitsu</span>
        </h1>
        <div className="admin__actions">
          {actions}
          <ThemeToggle />
        </div>
      </header>
      {children}
    </div>
  );
}

function Login({ onLogin }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async event => {
    event.preventDefault();
    if (busy) return;
    const data = Object.fromEntries(new FormData(event.currentTarget));
    setBusy(true);
    setError('');
    try {
      const res = await signIn(data.email.trim(), data.password);
      const s = { token: res.access_token, email: res.user?.email, expiresAt: Date.now() + res.expires_in * 1000 };
      try {
        sessionStorage.setItem(KEY, JSON.stringify(s));
      } catch {
        /* zonder opslag blijft de sessie enkel in deze pagina */
      }
      onLogin(s);
    } catch {
      setError('Inloggen lukte niet. Controleer je e-mailadres en wachtwoord.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <form className="admin__login" onSubmit={onSubmit}>
      <label className="admin__field">
        <span className="label">E-mailadres</span>
        <input name="email" type="email" autoComplete="username" required />
      </label>
      <label className="admin__field">
        <span className="label">Wachtwoord</span>
        <input name="password" type="password" autoComplete="current-password" required />
      </label>
      {error && (
        <p className="admin__error" role="alert">
          {error}
        </p>
      )}
      <Button variant="primary" type="submit" aria-disabled={busy || undefined}>
        {busy ? 'Even geduld…' : 'Inloggen'}
      </Button>
    </form>
  );
}

function Board({ session, onLogout }) {
  const [rows, setRows] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [openId, setOpenId] = useState(() => Number(location.hash.replace('#aanvraag-', '')) || null);
  const [dragOver, setDragOver] = useState(null);
  const [asking, setAsking] = useState(null); // id van de aanvraag in de verwijder-popup

  const fail = useCallback(
    (e, text) => {
      if (isExpired(e)) onLogout();
      else setError(text);
    },
    [onLogout]
  );

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      setRows(await listAanvragen(session.token));
    } catch (e) {
      fail(e, 'De aanvragen konden niet geladen worden. Probeer opnieuw.');
    } finally {
      setLoading(false);
    }
  }, [session.token, fail]);

  useEffect(() => {
    load();
  }, [load]);

  /* één aanpassing: meteen tonen, bij een fout terugzetten */
  const patch = useCallback(
    async (id, change) => {
      const before = rows.find(r => r.id === id);
      setRows(list => list.map(r => (r.id === id ? { ...r, ...change } : r)));
      try {
        await updateAanvraag(session.token, id, change);
        return true;
      } catch (e) {
        setRows(list => list.map(r => (r.id === id ? before : r)));
        fail(e, 'Opslaan lukte niet. Probeer opnieuw.');
        return false;
      }
    },
    [rows, session.token, fail]
  );

  /* verwijderen: meteen weg uit het bord, terugzetten als het mislukt */
  const remove = useCallback(
    async id => {
      const before = rows;
      setRows(list => list.filter(r => r.id !== id));
      setAsking(null);
      setOpenId(null);
      history.replaceState(null, '', location.pathname);
      try {
        await deleteAanvraag(session.token, id);
      } catch (e) {
        setRows(before);
        fail(e, 'Verwijderen lukte niet. Probeer opnieuw.');
      }
    },
    [rows, session.token, fail]
  );

  const open = id => {
    setOpenId(id);
    history.replaceState(null, '', `#aanvraag-${id}`);
  };
  const close = () => {
    setOpenId(null);
    history.replaceState(null, '', location.pathname);
  };

  /* ---------- slepen: de kaart zelf gaat mee met muis of vinger ----------
     Eigen pointer-logica in plaats van HTML5 drag & drop: die toont enkel een doorschijnend
     spookbeeld en werkt niet op touch. Muis: slepen na 5px. Touch: eerst kort vasthouden,
     zodat gewoon scrollen blijft werken. De zwevende kaart beweegt enkel via transform. */
  const drag = useRef(null);
  const floatRef = useRef(null);
  const boardRef = useRef(null);
  const suppressClick = useRef(false);
  const patchRef = useRef(patch);
  patchRef.current = patch;
  const rowsRef = useRef(rows);
  rowsRef.current = rows;
  const [dragId, setDragId] = useState(null);

  const onCardPointerDown = (event, row) => {
    if (event.button !== 0) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const d = {
      id: row.id,
      x0: event.clientX,
      y0: event.clientY,
      ox: event.clientX - rect.left,
      oy: event.clientY - rect.top,
      w: rect.width,
      h: rect.height,
      touch: event.pointerType !== 'mouse',
      started: false,
      over: null,
      timer: 0
    };
    drag.current = d;
    if (d.touch) d.timer = setTimeout(() => startDrag(), 280);
  };

  const startDrag = () => {
    const d = drag.current;
    if (!d || d.started) return;
    d.started = true;
    suppressClick.current = true;
    navigator.vibrate?.(8);
    setDragId(d.id);
  };

  useEffect(() => {
    const move = event => {
      const d = drag.current;
      if (!d) return;
      const dist = Math.hypot(event.clientX - d.x0, event.clientY - d.y0);
      if (!d.started) {
        if (d.touch && dist > 8) {
          // de vinger bewoog voor het vasthouden voorbij was: dat is scrollen, geen slepen
          clearTimeout(d.timer);
          drag.current = null;
        } else if (!d.touch && dist > 5) startDrag();
        return;
      }
      d.x = event.clientX;
      d.y = event.clientY;
      if (floatRef.current) {
        floatRef.current.style.transform = `translate(${d.x - d.ox}px, ${d.y - d.oy}px) rotate(1.5deg)`;
      }
      hitTest(d);
      // op gsm staan de kolommen naast elkaar: zolang de vinger aan de rand blijft, schuift het bord mee
      if (!d.scrolling) {
        d.scrolling = true;
        const step = () => {
          const cur = drag.current;
          const board = boardRef.current;
          if (!cur?.started || !board) return;
          const edge = 56;
          const dir = cur.x < edge ? -1 : cur.x > window.innerWidth - edge ? 1 : 0;
          if (dir && board.scrollWidth > board.clientWidth) {
            board.scrollLeft += dir * 12;
            hitTest(cur);
          }
          requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    };
    const hitTest = d => {
      const col = document.elementFromPoint(d.x, d.y)?.closest('[data-col]')?.dataset.col ?? null;
      if (col !== d.over) {
        d.over = col;
        setDragOver(col);
      }
    };
    const end = () => {
      const d = drag.current;
      if (!d) return;
      clearTimeout(d.timer);
      drag.current = null;
      if (!d.started) return;
      const row = rowsRef.current?.find(r => r.id === d.id);
      if (row && d.over && row.status !== d.over) patchRef.current(d.id, { status: d.over });
      setDragId(null);
      setDragOver(null);
      // de klik die na het loslaten volgt mag het paneel niet openen
      setTimeout(() => {
        suppressClick.current = false;
      }, 0);
    };
    // tijdens het slepen op touch mag de pagina niet scrollen
    const block = event => {
      if (drag.current?.started) event.preventDefault();
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', end);
    window.addEventListener('pointercancel', end);
    window.addEventListener('touchmove', block, { passive: false });
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', end);
      window.removeEventListener('pointercancel', end);
      window.removeEventListener('touchmove', block);
    };
  }, []);

  const actions = (
    <>
      <button
        type="button"
        className={`admin__icon ${loading ? 'is-loading' : ''}`}
        onClick={load}
        aria-label="Vernieuwen"
        title="Vernieuwen"
        aria-busy={loading || undefined}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M20 12a8 8 0 1 1-2.34-5.66" />
          <path d="M20 4v5h-5" />
        </svg>
      </button>
      <Button variant="outline" onClick={onLogout}>
        Uitloggen
      </Button>
    </>
  );

  const current = rows?.find(r => r.id === openId) ?? null;

  return (
    <Shell actions={actions}>
      {error && (
        <p className="admin__error" role="alert">
          {error}
        </p>
      )}
      {!rows ? (
        <p className="admin__note">{loading ? 'Laden…' : ''}</p>
      ) : (
        <div className={`board ${dragId ? 'is-dragging' : ''}`} ref={boardRef}>
          {COLUMNS.map(col => {
            const items = rows.filter(r => r.status === col.id);
            return (
              <section
                key={col.id}
                className={`board__col ${dragOver === col.id ? 'is-over' : ''}`}
                aria-labelledby={`col-${col.id}`}
                data-col={col.id}
              >
                <h2 id={`col-${col.id}`} className="board__head label">
                  {col.label} <span className="board__count">{items.length}</span>
                </h2>
                {items.length === 0 ? (
                  <p className="board__empty">Niets hier.</p>
                ) : (
                  <ul className="board__list">
                    {items.map(r => (
                      <li key={r.id} className={`card-wrap ${dragId === r.id ? 'is-placeholder' : ''}`}>
                        <button
                          type="button"
                          className="card"
                          onPointerDown={event => onCardPointerDown(event, r)}
                          onClick={() => {
                            if (!suppressClick.current) open(r.id);
                          }}
                        >
                          <CardBody row={r} />
                        </button>
                        <button
                          type="button"
                          className="card__trash"
                          aria-label={`Aanvraag van ${r.naam} verwijderen`}
                          title="Verwijderen"
                          onClick={() => setAsking(r.id)}
                        >
                          <TrashIcon />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            );
          })}
        </div>
      )}

      {dragId && (
        <div
          ref={floatRef}
          className="card card--float"
          aria-hidden="true"
          style={{
            width: drag.current?.w,
            height: drag.current?.h,
            transform: `translate(${(drag.current?.x0 ?? 0) - (drag.current?.ox ?? 0)}px, ${
              (drag.current?.y0 ?? 0) - (drag.current?.oy ?? 0)
            }px) rotate(1.5deg)`
          }}
        >
          <CardBody row={rows.find(r => r.id === dragId)} />
        </div>
      )}

      <Detail row={current} onClose={close} onPatch={patch} onAskDelete={setAsking} />
      <ConfirmDelete row={rows?.find(r => r.id === asking) ?? null} onConfirm={remove} onCancel={() => setAsking(null)} />
    </Shell>
  );
}

function Detail({ row, onClose, onPatch, onAskDelete }) {
  const ref = useRef(null);
  const [note, setNote] = useState('');
  const [saved, setSaved] = useState('');

  /* <dialog> geeft focus-opsluiting en Escape gratis */
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (row && !dialog.open) dialog.showModal();
    if (!row && dialog.open) dialog.close();
  }, [row]);

  useEffect(() => {
    setNote(row?.notitie ?? '');
    setSaved('');
  }, [row?.id, row?.notitie]);

  const saveNote = async () => {
    if (!row || note === (row.notitie ?? '')) return;
    setSaved('Opslaan…');
    const ok = await onPatch(row.id, { notitie: note.trim() || null });
    setSaved(ok ? 'Opgeslagen' : '');
  };

  return (
    <dialog
      ref={ref}
      className="detail"
      aria-labelledby="detail-title"
      onClose={onClose}
      onClick={event => {
        // klik op de donkere achtergrond sluit
        if (event.target === ref.current) ref.current.close();
      }}
    >
      {row && (
        <div className="detail__inner">
          <div className="detail__bar">
            <p className="label">
              {row.onderwerp} · <time dateTime={row.created_at}>{lang.format(new Date(row.created_at))}</time>
            </p>
            <div className="detail__tools">
              <button
                type="button"
                className="admin__icon"
                onClick={() => onAskDelete(row.id)}
                aria-label="Aanvraag verwijderen"
                title="Verwijderen"
              >
                <TrashIcon />
              </button>
              <button type="button" className="admin__icon" onClick={() => ref.current.close()} aria-label="Sluiten">
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
          </div>

          <h2 id="detail-title" className="detail__name display">
            {row.naam}
          </h2>
          <p className="detail__mail">
            <a href={`mailto:${row.email}?subject=${encodeURIComponent(`Je aanvraag bij Mitsu (${row.onderwerp})`)}`}>
              {row.email}
            </a>
          </p>

          <div className="detail__status" role="radiogroup" aria-label="Status">
            {COLUMNS.map(col => (
              <button
                key={col.id}
                type="button"
                role="radio"
                aria-checked={row.status === col.id}
                onClick={() => row.status !== col.id && onPatch(row.id, { status: col.id })}
              >
                {col.label}
              </button>
            ))}
          </div>

          <section className="detail__block" aria-label="Bericht">
            <p className="label detail__label">Bericht</p>
            <p className="detail__msg">{row.bericht}</p>
          </section>

          <label className="detail__block">
            <span className="label detail__label">
              Interne notitie <span className="detail__saved">{saved}</span>
            </span>
            <textarea
              className="detail__note"
              rows={4}
              maxLength={4000}
              value={note}
              placeholder="Enkel zichtbaar voor jullie."
              onChange={event => {
                setNote(event.target.value);
                setSaved('');
              }}
              onBlur={saveNote}
            />
          </label>

          <Button
            variant="primary"
            href={`mailto:${row.email}?subject=${encodeURIComponent(`Je aanvraag bij Mitsu (${row.onderwerp})`)}`}
          >
            Antwoord per mail
          </Button>

        </div>
      )}
    </dialog>
  );
}
