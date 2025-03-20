-- Inicializácia schémy databázy pre kozmetický salón

-- Tabuľka služieb
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT,
  duration INTEGER NOT NULL, -- v minútach
  price DECIMAL(10, 2) NOT NULL,
  discounted_price DECIMAL(10, 2),
  image_url VARCHAR(255),
  details JSONB,
  popularity INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabuľka členov tímu
CREATE TABLE IF NOT EXISTS team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  position VARCHAR(100) NOT NULL,
  specializations VARCHAR(255)[],
  bio TEXT,
  image_url VARCHAR(255),
  certifications TEXT[],
  availability JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabuľka spojenia služieb a členov tímu (ktorý člen aké služby poskytuje)
CREATE TABLE IF NOT EXISTS team_member_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_member_id UUID REFERENCES team_members(id) ON DELETE CASCADE,
  service_id UUID REFERENCES services(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(team_member_id, service_id)
);

-- Tabuľka rezervácií
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id UUID REFERENCES services(id) ON DELETE SET NULL,
  team_member_id UUID REFERENCES team_members(id) ON DELETE SET NULL,
  client_name VARCHAR(255) NOT NULL,
  client_email VARCHAR(255) NOT NULL,
  client_phone VARCHAR(20),
  date_time TIMESTAMP WITH TIME ZONE NOT NULL,
  duration INTEGER NOT NULL, -- v minútach
  notes TEXT,
  status VARCHAR(20) NOT NULL, -- confirmed, cancelled, completed
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabuľka blogových článkov
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  author_id UUID REFERENCES team_members(id) ON DELETE SET NULL,
  categories VARCHAR(100)[],
  tags VARCHAR(100)[],
  published_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  cover_image_url VARCHAR(255),
  gallery_images VARCHAR(255)[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabuľka recenzií
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name VARCHAR(255) NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  text TEXT,
  service_id UUID REFERENCES services(id) ON DELETE SET NULL,
  verified_customer BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  response TEXT,
  response_date TIMESTAMP WITH TIME ZONE
);

-- Tabuľka produktov
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  discounted_price DECIMAL(10, 2),
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  brand VARCHAR(100),
  image_urls VARCHAR(255)[],
  attributes JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabuľka darčekových poukazov
CREATE TABLE IF NOT EXISTS gift_vouchers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(20) UNIQUE NOT NULL,
  value DECIMAL(10, 2) NOT NULL,
  service_ids UUID[] REFERENCES services(id),
  valid_from TIMESTAMP WITH TIME ZONE NOT NULL,
  valid_until TIMESTAMP WITH TIME ZONE NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'unused', -- unused, used
  recipient_name VARCHAR(255) NOT NULL,
  recipient_email VARCHAR(255),
  purchaser_name VARCHAR(255),
  purchaser_email VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  used_at TIMESTAMP WITH TIME ZONE
);

-- Tabuľka nastavení
CREATE TABLE IF NOT EXISTS settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  salon_name VARCHAR(255) NOT NULL,
  logo_url VARCHAR(255),
  contact JSONB NOT NULL,
  opening_hours JSONB NOT NULL,
  seo JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexy pre zrýchlenie vyhľadávania
CREATE INDEX IF NOT EXISTS idx_services_category ON services(category);
CREATE INDEX IF NOT EXISTS idx_services_popularity ON services(popularity DESC);
CREATE INDEX IF NOT EXISTS idx_team_members_specializations ON team_members USING GIN(specializations);
CREATE INDEX IF NOT EXISTS idx_bookings_date_time ON bookings(date_time);
CREATE INDEX IF NOT EXISTS idx_bookings_service_id ON bookings(service_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_categories ON blog_posts USING GIN(categories);
CREATE INDEX IF NOT EXISTS idx_blog_posts_tags ON blog_posts USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating DESC);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_gift_vouchers_code ON gift_vouchers(code);
CREATE INDEX IF NOT EXISTS idx_gift_vouchers_status ON gift_vouchers(status);

-- Funkcia na automatickú aktualizáciu polí updated_at pri každej úprave záznamu
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggery pre automatickú aktualizáciu updated_at
CREATE TRIGGER update_services_updated_at
BEFORE UPDATE ON services
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_team_members_updated_at
BEFORE UPDATE ON team_members
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at
BEFORE UPDATE ON bookings
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON blog_posts
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_settings_updated_at
BEFORE UPDATE ON settings
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- RLS (Row Level Security) politiky
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_member_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE gift_vouchers ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Základná politika pre čítanie verejných dát
CREATE POLICY "Verejné dáta sú viditeľné pre všetkých" ON services
FOR SELECT USING (true);

CREATE POLICY "Verejné dáta sú viditeľné pre všetkých" ON team_members
FOR SELECT USING (true);

CREATE POLICY "Verejné dáta sú viditeľné pre všetkých" ON team_member_services
FOR SELECT USING (true);

CREATE POLICY "Verejné dáta sú viditeľné pre všetkých" ON blog_posts
FOR SELECT USING (published_at IS NOT NULL AND published_at <= NOW());

CREATE POLICY "Verejné dáta sú viditeľné pre všetkých" ON reviews
FOR SELECT USING (true);

CREATE POLICY "Verejné dáta sú viditeľné pre všetkých" ON products
FOR SELECT USING (true);

