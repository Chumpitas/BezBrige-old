-- =====================================================================
--  Seed podaci (iz projektne dokumentacije)
-- =====================================================================

-- ---------- Pokrovitelji / partneri / mediji ----------
insert into partneri (naziv, tip, redosled) values
  ('Ministarstvo kulture Republike Srbije', 'pokrovitelj', 1),
  ('Ministarstvo turizma i omladine Republike Srbije', 'pokrovitelj', 2),
  ('Ministarstvo poljoprivrede, šumarstva i vodoprivrede Republike Srbije', 'pokrovitelj', 3),
  ('Privredna komora Srbije', 'partner', 10),
  ('Savez udruženja rakijaša Srbije', 'partner', 11),
  ('Udruženje somelijera Srbije', 'partner', 12),
  ('Radio-televizija Srbije (RTS)', 'medijski_partner', 20),
  ('TV Prva', 'medijski_partner', 21),
  ('TV Euronews', 'medijski_partner', 22),
  ('TV Newsmax Balkans', 'medijski_partner', 23),
  ('RTV Vojvodine', 'medijski_partner', 24),
  ('Tanjug', 'medijski_partner', 25),
  ('Beta', 'medijski_partner', 26)
on conflict do nothing;

-- ---------- Program (5 nivoa) ----------
insert into program_stavke (nivo, naslov, opis, lokacija, redosled) values
  ('Izložba', 'Glavna postavka', 'Eksponati iz Bajine Bašte i okoline; kampanja „Jedina i jedinstvena rakija"; velika mapa Sokolskog kraja sa porodičnom proizvodnjom i destilerijama.', 'Atrijum Etnografskog muzeja', 1),
  ('Izložba', 'Eksponati visoke vrednosti', 'Video instalacije, projekcije naučnog istraživanja, izjave i novi video materijali iz Bajine Bašte.', 'Glavna sala Etnografskog muzeja', 2),
  ('Izložba', 'Filmovi i video iz Zapadne Srbije', 'Video materijali i filmovi iz Valjeva, Kosjerića, Požege, Arilja, Ivanjice, Užica i Zlatiborskog okruga, kao i pozitivni primeri iz cele Srbije.', 'Bioskopska sala', 3),
  ('Rakija Summit', 'Susret proizvođača, struke i medija', 'Centralno mesto susreta: paneli, promocije, degustacije, izbor najboljih rakijaša, mladih i budućih rakijaša.', 'Bioskopska sala', 10),
  ('Tematski dani', 'Antropologija i etnologija (Dani 1–3)', 'Paneli o tradiciji i porodičnim narativima.', 'Bioskopska sala', 20),
  ('Tematski dani', 'Turizam i brendiranje (Dani 4–6)', 'Rakija kao deo turističkog brenda Bajine Bašte.', 'Bioskopska sala', 21),
  ('Tematski dani', 'Poljoprivreda i proizvodnja (Dani 7–9)', 'Tehnologija proizvodnje, učešće tehnologa iz destilerija.', 'Bioskopska sala', 22),
  ('Tematski dani', 'Porodični biznis (Dani 10–12)', 'Iskustva manjih destilerija i porodičnih firmi.', 'Bioskopska sala', 23),
  ('Tematski dani', 'Umetnički aspekt rakije (Dani 13–15)', 'Likovna izložba, kratke priče, knjige.', 'Etnografski muzej', 24),
  ('Tematski dani', 'Filmski festival „Rakija" (Dani 16–20)', 'Igrani i dokumentarni filmovi na temu rakije i običaja.', 'Bioskopska sala', 25),
  ('Medijska komponenta', 'Medijska kampanja i događaji za medije', 'Kampanja deset dana pred izložbu (RTS i ostali), 10 medijskih događaja, gostovanja na TV i radiju, tekstovi i društvene mreže.', 'Nacionalni mediji', 30),
  ('Velika noć rakije', 'Gala edutainment veče', 'Ekskluzivna večera za VIP zvanice sa uručenjem nagrada i povelja; uparivanje rakija sa predjelima, glavnim jelima i kolačima.', 'Etnografski muzej', 40)
on conflict do nothing;

-- ---------- Primeri proizvođača (iz članka i dokumentacije) ----------
insert into proizvodjaci (naziv, slug, porodica, generacija, godina_osnivanja, selo, grad, region, velicina, prica, objavljen, istaknut)
values
  ('Stara Sokolova', 'stara-sokolova', 'Bogdanović', 7, 1830, 'Kostojevići', 'Bajina Bašta', 'Sokolski kraj',
   'velika',
   'Porodica Bogdanović, poreklom iz Krivaje, postavila je prve kazane još 1830. Danas u Kostojevićima proizvodi Staru Sokolovu — sa nizom domaćih i međunarodnih nagrada, uključujući priznanja na američkom tržištu (USA Ratings 2025).',
   true, true),
  ('Stara Pesma', 'stara-pesma', 'Ilić', null, null, 'Pepelj', 'Bajina Bašta', 'Sokolski kraj',
   'srednja',
   'Vekovna tradicija familije Ilić u proizvodnji voćnih rakija vrhunskog kvaliteta po tradicionalnoj tehnologiji.',
   true, false),
  ('BB Kleka', 'bb-kleka', null, null, null, null, 'Bajina Bašta', 'Sokolski kraj',
   'srednja',
   'Prepoznatljiva klekovača iz Bajine Bašte.',
   true, false)
on conflict (slug) do nothing;

-- ---------- Primeri nagrada ----------
insert into nagrade (proizvodjac_id, naziv, nivo, medjunarodna, godina)
select p.id, 'USA Ratings 2025 — najbolja voćna rakija', 'zlato', true, 2025
from proizvodjaci p where p.slug = 'stara-sokolova'
on conflict do nothing;
