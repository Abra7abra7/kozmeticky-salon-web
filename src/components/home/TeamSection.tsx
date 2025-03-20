'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'

// Mock team data - v produkčnej verzii by sme tieto dáta načítali z databázy
const team = [
  {
    id: 1,
    name: 'Lucia Kováčová',
    position: 'Zakladateľka & Senior kozmetička',
    bio: 'Lucia má viac ako 10 rokov skúseností v oblasti kozmetiky. Špecializuje sa na anti-aging procedúry a permanentný make-up.',
    image: '/images/team/team-1.jpg',
    specialties: ['Anti-aging', 'Permanentný make-up', 'Komplexné ošetrenia tváre'],
  },
  {
    id: 2,
    name: 'Martina Kučerová',
    position: 'Kozmetička & Manikérka',
    bio: 'Martina je expertka na starostlivosť o pleť a nechty. Jej klienti oceňujú jej precíznosť a kreativitu pri manikúre.',
    image: '/images/team/team-2.jpg',
    specialties: ['Manikúra', 'Gélové nechty', 'Ošetrenia tváre'],
  },
  {
    id: 3,
    name: 'Nina Horváthová',
    position: 'Kozmetička & Masérka',
    bio: 'Nina sa špecializuje na masáže a relaxačné procedúry. Má certifikáciu v oblasti aromaterapie a reflexnej terapie.',
    image: '/images/team/team-3.jpg',
    specialties: ['Masáže', 'Relaxačné procedúry', 'Aromaterapia'],
  },
  {
    id: 4,
    name: 'Soňa Novotná',
    position: 'Vizážistka & Lash Expert',
    bio: 'Soňa je expertka na mihalnice a make-up. Jej práca s mihalnicami a obočím je výnimočná a veľmi žiadaná.',
    image: '/images/team/team-4.jpg',
    specialties: ['Mihalnice', 'Obočie', 'Make-up'],
  },
]

export default function TeamSection() {
  const [visibleTeam, setVisibleTeam] = useState(team.slice(0, 3))

  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">
            Náš tím expertov
          </h2>
          <p className="text-lg text-gray-600">
            Predstavujeme vám náš skúsený tím profesionálov, ktorí sa postarajú o vašu krásu a pohodu.
            Každý člen tímu je odborníkom vo svojej oblasti a pravidelne sa vzdeláva v najnovších technikách.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {visibleTeam.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card overflow-hidden"
            >
              <div className="relative h-80 overflow-hidden group">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-sm text-gray-200">{member.position}</p>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600 mb-4">{member.bio}</p>
                <h4 className="font-semibold text-gray-900 mb-2">Špecializácie:</h4>
                <ul className="space-y-1">
                  {member.specialties.map((specialty, i) => (
                    <li key={i} className="flex items-center text-gray-700">
                      <svg className="w-4 h-4 text-primary-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {specialty}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/tim"
            className="btn-primary inline-flex items-center"
          >
            <span>Spoznajte celý tím</span>
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
