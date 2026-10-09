-- 0008_bb_klekovaca.sql
-- Ispravka naziva proizvođača: "BB Kleka" -> "BB Klekovača".
-- Kopiraj/nalepi u Supabase SQL editor (projekat Rakija Srbije) i pokreni.

update proizvodjaci
set naziv = 'BB Klekovača'
where slug = 'bb-kleka' or naziv = 'BB Kleka';

-- Ako postoji i proizvod sa starim nazivom:
update proizvodi
set naziv = 'BB Klekovača'
where naziv = 'BB Kleka';
