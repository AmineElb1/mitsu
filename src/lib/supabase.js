/* Supabase via de REST-API, zonder extra library.
   De anon key is publiek bedoeld: de database bepaalt met RLS wat ermee mag
   (bezoekers enkel toevoegen, de makers na login lezen). Zie supabase/aanvragen.sql. */

/* Vul hier de Project URL en de anon (publishable) key in uit Supabase → Project Settings → API.
   Ze mogen in de code staan; zo hoeft er niets ingesteld te worden op Vercel.
   Nooit de service_role key hier zetten: die omzeilt alle beveiliging. */
export const supabase = {
  url: import.meta.env.VITE_SUPABASE_URL || 'https://wsfiucftvlofpblwghdl.supabase.co',
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_Nqf9VF1hYg4qMg2suKPRlA_jmaWep30'
};

export const supabaseReady = Boolean(supabase.url && supabase.anonKey);

// de publishable key gaat enkel in `apikey`; Authorization is voor de sessie van een ingelogde maker
const headers = (token, extra = {}) => ({
  apikey: supabase.anonKey,
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
  'Content-Type': 'application/json',
  ...extra
});

async function check(res) {
  if (res.ok) {
    // met return=minimal antwoordt Supabase met 201 zonder inhoud: dat is gewoon gelukt
    const text = await res.text();
    return text ? JSON.parse(text) : null;
  }
  let message = String(res.status);
  try {
    const body = await res.json();
    message = body.msg || body.message || body.error_description || message;
  } catch {
    /* geen json: de statuscode volstaat */
  }
  throw new Error(message);
}

/** Nieuwe aanvraag uit het contactformulier. return=minimal: bezoekers mogen niets teruglezen. */
export function insertAanvraag(row) {
  return fetch(`${supabase.url}/rest/v1/aanvragen`, {
    method: 'POST',
    headers: headers(null, { Prefer: 'return=minimal' }),
    body: JSON.stringify(row)
  }).then(check);
}

/** Inloggen met e-mail en wachtwoord (accounts maak je zelf aan in het Supabase-dashboard). */
export function signIn(email, password) {
  return fetch(`${supabase.url}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: headers(null),
    body: JSON.stringify({ email, password })
  }).then(check);
}

export function listAanvragen(token) {
  return fetch(`${supabase.url}/rest/v1/aanvragen?select=*&order=created_at.desc`, {
    headers: headers(token)
  }).then(check);
}

/** Status of notitie van één aanvraag aanpassen (enkel voor ingelogde makers). */
export function updateAanvraag(token, id, patch) {
  return fetch(`${supabase.url}/rest/v1/aanvragen?id=eq.${encodeURIComponent(id)}`, {
    method: 'PATCH',
    headers: headers(token, { Prefer: 'return=minimal' }),
    body: JSON.stringify(patch)
  }).then(check);
}

/** Aanvraag definitief verwijderen (enkel voor ingelogde makers). */
export function deleteAanvraag(token, id) {
  return fetch(`${supabase.url}/rest/v1/aanvragen?id=eq.${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: headers(token, { Prefer: 'return=minimal' })
  }).then(check);
}
