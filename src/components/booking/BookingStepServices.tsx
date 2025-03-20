'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

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

type Props = {
  services: Service[];
  selectedServiceId: string;
  onSelect: (serviceId: string) => void;
}

export default function BookingStepServices({ services, selectedServiceId, onSelect }: Props) {
  const [filter, setFilter] = useState('Všetko')
  
  // Get unique categories
  const categories = ['Všetko', ...Array.from(new Set(services.map(service => service.category)))]
  
  // Filter services by category
  const filteredServices = filter === 'Všetko'
    ? services
    : services.filter(service => service.category === filter)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">
        Vyberte službu
      </h2>
      
      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === category
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      
      {/* Services list */}
      <div className="grid gap-4">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className={`p-4 rounded-lg border transition-colors cursor-pointer ${
              selectedServiceId === service.id
                ? 'border-primary-600 bg-primary-50'
                : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
            }`}
            onClick={() => onSelect(service.id)}
          >
            <div className="flex items-center">
              <div className="relative h-20 w-20 overflow-hidden rounded-lg flex-shrink-0">
                <Image
                  src={service.image_url}
                  alt={service.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              
              <div className="ml-4 flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{service.name}</h3>
                    <p className="text-sm text-gray-600 mb-1">{service.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{service.price.toFixed(2)} €</p>
                    <p className="text-sm text-gray-600">{service.duration} min</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 line-clamp-2">{service.description}</p>
              </div>
              
              <div className="ml-4 flex-shrink-0">
                <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                  selectedServiceId === service.id
                    ? 'border-primary-600 bg-primary-600'
                    : 'border-gray-300'
                }`}>
                  {selectedServiceId === service.id && (
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Continue button */}
      <div className="mt-8 flex justify-end">
        <button
          className="btn-primary px-6 py-2"
          disabled={!selectedServiceId}
          onClick={() => selectedServiceId && onSelect(selectedServiceId)}
        >
          Pokračovať
        </button>
      </div>
    </motion.div>
  )
}
