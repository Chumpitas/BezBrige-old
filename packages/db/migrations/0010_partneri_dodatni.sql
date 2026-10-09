-- 0010_partneri_dodatni.sql
-- Dodatni partneri (institucije i lokalni partneri).
-- Kopiraj/nalepi u Supabase SQL editor (projekat Rakija Srbije) i pokreni.

insert into partneri (naziv, tip, redosled) values
  ('Etnografski muzej u Beogradu', 'partner', 13),
  ('Etnografski institut SANU', 'partner', 14),
  ('Filozofski fakultet Univerziteta u Beogradu – Odeljenje za etnologiju i antropologiju', 'partner', 15),
  ('Opština Bajina Bašta', 'partner', 16),
  ('Turistička organizacija Tara-Drina, Bajina Bašta', 'partner', 17)
on conflict do nothing;
