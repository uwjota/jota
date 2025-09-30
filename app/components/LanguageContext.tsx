'use client'

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react'

type Language = 'pt' | 'en'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

/**
 * Context para gerenciamento de idiomas
 * Suporta Português e Inglês
 * Persiste a escolha no localStorage
 */

// Traduções
const translations = {
  pt: {
    // Página inicial
    'home.click': 'Clique na tela',
    
    // Seção About
    'about.title': 'Olá...',
    'about.content': 'Eu sou o João, e ajudo empresas. Com sites, automações e soluções audiovisuais!',
    'about.button': 'Ver Projetos',
    'about.contact': 'Fale comigo',
    
    // Seção Skills
    'skills.title': 'Especialidades',
    'skills.content': 'Tecnologias e habilidades que domino:',
    'skills.video': 'Edição',
    'skills.ads': 'Tráfego Pago',
    
    // Seção Projects
    'projects.title': 'Projetos',
    'projects.content': 'Alguns dos meus projetos desenvolvidos:',
    'projects.landing.title': 'Landing Page',
    'projects.landing.description': 'Landing page moderna e responsiva para consultores de imóveis, com formulário que envia os dados preenchidos diretamente para uma planilha.',
    'projects.cardapio.title': 'Cardapio Digital',
    'projects.cardapio.description': 'Ele conta com um carrinho de compras salvo no LocalStorage e envia os pedidos diretamente para o WhatsApp com todos os detalhes necessários do pedido.',
    'projects.visual.title': 'Identidade Visual',
    'projects.visual.description': 'Trabalho criando um visual moderno e consistente para a @pradapayoficial, com cores, tipografia e elementos gráficos que destacam a marca e tornam o feed mais atrativo!',
    'projects.swipe': '← Deslize para ver mais projetos →',
    
    // Seção Contact
    'contact.title': 'Redes Sociais',
    'contact.content': 'Quer tirar uma ideia do papel? Fale comigo!',
  },
  en: {
    // Home page
    'home.click': 'Click on screen',
    
    // About section
    'about.title': 'Hello...',
    'about.content': 'I am João, and I help companies. With websites, automations and audiovisual solutions!',
    'about.button': 'View Projects',
    'about.contact': 'Talk to me',
    
    // Skills section
    'skills.title': 'Specialties',
    'skills.content': 'Technologies and skills I master:',
    'skills.video': 'Editing',
    'skills.ads': 'Paid Traffic',
    
    // Projects section
    'projects.title': 'Projects',
    'projects.content': 'Some of my developed projects:',
    'projects.landing.title': 'Landing Page',
    'projects.landing.description': 'Modern and responsive landing page for real estate consultants, with a form that sends the filled data directly to a spreadsheet.',
    'projects.cardapio.title': 'Digital Menu',
    'projects.cardapio.description': 'It features a shopping cart saved in LocalStorage and sends orders directly to WhatsApp with all the necessary order details.',
    'projects.visual.title': 'Visual Identity',
    'projects.visual.description': 'Work creating a modern and consistent visual for @pradapayoficial, with colors, typography and graphic elements that highlight the brand and make the feed more attractive!',
    'projects.swipe': '← Swipe to see more projects →',
    
    // Contact section
    'contact.title': 'Social Networks',
    'contact.content': 'Want to get an idea off the ground? Talk to me!',
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('pt')
  const [isClient, setIsClient] = useState(false)

  // Carregar idioma do localStorage apenas no cliente
  useEffect(() => {
    setIsClient(true)
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language') as Language
      if (savedLanguage && (savedLanguage === 'pt' || savedLanguage === 'en')) {
        setLanguage(savedLanguage)
      }
    }
  }, [])

  useEffect(() => {
    // Salvar idioma no localStorage quando mudar (apenas no cliente e após hidratação)
    if (isClient && typeof window !== 'undefined') {
      localStorage.setItem('language', language)
    }
  }, [language, isClient])

  const t = useCallback((key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key
  }, [language])

  const contextValue = useMemo(() => ({
    language,
    setLanguage,
    t
  }), [language, setLanguage, t])

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
