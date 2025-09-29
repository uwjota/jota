"use client"

import { useRouter } from "next/navigation"
import { useState, useMemo, useCallback } from "react"
import { useLanguage } from './components/LanguageContext'
import { DynamicBackground } from './components/ui/background-variants'

/**
 * Página inicial do portfólio (versão simples para build)
 * Inclui animação de transição para a página principal
 * Suporte a múltiplos idiomas
 */
export default function Home() {
  const router = useRouter()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const { t, language, setLanguage } = useLanguage()

  const handleClick = () => {
    setIsTransitioning(true)
    
    // Aguardar a animação circular e depois navegar
    setTimeout(() => {
      router.push('/site')
    }, 800)
  }

  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'pt' ? 'en' : 'pt')
  }, [language, setLanguage])

  const buttonText = useMemo(() => {
    return language === 'pt' ? 'EN' : 'PT'
  }, [language])

  return (
    <div className="h-screen overflow-hidden relative main-container">
      <div className="absolute inset-0 z-10">
        <DynamicBackground 
          type="particles" 
          color="#262626" 
          backgroundColor="#f8f8f8" 
          speed={0.8}
        />
      </div>
      <div 
        className="absolute inset-0 z-30 transition-all duration-300"
        style={{
          backgroundColor: isTransitioning ? "rgba(0, 0, 0, 1)" : "rgba(0, 0, 0, 0)",
          pointerEvents: isTransitioning ? "auto" : "none"
        }}
      />

      {/* Botão de idioma na página inicial */}
            <button
              className={`fixed top-6 right-6 z-50 bg-black/20 backdrop-blur-sm border border-black/30 rounded-full px-4 py-2 hover:bg-black/30 transition-opacity duration-800 ease-out flex items-center gap-2 ${
                  isTransitioning ? 'opacity-0' : 'opacity-100'
                }`}
              onClick={toggleLanguage}
              style={{
                animation: 'fadeIn 0.8s ease-out'
              }}
              suppressHydrationWarning
            >
        <span className="text-black font-medium text-sm">
          {buttonText}
        </span>
        <svg 
          className="w-4 h-4 text-black" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" 
          />
        </svg>
      </button>
      
      <div 
        className="h-screen overflow-hidden relative z-20 transition-opacity duration-300" 
        style={{ 
          opacity: isTransitioning ? 0 : 1
        }}
      >
        <div 
          className="h-screen flex items-center justify-center cursor-pointer relative z-20"
          onClick={handleClick}
        >
          <div className="text-center">
            <p className="text-black text-xl font-medium select-none hover:scale-110 transition-transform duration-200 animate-float-soft">
              {t('home.click')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}