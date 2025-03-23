'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase/client'
import BookingStepServices from '@/components/booking/BookingStepServices'
import BookingStepDateTime from '@/components/booking/BookingStepDateTime'
import BookingStepContact from '@/components/booking/BookingStepContact'
import BookingConfirmation from '@/components/booking/BookingConfirmation'

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

type TeamMember = {
  id: string;
  name: string;
  position: string;
  image_url: string;
}

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

export default function BookingPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [services, setServices] = useState<Service[]>([])
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [bookingComplete, setBookingComplete] = useState(false)
  const [confirmationData, setConfirmationData] = useState<any>(null)
  
  // Booking form data
  const [formData, setFormData] = useState<BookingFormData>({
    serviceId: searchParams.get('service') || '',
    teamMemberId: '',
    date: '',
    time: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    notes: '',
    consent: false
  })

  // Fetch services and team members
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching services from Supabase...');
        // Fetch services
        const { data: servicesData, error: servicesError } = await supabase
          .from('services')
          .select('*')
          .order('popularity', { ascending: false })
        
        if (servicesError) {
          console.error('Error fetching services:', servicesError);
          throw servicesError;
        }
        
        console.log('Services fetched:', servicesData);
        setServices(servicesData || [])
        
        // Fetch team members
        const { data: teamData, error: teamError } = await supabase
          .from('team_members')
          .select('*')
        
        if (teamError) throw teamError
        
        setTeamMembers(teamData || [])
        
      } catch (err: any) {
        console.error('Chyba pri načítaní dát:', err)
        setError('Nepodarilo sa načítať dáta. Skúste to prosím neskôr.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])
  
  // Fallback pre mock dáta ak ešte nie je pripojená Supabase
  useEffect(() => {
    if (isLoading && !services.length) {
      // Mock services
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
          id: '3',
          name: 'Anti-aging ošetrenie',
          category: 'Ošetrenia tváre',
          description: 'Omladzujúce ošetrenie pre redukciu vrások a zlepšenie elasticity pleti.',
          duration: 90,
          price: 75,
          image_url: '/images/services/facial-antiaging.jpg',
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
      
      // Mock team members
      const mockTeamMembers = [
        {
          id: '1',
          name: 'Lucia Kováčová',
          position: 'Senior kozmetička',
          image_url: '/images/team/team-1.jpg',
        },
        {
          id: '2',
          name: 'Martina Kučerová',
          position: 'Kozmetička & Manikérka',
          image_url: '/images/team/team-2.jpg',
        },
        {
          id: '3',
          name: 'Nina Horváthová',
          position: 'Kozmetička & Masérka',
          image_url: '/images/team/team-3.jpg',
        },
      ]
      
      setTeamMembers(mockTeamMembers)
      
      setIsLoading(false)
    }
  }, [isLoading, services.length])

  const handleServiceSelection = (serviceId: string) => {
    setFormData({ ...formData, serviceId })
    setCurrentStep(2)
  }

  const handleDateTimeSelection = (data: { teamMemberId: string, date: string, time: string }) => {
    setFormData({ ...formData, ...data })
    setCurrentStep(3)
  }

  const handleContactInfoSubmit = async (contactData: Partial<BookingFormData>) => {
    const updatedFormData = { ...formData, ...contactData }
    setFormData(updatedFormData)
    
    try {
      // Format data for API
      const bookingData = {
        serviceId: updatedFormData.serviceId,
        teamMemberId: updatedFormData.teamMemberId,
        clientName: `${updatedFormData.firstName} ${updatedFormData.lastName}`,
        clientEmail: updatedFormData.email,
        clientPhone: updatedFormData.phone,
        dateTime: `${updatedFormData.date}T${updatedFormData.time}:00`,
        notes: updatedFormData.notes,
        status: 'confirmed',
        duration: services.find(s => s.id === updatedFormData.serviceId)?.duration || 60
      }
      
      // Submit booking to API
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      })
      
      if (!response.ok) {
        throw new Error('Nepodarilo sa vytvoriť rezerváciu')
      }
      
      const result = await response.json()
      
      // Set confirmation data for display
      setConfirmationData({
        ...result,
        serviceName: services.find(s => s.id === updatedFormData.serviceId)?.name,
        teamMemberName: teamMembers.find(t => t.id === updatedFormData.teamMemberId)?.name,
        formattedDate: new Date(`${updatedFormData.date}T${updatedFormData.time}`).toLocaleString('sk-SK', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      })
      
      setBookingComplete(true)
      setCurrentStep(4)
      
    } catch (err) {
      console.error('Chyba pri vytváraní rezervácie:', err)
      setError('Nepodarilo sa vytvoriť rezerváciu. Skúste to prosím neskôr.')
    }
  }

  const navigateBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Funkcia pre simuláciu úspešnej rezervácie (pre testovanie bez API)
  const simulateSuccessfulBooking = (contactData: Partial<BookingFormData>) => {
    const updatedFormData = { ...formData, ...contactData }
    setFormData(updatedFormData)
    
    // Set confirmation data for display
    setConfirmationData({
      serviceName: services.find(s => s.id === updatedFormData.serviceId)?.name,
      teamMemberName: teamMembers.find(t => t.id === updatedFormData.teamMemberId)?.name,
      formattedDate: new Date(`${updatedFormData.date}T${updatedFormData.time}`).toLocaleString('sk-SK', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    })
    
    setBookingComplete(true)
    setCurrentStep(4)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (error && !bookingComplete) {
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
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="container-custom">
        {/* Page header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
            Online rezervácia
          </h1>
          <p className="text-lg text-gray-600">
            Rezervujte si termín v niekoľkých jednoduchých krokoch. Vyberte si službu, termín a vyplňte kontaktné údaje.
          </p>
        </div>

        {/* Progress steps */}
        {!bookingComplete && (
          <div className="flex justify-center mb-12">
            <ol className="flex items-center w-full max-w-3xl">
              {[1, 2, 3].map((step) => (
                <li key={step} className={`flex w-full items-center ${step < currentStep ? 'text-primary-600' : step === currentStep ? 'text-primary-600' : 'text-gray-400'}`}>
                  <span className={`flex items-center justify-center w-10 h-10 rounded-full ${step < currentStep ? 'bg-primary-100 text-primary-600' : step === currentStep ? 'bg-primary-600 text-white' : 'bg-gray-100'}`}>
                    {step < currentStep ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      step
                    )}
                  </span>
                  <span className={`ml-2 text-sm font-medium ${step <= currentStep ? 'text-gray-900' : 'text-gray-400'}`}>
                    {step === 1 ? 'Služba' : step === 2 ? 'Termín' : 'Kontakt'}
                  </span>
                  {step < 3 && (
                    <div className={`flex-1 h-px mx-4 ${step < currentStep ? 'bg-primary-600' : 'bg-gray-200'}`}></div>
                  )}
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Booking steps */}
        <div className="max-w-4xl mx-auto">
          {currentStep === 1 && (
            <BookingStepServices 
              services={services} 
              selectedServiceId={formData.serviceId}
              onSelect={handleServiceSelection}
            />
          )}
          
          {currentStep === 2 && (
            <BookingStepDateTime 
              serviceId={formData.serviceId}
              service={services.find(s => s.id === formData.serviceId)}
              teamMembers={teamMembers}
              selectedTeamMemberId={formData.teamMemberId}
              selectedDate={formData.date}
              selectedTime={formData.time}
              onSelect={handleDateTimeSelection}
              onBack={navigateBack}
            />
          )}
          
          {currentStep === 3 && (
            <BookingStepContact 
              formData={formData}
              onSubmit={handleContactInfoSubmit}
              onSimulateSuccess={simulateSuccessfulBooking} // Pre testovanie
              onBack={navigateBack}
            />
          )}
          
          {currentStep === 4 && bookingComplete && (
            <BookingConfirmation 
              confirmationData={confirmationData}
            />
          )}
        </div>
      </div>
    </div>
  )
}
