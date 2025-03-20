'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

// Mock services data - v produkčnej verzii by sme tieto dáta načítali z databázy
const services = [
  {
    id: 1,
    name: 'Ošetrenia tváre',
    description: 'Omladzujúce a revitalizačné procedúry pre vašu pleť.',
    icon: '/images/services/facial.jpg',
    href: '/sluzby/osetrenia-tvare',
  },
  {
    id: 2,
    name: 'Permanentný make-up',
    description: 'Dokonalé obočie, pery a linky, ktoré vydržia.',
    icon: '/images/services/permanent-makeup.jpg',
    href: '/sluzby/permanentny-makeup',
  },
  {
    id: 3,
    name: 'Depilácia',
    description: 'Jemné a efektívne odstránenie nežiaducich chĺpkov.',
    icon: '/images/services/waxing.jpg',
    href: '/sluzby/depilacia',
  },
  {
    id: 4,
    name: 'Manikúra & Pedikúra',
    description: 'Kompletná starostlivosť o vaše ruky a nohy.',
    icon: '/images/services/manicure.jpg',
    href: '/sluzby/manikura',
  },
  {
    id: 5,
    name: 'Masáže',
    description: 'Uvoľňujúce procedúry pre relaxáciu a harmonizáciu tela.',
    icon: '/images/services/massage.jpg',
    href: '/sluzby/masaze',
  },
  {
    id: 6,
    name: 'Mihalnice a obočie',
    description: 'Zvýraznenie a tvarovanie pre dokonalý pohľad.',
    icon: '/images/services/lashes.jpg',
    href: '/sluzby/mihalnice',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.2 
    } 
  }
}

const serviceVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 } 
  }
}

export default function ServicesSection() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">
            Naše služby
          </h2>
          <p className="text-lg text-gray-600">
            Ponúkame komplexné služby v oblasti kozmetiky a starostlivosti o telo. Naši profesionáli vám zabezpečia dokonalý zážitok a skvelé výsledky.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service) => (
            <motion.div 
              key={service.id}
              variants={serviceVariants}
            >
              <Link href={service.href} className="block h-full">
                <div className="card h-full flex flex-col overflow-hidden group">
                  <div className="relative h-64 overflow-hidden">
                    <div className="absolute inset-0 bg-primary-900 opacity-30 z-10 group-hover:opacity-20 transition-opacity"></div>
                    <Image
                      src={service.icon}
                      alt={service.name}
                      fill
                      className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6 flex-grow bg-white">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.name}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                  <div className="p-4 bg-white border-t border-gray-100 flex justify-between items-center text-primary-600 font-medium">
                    <span>Zobraziť viac</span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 text-center">
          <Link
            href="/sluzby"
            className="btn-primary inline-flex items-center"
          >
            <span>Všetky služby</span>
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
