import LandingPage from '../components/LandingPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'UWJOTA',
  description: 'Conheça um pouco sobre mim.',
  keywords: [
    'projetos',
    'desenvolvimento frontend',
    'React',
    'TypeScript',
    'Next.js',
    'interfaces modernas',
    'uwjota',
    'João Marcelo'
  ],
  openGraph: {
    title: 'UWJOTA',
    description: 'Conheça um pouco sobre mim.',
    url: 'https://uwjota.vercel.app/site',
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
    title: 'UWJOTA',
    description: 'Conheça um pouco sobre mim.',
    images: ['/fotojoao.webp'],
  },
}

export default function Site() {
  return <LandingPage />
}
