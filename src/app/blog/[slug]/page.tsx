'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase/client'

// Typy
type BlogPost = {
  id: string;
  title: string;
  slug: string;
  content: string;
  cover_image_url: string;
  published_at: string;
  category: string;
  tags: string[];
  author: {
    id: string;
    name: string;
    position: string;
    image_url: string;
  };
}

type RelatedPost = {
  id: string;
  title: string;
  slug: string;
  cover_image_url: string;
  published_at: string;
}

export default function BlogPostPage() {
  const { slug } = useParams()
  const router = useRouter()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<RelatedPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBlogPost = async () => {
      if (!slug) return
      
      try {
        // Fetch blog post
        const { data, error } = await supabase
          .from('blog_posts')
          .select(`
            id, 
            title, 
            slug, 
            content, 
            cover_image_url, 
            published_at,
            categories,
            tags,
            author:author_id(id, name, position, image_url)
          `)
          .eq('slug', slug)
          .eq('published', true)
          .single()
        
        if (error) throw error
        
        if (!data) {
          router.push('/blog')
          return
        }
        
        // Transform data to match our type
        const formattedPost: BlogPost = {
          id: data.id,
          title: data.title,
          slug: data.slug,
          content: data.content,
          cover_image_url: data.cover_image_url,
          published_at: data.published_at,
          category: data.categories?.[0] || 'Ostatné',
          tags: data.tags || [],
          author: {
            id: data.author?.id,
            name: data.author?.name || 'Admin',
            position: data.author?.position || 'Kozmetička',
            image_url: data.author?.image_url || '/images/avatars/default.jpg'
          }
        }
        
        setPost(formattedPost)
        
        // Fetch related posts from the same category
        if (formattedPost.category) {
          const { data: relatedData, error: relatedError } = await supabase
            .from('blog_posts')
            .select('id, title, slug, cover_image_url, published_at')
            .contains('categories', [formattedPost.category])
            .neq('id', formattedPost.id)
            .eq('published', true)
            .order('published_at', { ascending: false })
            .limit(3)
          
          if (relatedError) throw relatedError
          
          setRelatedPosts(relatedData || [])
        }
        
      } catch (err: any) {
        console.error('Chyba pri načítaní blogového príspevku:', err)
        setError('Nepodarilo sa načítať blogový príspevok. Skúste to prosím neskôr.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchBlogPost()
  }, [slug, router])

  // Fallback pre mock dáta
  useEffect(() => {
    if (isLoading && !post) {
      // Mock blog post
      const mockPost: BlogPost = {
        id: '1',
        title: '10 tipov pre dokonalú domácu starostlivosť o pleť',
        slug: slug as string,
        content: `
          <h2>Úvod</h2>
          <p>Starostlivosť o pleť nie je len otázkou krásy, ale aj zdravia. Pleť je najväčším orgánom nášho tela a zaslúži si náležitú pozornosť. Hoci návšteva kozmetického salónu poskytne vašej pleti profesionálnu starostlivosť, správna domáca rutina je rovnako dôležitá pre udržanie zdravej a žiarivej pleti.</p>
          
          <p>V tomto článku vám prinášame 10 odborných tipov, ako sa o svoju pleť starať správne aj v domácom prostredí.</p>
          
          <h2>1. Poznajte svoj typ pleti</h2>
          <p>Základom správnej starostlivosti je poznať svoj typ pleti. Každý typ vyžaduje iný prístup a produkty. Suchá pleť potrebuje intenzívnu hydratáciu, mastná pleť reguláciu mazu, citlivá pleť jemné produkty bez dráždivých látok a zmiešaná pleť kombinovaný prístup.</p>
          
          <h2>2. Pravidelné čistenie</h2>
          <p>Čistite pleť ráno a večer pomocou jemného čistiaceho prípravku vhodného pre váš typ pleti. Odstraňujte nielen make-up, ale aj nečistoty a prebytočný maz, ktoré sa počas dňa usadili na pokožke.</p>
          
          <h2>3. Nezabúdajte na tonikum</h2>
          <p>Tonikum pomáha obnoviť pH pokožky po čistení a pripraviť ju na prijatie ďalších produktov. Vyberajte tonikum bez alkoholu, ktoré pleť zbytočne nevysušuje.</p>
          
          <h2>4. Pravidelná exfoliácia</h2>
          <p>Odstraňujte odumreté kožné bunky pomocou jemného peelingu 1-2 krát týždenne. To podporí regeneráciu pleti a zlepší vstrebávanie ďalších produktov.</p>
          
          <h2>5. Sérum pre cielenú starostlivosť</h2>
          <p>Séra obsahujú vysoko koncentrované účinné látky, ktoré riešia špecifické problémy pleti. Vitamín C pre rozjasnenie, kyselina hyalurónová pre hydratáciu, retinol pre omladenie - vyberte si podľa potrieb vašej pleti.</p>
          
          <h2>6. Hydratácia je základ</h2>
          <p>Bez ohľadu na typ pleti, hydratácia je nevyhnutná. Vyberte si krém s textúrou vhodnou pre váš typ pleti - ľahší gél pre mastnú pleť, bohatší krém pre suchú pleť.</p>
          
          <h2>7. Ochrana pred slnkom</h2>
          <p>SPF ochrana je najdôležitejším krokom v prevencii predčasného starnutia. Používajte krém s SPF 30 a viac každý deň, bez ohľadu na počasie.</p>
          
          <h2>8. Večerná starostlivosť</h2>
          <p>Večer je čas na regeneráciu. Používajte výživnejšie produkty, ktoré podporia prirodzené regeneračné procesy pleti počas spánku.</p>
          
          <h2>9. Správna výživa a pitný režim</h2>
          <p>Stav pleti odráža aj to, čo jeme a pijeme. Dostatočný príjem vody, antioxidantov a zdravých tukov sa odrazí aj na kvalite vašej pleti.</p>
          
          <h2>10. Pravidelné návštevy odborníka</h2>
          <p>Aj pri dôslednej domácej starostlivosti je dôležité navštevovať kozmetický salón. Odborné ošetrenia doplnia a zvýšia účinnosť vašej domácej rutiny.</p>
          
          <h2>Záver</h2>
          <p>Pamätajte, že starostlivosť o pleť je maraton, nie šprint. Výsledky sa dostavia pri pravidelnej a dôslednej starostlivosti. Buďte trpezliví a doprajte svojej pleti čas na regeneráciu a zlepšenie.</p>
          
          <p>Ak máte otázky ohľadom starostlivosti o vašu pleť, neváhajte nás kontaktovať alebo si rezervovať konzultáciu v našom salóne.</p>
        `,
        cover_image_url: '/images/blog/blog-1.jpg',
        published_at: '2025-03-15T10:00:00.000Z',
        category: 'Starostlivosť o pleť',
        tags: ['starostlivosť o pleť', 'domáca starostlivosť', 'tipy'],
        author: {
          id: '1',
          name: 'Lucia Kováčová',
          position: 'Senior kozmetička',
          image_url: '/images/team/team-1.jpg',
        },
      }
      
      setPost(mockPost)
      
      // Mock related posts
      const mockRelatedPosts: RelatedPost[] = [
        {
          id: '5',
          title: 'Ako správne vybrať krém na tvár podľa typu pleti',
          slug: 'ako-spravne-vybrat-krem-na-tvar-podla-typu-pleti',
          cover_image_url: '/images/blog/blog-5.jpg',
          published_at: '2025-02-15T10:00:00.000Z',
        },
        {
          id: '6',
          title: 'Masáž tváre, ktorú si môžete urobiť doma',
          slug: 'masaz-tvare-ktoru-si-mozete-urobit-doma',
          cover_image_url: '/images/blog/blog-6.jpg',
          published_at: '2025-02-08T10:00:00.000Z',
        },
      ]
      
      setRelatedPosts(mockRelatedPosts)
      
      setIsLoading(false)
    }
  }, [isLoading, post, slug])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-red-600 mb-2">Nastala chyba</h2>
          <p className="mb-4">{error || 'Článok nebol nájdený'}</p>
          <Link href="/blog" className="btn-primary">
            Späť na blog
          </Link>
        </div>
      </div>
    )
  }

  // Format publish date
  const publishDate = new Date(post.published_at)
  const formattedDate = publishDate.toLocaleDateString('sk-SK', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

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
              <Link href="/blog" className="ml-2 text-gray-500 hover:text-gray-700">
                Blog
              </Link>
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="ml-2 text-gray-700 font-medium line-clamp-1">{post.title}</span>
            </li>
          </ol>
        </nav>

        {/* Article header */}
        <div className="max-w-4xl mx-auto mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6">
              <Link 
                href={`/blog?category=${post.category}`}
                className="inline-block bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium hover:bg-primary-200 transition-colors"
              >
                {post.category}
              </Link>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-6">
              {post.title}
            </h1>
            
            <div className="flex items-center mb-8">
              <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                <Image
                  src={post.author.image_url}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
              <div>
                <p className="font-medium text-gray-900">{post.author.name}</p>
                <div className="flex items-center text-sm text-gray-600">
                  <span>{post.author.position}</span>
                  <span className="mx-2">•</span>
                  <span>{formattedDate}</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Cover image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-10"
          >
            <div className="relative h-[300px] md:h-[500px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src={post.cover_image_url}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 896px"
                priority
              />
            </div>
          </motion.div>
        </div>
        
        {/* Article content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 max-w-6xl mx-auto">
          {/* Main content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-3"
          >
            <article className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:font-semibold prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-700 prose-a:text-primary-600 hover:prose-a:text-primary-800">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>
            
            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-10 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog?tag=${tag}`}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            )}
            
            {/* Author box */}
            <div className="mt-12 bg-gray-50 p-6 rounded-xl">
              <div className="flex items-center">
                <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                  <Image
                    src={post.author.image_url}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{post.author.name}</h3>
                  <p className="text-gray-600">{post.author.position}</p>
                </div>
              </div>
              <p className="mt-4 text-gray-700">
                Autorka článku je naša skúsená kozmetička s odbornými znalosťami v oblasti starostlivosti o pleť. 
                S jej dlhoročnými skúsenosťami vám vie poskytnúť profesionálne poradenstvo presne pre váš typ pleti.
              </p>
            </div>
            
            {/* Share buttons */}
            <div className="mt-8">
              <h3 className="font-semibold text-gray-900 mb-3">Zdieľať článok</h3>
              <div className="flex space-x-3">
                <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
                  </svg>
                </button>
                <button className="bg-sky-500 hover:bg-sky-600 text-white p-2 rounded-full">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-full">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
          
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="lg:col-span-1"
          >
            {/* CTA for booking */}
            <div className="bg-primary-50 p-6 rounded-xl mb-8">
              <h3 className="font-semibold text-gray-900 mb-3">Rezervujte si termín</h3>
              <p className="text-gray-700 mb-4">Máte záujem o profesionálnu konzultáciu alebo ošetrenie? Rezervujte si termín online.</p>
              <Link
                href="/rezervacia"
                className="btn-primary w-full justify-center"
              >
                Rezervovať
              </Link>
            </div>
            
            {/* Related posts */}
            {relatedPosts.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Súvisiace články</h3>
                <div className="space-y-4">
                  {relatedPosts.map((relatedPost) => {
                    // Format date
                    const relatedDate = new Date(relatedPost.published_at)
                    const relatedFormattedDate = relatedDate.toLocaleDateString('sk-SK', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })
                    
                    return (
                      <Link
                        key={relatedPost.id}
                        href={`/blog/${relatedPost.slug}`}
                        className="flex group"
                      >
                        <div className="relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden">
                          <Image
                            src={relatedPost.cover_image_url}
                            alt={relatedPost.title}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                            sizes="80px"
                          />
                        </div>
                        <div className="ml-3">
                          <h4 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-primary-600 transition-colors">
                            {relatedPost.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">{relatedFormattedDate}</p>
                        </div>
                      </Link>
                    )
                  })}
                </div>
                <div className="mt-4">
                  <Link
                    href="/blog"
                    className="text-primary-600 hover:text-primary-800 text-sm font-medium"
                  >
                    Zobraziť všetky články →
                  </Link>
                </div>
              </div>
            )}
            
            {/* Categories */}
            <div className="mt-8">
              <h3 className="font-semibold text-gray-900 mb-4">Kategórie</h3>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/blog"
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm"
                >
                  Všetky články
                </Link>
                <Link
                  href={`/blog?category=${post.category}`}
                  className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm"
                >
                  {post.category}
                </Link>
                <Link
                  href="/blog?category=Trendy"
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm"
                >
                  Trendy
                </Link>
                <Link
                  href="/blog?category=DIY tipy"
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm"
                >
                  DIY tipy
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
