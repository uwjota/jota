import LandingPage from '../components/LandingPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'UWJOTA',
  description: 'Eu sou o João, e ajudo empresas. Com sites, automações e soluções audiovisuais!',
  keywords: [
    'João Marcelo',
    'uwjota',
    'portfólio',
    'projetos',
    'desenvolvimento de sites',
    'automações',
    'soluções audiovisuais',
    'React',
    'TypeScript',
    'Next.js',
    'JavaScript',
    'Python',
    'C',
    'desenvolvimento web',
    'UI/UX',
    'design gráfico',
    'edição de vídeo',
    'tráfego pago'
  ],
  openGraph: {
    title: 'UWJOTA',
    description: 'Eu sou o João, e ajudo empresas. Com sites, automações e soluções audiovisuais!',
    url: 'https://uwjota.vercel.app/site',
    images: [
      {
        url: '/fotodojoao.webp',
        width: 1200,
        height: 630,
        alt: 'uwjota - Frontend Developer',
      },
    ],
  },
  twitter: {
    title: 'UWJOTA',
    description: 'Eu sou o João, e ajudo empresas. Com sites, automações e soluções audiovisuais!',
    images: ['/fotodojoao.webp'],
  },
}

export default function Site() {
  return <LandingPage />
}
