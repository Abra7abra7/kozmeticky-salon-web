'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

// Mock reviews data - v produkčnej verzii by sme tieto dáta načítali z databázy
const reviews = [
  {
    id: 1,
    author: 'Jana Mariková',
    text: 'Absolútne najlepší kozmetický salón, aký som kedy navštívila. Lucia má zlaté ruky a jej ošetrenia pleti sú fantastické. Po každej návšteve odchádzam s pocitom, že moja pleť žiari.',
    avatar: '/images/avatars/avatar-1.jpg',
    rating: 5,
    service: 'Hydratačné ošetrenie tváre',
  },
  {
    id: 2,
    author: 'Katarína Bieliková',
    text: 'Martina odviedla skvelú prácu s mojimi nechtami. Je veľmi precízna a kreatívna. Navyše, atmosféra v salóne je príjemná a relaxačná. Určite sa vrátim!',
    avatar: '/images/avatars/avatar-2.jpg',
    rating: 5,
    service: 'Gélové nechty',
  },
  {
    id: 3,
    author: 'Zuzana Tóthová',
    text: 'Nina robí najlepšie masáže! Po stresujúcom týždni v práci je jej relaxačná masáž presne to, čo potrebujem. Vždy odchádzam úplne uvoľnená a bez bolesti chrbta.',
    avatar: '/images/avatars/avatar-3.jpg',
    rating: 5,
    service: 'Relaxačná masáž',
  },
  {
    id: 4,
    author: 'Simona Kováčová',
    text: 'Soňa je expertka na mihalnice. Predĺženie mihalníc vyzerá veľmi prirodzene a vydrží dlho. Je veľmi profesionálna a vždy poradí, čo je pre mňa najlepšie.',
    avatar: '/images/avatars/avatar-4.jpg',
    rating: 4,
    service: 'Predĺženie mihalníc',
  },
  {
    id: 5,
    author: 'Andrea Vargová',
    text: 'Permanentný make-up obočia, ktorý mi urobila Lucia, zmenil môj každodenný život. Ušetrím toľko času a obočie vyzerá perfektne za každých okolností.',
    avatar: '/images/avatars/avatar-5.jpg',
    rating: 5,
    service: 'Permanentný make-up obočia',
  },
  {
    id: 6,
    author: 'Monika Szabová',
    text: 'Pravidelne navštevujem tento salón na rôzne ošetrenia a vždy odchádzam spokojná. Personál je priateľský, priestory čisté a moderné. Odporúčam každému!',
    avatar: '/images/avatars/avatar-6.jpg',
    rating: 5,
    service: 'Komplexná starostlivosť',
  },
]

export default function ReviewsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  
  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviews.length)
    }, 8000)
    
    return () => clearInterval(interval)
  }, [])

  // For rating stars
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))
  }

  return (
    <section className="py-20 bg-gradient-to-br from-primary-900 to-secondary-900 text-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl font-serif font-bold mb-4">
            Čo hovoria naši klienti
          </h2>
          <p className="text-lg text-gray-200">
            Prečítajte si, aké skúsenosti majú s našimi službami naši spokojní klienti.
          </p>
        </div>
        
        <div className="relative">
          {/* Main testimonial */}
          <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-xl p-8 shadow-lg">
            {reviews.map((review, idx) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ 
                  opacity: idx === activeIndex ? 1 : 0,
                  x: idx === activeIndex ? 0 : 20,
                  zIndex: idx === activeIndex ? 1 : 0,
                  position: idx === activeIndex ? 'relative' : 'absolute'
                }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <div className="flex items-center mb-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden mr-4 border-2 border-white/30">
                    <Image
                      src={review.avatar}
                      alt={review.author}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{review.author}</h3>
                    <p className="text-gray-300 text-sm">{review.service}</p>
                    <div className="flex mt-1">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                </div>
                <div className="ml-2">
                  <svg className="w-8 h-8 text-white/20 mb-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-lg italic leading-relaxed">{review.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Navigation dots */}
          <div className="flex justify-center mt-8 space-x-3">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                className={`w-3 h-3 rounded-full transition-colors ${
                  idx === activeIndex ? 'bg-white' : 'bg-white/30'
                }`}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Zobraziť recenziu ${idx + 1}`}
              />
            ))}
          </div>
        </div>
        
        {/* Additional reviews in small cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {reviews.slice(0, 3).map((review, idx) => (
            idx !== activeIndex && (
              <motion.div
                key={`mini-${review.id}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 p-6 rounded-lg backdrop-blur-sm"
              >
                <div className="flex items-center mb-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3 border border-white/30">
                    <Image
                      src={review.avatar}
                      alt={review.author}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-base">{review.author}</h3>
                    <div className="flex">
                      {Array.from({ length: 5 }, (_, i) => (
                        <svg
                          key={i}
                          className={`w-3 h-3 ${i < review.rating ? 'text-yellow-400' : 'text-gray-400'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-300 line-clamp-3">{review.text}</p>
                <p className="text-xs text-gray-400 mt-2">{review.service}</p>
              </motion.div>
            )
          ))}
        </div>
      </div>
    </section>
  )
}
