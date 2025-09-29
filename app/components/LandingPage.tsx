'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Section from './Section'
import Layout from './Layout'
import { useSections } from './constants/sections'

/**
 * Página principal do site
 * Gerencia scroll entre seções e navegação
 * Inclui barra de progresso e indicadores de seção
 */
export default function LandingPage() {
  const [activeSection, setActiveSection] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ container: containerRef })
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })
  const sections = useSections()

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Garantir que sempre comece no topo
    container.scrollTo(0, 0)

    const handleScroll = () => {
      const scrollPosition = container.scrollTop
      const vh = window.innerHeight
      const center = scrollPosition + vh / 2
      const newActiveSection = Math.max(0, Math.min(sections.length - 1, Math.round(center / vh - 0.5)))
      setActiveSection(newActiveSection)
    }

    container.addEventListener('scroll', handleScroll, { passive: true })

    const handleResize = () => {
      // Recalcular seção ativa pelo centro e não forçar scroll, apenas se snap quebrar
      handleScroll()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      container.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [sections.length])

  const handleNavClick = (index: number) => {
    containerRef.current?.scrollTo({
      top: index * window.innerHeight,
      behavior: 'smooth'
    })
  }

  return (
    <Layout>
      <nav className="fixed top-0 right-0 h-screen flex flex-col justify-center z-30 p-4">
        {sections.map((section, index) => (
          <motion.button
            key={section.id}
            initial={{ opacity: 0, scale: 0.3, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: index === activeSection ? 1.2 : 1,
              y: 0
            }}
            transition={{ 
              duration: 0.6, 
              delay: 0.2 + index * 0.15,
              ease: "easeOut"
            }}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.4, ease: "easeInOut" }
            }}
            whileTap={{ 
              scale: 0.98,
              transition: { duration: 0.2 }
            }}
            className={`w-3 h-3 rounded-full my-2 transition-colors duration-500 ${
              index === activeSection 
                ? 'bg-white shadow-lg shadow-white/20' 
                : 'bg-neutral-600 hover:bg-neutral-500'
            }`}
            onClick={() => handleNavClick(index)}
          />
        ))}
      </nav>
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-white origin-left z-30 shadow-sm"
        style={{ scaleX }}
      />
      <div 
        ref={containerRef} 
        className="h-full overflow-y-auto snap-y snap-mandatory overscroll-contain touch-pan-y"
      >
        {sections.map((section, index) => (
          <Section
            key={section.id}
            {...section}
            isActive={index === activeSection}
          />
        ))}
      </div>
    </Layout>
  )
}
