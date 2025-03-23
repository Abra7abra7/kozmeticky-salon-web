'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase/client'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/24/outline'

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
  details?: {
    steps?: string[];
    includes?: string[];
    benefits?: string[];
    techniques?: string[];
  };
}

type Review = {
  id: string;
  client_name: string;
  rating: number;
  text: string;
  created_at: string;
}

type TeamMember = {
  id: string;
  name: string;
  position: string;
  image_url: string;
}

// FAQ data
const faqs = [
  {
    question: "Ako sa mám pripraviť na procedúru?",
    answer: "Na väčšinu našich kozmetických procedúr nie je potrebná špeciálna príprava. Odporúčame prísť bez make-upu, ak idete na ošetrenie tváre. Pri prvej návšteve príďte, prosím, o 10 minút skôr, aby ste mohli vyplniť vstupný formulár."
  },
  {
    question: "Čo ak budem musieť zrušiť rezerváciu?",
    answer: "Rezerváciu môžete bezplatne zrušiť najneskôr 24 hodín pred termínom. Pri zrušení v kratšom čase môže byť účtovaný storno poplatok vo výške 50% z ceny procedúry."
  },
  {
    question: "Ako dlho vydržia výsledky procedúry?",
    answer: "Trvácnosť výsledkov závisí od typu procedúry. Pri bežných ošetreniach pleti odporúčame opakovanie každých 4-6 týždňov. Detailné informácie o trvanlivosti konkrétnej procedúry vám radi poskytneme počas konzultácie."
  },
  {
    question: "Sú procedúry bolestivé?",
    answer: "Väčšina našich procedúr je bezbolestná alebo spôsobuje iba minimálny diskomfort. Pri procedúrach, ktoré môžu byť citlivejšie, používame špeciálne techniky a produkty na minimalizáciu akéhokoľvek nepohodlia."
  },
  {
    question: "Môžem sa objednať na procedúru, ak mám citlivú pleť?",
    answer: "Áno, máme špeciálne procedúry a produkty určené pre citlivú pleť. Pri rezervácii alebo počas úvodnej konzultácie nás, prosím, informujte o vašej citlivej pleti, aby sme mohli procedúru prispôsobiť vašim potrebám."
  }
]

