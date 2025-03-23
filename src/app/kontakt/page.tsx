'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import Link from 'next/link'
import Image from 'next/image'

type FormData = {
  name: string
  email: string
  phone: string
  subject: string
  message: string
  consent: boolean
}

export default function ContactPage() {
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

  // Opening hours data
  const openingHours = [
    { day: 'Pondelok', hours: '9:00 - 20:00' },
    { day: 'Utorok', hours: '9:00 - 20:00' },
    { day: 'Streda', hours: '9:00 - 20:00' },
    { day: 'Štvrtok', hours: '9:00 - 20:00' },
    { day: 'Piatok', hours: '9:00 - 20:00' },
    { day: 'Sobota', hours: '9:00 - 16:00' },
    { day: 'Nedeľa', hours: 'Zatvorené' },
  ]

  // FAQ items
  const faqs = [
    {
      question: 'Ako sa môžem objednať na procedúru?',
      answer: 'Objednať sa môžete telefonicky, emailom, cez náš rezervačný systém na stránke alebo osobne v našom salóne. Odporúčame rezerváciu minimálne 3-5 dní vopred, najmä pre víkendové termíny.'
    },
    {
      question: 'Aké platobné metódy akceptujete?',
      answer: 'Akceptujeme platby v hotovosti, platobnou kartou (Visa, Mastercard) a prostredníctvom populárnych mobilných platobných aplikácií. V prípade darčekových poukazov je možná aj platba prevodom na účet.'
    },
    {
      question: 'Máte darčekové poukazy?',
      answer: 'Áno, ponúkame darčekové poukazy v rôznych hodnotách alebo na konkrétne procedúry. Sú ideálnym darčekom pre vašich blízkych. Môžete ich zakúpiť osobne v salóne alebo objednať telefonicky či emailom s možnosťou doručenia.'
    }
  ]
  
  return (
    <div className="pt-24 pb-20">
      <div className="container-custom">
        {/* Page header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
            Kontaktujte nás
          </h1>
          <p className="text-lg text-gray-600">
            Máte otázky alebo chcete objednať? Neváhajte nás kontaktovať. Sme tu pre vás a radi pomôžeme s akýmikoľvek otázkami.
          </p>
        </div>
        
        {/* Main content */}
        <div className="grid lg:grid-cols-3 gap-12 mb-20">
          {/* Contact info sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl shadow-md p-6 lg:p-8 sticky top-28">
              <h2 className="text-2xl font-serif font-semibold text-gray-900 mb-6">
                Kontaktné informácie
              </h2>
              
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
                
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Otváracie hodiny</h4>
                  <div className="space-y-2">
                    {openingHours.map((item, index) => (
                      <div key={index} className="flex justify-between text-gray-600">
                        <span>{item.day}</span>
                        <span>{item.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Sledujte nás</h4>
                  <div className="flex space-x-4">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary-600">
                      <span className="sr-only">Facebook</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary-600">
                      <span className="sr-only">Instagram</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        
          {/* Contact form and map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl shadow-md p-6 lg:p-8 mb-10">
              <h2 className="text-2xl font-serif font-semibold text-gray-900 mb-6">
                Napíšte nám
              </h2>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Meno a priezvisko *
                    </label>
                    <input
                      id="name"
                      type="text"
                      className={`form-input w-full rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                      {...register('name', { required: 'Meno je povinné' })}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      className={`form-input w-full rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                      {...register('email', { 
                        required: 'Email je povinný',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Neplatný email',
                        }
                      })}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Telefónne číslo
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      className={`form-input w-full rounded-md ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                      {...register('phone', { 
                        pattern: {
                          value: /^[0-9+\s()-]{9,15}$/,
                          message: 'Neplatné telefónne číslo',
                        }
                      })}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Predmet *
                    </label>
                    <select
                      id="subject"
                      className={`form-select w-full rounded-md ${errors.subject ? 'border-red-500' : 'border-gray-300'}`}
                      {...register('subject', { required: 'Predmet je povinný' })}
                    >
                      <option value="">Vyberte predmet</option>
                      <option value="Rezervácia">Rezervácia</option>
                      <option value="Informácie o službách">Informácie o službách</option>
                      <option value="Spätnú väzbu">Spätnú väzbu</option>
                      <option value="Spolupráca">Spolupráca</option>
                      <option value="Iné">Iné</option>
                    </select>
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Správa *
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className={`form-textarea w-full rounded-md ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
                    {...register('message', { 
                      required: 'Správa je povinná',
                      minLength: {
                        value: 10,
                        message: 'Správa musí mať aspoň 10 znakov',
                      }
                    })}
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
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
                      Súhlasím so spracovaním osobných údajov *
                    </label>
                    {errors.consent && (
                      <p className="mt-1 text-sm text-red-600">{errors.consent.message}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <button
                    type="submit"
                    className="btn-primary w-full py-3 justify-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Odosielam...' : 'Odoslať správu'}
                  </button>
                </div>
              </form>
            </div>
            
            {/* Map */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-10">
              <div className="relative h-[400px] bg-gray-200">
                {/* Replace with actual Google Maps embed */}
                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                  <div className="text-center p-6">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">Nájdete nás v centre Bratislavy</h3>
                    <p className="mt-1 text-sm text-gray-500">Hlavná 123, 811 01 Bratislava</p>
                    <div className="mt-4">
                      <a
                        href="https://maps.google.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-outline text-sm py-2 px-4"
                      >
                        Zobraziť na mape
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* FAQs */}
            <div className="bg-white rounded-xl shadow-md p-6 lg:p-8">
              <h2 className="text-2xl font-serif font-semibold text-gray-900 mb-6">
                Často kladené otázky
              </h2>
              
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-gray-600 mb-4">Nenašli ste odpoveď na vašu otázku?</p>
                <p className="text-primary-600 font-medium">
                  Kontaktujte nás na <a href="tel:+421900123456" className="underline">+421 900 123 456</a> alebo <a href="mailto:info@beautysalon.sk" className="underline">info@beautysalon.sk</a>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-primary-50 rounded-xl p-8 lg:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
                Rezervujte si termín online
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Preferujete online rezerváciu? Využite náš jednoduchý rezervačný systém a vyberte si termín, ktorý vám vyhovuje.
              </p>
              <Link
                href="/rezervacia"
                className="btn-primary"
              >
                Rezervovať termín
              </Link>
            </div>
            
            <div className="relative h-[300px] rounded-lg overflow-hidden shadow-md">
              <Image
                src="/images/services/facial-classic.jpg"
                alt="Rezervácia termínu"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
