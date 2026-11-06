-- Wijziging van 6 november 2026: ingelogde makers mogen aanvragen verwijderen (knop in /admin.html).
drop policy if exists "makers verwijderen" on public.aanvragen;
create policy "makers verwijderen" on public.aanvragen
  for delete to authenticated
  using (true);

grant delete on public.aanvragen to authenticated;
