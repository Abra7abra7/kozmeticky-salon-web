'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'

type BookingFormData = {
  serviceId: string;
  teamMemberId: string;
  date: string;
  time: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notes: string;
  consent: boolean;
}

type Props = {
  formData: BookingFormData;
  onSubmitAction: (data: Partial<BookingFormData>) => void;
  onSimulateSuccessAction?: (data: Partial<BookingFormData>) => void; // Pre testovanie
  onBackAction: () => void;
}

export default function BookingStepContact({ formData, onSubmitAction, onSimulateSuccessAction, onBackAction }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormData>({
    defaultValues: {
      firstName: formData.firstName || '',
      lastName: formData.lastName || '',
      email: formData.email || '',
      phone: formData.phone || '',
      notes: formData.notes || '',
      consent: formData.consent || false
    }
  })
  
  const onFormSubmit = async (data: Partial<BookingFormData>) => {
    setIsSubmitting(true)
    
    try {
      // Make the real API call
      await onSubmitAction(data)
      setIsSubmitting(false)
    } catch (error) {
      console.error('Error submitting form:', error)
      setIsSubmitting(false)
    }
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">
        Kontaktné údaje
      </h2>
      
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="firstName" className="form-label">
              Meno
            </label>
            <input
              id="firstName"
              type="text"
              className={`form-input ${errors.firstName ? 'border-red-500' : ''}`}
              {...register('firstName', { required: 'Meno je povinné' })}
            />
            {errors.firstName && (
              <p className="form-error">{errors.firstName.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="lastName" className="form-label">
              Priezvisko
            </label>
            <input
              id="lastName"
              type="text"
              className={`form-input ${errors.lastName ? 'border-red-500' : ''}`}
              {...register('lastName', { required: 'Priezvisko je povinné' })}
            />
            {errors.lastName && (
              <p className="form-error">{errors.lastName.message}</p>
            )}
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
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
                  message: 'Neplatný formát emailu',
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
                required: 'Telefónne číslo je povinné',
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
          <label htmlFor="notes" className="form-label">
            Poznámky (voliteľné)
          </label>
          <textarea
            id="notes"
            rows={4}
            className="form-input"
            placeholder="Akékoľvek špeciálne požiadavky alebo informácie pre kozmetičku"
            {...register('notes')}
          />
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-2">Zhrnutie rezervácie</h3>
          
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <div className="text-gray-600">Dátum:</div>
            <div className="font-medium">
              {formData.date 
                ? new Date(formData.date).toLocaleDateString('sk-SK', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })
                : '-'}
            </div>
            
            <div className="text-gray-600">Čas:</div>
            <div className="font-medium">{formData.time || '-'}</div>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="consent"
              type="checkbox"
              className={`h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 ${
                errors.consent ? 'border-red-500' : ''
              }`}
              {...register('consent', { 
                required: 'Súhlas so spracovaním osobných údajov je povinný' 
              })}
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="consent" className="font-medium text-gray-700">
              Súhlasím so spracovaním osobných údajov a s obchodnými podmienkami
            </label>
            {errors.consent && (
              <p className="form-error mt-1">{errors.consent.message}</p>
            )}
            <p className="text-gray-500 mt-1">
              Kliknutím na checkbox súhlasíte so spracovaním vašich osobných údajov za účelom
              rezervácie termínu a následnej komunikácie. Viac informácií v našich{' '}
              <a href="/ochrana-osobnych-udajov" className="text-primary-600 hover:text-primary-800">
                zásadách ochrany osobných údajov
              </a>.
            </p>
          </div>
        </div>
        
        {/* Navigation buttons */}
        <div className="mt-8 flex justify-between">
          <button
            type="button"
            className="btn-outline px-6 py-2"
            onClick={onBackAction}
          >
            Späť
          </button>
          
          <button
            type="submit"
            className="btn-primary px-6 py-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Odosielam...' : 'Dokončiť rezerváciu'}
          </button>
        </div>
      </form>
    </motion.div>
  )
}
