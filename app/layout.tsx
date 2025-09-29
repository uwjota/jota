import './globals.css'
import { Outfit } from 'next/font/google'
import { LanguageProvider } from './components/LanguageContext'
import CustomCursor from './components/CustomCursor'
import ScrollToTop from './components/ScrollToTop'
import { ErrorBoundary } from './components/ErrorBoundary'

// Configuração da fonte Outfit
const outfit = Outfit({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-outfit'
})

// Metadados do site
export const metadata = {
  metadataBase: new URL('https://uwjota.vercel.app'),
  title: {
    default: 'UWJOTA',
    template: 'UWJOTA'
  },
  description: 'Frontend Developer especializado em React, TypeScript, Next.js e desenvolvimento de interfaces modernas. Transforme suas ideias em experiências digitais incríveis.',
  keywords: [
    'frontend developer',
    'desenvolvimento frontend',
    'React',
    'TypeScript',
    'Next.js',
    'JavaScript',
    'UI/UX',
    'desenvolvimento web',
    'interfaces modernas',
    'uwjota',
    'João Marcelo'
  ],
  authors: [{ name: 'João Marcelo Venancio Ribeiro' }],
  creator: 'João Marcelo Venancio Ribeiro',
  publisher: 'João Marcelo Venancio Ribeiro',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://uwjota.vercel.app',
    siteName: 'UWJOTA',
    title: 'UWJOTA',
    description: 'Frontend Developer especializado em React, TypeScript, Next.js e desenvolvimento de interfaces modernas. Transforme suas ideias em experiências digitais incríveis.',
    images: [
      {
        url: '/fotojoao.webp',
        width: 1200,
        height: 630,
        alt: 'uwjota - Frontend Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UWJOTA',
    description: 'Frontend Developer especializado em React, TypeScript, Next.js e desenvolvimento de interfaces modernas.',
    images: ['/fotojoao.webp'],
    creator: '@uwjota',
  },
  icons: {
    icon: '/iconj.ico',
    shortcut: '/iconj.ico',
    apple: '/iconj.ico',
  },
  manifest: '/manifest.json',
  alternates: {
    canonical: 'https://uwjota.vercel.app',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || '',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${outfit.className} bg-black text-white`}>
        <LanguageProvider>
          <ErrorBoundary>
            <ScrollToTop />
            <CustomCursor />
            {children}
          </ErrorBoundary>
        </LanguageProvider>
      </body>
    </html>
  )
}
