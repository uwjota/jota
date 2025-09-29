'use client'

import { useRef, useEffect, useState, useCallback } from "react"
import { motion } from "framer-motion"

interface AnimatedBackgroundProps {
  className?: string
}

export function AnimatedBackground({ className }: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Array<{
    x: number
    y: number
    vx: number
    vy: number
    size: number
    opacity: number
    targetOpacity: number
    pulsePhase: number
    pulseSpeed: number
    originalSize: number
    connectionDistance: number
  }>>([])
  const animationRef = useRef<number | null>(null)
  const [activeSection, setActiveSection] = useState(0)
  const mouseRef = useRef({ x: 0, y: 0 })
  const mouseInfluenceRef = useRef(0)

  const animateToNewSection = useCallback((section: number) => {
    // Configurações diferentes para cada seção
    const sectionConfigs = [
      { speed: 0.3, intensity: 0.8, color: "#ffffff" }, // About
      { speed: 0.6, intensity: 1.2, color: "#60a5fa" }, // Skills
      { speed: 0.8, intensity: 1.5, color: "#f59e0b" }, // Projects
      { speed: 0.4, intensity: 0.6, color: "#10b981" }  // Contact
    ]

    const config = sectionConfigs[section] || sectionConfigs[0]

    // Usar seed determinístico para evitar problemas de hidratação
    const seed = Date.now() % 10000 // Usar timestamp para variar, mas determinístico
    const seededRandom = (index: number) => {
      const x = Math.sin(index * seed) * 10000
      return x - Math.floor(x)
    }

    particlesRef.current.forEach((particle, index) => {
      // Animar velocidade
      particle.vx = (seededRandom(index) - 0.5) * config.speed
      particle.vy = (seededRandom(index + 1000) - 0.5) * config.speed
      
      // Animar opacidade
      particle.targetOpacity = (seededRandom(index + 2000) * 0.6 + 0.3) * config.intensity
      
      // Animar tamanho
      particle.size = seededRandom(index + 3000) * 1.5 + 0.5
    })
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Listener para detectar mudança de seção (apenas se estiver no site)
    const handleScroll = () => {
      // Verificar se estamos na página do site
      if (window.location.pathname === '/site') {
        const scrollPosition = window.scrollY
        const windowHeight = window.innerHeight
        const newSection = Math.floor(scrollPosition / windowHeight)
        if (newSection !== activeSection) {
          setActiveSection(newSection)
          animateToNewSection(newSection)
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    // Listener de mouse para interação
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
      mouseInfluenceRef.current = 1
    }
    
    const onMouseLeave = () => {
      mouseInfluenceRef.current = 0
    }
    
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mouseleave', onMouseLeave, { passive: true })

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
      
      // Criar partículas
      particlesRef.current = []
      const particleCount = Math.floor((canvas.width * canvas.height) / 8000)
      
      for (let i = 0; i < particleCount; i++) {
        const baseSize = Math.random() * 1.5 + 0.5
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: baseSize,
          originalSize: baseSize,
          opacity: Math.random() * 0.6 + 0.3,
          targetOpacity: Math.random() * 0.6 + 0.3,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.02 + 0.01,
          connectionDistance: Math.random() * 100 + 50
        })
      }
    }


    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Fundo com gradiente animado
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, 
        canvas.height / 2, 
        0,
        canvas.width / 2, 
        canvas.height / 2, 
        Math.max(canvas.width, canvas.height)
      )
      
      const time = Date.now() * 0.0001
      const colorIntensity = 0.1 + Math.sin(time) * 0.05
      
      gradient.addColorStop(0, `rgba(0, 0, 0, ${0.8 + colorIntensity})`)
      gradient.addColorStop(0.5, `rgba(0, 0, 0, ${0.6 + colorIntensity})`)
      gradient.addColorStop(1, `rgba(0, 0, 0, ${0.4 + colorIntensity})`)
      
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Decair influência do mouse
      mouseInfluenceRef.current *= 0.95
      

      // Atualizar e desenhar partículas
      particlesRef.current.forEach((particle) => {
        // Interação com o mouse
        const dx = mouseRef.current.x - particle.x
        const dy = mouseRef.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const mouseForce = mouseInfluenceRef.current * (1 - Math.min(distance / 120, 1))
        
        // Atualizar pulso com intensificação do mouse
        particle.pulsePhase += particle.pulseSpeed
        const basePulseEffect = Math.sin(particle.pulsePhase) * 0.4 + 1
        const mousePulseBoost = mouseForce * 0.5 + 1
        particle.size = particle.originalSize * basePulseEffect * mousePulseBoost
        
        // Movimento com influência do mouse mais suave
        particle.x += particle.vx + (dx / distance) * mouseForce * 0.3
        particle.y += particle.vy + (dy / distance) * mouseForce * 0.3
        
        // Interpolar opacidade com intensificação do mouse
        const baseOpacity = particle.targetOpacity
        const mouseOpacityBoost = mouseForce * 0.3 + 1
        const targetOpacity = baseOpacity * mouseOpacityBoost
        particle.opacity += (targetOpacity - particle.opacity) * 0.02
        
        // Wrap around edges com suavidade
        if (particle.x < -10) particle.x = canvas.width + 10
        if (particle.x > canvas.width + 10) particle.x = -10
        if (particle.y < -10) particle.y = canvas.height + 10
        if (particle.y > canvas.height + 10) particle.y = -10
        
        // Cor baseada na seção ativa
        const sectionColors = ["#ffffff", "#60a5fa", "#f59e0b", "#10b981"]
        const currentColor = sectionColors[activeSection] || "#ffffff"
        
        // Draw particle com preenchimento sólido
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = currentColor
        ctx.globalAlpha = particle.opacity
        ctx.fill()
      })
      
      ctx.globalAlpha = 1
      animationRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    animate()
    window.addEventListener("resize", resizeCanvas)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [activeSection, animateToNewSection]) // Dependências corretas

  return (
    <motion.canvas 
      ref={canvasRef} 
      className={`w-full h-full transition-all duration-1000 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  )
}
