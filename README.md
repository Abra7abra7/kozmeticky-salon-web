# Kozmetický salón - webová stránka

Moderná a responzívna webová stránka pre kozmetický salón s online rezervačným systémom, prezentáciou služieb, blogom a ďalšími funkciami.

## Funkcie

- 🎨 Moderný a responzívny dizajn optimalizovaný pre všetky zariadenia
- 📅 Online rezervačný systém s výberom služby, termínu a kozmetičky
- 🛍️ Prezentácia služieb s detailnými popismi a cenami
- 👩‍💼 Predstavenie tímu a ich špecializácií
- 📝 Blog s článkami o kozmetike a starostlivosti o pleť
- 💳 Online platby cez Stripe (darčekové poukazy, zálohy na procedúry)
- 📱 Kontaktný formulár a informácie
- 📊 Admin rozhranie pre správu rezervácií, služieb a obsahu
- 🔍 SEO optimalizácia

## Technológie

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes, Supabase
- **Databáza**: PostgreSQL (Supabase)
- **Autentifikácia**: Supabase Auth
- **Platby**: Stripe
- **Emailové notifikácie**: SendGrid
- **Hosting**: Vercel
- **Media storage**: Supabase Storage
- **CI/CD**: GitHub Actions

## Požiadavky

- Node.js (verzia 18.0.0 alebo vyššia)
- npm alebo yarn
- Supabase účet
- Stripe účet
- SendGrid účet (voliteľné, pre emailové notifikácie)

## Inštalácia a lokálne spustenie

1. Naklonujte repozitár:
   ```
   git clone https://github.com/vas-username/kozmeticky-salon-web.git
   cd kozmeticky-salon-web
   ```

2. Nainštalujte závislosti:
   ```
   npm install
   # alebo
   yarn install
   ```

3. Vytvorte `.env.local` súbor na základe `.env.example` a vyplňte potrebné premenné prostredia.

4. Vytvorte Supabase projekt a importujte schému databázy:
   - Prihláste sa do [Supabase](https://supabase.com)
   - Vytvorte nový projekt
   - V SQL Editore spustite obsah súboru `supabase/schema.sql`

5. Spustite vývojový server:
   ```
   npm run dev
   # alebo
   yarn dev
   ```

6. Otvorte [http://localhost:3000](http://localhost:3000) vo vašom prehliadači.

## Nasadenie

### Nasadenie na Vercel

1. Vytvorte účet na [Vercel](https://vercel.com) ak ho ešte nemáte.
2. V Dashboarde kliknite na "New Project" a importujte váš GitHub repozitár.
3. Nastavte premenné prostredia podľa `.env.example`.
4. Kliknite na "Deploy".

### Manuálne nasadenie

1. Vytvorte produkčný build:
   ```
   npm run build
   # alebo
   yarn build
   ```

2. Spustite produkčný server:
   ```
   npm start
   # alebo
   yarn start
   ```

## Štruktúra projektu

```
kozmeticky-salon-web/
├── public/              # Statické súbory (obrázky, fonty, atď.)
├── src/
│   ├── app/             # Next.js 13+ App Router
│   │   ├── api/         # API Routes
│   │   ├── (routes)/    # Stránky aplikácie
│   │   ├── globals.css  # Globálne CSS štýly
│   │   └── layout.tsx   # Root layout
│   ├── components/      # React komponenty
│   │   ├── booking/     # Komponenty pre rezervačný systém
│   │   ├── home/        # Komponenty pre domovskú stránku
│   │   ├── layout/      # Layout komponenty (header, footer)
│   │   └── ui/          # Znovupoužiteľné UI komponenty
│   ├── lib/             # Utility funkcie a konfigurácie
│   │   ├── supabase/    # Supabase klient a funkcie
│   │   └── stripe/      # Stripe klient a funkcie
│   └── types/           # TypeScript definície
├── supabase/            # Supabase konfigurácia a migrácie
├── .env.example         # Príklad premenných prostredia
├── .eslintrc.json      # ESLint konfigurácia
├── next.config.js      # Next.js konfigurácia
├── package.json        # Závislosti a skripty
├── postcss.config.js   # PostCSS konfigurácia
├── tailwind.config.js  # Tailwind CSS konfigurácia
└── tsconfig.json       # TypeScript konfigurácia
```

## Prispievanie

Príspevky sú vítané! Pre väčšie zmeny, prosím, najprv otvorte issue pre diskusiu o tom, čo by ste chceli zmeniť.

## Licencia

Tento projekt je licencovaný pod [MIT licenciou](LICENSE).
