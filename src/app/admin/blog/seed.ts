'use server';

import { createServerClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function seedBlogPosts(formData: FormData): Promise<void> {
  try {
    const supabase = createServerClient();
    
    // Testovacie dáta pre blog - vrátane image_url, ktorý bol pridaný do tabuľky
    const testPosts = [
      {
        title: '10 tipov pre zdravú pleť v zime',
        slug: '10-tipov-pre-zdravu-plet-v-zime',
        excerpt: 'Zima môže byť náročná pre vašu pleť. Tu je 10 tipov, ako sa o ňu starať počas chladných mesiacov.',
        content: '<h2>Ako sa starať o pleť v zime</h2><p>Zima so sebou prináša chladné počasie a suchý vzduch, čo môže spôsobiť problémy s pleťou. Tu je 10 tipov, ako udržať vašu pleť zdravú a žiarivú aj počas zimných mesiacov:</p><ol><li>Hydratujte pleť pravidelne</li><li>Používajte krém s vyšším obsahom olejov</li><li>Nezabúdajte na ochranu pred slnkom</li><li>Pite dostatok vody</li><li>Používajte zvlhčovač vzduchu</li><li>Vyhýbajte sa horúcim sprchám</li><li>Používajte jemné čistiace prostriedky</li><li>Exfoliujte pleť, ale s mierou</li><li>Nezabúdajte na starostlivosť o pery</li><li>Doprajte si výživnú masku raz týždenne</li></ol>',
        image_url: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1288&q=80',
        categories: ['Starostlivosť o pleť', 'Tipy a triky'],
        published: true,
        published_at: new Date().toISOString()
      },
      {
        title: 'Najnovšie trendy v permanentnom make-upe',
        slug: 'najnovsie-trendy-v-permanentnom-make-upe',
        excerpt: 'Objavte najnovšie trendy v oblasti permanentného make-upu, ktoré dominujú v roku 2025.',
        content: '<h2>Trendy v permanentnom make-upe pre rok 2025</h2><p>Permanentný make-up prešiel za posledné roky výrazným vývojom. Dnes už nejde len o výrazné linky a plné pery, ale o prirodzený vzhľad, ktorý zvýrazňuje vašu prirodzenú krásu. Tu sú najnovšie trendy:</p><h3>1. Microblading obočia</h3><p>Technika, ktorá vytvára dokonale definované obočie s prirodzeným vzhľadom.</p><h3>2. Powder Brows</h3><p>Jemnejšia alternatíva k microbladingu, ktorá vytvára efekt napudrovaného obočia.</p><h3>3. Aquarelle pery</h3><p>Jemné tieňovanie pier, ktoré dodáva prirodzenú farbu a objem.</p>',
        image_url: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80',
        categories: ['Make-up', 'Trendy'],
        published: false
      },
      {
        title: 'Ako si vybrať správny krém podľa typu pleti',
        slug: 'ako-si-vybrat-spravny-krem-podla-typu-pleti',
        excerpt: 'Výber správneho krému môže byť náročný. Naučte sa, ako si vybrať ten najvhodnejší pre váš typ pleti.',
        content: '<h2>Sprievodca výberom krému podľa typu pleti</h2><p>Každá pleť je jedinečná a vyžaduje špecifickú starostlivosť. Výber správneho krému je kľúčový pre zdravú a žiarivú pleť. Tu je náš sprievodca:</p><h3>Suchá pleť</h3><p>Hľadajte krémy s obsahom hyalurónovej kyseliny, ceramidov a prírodných olejov.</p><h3>Mastná pleť</h3><p>Vyberajte ľahké, nekomedogénne formulácie s obsahom niacinamidu a kyseliny salicylovej.</p><h3>Kombinovaná pleť</h3><p>Zvážte používanie rôznych krémov na rôzne časti tváre alebo hľadajte univerzálne produkty určené pre kombinovanú pleť.</p><h3>Citlivá pleť</h3><p>Vyhľadávajte krémy bez parfumov a potenciálnych alergénov, s upokojujúcimi zložkami ako aloe vera a panthenol.</p>',
        image_url: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        categories: ['Starostlivosť o pleť', 'Kozmetické produkty'],
        published: true,
        published_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 dni dozadu
      }
    ];

    // Vloženie testovacích dát do databázy
    const { data, error } = await supabase
      .from('blog_posts')
      .insert(testPosts)
      .select();

    if (error) {
      console.error('Chyba pri vkladaní testovacích článkov:', error);
      return;
    }

    console.log('Testovacie články boli úspešne pridané:', data);

    // Revalidácia cesty pre admin blog
    revalidatePath('/admin/blog');
  } catch (err) {
    console.error('Neočakávaná chyba pri seedovaní blog postov:', err);
  }
}
