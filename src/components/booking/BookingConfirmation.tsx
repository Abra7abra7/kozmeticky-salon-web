'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

type Props = {
  confirmationData: {
    serviceName?: string;
    teamMemberName?: string;
    formattedDate?: string;
    clientName?: string;
    clientEmail?: string;
    id?: string;
  };
}

export default function BookingConfirmation({ confirmationData }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
        <svg
          className="w-10 h-10 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      
      <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
        Rezervácia úspešne vytvorená
      </h2>
      
      <p className="text-lg text-gray-700 mb-8">
        Ďakujeme za vašu rezerváciu. Detaily o termíne nájdete nižšie.
      </p>
      
      <div className="max-w-md mx-auto bg-gray-50 p-6 rounded-lg mb-8">
        <div className="grid grid-cols-2 gap-4 text-left">
          <div className="text-gray-600">Rezervačné číslo:</div>
          <div className="font-medium">{confirmationData.id || 'R-' + Math.floor(Math.random() * 10000)}</div>
          
          <div className="text-gray-600">Služba:</div>
          <div className="font-medium">{confirmationData.serviceName || 'Klasické ošetrenie pleti'}</div>
          
          <div className="text-gray-600">Špecialista:</div>
          <div className="font-medium">{confirmationData.teamMemberName || 'Lucia Kováčová'}</div>
          
          <div className="text-gray-600">Termín:</div>
          <div className="font-medium">{confirmationData.formattedDate || 'Pondelok, 24. marca 2025, 10:00'}</div>
        </div>
      </div>
      
      <p className="text-gray-600 mb-8">
        Potvrdenie rezervácie sme odoslali na vašu emailovú adresu{' '}
        <span className="font-medium">{confirmationData.clientEmail || 'email@example.com'}</span>. Ak by ste
        potrebovali zmeniť alebo zrušiť vašu rezerváciu, kontaktujte nás na telefónnom čísle +421 900 123 456.
      </p>
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link href="/" className="btn-primary px-6 py-2">
          Späť na domovskú stránku
        </Link>
        
        <button
          onClick={() => window.print()}
          className="btn-outline px-6 py-2"
        >
          Vytlačiť potvrdenie
        </button>
      </div>
      
      <div className="mt-8 p-4 border border-gray-200 rounded-lg text-left max-w-md mx-auto bg-white">
        <h3 className="font-semibold text-gray-900 mb-2">Užitočné informácie</h3>
        <ul className="text-gray-600 text-sm space-y-2">
          <li className="flex items-start">
            <svg className="w-5 h-5 text-primary-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span>Prosíme, dostavte sa 10 minút pred začiatkom vášho termínu.</span>
          </li>
          <li className="flex items-start">
            <svg className="w-5 h-5 text-primary-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span>Pre ošetrenie tváre odporúčame prísť bez make-upu.</span>
          </li>
          <li className="flex items-start">
            <svg className="w-5 h-5 text-primary-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span>Rezerváciu môžete bezplatne zrušiť najneskôr 24 hodín pred termínom.</span>
          </li>
        </ul>
      </div>
    </motion.div>
  )
}
