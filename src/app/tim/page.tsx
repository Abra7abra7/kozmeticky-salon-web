'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'

// Mock dáta pre tím
const teamMembers = [
  {
    id: 1,
    name: 'Lucia Kováčová',
    position: 'Zakladateľka & Senior kozmetička',
    bio: 'Lucia má viac ako 10 rokov skúseností v oblasti kozmetiky. Po práci v niekoľkých prestížnych salónoch sa rozhodla založiť vlastné kozmetické štúdio, kde môže naplno realizovať svoju víziu personalizovanej starostlivosti. Špecializuje sa na anti-aging procedúry a permanentný make-up, v ktorých pravidelne získava nové certifikácie.',
    image: '/images/team/team-1.jpg',
    specialties: ['Anti-aging', 'Permanentný make-up', 'Komplexné ošetrenia tváre'],
    education: ['Certifikát - Permanentný make-up (2018)', 'Diploma in Beauty Therapy (2015)', 'Kurz mikrodermabrázie (2016)'],
    favorite_quote: 'Krása nie je v tvári. Krása je svetlo v srdci.'
  },
  {
    id: 2,
    name: 'Martina Kučerová',
    position: 'Kozmetička & Manikérka',
    bio: 'Martina je expertka na starostlivosť o pleť a nechty s viac ako 7-ročnou praxou. Jej klienti oceňujú jej precíznosť a kreativitu pri manikúre, ako aj jej hlboké znalosti v oblasti starostlivosti o problematickú pleť. Vo voľnom čase sa venuje štúdiu nových techník a trendov v oblasti nechtového dizajnu.',
    image: '/images/team/team-2.jpg',
    specialties: ['Manikúra', 'Gélové nechty', 'Ošetrenia tváre'],
    education: ['Certifikát - Nechtový dizajn (2019)', 'Kurz starostlivosti o problematickú pleť (2020)'],
    favorite_quote: 'Ruky sú vizitkou každej ženy.'
  },
  {
    id: 3,
    name: 'Nina Horváthová',
    position: 'Kozmetička & Masérka',
    bio: 'Nina sa špecializuje na masáže a relaxačné procedúry. Jej prístup kombinuje tradičné masážne techniky s modernými postupmi. Má certifikáciu v oblasti aromaterapie a reflexnej terapie. Jej holistický prístup k starostlivosti zaručuje nielen fyzickú, ale aj psychickú pohodu klientov.',
    image: '/images/team/team-3.jpg',
    specialties: ['Masáže', 'Relaxačné procedúry', 'Aromaterapia'],
    education: ['Certifikát - Aromaterapia (2021)', 'Certifikát - Reflexná masáž (2019)', 'Kurz holistického prístupu k masáži (2020)'],
    favorite_quote: 'Dobrá masáž necháva telo uvoľnené, myseľ pokojnú a dušu revitalizovanú.'
  },
  {
    id: 4,
    name: 'Soňa Novotná',
    position: 'Vizážistka & Lash Expert',
    bio: 'Soňa je expertka na mihalnice a make-up s výnimočným cítením pre estetiku a detail. Za svoju prácu získala niekoľko ocenení na kozmetických súťažiach. Jej schopnosť vytvoriť prirodzený a zároveň pôsobivý look je vyhľadávaná najmä nevesty a ženy, ktoré chcú vyniknúť na špeciálnych príležitostiach.',
    image: '/images/team/team-4.jpg',
    specialties: ['Mihalnice', 'Obočie', 'Make-up'],
    education: ['Certifikát - Aplikácia mihalníc (2018)', 'Kurz svadobného make-upu (2020)', 'Workshop upravovania obočia (2019)'],
    favorite_quote: 'Oči sú oknom do duše, a mihalnice sú záclonami.'
  },
  {
    id: 5,
    name: 'Michaela Tóthová',
    position: 'Kozmetička & Laser špecialista',
    bio: 'Michaela je naša špecialistka na laserové ošetrenia a najnovšie technológie v kozmetike. Má rozsiahle znalosti v oblasti estetickej dermatológie a neustále sa vzdeláva v nových postupoch. Je známa svojím profesionálnym prístupom a schopnosťou navrhnúť optimálnu kombináciu ošetrení pre každého klienta.',
    image: '/images/services/3.png',
    specialties: ['Laserové ošetrenia', 'Anti-aging procedúry', 'Odstránenie pigmentových škvŕn'],
    education: ['Certifikát - Obsluha kozmetických laserov (2022)', 'Kurz estetickej dermatológie (2021)'],
    favorite_quote: 'Technológia v službe krásy je budúcnosťou kozmetiky.'
  },
  {
    id: 6,
    name: 'Eva Kovácsová',
    position: 'Recepčná & Administratíva',
    bio: 'Eva je prvou osobou, s ktorou sa stretnete pri vstupe do nášho salónu. Jej príjemné vystupovanie a organizačné schopnosti zabezpečujú hladký chod salónu a maximálny komfort pre našich klientov. Okrem starostlivosti o rezervácie a administratívu sa stará aj o príjemnú atmosféru v salóne.',
    image: '/images/services/2.png',
    specialties: ['Klientsky servis', 'Rezervácie', 'Poradenstvo ohľadom služieb'],
    education: ['Kurz komunikačných zručností (2021)', 'Školenie manažmentu recepcie (2022)'],
    favorite_quote: 'Prvý dojem sa nedá urobiť dvakrát.'
  }
]

