'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

type FormData = {
  name: string
  email: string
  phone: string
  message: string
  consent: boolean
}

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>()
  
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    
    try {
      // TODO: Implement actual form submission to API
      console.log('Form data:', data)
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      toast.success('Správa bola úspešne odoslaná!')
      reset()
    } catch (error) {
      toast.error('Nastala chyba pri odosielaní. Skúste to prosím znova.')
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">
            Kontaktujte nás
          </h2>
          <p className="text-lg text-gray-600">
            Máte otázky alebo chcete rezervovať termín? Neváhajte nás kontaktovať. Radi vám pomôžeme.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left column - Contact form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-gray-50 rounded-xl p-8 shadow-md">
              <h3 className="text-2xl font-serif font-semibold text-gray-900 mb-6">
                Napíšte nám
              </h3>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label htmlFor="name" className="form-label">
                    Meno a priezvisko
                  </label>
                  <input
                    id="name"
                    type="text"
                    className={`form-input ${errors.name ? 'border-red-500' : ''}`}
                    {...register('name', { required: 'Meno je povinné' })}
                  />
                  {errors.name && (
                    <p className="form-error">{errors.name.message}</p>
                  )}
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className={`form-input ${errors.email ? 'border-red-500' : ''}`}
                      {...register('email', { 
                        required: 'Email je povinný',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Neplatný email',
                        }
                      })}
                    />
                    {errors.email && (
                      <p className="form-error">{errors.email.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="form-label">
                      Telefónne číslo
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      className={`form-input ${errors.phone ? 'border-red-500' : ''}`}
                      {...register('phone', { 
                        pattern: {
                          value: /^[0-9+\s()-]{9,15}$/,
                          message: 'Neplatné telefónne číslo',
                        }
                      })}
                    />
                    {errors.phone && (
                      <p className="form-error">{errors.phone.message}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="form-label">
                    Správa
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className={`form-input ${errors.message ? 'border-red-500' : ''}`}
                    {...register('message', { 
                      required: 'Správa je povinná',
                      minLength: {
                        value: 10,
                        message: 'Správa musí mať aspoň 10 znakov',
                      }
                    })}
                  />
                  {errors.message && (
                    <p className="form-error">{errors.message.message}</p>
                  )}
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="consent"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      {...register('consent', { 
                        required: 'Musíte súhlasiť so spracovaním osobných údajov' 
                      })}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="consent" className="font-medium text-gray-700">
                      Súhlasím so spracovaním osobných údajov
                    </label>
                    {errors.consent && (
                      <p className="form-error">{errors.consent.message}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <button
                    type="submit"
                    className="btn-primary w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Odosielam...' : 'Odoslať správu'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>

          {/* Right column - Contact info and map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <div className="mb-8">
              <h3 className="text-2xl font-serif font-semibold text-gray-900 mb-6">
                Kontaktné informácie
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                    <svg className="h-5 w-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">Adresa</h4>
                    <p className="mt-1 text-gray-600">
                      Hlavná 123<br />
                      811 01 Bratislava
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                    <svg className="h-5 w-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">Telefón</h4>
                    <p className="mt-1 text-gray-600">
                      <a href="tel:+421900123456" className="hover:text-primary-600">
                        +421 900 123 456
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                    <svg className="h-5 w-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">Email</h4>
                    <p className="mt-1 text-gray-600">
                      <a href="mailto:info@beautysalon.sk" className="hover:text-primary-600">
                        info@beautysalon.sk
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                    <svg className="h-5 w-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">Otváracie hodiny</h4>
                    <div className="mt-1 text-gray-600 grid grid-cols-2 gap-x-4 gap-y-1">
                      <span>Pondelok - Piatok:</span>
                      <span>9:00 - 20:00</span>
                      <span>Sobota:</span>
                      <span>9:00 - 16:00</span>
                      <span>Nedeľa:</span>
                      <span>Zatvorené</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Map */}
            <div className="flex-grow rounded-xl overflow-hidden shadow-md mt-6">
              <div className="relative w-full h-full min-h-[300px] bg-gray-200">
                {/* Placeholder for Google Maps embed */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-gray-500">Google Maps will be embedded here</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
