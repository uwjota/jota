import { useMemo } from 'react'
import { useLanguage } from '../LanguageContext'

export const useSections = () => {
  const { t } = useLanguage()
  
  return useMemo(() => [
    { 
      id: 'about', 
      title: t('about.title'),
      content: t('about.content'),
      showButton: true,
      buttonText: t('about.button'),
      showContactButton: true,
      showPhoto: true
    },
    { 
      id: 'skills', 
      title: t('skills.title'),
      content: t('skills.content'),
      skills: [
        { name: 'JavaScript', icon: 'javascript' },
        { name: 'TypeScript', icon: 'typescript' },
        { name: 'React', icon: 'react' },
        { name: 'Next.js', icon: 'nextjs' },
        { name: 'Node.js', icon: 'nodejs' },
        { name: 'Python', icon: 'python' },
        { name: 'Bootstrap', icon: 'bootstrap' },
        { name: 'Tailwind', icon: 'tailwind' },
        { name: 'WordPress', icon: 'wordpress' },
        { name: 'E-commerce', icon: 'ecommerce' },
        { name: 'I.A', icon: 'ai' },
        { name: 'Git', icon: 'git' },
        { name: 'UI/UX', icon: 'design' },
        { name: 'Design', icon: 'design2' },
        { name: t('skills.video'), icon: 'video' },
        { name: t('skills.ads'), icon: 'ads' }
      ]
    },
    { 
      id: 'projects', 
      title: t('projects.title'),
      content: t('projects.content'),
      projects: [
        {
          title: t('projects.landing.title'),
          description: t('projects.landing.description'),
          tech: ['React', 'Node.js', 'TypeScript', 'Tailwind'],
          link: 'https://nathan-bay.vercel.app/'
        },
        {
          title: t('projects.cardapio.title'),
          description: t('projects.cardapio.description'),
          tech: ['CSS', 'JavaScript', 'HTML', 'Tailwind', ],
          link: 'https://projeto-cardapio-pearl.vercel.app/'
        },
        {
          title: t('projects.visual.title'),
          description: t('projects.visual.description'),
          tech: ['Canva', 'Photoshop', 'ChatGPT'],
          link: 'https://www.instagram.com/pradapayoficial/'
        }
      ]
    },
    { 
      id: 'contact', 
      title: t('contact.title'),
      content: t('contact.content'),
      socialLinks: [
        { name: 'WhatsApp', url: 'https://wa.me/5518997747933', icon: 'WhatsApp' },
        { name: 'Instagram', url: 'https://www.instagram.com/uwjota/', icon: 'Instagram' },
        { name: 'GitHub', url: 'https://github.com/uwjota', icon: 'GitHub' },
        { name: 'LinkedIn', url: 'https://www.linkedin.com/in/joao-marcelo-venancio-ribeiro/', icon: 'LinkedIn' },
        { name: 'Email', url: 'mailto:uwjota@gmail.com', icon: 'Email' }
      ]
    },
  ], [t]) // Memoizar baseado na função de tradução
}
