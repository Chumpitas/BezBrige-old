-- 0009_pokrovitelji_redosled.sql
-- Ministarstvo poljoprivrede iznad Ministarstva turizma.
-- Kopiraj/nalepi u Supabase SQL editor (projekat Rakija Srbije) i pokreni.

update partneri set redosled = 2
where naziv like 'Ministarstvo poljoprivrede%';

update partneri set redosled = 3
where naziv like 'Ministarstvo turizma%';
