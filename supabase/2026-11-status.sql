-- Wijziging van 6 november 2026: 'behandeld' (ja/nee) wordt een status voor het kanbanbord,
-- plus een interne notitie. Bestaande aanvragen blijven bewaard.
-- Enkel nodig voor een database die al met de eerste versie van aanvragen.sql werd opgezet.

alter table public.aanvragen
  add column if not exists status text not null default 'nieuw'
    check (status in ('nieuw', 'bezig', 'klaar')),
  add column if not exists notitie text check (char_length(notitie) <= 4000);

update public.aanvragen set status = 'klaar' where behandeld;

-- de bezoekersregel verwees naar 'behandeld': eerst vervangen, dan de kolom weg
drop policy if exists "bezoekers voegen toe" on public.aanvragen;
create policy "bezoekers voegen toe" on public.aanvragen
  for insert to anon
  with check (status = 'nieuw' and notitie is null);

alter table public.aanvragen drop column if exists behandeld;
