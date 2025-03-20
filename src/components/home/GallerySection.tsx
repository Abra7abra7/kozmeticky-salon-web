'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion } from 'framer-motion'

// Mock gallery data - v produkčnej verzii by sme tieto dáta načítali z databázy
const galleryItems = [
  {
    id: 1,
    src: '/images/gallery/gallery-1.jpg',
    alt: 'Ošetrenie tváre',
    category: 'Tvár',
    width: 600,
    height: 400,
  },
  {
    id: 2,
    src: '/images/gallery/gallery-2.jpg',
    alt: 'Permanentný make-up obočia',
    category: 'Obočie',
    width: 400,
    height: 600,
  },
  {
    id: 3,
    src: '/images/gallery/gallery-3.jpg',
    alt: 'Manikúra',
    category: 'Ruky',
    width: 600,
    height: 400,
  },
  {
    id: 4,
    src: '/images/gallery/gallery-4.jpg',
    alt: 'Masáž',
    category: 'Telo',
    width: 400,
    height: 600,
  },
  {
    id: 5,
    src: '/images/gallery/gallery-5.jpg',
    alt: 'Predĺženie mihalníc',
    category: 'Mihalnice',
    width: 600,
    height: 400,
  },
  {
    id: 6,
    src: '/images/gallery/gallery-6.jpg',
    alt: 'Hydratačné ošetrenie',
    category: 'Tvár',
    width: 400,
    height: 400,
  },
]

const categories = ['Všetko', 'Tvár', 'Obočie', 'Mihalnice', 'Ruky', 'Telo']

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState('Všetko')
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const filteredGallery = activeCategory === 'Všetko'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory)

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">
            Naša galéria
          </h2>
          <p className="text-lg text-gray-600">
            Prehliadnite si naše najlepšie práce a výsledky procedúr, ktoré vykonávame v našom salóne.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredGallery.map((item, index) => (
            <motion.div
              key={item.id}
              layoutId={`gallery-${item.id}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="overflow-hidden rounded-lg shadow-md cursor-pointer relative group"
              onClick={() => setSelectedImage(item.id)}
            >
              <div className="relative" style={{ 
                paddingBottom: `${(item.height / item.width) * 100}%`,
                height: 0
              }}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <p className="text-white text-sm font-medium">{item.alt}</p>
                <p className="text-gray-300 text-xs">{item.category}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
              {galleryItems.find(item => item.id === selectedImage) && (
                <div className="relative">
                  <Image
                    src={galleryItems.find(item => item.id === selectedImage)!.src}
                    alt={galleryItems.find(item => item.id === selectedImage)!.alt}
                    width={galleryItems.find(item => item.id === selectedImage)!.width}
                    height={galleryItems.find(item => item.id === selectedImage)!.height}
                    className="mx-auto"
                    sizes="(max-width: 1200px) 100vw, 75vw"
                  />
                  <button
                    className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
                    onClick={() => setSelectedImage(null)}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-4">
                    <p className="text-white text-lg font-medium">
                      {galleryItems.find(item => item.id === selectedImage)!.alt}
                    </p>
                    <p className="text-gray-300">
                      {galleryItems.find(item => item.id === selectedImage)!.category}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
