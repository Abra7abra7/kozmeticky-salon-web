'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase/client'
import { Tab } from '@headlessui/react'

// Typy
type Service = {
  id: string;
  name: string;
  category: string;
  description: string;
  duration: number;
  price: number;
  discounted_price?: number;
  image_url: string;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .order('popularity', { ascending: false })
        
        if (error) throw new Error(error.message)
        
        setServices(data || [])
        
        // Extrahujeme unikátne kategórie
        const uniqueCategories = Array.from(new Set(data?.map(service => service.category) || []))
        setCategories(uniqueCategories)
      } catch (err) {
        console.error('Chyba pri načítaní služieb:', err)
        setError('Nepodarilo sa načítať služby. Skúste to prosím neskôr.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchServices()
  }, [])

  // Fallback pre mock dáta ak ešte nie je pripojená Supabase
  useEffect(() => {
    if (isLoading && !services.length) {
      // Mock dáta
      const mockServices = [
        {
          id: '1',
          name: 'Klasické ošetrenie pleti',
          category: 'Ošetrenia tváre',
          description: 'Kompletné ošetrenie pleti prispôsobené vášmu typu pokožky.',
          duration: 60,
          price: 45,
          image_url: '/images/services/facial-classic.jpg',
        },
        {
          id: '2',
          name: 'Hydratačné ošetrenie',
          category: 'Ošetrenia tváre',
          description: 'Intenzívna hydratácia pre suchú a dehydrovanú pleť.',
          duration: 75,
          price: 55,
          image_url: '/images/services/facial-hydration.jpg',
        },
        {
          id: '4',
          name: 'Permanentný make-up obočia',
          category: 'Permanentný make-up',
          description: 'Prirodzené zvýraznenie obočia metódou microblading.',
          duration: 120,
          price: 180,
          image_url: '/images/services/pmu-brows.jpg',
        },
        {
          id: '5',
          name: 'Klasická manikúra',
          category: 'Manikúra',
          description: 'Základná starostlivosť o nechty a pokožku rúk.',
          duration: 45,
          price: 25,
          image_url: '/images/services/manicure-classic.jpg',
        },
      ]
      
      setServices(mockServices)
      
      const mockCategories = ['Ošetrenia tváre', 'Permanentný make-up', 'Manikúra']
      setCategories(mockCategories)
      
      setIsLoading(false)
    }
  }, [isLoading, services.length])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-red-600 mb-2">Nastala chyba</h2>
          <p className="mb-4">{error}</p>
          <button 
            className="btn-primary"
            onClick={() => window.location.reload()}
          >
            Skúsiť znova
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-20">
      <div className="container-custom">
        {/* Page header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
            Naše služby
          </h1>
          <p className="text-lg text-gray-600">
            Ponúkame širokú škálu kozmetických služieb prispôsobených vašim potrebám. 
            Všetky naše procedúry vykonávajú kvalifikovaní odborníci s použitím prvotriednych produktov.
          </p>
        </div>

        {/* Categories Tabs */}
        <Tab.Group>
          <Tab.List className="flex flex-wrap justify-center gap-2 mb-12">
            <Tab
              className={({ selected }) =>
                `px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selected
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`
              }
            >
              Všetky služby
            </Tab>
            {categories.map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  `px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selected
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`
                }
              >
                {category}
              </Tab>
            ))}
          </Tab.List>
          
          <Tab.Panels>
            {/* All services */}
            <Tab.Panel>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {services.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </motion.div>
            </Tab.Panel>
            
            {/* Each category */}
            {categories.map((category) => (
              <Tab.Panel key={category}>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {services
                    .filter((service) => service.category === category)
                    .map((service) => (
                      <ServiceCard key={service.id} service={service} />
                    ))}
                </motion.div>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  )
}

// Komponent pre kartu služby
function ServiceCard({ service }: { service: Service }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="card overflow-hidden h-full flex flex-col"
    >
      <Link href={`/sluzby/${service.id}`} className="block h-full">
        <div className="relative h-60 overflow-hidden">
          <Image
            src={service.image_url}
            alt={service.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-4 left-4 bg-primary-600 text-white text-xs px-2 py-1 rounded">
            {service.category}
          </div>
        </div>
        
        <div className="p-6 flex-grow">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {service.name}
          </h2>
          <p className="text-gray-600 mb-4">{service.description}</p>
          
          <div className="flex justify-between items-center mt-auto">
            <div>
              <p className="text-gray-700 font-semibold">
                {service.price.toFixed(2)} €
                {service.discounted_price && (
                  <span className="ml-2 text-sm text-gray-500 line-through">
                    {service.discounted_price.toFixed(2)} €
                  </span>
                )}
              </p>
              <p className="text-sm text-gray-500">Trvanie: {service.duration} min</p>
            </div>
            
            <div className="btn-primary text-sm">Zobraziť detail</div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