// Komponent pre certifikácie a vzdelanie
const Certifications = () => {
  const certifications = [
    {
      title: 'Akreditované kozmetické vzdelanie',
      description: 'Všetci naši kozmetickí odborníci majú relevantné vzdelanie a certifikáty v oblasti kozmetických služieb.',
      icon: (
        <svg className="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      title: 'Kontinuálne vzdelávanie',
      description: 'Každý člen nášho tímu sa pravidelne zúčastňuje školení a workshopov, aby si udržal najnovšie poznatky a techniky.',
      icon: (
        <svg className="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      title: 'Medzinárodné štandardy',
      description: 'Naše postupy a techniky spĺňajú medzinárodné štandardy kvality a bezpečnosti v kozmetickom priemysle.',
      icon: (
        <svg className="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Špecializované certifikácie',
      description: 'Naši odborníci majú špecializované certifikácie v oblastiach ako permanentný make-up, laserové ošetrenia, aplikácia mihalníc a ďalšie.',
      icon: (
        <svg className="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      )
    }
  ]

  return (
    <div className="grid sm:grid-cols-2 gap-6">
      {certifications.map((cert, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="bg-white p-6 rounded-lg shadow-md flex items-start"
        >
          <div className="flex-shrink-0 mr-4">
            {cert.icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{cert.title}</h3>
            <p className="text-gray-600">{cert.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// Team Member Detail Modal
const TeamMemberDetail = ({ member, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative h-80 md:h-full overflow-hidden">
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          
          <div className="p-6 md:p-8">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">{member.name}</h2>
                <p className="text-primary-600 mb-4">{member.position}</p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">O mne</h3>
              <p className="text-gray-700">{member.bio}</p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Špecializácie</h3>
              <div className="flex flex-wrap gap-2">
                {member.specialties.map((specialty, index) => (
                  <span key={index} className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm">
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Vzdelanie a certifikácie</h3>
              <ul className="space-y-1">
                {member.education.map((edu, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <svg className="w-4 h-4 text-primary-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {edu}
                  </li>
                ))}
              </ul>
            </div>
            
            {member.favorite_quote && (
              <div className="italic text-gray-600 border-l-4 border-primary-200 pl-4 py-2">
                "{member.favorite_quote}"
              </div>
            )}
            
            <div className="mt-8">
              <Link
                href="/rezervacia"
                className="btn-primary"
              >
                Rezervovať termín
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function TeamPage() {
  const [selectedMember, setSelectedMember] = useState(null)
  
  return (
    <div className="pt-24 pb-20">
      <div className="container-custom">
        {/* Page header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
            Náš tím
          </h1>
          <p className="text-lg text-gray-600">
            Zoznámte sa s našimi profesionálmi, ktorí sa postarajú o vašu krásu a pohodu.
            Každý z nich prináša jedinečné skúsenosti a odborné znalosti.
          </p>
        </div>
        
        {/* Team grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card overflow-hidden cursor-pointer group"
              onClick={() => setSelectedMember(member)}
            >
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-sm text-gray-200">{member.position}</p>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600 mb-4 line-clamp-3">{member.bio}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {member.specialties.map((specialty, i) => (
                    <span key={i} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                      {specialty}
                    </span>
                  ))}
                </div>
                <div className="text-primary-600 font-medium group-hover:underline">
                  Zobraziť profil
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Team certifications section */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
              Naše kvalifikácie
            </h2>
            <p className="text-lg text-gray-600">
              Vaša krása a zdravie si zaslúžia to najlepšie. Preto dbáme na neustále vzdelávanie
              a certifikáciu v najnovších kozmetických postupoch a technológiách.
            </p>
          </div>
          
          <Certifications />
        </div>
        
        {/* Join our team section */}
        <div className="bg-primary-50 rounded-xl p-8 lg:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
                Chcete sa stať súčasťou nášho tímu?
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Hľadáme talentovaných a motivovaných profesionálov, ktorí zdieľajú našu vášeň
                pre kozmetiku a starostlivosť o klientov. Ponúkame priateľské pracovné prostredie,
                konkurencieschopné ohodnotenie a možnosti profesionálneho rastu.
              </p>
              <Link
                href="/kontakt"
                className="btn-primary"
              >
                Kontaktujte nás
              </Link>
            </div>
            
            <div className="relative h-[300px] rounded-lg overflow-hidden shadow-md">
              <Image
                src="/images/services/facial-classic.jpg"
                alt="Staňte sa členom nášho tímu"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal */}
      {selectedMember && (
        <TeamMemberDetail 
          member={selectedMember} 
          onClose={() => setSelectedMember(null)}
        />
      )}
    </div>
  )
}