export default function ServiceDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const [service, setService] = useState<Service | null>(null)
  const [relatedServices, setRelatedServices] = useState<Service[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [specialists, setSpecialists] = useState<TeamMember[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchServiceData = async () => {
      if (!id) return
      
      try {
        // Fetch service details
        const { data: serviceData, error: serviceError } = await supabase
          .from('services')
          .select('*')
          .eq('id', id)
          .single()
        
        if (serviceError) throw serviceError
        
        if (!serviceData) {
          router.push('/sluzby')
          return
        }
        
        setService(serviceData)
        
        // Fetch related services from the same category
        const { data: relatedData, error: relatedError } = await supabase
          .from('services')
          .select('*')
          .eq('category', serviceData.category)
          .neq('id', id)
          .limit(3)
        
        if (relatedError) throw relatedError
        
        setRelatedServices(relatedData || [])
        
        // Fetch reviews for this service
        const { data: reviewsData, error: reviewsError } = await supabase
          .from('reviews')
          .select('*')
          .eq('service_id', id)
          .order('created_at', { ascending: false })
          .limit(5)
        
        if (reviewsError) throw reviewsError
        
        setReviews(reviewsData || [])
        
        // Fetch specialists who provide this service
        const { data: teamData, error: teamError } = await supabase
          .from('team_member_services')
          .select('team_member:team_member_id(id, name, position, image_url)')
          .eq('service_id', id)
        
        if (teamError) throw teamError
        
        // Correctly map each team member object from the result
        const specialists = (teamData || []).map(item => ({
          id: (item.team_member as any)?.id || '',
          name: (item.team_member as any)?.name || '',
          position: (item.team_member as any)?.position || '',
          image_url: (item.team_member as any)?.image_url || ''
        }))
        
        setSpecialists(specialists)
        
      } catch (err: any) {
        console.error('Chyba pri načítaní dát:', err)
        setError('Nepodarilo sa načítať detaily služby. Skúste to prosím neskôr.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchServiceData()
  }, [id, router])

  // Fallback pre mock dáta
  useEffect(() => {
    if (isLoading && !service) {
      // Mock dáta pre service
      const mockService: Service = {
        id: id as string,
        name: 'Klasické ošetrenie pleti',
        category: 'Ošetrenia tváre',
        description: 'Kompletné ošetrenie pleti prispôsobené vášmu typu pokožky. Tento základ starostlivosti zahŕňa hĺbkové čistenie, peeling, masáž tváre a výživnú masku. Procedúra je zakončená aplikáciou hydratačného krému.',
        duration: 60,
        price: 45,
        image_url: '/images/services/facial-classic.jpg',
        details: {
          steps: [
            'Diagnostika pleti',
            'Čistenie',
            'Peeling',
            'Masáž',
            'Maska',
            'Záverečná starostlivosť'
          ],
          benefits: [
            'Hĺbkové čistenie pórov',
            'Odstránenie odumretých buniek',
            'Zlepšenie prekrvenia',
            'Hydratácia',
            'Revitalizácia pleti'
          ]
        }
      }
      
      setService(mockService)
      
      // Mock related services
      setRelatedServices([
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
        }
      ])
      
      // Mock reviews
      setReviews([
        {
          id: '1',
          client_name: 'Jana M.',
          rating: 5,
          text: 'Skvelé ošetrenie, moja pleť vyzerá omnoho lepšie. Odporúčam!',
          created_at: '2025-03-15T10:00:00.000Z'
        },
        {
          id: '2',
          client_name: 'Katarína B.',
          rating: 4,
          text: 'Príjemný personál a profesionálny prístup. Určite sa vrátim.',
          created_at: '2025-03-01T10:00:00.000Z'
        }
      ])
      
      // Mock specialists
      setSpecialists([
        {
          id: '1',
          name: 'Lucia Kováčová',
          position: 'Senior kozmetička',
          image_url: '/images/team/team-1.jpg'
        },
        {
          id: '2',
          name: 'Martina Kučerová',
          position: 'Kozmetička',
          image_url: '/images/team/team-2.jpg'
        }
      ])
      
      setIsLoading(false)
    }
  }, [isLoading, service, id])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (error || !service) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-red-600 mb-2">Nastala chyba</h2>
          <p className="mb-4">{error || 'Služba nebola nájdená'}</p>
          <Link href="/sluzby" className="btn-primary">
            Späť na zoznam služieb
          </Link>
        </div>
      </div>
    )
  }

  // Helper na renderovanie hodnotenia hviezdičkami
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
    <div className="pt-24 pb-20">
      <div className="container-custom">
        {/* Breadcrumbs */}
        <nav className="mb-8 text-sm" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="text-gray-500 hover:text-gray-700">
                Domov
              </Link>
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <Link href="/sluzby" className="ml-2 text-gray-500 hover:text-gray-700">
                Služby
              </Link>
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="ml-2 text-gray-700 font-medium">{service.name}</span>
            </li>
          </ol>
        </nav>

        {/* Service details */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Left column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden shadow-lg">
              <Image
                src={service.image_url}
                alt={service.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute top-4 left-4 bg-primary-600 text-white px-3 py-1.5 rounded-full text-sm font-medium">
                {service.category}
              </div>
            </div>
          </motion.div>

          {/* Right column - Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col"
          >
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
              {service.name}
            </h1>
            
            <div className="flex items-center mb-4">
              <div className="flex">
                {renderStars(4.5)}
              </div>
              <span className="ml-2 text-sm text-gray-600">
                (4.5/5 z {reviews.length || '12'} hodnotení)
              </span>
            </div>
            
            <p className="text-gray-700 mb-6">{service.description}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Trvanie</p>
                <p className="font-semibold">{service.duration} minút</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Cena</p>
                <p className="font-semibold text-lg">
                  {service.price.toFixed(2)} €
                  {service.discounted_price && (
                    <span className="ml-2 text-sm text-gray-500 line-through">
                      {service.discounted_price.toFixed(2)} €
                    </span>
                  )}
                </p>
              </div>
            </div>
            
            {service.details?.steps && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Priebeh ošetrenia</h3>
                <ul className="space-y-2">
                  {service.details.steps.map((step, index) => (
                    <li key={index} className="flex items-start">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mr-3 mt-0.5 font-semibold text-sm">
                        {index + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {service.details?.benefits && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Výhody procedúry</h3>
                <ul className="space-y-2">
                  {service.details.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center">
                      <svg className="w-5 h-5 text-primary-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="mt-auto">
              <Link
                href={`/rezervacia?service=${service.id}`}
                className="btn-primary w-full justify-center py-3 text-lg"
              >
                Rezervovať termín
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Specialists */}
        {specialists.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8 text-center">
              Naši špecialisti pre túto službu
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {specialists.map((specialist) => (
                <motion.div
                  key={specialist.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="card overflow-hidden"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={specialist.image_url}
                      alt={specialist.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-xl font-semibold mb-1">{specialist.name}</h3>
                      <p className="text-sm text-gray-200">{specialist.position}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Reviews */}
        <div className="mb-16">
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8 text-center">
            Hodnotenia klientov
          </h2>
          
          {reviews.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {reviews.map((review) => {
                // Format date
                const date = new Date(review.created_at)
                const formattedDate = date.toLocaleDateString('sk-SK', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })
                
                return (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="bg-gray-50 p-6 rounded-lg"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900">{review.client_name}</h3>
                        <p className="text-sm text-gray-500">{formattedDate}</p>
                      </div>
                      <div className="flex">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    <p className="text-gray-700">{review.text}</p>
                  </motion.div>
                )
              })}
            </div>
          ) : (
            <div className="text-center text-gray-600">
              <p>Zatiaľ žiadne hodnotenia. Buďte prvý, kto ohodnotí túto službu.</p>
            </div>
          )}
          
          {/* Add review button */}
          <div className="text-center mt-8">
            <button
              onClick={() => {/* TODO: Implement add review modal */}}
              className="btn-outline"
            >
              Pridať hodnotenie
            </button>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-16">
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8 text-center">
            Často kladené otázky
          </h2>
          
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <Disclosure as="div" key={index} className="mb-4">
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex justify-between w-full px-6 py-4 text-left text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-primary-500">
                      <span className="font-medium">{faq.question}</span>
                      <ChevronUpIcon
                        className={`${
                          open ? 'transform rotate-180' : ''
                        } w-5 h-5 text-primary-500`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-6 py-4 text-gray-700">
                      {faq.answer}
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </div>
        </div>

        {/* Related services */}
        {relatedServices.length > 0 && (
          <div>
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8 text-center">
              Podobné služby
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {relatedServices.map((relatedService) => (
                <motion.div
                  key={relatedService.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="card overflow-hidden"
                >
                  <Link href={`/sluzby/${relatedService.id}`} className="block">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={relatedService.image_url}
                        alt={relatedService.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{relatedService.name}</h3>
                      <p className="text-gray-600 line-clamp-2 mb-4">{relatedService.description}</p>
                      
                      <div className="flex justify-between items-center">
                        <p className="font-semibold text-gray-900">{relatedService.price.toFixed(2)} €</p>
                        <p className="text-sm text-gray-500">{relatedService.duration} min</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Link href="/sluzby" className="btn-outline">
                Zobraziť všetky služby
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
