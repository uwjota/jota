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
    'projects.landing.description': 'Desenvolvida para capturação de leads e enviado para planilha.',
    'projects.cardapio.title': 'Cardapio Digital',
    'projects.cardapio.description': 'Utiliza LocalStorage para salvar o carrinho de compras e envia os pedidos diretamente para o WhatsApp.',
    'projects.visual.title': 'Identidade Visual',
    'projects.visual.description': 'Identidade visual feita com elementos criados por I.A e realizada para um gateway de pagamentos.',
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
    'projects.landing.description': 'Developed for lead capture and sent to spreadsheet.',
    'projects.cardapio.title': 'Digital Menu',
    'projects.cardapio.description': 'Uses LocalStorage to save the shopping cart and sends orders directly to WhatsApp.',
    'projects.visual.title': 'Visual Identity',
    'projects.visual.description': 'Visual identity made with elements created by A.I and developed for a payment gateway.',
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
