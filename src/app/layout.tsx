import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Toaster } from 'react-hot-toast'

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://kozmeticky-salon.sk'),
  title: {
    default: 'Kozmetický salón | Profesionálna starostlivosť o pleť',
    template: '%s | Kozmetický salón',
  },
  description: 'Profesionálny kozmetický salón ponúkajúci širokú škálu služieb vrátane ošetrení tváre, depilácie, manikúry a ďalších procedúr pre vašu krásu a pohodu.',
  keywords: ['kozmetický salón', 'kozmetika', 'ošetrenie pleti', 'depilácia', 'manikúra'],
  authors: [{ name: 'Kozmetický salón' }],
  generator: 'Next.js',
  openGraph: {
    title: 'Kozmetický salón | Profesionálna starostlivosť o pleť',
    description: 'Profesionálny kozmetický salón ponúkajúci širokú škálu služieb vrátane ošetrení tváre, depilácie, manikúry a ďalších procedúr pre vašu krásu a pohodu.',
    url: 'https://kozmeticky-salon.sk',
    siteName: 'Kozmetický salón',
    locale: 'sk_SK',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sk" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Toaster position="top-center" />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
