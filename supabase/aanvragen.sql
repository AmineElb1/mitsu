-- Aanvragen uit het contactformulier van mitsu.site
-- Plak dit in Supabase → SQL Editor → New query en klik Run.
-- Voorwaarde: Authentication → Sign In / Providers → "Allow new users to sign up" staat UIT.
-- Dan bestaan er enkel de accounts die we zelf aanmaken, en mag elk ingelogd account beheren.

create table if not exists public.aanvragen (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  naam text not null check (char_length(naam) between 1 and 120),
  email text not null check (char_length(email) between 3 and 200 and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  onderwerp text not null check (onderwerp in ('Website', 'Bestellen', 'Onderhoud', 'Iets anders')),
  bericht text not null check (char_length(bericht) between 1 and 4000),
  status text not null default 'nieuw' check (status in ('nieuw', 'bezig', 'klaar')),
  notitie text check (char_length(notitie) <= 4000)
);

-- Zonder RLS kan iedereen met de publieke key alles lezen. Met RLS beslissen de regels hieronder.
alter table public.aanvragen enable row level security;

-- Bezoekers (niet ingelogd) mogen enkel een nieuwe aanvraag toevoegen, niets lezen.
drop policy if exists "bezoekers voegen toe" on public.aanvragen;
create policy "bezoekers voegen toe" on public.aanvragen
  for insert to anon
  with check (status = 'nieuw' and notitie is null);

-- De makers (enkel zelf aangemaakte accounts) mogen na het inloggen lezen, de status wijzigen en notities schrijven.
drop policy if exists "makers lezen" on public.aanvragen;
create policy "makers lezen" on public.aanvragen
  for select to authenticated
  using (true);

drop policy if exists "makers werken bij" on public.aanvragen;
create policy "makers werken bij" on public.aanvragen
  for update to authenticated
  using (true)
  with check (true);

grant insert on public.aanvragen to anon;
drop policy if exists "makers verwijderen" on public.aanvragen;
create policy "makers verwijderen" on public.aanvragen
  for delete to authenticated
  using (true);

grant select, update, delete on public.aanvragen to authenticated;

-- oude hulpfunctie van een eerdere versie opruimen, als die bestaat
drop function if exists public.is_maker();
