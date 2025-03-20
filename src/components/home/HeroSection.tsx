'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <div className="relative h-screen bg-gradient-to-r from-primary-900 to-secondary-900">
      {/* Background overlay s obrázkom */}
      <div className="absolute inset-0 z-0 opacity-20">
        <Image
          src="/images/hero-background.jpg"
          alt="Beauty salon background"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <div className="absolute inset-0 bg-black opacity-40 z-10"></div>

      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <h1 className="text-5xl md:text-6xl font-serif font-bold tracking-tight text-white mb-6">
            Objavte svoju prirodzenú krásu
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-white">
            Vitajte v našom kozmetickom salóne, kde sa krása a pohoda stretávajú v dokonalej harmónii.
          </p>
          
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/rezervacia"
              className="btn-primary text-lg px-8 py-3 rounded-full"
            >
              Rezervovať termín
            </Link>
            <Link
              href="/sluzby"
              className="btn-outline text-lg px-8 py-3 rounded-full bg-transparent border-white text-white hover:bg-white hover:text-primary-700"
            >
              Prehliadka služieb
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll down indicator */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center z-20">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <svg 
            className="w-8 h-8 text-white" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
        </motion.div>
      </div>
    </div>
  )
}
