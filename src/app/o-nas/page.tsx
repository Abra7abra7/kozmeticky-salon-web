'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

// Komponenty pre hodnoty a princípy
const CoreValues = () => {
  const values = [
    {
      icon: (
        <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: 'Bezpečnosť',
      description: 'Používame iba certifikované produkty a dodržiavame najprísnejšie hygienické štandardy pre vašu bezpečnosť.'
    },
    {
      icon: (
        <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      title: 'Kvalita',
      description: 'Vyberáme výlučne prémiové kozmetické produkty a neustále sa vzdelávame v nových postupoch a technikách.'
    },
    {
      icon: (
        <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Spokojnosť',
      description: 'Vašu spokojnosť berieme ako najvyššiu prioritu. Vždy sa snažíme prekročiť vaše očakávania a zaručiť, že od nás odchádzate s úsmevom.'
    },
    {
      icon: (
        <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      ),
      title: 'Inovácie',
      description: 'Sledujeme najnovšie trendy v kozmetickom priemysle a prinášame ich priamo k vám. Pravidelne obnovujeme naše vybavenie a portfólio služieb.'
    }
  ]

  return (
    <div className="grid sm:grid-cols-2 gap-8">
      {values.map((value, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <div className="rounded-full w-16 h-16 bg-primary-50 flex items-center justify-center mb-4">
            {value.icon}
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
          <p className="text-gray-600">{value.description}</p>
        </motion.div>
      ))}
    </div>
  )
}

// Timeline komponent pre históriu salónu
const Timeline = () => {
  const milestones = [
    {
      year: '2018',
      title: 'Založenie salónu',
      description: 'Otvorili sme prvý malý salón s dvoma kozmetičkami a základnými službami.'
    },
    {
      year: '2019',
      title: 'Rozšírenie služieb',
      description: 'Pridali sme nové služby vrátane permanentného make-upu a lash liftingu.'
    },
    {
      year: '2020',
      title: 'Adaptácia na pandémiu',
      description: 'Úspešne sme zvládli výzvy pandémie, implementovali sme prísne hygienické opatrenia a začali s online konzultáciami.'
    },
    {
      year: '2022',
      title: 'Nové priestory',
      description: 'Presťahovali sme sa do väčších, moderných priestorov, aby sme mohli poskytovať ešte lepšie služby v príjemnejšom prostredí.'
    },
    {
      year: '2023',
      title: 'Ocenenie kvality',
      description: 'Získali sme ocenenie za kvalitu služieb a spokojnosť zákazníkov v regionálnej súťaži kozmetických salónov.'
    },
    {
      year: '2024',
      title: 'Rozšírenie tímu',
      description: 'Náš tím narástol na 6 profesionálov, každý špecializovaný na inú oblasť kozmetickej starostlivosti.'
    }
  ]

  return (
    <div className="relative space-y-8 pl-6 before:absolute before:inset-0 before:h-full before:w-[2px] before:bg-primary-200 before:left-[15px]">
      {milestones.map((milestone, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="relative pl-8"
        >
          <div className="absolute left-[-23px] h-10 w-10 rounded-full bg-primary-500 text-white flex items-center justify-center z-10">
            <span className="text-sm font-semibold">{milestone.year}</span>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{milestone.title}</h3>
            <p className="text-gray-600">{milestone.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default function AboutUsPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="container-custom">
        {/* Page header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
            O našom salóne
          </h1>
          <p className="text-lg text-gray-600">
            Spoznajte náš príbeh, hodnoty a prístup, vďaka ktorým prinášame výnimočnú kozmetickú starostlivosť.
          </p>
        </div>
        
        {/* Main content */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          {/* Left column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/about-salon.jpg"
                alt="Náš kozmetický salón"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-primary-600 rounded-lg p-6 shadow-lg max-w-xs hidden md:block">
              <p className="text-white font-serif italic">
                "Naším poslaním je pomáhať ženám a mužom cítiť sa krásne a sebavedomé."
              </p>
              <p className="text-white text-right mt-2 font-semibold">- Náš tím</p>
            </div>
          </motion.div>

          {/* Right column - Text content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">
              Náš príbeh
            </h2>
            
            <div className="space-y-4">
              <p className="text-lg text-gray-700">
                Vitajte v našom kozmetickom salóne, ktorý sme založili v roku 2018 s víziou vytvoriť miesto, kde sa krása a pohoda stretávajú v dokonalej harmónii.
              </p>
              
              <p className="text-lg text-gray-700">
                Za roky nášho pôsobenia sme sa rozrástli z malého salónu s dvoma kozmetičkami na moderné kozmetické štúdio s komplexnými službami a tímom profesionálov, ktorí sa špecializujú na rôzne oblasti kozmetickej starostlivosti.
              </p>
              
              <p className="text-lg text-gray-700">
                Naša cesta nebola vždy jednoduchá, ale nikdy sme sa nevzdali nášho cieľa - poskytovať najvyššiu kvalitu starostlivosti v príjemnom prostredí, kde sa každý klient cíti výnimočne.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="font-semibold text-2xl text-primary-600">7+</div>
                <p className="text-gray-700">rokov skúseností</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="font-semibold text-2xl text-primary-600">2000+</div>
                <p className="text-gray-700">spokojných klientov</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="font-semibold text-2xl text-primary-600">15+</div>
                <p className="text-gray-700">kozmetických služieb</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="font-semibold text-2xl text-primary-600">6</div>
                <p className="text-gray-700">profesionálov v tíme</p>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Our values */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
              Naše hodnoty
            </h2>
            <p className="text-lg text-gray-600">
              Tieto základné princípy tvoria základ nášho prístupu ku každému klientovi a všetkému, čo robíme.
            </p>
          </div>
          
          <CoreValues />
        </div>
        
        {/* Our vision */}
        <div className="bg-gray-50 rounded-xl p-8 lg:p-12 mb-20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="order-2 md:order-1"
            >
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">
                Naša vízia a filozofia
              </h2>
              
              <div className="space-y-4">
                <p className="text-lg text-gray-700">
                  Veríme, že skutočná krása vychádza zvnútra a našou úlohou je pomôcť ju zvýrazniť. Každý klient je pre nás jedinečný, s individuálnymi potrebami a cieľmi.
                </p>
                
                <p className="text-lg text-gray-700">
                  Náš prístup je holistický - staráme sa nielen o vonkajší vzhľad, ale aj o vnútornú pohodu. Snažíme sa vytvoriť prostredie, kde sa môžete na chvíľu zastaviť, relaxovať a dobiť energiu.
                </p>
                
                <p className="text-lg text-gray-700">
                  Neustále sa vzdelávame a hľadáme nové prístupy v kozmetickom priemysle, aby sme mohli prinášať inovatívne riešenia a najnovšie trendy priamo k vám.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="order-1 md:order-2"
            >
              <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/images/services/facial-classic.jpg"
                  alt="Naša kozmetická filozofia"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Our history timeline */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
              Naša cesta
            </h2>
            <p className="text-lg text-gray-600">
              Kľúčové míľniky v histórii nášho salónu.
            </p>
          </div>
          
          <Timeline />
        </div>
        
        {/* CTA */}
        <div className="bg-primary-50 rounded-xl p-8 lg:p-12 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
            Staňte sa súčasťou nášho príbehu
          </h2>
          
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Pozývame vás zažiť našu filozofiu starostlivosti na vlastnej koži. Rezervujte si termín a dovoľte nám postarať sa o vašu krásu a pohodu.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/sluzby"
              className="btn-primary"
            >
              Naše služby
            </Link>
            
            <Link
              href="/rezervacia"
              className="btn-outline"
            >
              Rezervovať termín
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
