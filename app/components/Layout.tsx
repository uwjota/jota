"use client"

import { ReactNode, useEffect, useState, useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { DynamicBackground } from "./ui/background-variants"
import { useLanguage } from './LanguageContext'

interface LayoutProps {
  children: ReactNode
  showBackButton?: boolean
}

export default function Layout({ children, showBackButton = false }: LayoutProps) {
  const router = useRouter()
  const { language, setLanguage } = useLanguage()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleBackClick = () => {
    router.push('/')
  }

  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'pt' ? 'en' : 'pt')
  }, [language, setLanguage])

  const buttonText = useMemo(() => {
    return language === 'pt' ? 'EN' : 'PT'
  }, [language])

  return (
    <motion.div 
      className="h-[100svh] overflow-hidden relative" 
      style={{ 
        background: "linear-gradient(135deg, #000000 0%,rgb(0, 0, 0) 100%)"
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      <div className="absolute inset-0 z-10 pointer-events-none">
        <DynamicBackground 
          type="particles"
          color="#ffffff"
          backgroundColor="#000000"
          speed={0.8}
        />
      </div>
      
      {/* Overlay de transição */}
      <div className="absolute inset-0 z-15 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-br from-transparent via-transparent to-black/20 opacity-0 transition-opacity duration-1000" id="bg-overlay" />
      </div>
      
      {showBackButton && (
        <motion.button
          className="fixed top-6 left-6 z-30 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-3 hover:bg-white/20 transition-all duration-300"
          onClick={handleBackClick}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg 
            className="w-6 h-6 text-white" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 19l-7-7m0 0l7-7m-7 7h18" 
            />
          </svg>
        </motion.button>
      )}

      {/* Botão de idioma */}
            <button
              className={`fixed top-6 right-6 z-30 bg-gradient-to-r from-black/20 to-gray-800/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 hover:bg-white/20 transition-opacity duration-800 ease-out flex items-center gap-2 ${
                isClient ? 'opacity-100' : 'opacity-0'
              }`}
              onClick={toggleLanguage}
              style={{
                animation: isClient ? 'fadeIn 0.8s ease-out' : 'none'
              }}
              suppressHydrationWarning
            >
        <span className="text-white font-medium text-sm">
          {buttonText}
        </span>
        <svg 
          className="w-4 h-4 text-white" 
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
      
      <div className="relative z-20 h-full">
        {children}
      </div>
    </motion.div>
  )
}