CREATE POLICY "Verejné dáta sú viditeľné pre všetkých" ON settings
FOR SELECT USING (true);

-- Ukážkové dáta pre services
INSERT INTO services (name, category, description, duration, price, image_url, details, popularity)
VALUES
  ('Klasické ošetrenie pleti', 'Ošetrenia tváre', 'Kompletné ošetrenie pleti prispôsobené vášmu typu pokožky.', 60, 45.00, '/images/services/facial-classic.jpg', '{"steps": ["Diagnostika pleti", "Čistenie", "Peeling", "Masáž", "Maska", "Záverečná starostlivosť"]}', 100),
  ('Hydratačné ošetrenie', 'Ošetrenia tváre', 'Intenzívna hydratácia pre suchú a dehydrovanú pleť.', 75, 55.00, '/images/services/facial-hydration.jpg', '{"steps": ["Diagnostika pleti", "Čistenie", "Enzymatický peeling", "Hydratačné sérum", "Masáž", "Hydratačná maska", "Záverečná starostlivosť"]}', 90),
  ('Anti-aging ošetrenie', 'Ošetrenia tváre', 'Omladzujúce ošetrenie pre redukciu vrások a zlepšenie elasticity pleti.', 90, 75.00, '/images/services/facial-antiaging.jpg', '{"steps": ["Diagnostika pleti", "Čistenie", "AHA peeling", "Liftingová masáž", "Anti-age sérum", "Kolagénová maska", "Záverečná starostlivosť"]}', 80),
  ('Permanentný make-up obočia', 'Permanentný make-up', 'Prirodzené zvýraznenie obočia metódou microblading.', 120, 180.00, '/images/services/pmu-brows.jpg', '{"technique": "Microblading", "includes": ["Konzultácia", "Prvé sedenie", "Korekcia po 4-6 týždňoch"]}', 95),
  ('Klasická manikúra', 'Manikúra', 'Základná starostlivosť o nechty a pokožku rúk.', 45, 25.00, '/images/services/manicure-classic.jpg', '{"includes": ["Kúpeľ", "Úprava nechtov", "Zatlačenie kutikuly", "Leštenie", "Výživný olej"]}', 85),
  ('Gélové nechty', 'Manikúra', 'Modelácia nechtov s použitím gélu pre prirodzený vzhľad.', 90, 40.00, '/images/services/manicure-gel.jpg', '{"includes": ["Príprava nechtov", "Aplikácia gélu", "Modelácia", "Lakovanie"]}', 90),
  ('Relaxačná masáž', 'Masáže', 'Uvoľňujúca masáž celého tela pre dokonalú relaxáciu.', 60, 45.00, '/images/services/massage-relax.jpg', '{"techniques": ["Švédska masáž", "Aromaterapia"], "benefits": ["Zlepšenie cirkulácie", "Uvoľnenie napätia", "Redukcia stresu"]}', 75),
  ('Epilácia voskom - nohy', 'Depilácia', 'Odstránenie nežiaducich chĺpkov pomocou kvalitného vosku.', 45, 30.00, '/images/services/waxing-legs.jpg', '{"area": "Celé nohy", "type": "Teplý vosk", "effect": "3-4 týždne"}', 70),
  ('Lash lifting', 'Mihalnice', 'Natočenie vlastných mihalníc pre otvorený pohľad.', 60, 40.00, '/images/services/lashes-lifting.jpg', '{"includes": ["Lifting", "Farbenie", "Keratínová kúra"], "effect": "6-8 týždňov"}', 85);

-- Ukážkové dáta pre team_members
INSERT INTO team_members (name, position, specializations, bio, image_url, certifications)
VALUES
  ('Lucia Kováčová', 'Zakladateľka & Senior kozmetička', ARRAY['Anti-aging', 'Permanentný make-up', 'Komplexné ošetrenia tváre'], 'Lucia má viac ako 10 rokov skúseností v oblasti kozmetiky. Špecializuje sa na anti-aging procedúry a permanentný make-up.', '/images/team/team-1.jpg', ARRAY['Certifikovaná kozmetička', 'Microblading expert']),
  ('Martina Kučerová', 'Kozmetička & Manikérka', ARRAY['Manikúra', 'Gélové nechty', 'Ošetrenia tváre'], 'Martina je expertka na starostlivosť o pleť a nechty. Jej klienti oceňujú jej precíznosť a kreativitu pri manikúre.', '/images/team/team-2.jpg', ARRAY['Certifikovaná manikérka', 'Špecialista na gélové nechty']),
  ('Nina Horváthová', 'Kozmetička & Masérka', ARRAY['Masáže', 'Relaxačné procedúry', 'Aromaterapia'], 'Nina sa špecializuje na masáže a relaxačné procedúry. Má certifikáciu v oblasti aromaterapie a reflexnej terapie.', '/images/team/team-3.jpg', ARRAY['Certifikovaná masérka', 'Aromaterapia']),
  ('Soňa Novotná', 'Vizážistka & Lash Expert', ARRAY['Mihalnice', 'Obočie', 'Make-up'], 'Soňa je expertka na mihalnice a make-up. Jej práca s mihalnicami a obočím je výnimočná a veľmi žiadaná.', '/images/team/team-4.jpg', ARRAY['Lash expert', 'Certifikovaná vizážistka']);
