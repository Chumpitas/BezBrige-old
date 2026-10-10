-- =====================================================================
-- RAKIJA SRBIJE — izmene za bazu (copy/paste u Supabase SQL Editor → Run)
-- Objedinjuje migracije 0008, 0009 i 0010. Bezbedno je pokrenuti više puta.
-- =====================================================================

-- 1) BB Kleka -> BB Klekovača
update proizvodjaci
set naziv = 'BB Klekovača'
where slug = 'bb-kleka' or naziv = 'BB Kleka';

update proizvodi
set naziv = 'BB Klekovača'
where naziv = 'BB Kleka';

-- 2) Ministarstvo poljoprivrede iznad Ministarstva turizma
update partneri set redosled = 2 where naziv like 'Ministarstvo poljoprivrede%';
update partneri set redosled = 3 where naziv like 'Ministarstvo turizma%';

-- 3) Dodatni partneri (institucije i lokalni partneri)
insert into partneri (naziv, tip, redosled) values
  ('Etnografski muzej u Beogradu', 'partner', 13),
  ('Etnografski institut SANU', 'partner', 14),
  ('Filozofski fakultet Univerziteta u Beogradu – Odeljenje za etnologiju i antropologiju', 'partner', 15),
  ('Opština Bajina Bašta', 'partner', 16),
  ('Turistička organizacija Tara-Drina, Bajina Bašta', 'partner', 17)
on conflict do nothing;

-- Provera (opciono): pogledaj rezultat
-- select naziv, tip, redosled from partneri order by redosled;
-- select naziv, slug from proizvodjaci where slug = 'bb-kleka';
