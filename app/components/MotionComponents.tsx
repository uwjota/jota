'use client'

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useState, useMemo, useCallback } from "react"
import { useLanguage } from './LanguageContext'

export default function MotionComponents() {
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
        <motion.div 
          className="absolute inset-0 z-30"
          style={{
            pointerEvents: isTransitioning ? "auto" : "none"
          }}
          initial={{ 
            backgroundColor: "rgba(0, 0, 0, 0)"
          }}
          animate={isTransitioning ? { 
            backgroundColor: "rgba(0, 0, 0, 1)"
          } : { 
            backgroundColor: "rgba(0, 0, 0, 0)"
          }}
          transition={{ 
            duration: 3,
            ease: [0.25, 0.46, 0.45, 0.94]
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
        
        <motion.div 
          className="h-screen overflow-hidden relative" 
          style={{ 
            background: "linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%)"
          }}
          initial={{ opacity: 1 }}
          animate={isTransitioning ? { 
            opacity: 0
          } : { 
            opacity: 1
          }}
          transition={{ 
            duration: 0.3,
            ease: "easeOut"
          }}
        >
        <div 
          className="h-screen flex items-center justify-center cursor-pointer relative z-20"
          onClick={handleClick}
        >
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.p
              className="text-black text-xl font-medium select-none"
              whileHover={{ 
                scale: 1.1,
                transition: { duration: 0.2, ease: "easeOut" }
              }}
              whileTap={{ 
                scale: 0.9,
                transition: { duration: 0.1 }
              }}
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                y: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              {t('home.click')}
            </motion.p>
          </motion.div>
        </div>
        </motion.div>
    </div>
  )
}
