'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

// Mock blog posts data - v produkčnej verzii by sme tieto dáta načítali z databázy
const blogPosts = [
  {
    id: 1,
    title: '10 tipov pre dokonalú domácu starostlivosť o pleť',
    excerpt: 'Profesionálne rady, ako sa o svoju pleť starať aj medzi návštevami nášho salónu pre jej zdravý a žiarivý vzhľad.',
    slug: '10-tipov-pre-dokonalu-domacu-starostlivost-o-plet',
    coverImage: '/images/blog/blog-1.jpg',
    publishedAt: '2025-03-15T10:00:00.000Z',
    category: 'Starostlivosť o pleť',
    author: {
      name: 'Lucia Kováčová',
      image: '/images/team/team-1.jpg',
    },
  },
  {
    id: 2,
    title: 'Prečo by ste mali vyskúšať permanentný make-up',
    excerpt: 'Výhody permanentného make-upu a dôvody, prečo táto procedúra môže zjednodušiť vašu každodennú rutinu a zvýšiť sebavedomie.',
    slug: 'preco-by-ste-mali-vyskusat-permanentny-make-up',
    coverImage: '/images/blog/blog-2.jpg',
    publishedAt: '2025-03-08T10:00:00.000Z',
    category: 'Permanentný make-up',
    author: {
      name: 'Soňa Novotná',
      image: '/images/team/team-4.jpg',
    },
  },
  {
    id: 3,
    title: 'Ako pripraviť vašu pleť na leto',
    excerpt: 'Komplexný sprievodca letnou starostlivosťou o pleť, ktorý vám pomôže chrániť ju pred slnkom a udržať ju hydratovanú počas horúcich dní.',
    slug: 'ako-pripravit-vasu-plet-na-leto',
    coverImage: '/images/blog/blog-3.jpg',
    publishedAt: '2025-03-01T10:00:00.000Z',
    category: 'Sezónne tipy',
    author: {
      name: 'Martina Kučerová',
      image: '/images/team/team-2.jpg',
    },
  },
]

export default function BlogSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">
            Náš beauty blog
          </h2>
          <p className="text-lg text-gray-600">
            Prinášame vám najnovšie informácie a tipy zo sveta kozmetiky, starostlivosti o pleť a krásy.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => {
            // Format the date
            const publishDate = new Date(post.publishedAt)
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
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card group"
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="relative h-60 overflow-hidden">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-4 left-4 bg-primary-600 text-white text-xs px-2 py-1 rounded">
                      {post.category}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden mr-3">
                        <Image
                          src={post.author.image}
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
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center text-primary-600 font-medium">
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

        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="btn-primary inline-flex items-center"
          >
            <span>Všetky články</span>
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
