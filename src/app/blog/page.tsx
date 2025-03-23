'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase/client'

// Typy
type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  cover_image_url: string;
  published_at: string;
  categories: string[];
  author: {
    id: string;
    name: string;
    image_url: string;
  };
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [activeCategory, setActiveCategory] = useState('Všetko')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        // Fetch blog posts
        const { data, error } = await supabase
          .from('blog_posts')
          .select(`
            id, 
            title, 
            slug, 
            excerpt, 
            cover_image_url, 
            published_at,
            categories,
            author:author_id(id, name, image_url)
          `)
          .not('published_at', 'is', null)
          .order('published_at', { ascending: false })
        
        if (error) throw error
        
        // Transform data to match our type
        const formattedPosts = data?.map((post: any) => ({
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          cover_image_url: post.cover_image_url,
          published_at: post.published_at,
          categories: post.categories || [],
          author: post.author ? {
            id: post.author.id,
            name: post.author.name,
            image_url: post.author.image_url
          } : {
            id: '0',
            name: 'Admin',
            image_url: '/images/avatars/default.jpg'
          }
        })) || []
        
        setPosts(formattedPosts)
        
        // Extract categories
        const allCategories = formattedPosts.flatMap(post => post.categories || [])
        const uniqueCategories = ['Všetko', ...Array.from(new Set(allCategories))]
        setCategories(uniqueCategories)
        
      } catch (err: any) {
        console.error('Chyba pri načítaní blogových príspevkov:', err)
        setError('Nepodarilo sa načítať blogové príspevky. Skúste to prosím neskôr.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchBlogPosts()
  }, [])

  // Fallback pre mock dáta
  useEffect(() => {
    if (isLoading && !posts.length) {
      // Mock blog posts
      // Mock data should match our updated BlogPost type
      const mockPosts: BlogPost[] = [
        {
          id: '1',
          title: '10 tipov pre dokonalú domácu starostlivosť o pleť',
          slug: '10-tipov-pre-dokonalu-domacu-starostlivost-o-plet',
          excerpt: 'Profesionálne rady, ako sa o svoju pleť starať aj medzi návštevami nášho salónu pre jej zdravý a žiarivý vzhľad.',
          cover_image_url: '/images/blog/blog-1.jpg',
          published_at: '2025-03-15T10:00:00.000Z',
          categories: ['Starostlivosť o pleť'],
          author: {
            id: '1',
            name: 'Lucia Kováčová',
            image_url: '/images/team/team-1.jpg',
          },
        },
        {
          id: '2',
          title: 'Prečo by ste mali vyskúšať permanentný make-up',
          slug: 'preco-by-ste-mali-vyskusat-permanentny-make-up',
          excerpt: 'Výhody permanentného make-upu a dôvody, prečo táto procedúra môže zjednodušiť vašu každodennú rutinu a zvýšiť sebavedomie.',
          cover_image_url: '/images/blog/blog-2.jpg',
          published_at: '2025-03-08T10:00:00.000Z',
          categories: ['Permanentný make-up'],
          author: {
            id: '2',
            name: 'Soňa Novotná',
            image_url: '/images/team/team-4.jpg',
          },
        },
        {
          id: '3',
          title: 'Ako pripraviť vašu pleť na leto',
          slug: 'ako-pripravit-vasu-plet-na-leto',
          excerpt: 'Komplexný sprievodca letnou starostlivosťou o pleť, ktorý vám pomôže chrániť ju pred slnkom a udržať ju hydratovanú počas horúcich dní.',
          cover_image_url: '/images/blog/blog-3.jpg',
          published_at: '2025-03-01T10:00:00.000Z',
          categories: ['Sezónne tipy'],
          author: {
            id: '3',
            name: 'Martina Kučerová',
            image_url: '/images/team/team-2.jpg',
          },
        },
        {
          id: '4',
          title: 'Najnovšie trendy v starostlivosti o mihalnice',
          slug: 'najnovsie-trendy-v-starostlivosti-o-mihalnice',
          excerpt: 'Od lash liftingu po lamináciu - všetko, čo potrebujete vedieť o aktuálnych trendoch v starostlivosti o mihalnice.',
          cover_image_url: '/images/blog/blog-4.jpg',
          published_at: '2025-02-23T10:00:00.000Z',
          categories: ['Trendy'],
          author: {
            id: '2',
            name: 'Soňa Novotná',
            image_url: '/images/team/team-4.jpg',
          },
        },
        {
          id: '5',
          title: 'Ako správne vybrať krém na tvár podľa typu pleti',
          slug: 'ako-spravne-vybrat-krem-na-tvar-podla-typu-pleti',
          excerpt: 'Sprievodca výberom správneho krému pre rôzne typy pleti. Naučte sa rozpoznať svoju pleť a vybrať produkty, ktoré jej najviac prospejú.',
          cover_image_url: '/images/blog/blog-5.jpg',
          published_at: '2025-02-15T10:00:00.000Z',
          categories: ['Starostlivosť o pleť'],
          author: {
            id: '1',
            name: 'Lucia Kováčová',
            image_url: '/images/team/team-1.jpg',
          },
        },
        {
          id: '6',
          title: 'Masáž tváre, ktorú si môžete urobiť doma',
          slug: 'masaz-tvare-ktoru-si-mozete-urobit-doma',
          excerpt: 'Jednoduchá masáž tváre, ktorú zvládnete aj doma. Zlepšite krvný obeh, redukujte opuchnutie a vrásky pomocou týchto techník.',
          cover_image_url: '/images/blog/blog-6.jpg',
          published_at: '2025-02-08T10:00:00.000Z',
          categories: ['DIY tipy'],
          author: {
            id: '4',
            name: 'Nina Horváthová',
            image_url: '/images/team/team-3.jpg',
          },
        },
      ]
      
      setPosts(mockPosts)
      
      // Extract categories
      const allCategories = mockPosts.flatMap(post => post.categories)
      const uniqueCategories = ['Všetko', ...Array.from(new Set(allCategories))]
      setCategories(uniqueCategories)
      
      setIsLoading(false)
    }
  }, [isLoading, posts.length])

  // Filter posts by category
  const filteredPosts = activeCategory === 'Všetko'
    ? posts
    : posts.filter(post => post.categories && post.categories.includes(activeCategory))

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
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
            Blog
          </h1>
          <p className="text-lg text-gray-600">
            Čítajte najnovšie články o trendoch v kozmetike, odborné tipy na starostlivosť o pleť a inšpiratívne beauty príbehy.
          </p>
        </div>

        {/* Blog categories */}
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

        {/* Blog posts grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Žiadne články v tejto kategórii.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => {
              // Format the date
              const publishDate = new Date(post.published_at)
              const formattedDate = publishDate.toLocaleDateString('sk-SK', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })

              return (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="card group"
                >
                  <Link href={`/blog/${post.slug}`} className="block h-full">
                    <div className="relative h-60 overflow-hidden">
                      <Image
                        src={post.cover_image_url}
                        alt={post.title}
                        fill
                        className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute top-4 left-4 bg-primary-600 text-white text-xs px-2 py-1 rounded">
                        {post.categories?.[0] || 'Bez kategórie'}
                      </div>
                    </div>
                    
                    <div className="p-6 flex flex-col h-full">
                      <div className="flex items-center mb-4">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden mr-3">
                          <Image
                            src={post.author.image_url}
                            alt={post.author.name}
                            fill
                            className="object-cover"
                            sizes="32px"
                          />
                        </div>
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">{post.author.name}</span>
                          <span className="mx-2">•</span>
                          <span>{formattedDate}</span>
                        </div>
                      </div>
                      
                      <h2 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                        {post.title}
                      </h2>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center text-primary-600 font-medium mt-auto">
                        <span>Čítať viac</span>
                        <svg
                          className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
