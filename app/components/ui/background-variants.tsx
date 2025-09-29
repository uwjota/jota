'use client'

import { useRef, useEffect } from "react"
import { AnimatedBackground } from './animated-background'

// Tipos de background disponíveis
export type BackgroundType = 
  | "particles" 
  | "squares" // mantém o original

interface BackgroundProps {
  type: BackgroundType
  className?: string
  speed?: number
  color?: string
  secondaryColor?: string
  backgroundColor?: string
}

// Componente de Partículas Flutuantes com Transição Suave
function ParticlesBackground({ speed = 1, color = "#ffffff", backgroundColor = "#000000", className }: Omit<BackgroundProps, 'type'> & { backgroundColor?: string }) {
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
    connectionDistance: number
    originalSize: number
  }>>([])
  const animationRef = useRef<number | null>(null)
  // Influência do scroll: quando rolar para baixo, partículas sobem (e vice-versa)
  const lastScrollRef = useRef<number | null>(null)
  const scrollInfluenceRef = useRef(0)
  const mouseRef = useRef({ x: 0, y: 0 })
  const mouseInfluenceRef = useRef(0)
  
  // Estados para transição suave
  const currentColorRef = useRef(color)
  const currentBgColorRef = useRef(backgroundColor)
  const targetColorRef = useRef(color)
  const targetBgColorRef = useRef(backgroundColor)
  const transitionProgressRef = useRef(0)
  const isTransitioningRef = useRef(false)

  // Função para converter hex para RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 255, g: 255, b: 255 }
  }

  useEffect(() => {
    // Iniciar transição quando as cores mudarem
    if (color !== targetColorRef.current || backgroundColor !== targetBgColorRef.current) {
      targetColorRef.current = color
      targetBgColorRef.current = backgroundColor
      transitionProgressRef.current = 0
      isTransitioningRef.current = true
    }
  }, [color, backgroundColor])

  useEffect(() => {
    // Função para interpolar entre duas cores (dentro do useEffect onde é usada)
    const interpolateColor = (color1: string, color2: string, progress: number) => {
      const rgb1 = hexToRgb(color1)
      const rgb2 = hexToRgb(color2)
      
      const r = Math.round(rgb1.r + (rgb2.r - rgb1.r) * progress)
      const g = Math.round(rgb1.g + (rgb2.g - rgb1.g) * progress)
      const b = Math.round(rgb1.b + (rgb2.b - rgb1.b) * progress)
      
      return `rgb(${r}, ${g}, ${b})`
    }

    // Verificar se o dispositivo tem baixa performance
    const isLowEndDevice = () => {
      return navigator.hardwareConcurrency <= 2 || 
             /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    }

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Listener de scroll (container interno da LandingPage ou window)
    const internalContainer = document.querySelector('.h-full.overflow-y-auto') as HTMLElement | null
    const getScrollTop = () => internalContainer ? internalContainer.scrollTop : window.scrollY
    const onScroll = () => {
      const curr = getScrollTop()
      const last = lastScrollRef.current ?? curr
      const delta = curr - last
      lastScrollRef.current = curr
      // Scroll para baixo (delta>0) => influência negativa (partículas sobem)
      scrollInfluenceRef.current += -delta * 0.03
    }
    if (internalContainer) internalContainer.addEventListener('scroll', onScroll, { passive: true })
    else window.addEventListener('scroll', onScroll, { passive: true })

    // Listener de mouse para interação (throttled para performance)
    let mouseMoveTimeout: NodeJS.Timeout | null = null
    const onMouseMove = (e: MouseEvent) => {
      if (mouseMoveTimeout) return
      
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
      mouseInfluenceRef.current = 1
      
      mouseMoveTimeout = setTimeout(() => {
        mouseMoveTimeout = null
      }, 16) // ~60fps
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
      
      // Criar partículas baseado na performance do dispositivo
      particlesRef.current = []
      const isLowEnd = isLowEndDevice()
      const baseParticleCount = Math.floor((canvas.width * canvas.height) / 8000)
      const particleCount = isLowEnd ? Math.floor(baseParticleCount * 0.3) : baseParticleCount
      
      // Usar seed determinístico para evitar problemas de hidratação
      const seed = 12345
      const seededRandom = (index: number) => {
        const x = Math.sin(index * seed) * 10000
        return x - Math.floor(x)
      }

      for (let i = 0; i < particleCount; i++) {
        const baseSize = seededRandom(i) * (isLowEnd ? 1 : 1.5) + 0.5
        particlesRef.current.push({
          x: seededRandom(i + 1000) * canvas.width,
          y: seededRandom(i + 2000) * canvas.height,
          vx: (seededRandom(i + 3000) - 0.5) * speed * (isLowEnd ? 0.3 : 0.5),
          vy: (seededRandom(i + 4000) - 0.5) * speed * (isLowEnd ? 0.3 : 0.5),
          size: baseSize,
          originalSize: baseSize,
          opacity: seededRandom(i + 5000) * 0.6 + 0.3,
          targetOpacity: seededRandom(i + 6000) * 0.6 + 0.3,
          pulsePhase: seededRandom(i + 7000) * Math.PI * 2,
          pulseSpeed: seededRandom(i + 8000) * 0.02 + 0.01,
          connectionDistance: seededRandom(i + 9000) * 100 + 50
        })
      }
    }

    const animate = () => {
      // Throttling para dispositivos de baixa performance
      const isLowEnd = isLowEndDevice()
      const frameSkip = isLowEnd ? 2 : 1
      let frameCount = 0
      
      const throttledAnimate = () => {
        frameCount++
        if (frameCount % frameSkip !== 0) {
          animationRef.current = requestAnimationFrame(throttledAnimate)
          return
        }
        
        // Atualizar transição
        if (isTransitioningRef.current) {
          transitionProgressRef.current += isLowEnd ? 0.03 : 0.015 // Velocidade da transição mais suave
          
          if (transitionProgressRef.current >= 1) {
            transitionProgressRef.current = 1
            isTransitioningRef.current = false
            currentColorRef.current = targetColorRef.current
            currentBgColorRef.current = targetBgColorRef.current
          } else {
            currentColorRef.current = interpolateColor(
              currentColorRef.current, 
              targetColorRef.current, 
              transitionProgressRef.current
            )
            currentBgColorRef.current = interpolateColor(
              currentBgColorRef.current, 
              targetBgColorRef.current, 
              transitionProgressRef.current
            )
          }
        }

      // Definir cor de fundo com transição
      ctx.fillStyle = currentBgColorRef.current
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Adicionar gradiente sutil para profundidade
      const isLightBackground = currentBgColorRef.current.includes('248') || currentBgColorRef.current.includes('233')
      
      if (isLightBackground) {
        // Gradiente sutil para fundo claro
        const gradient = ctx.createRadialGradient(
          canvas.width / 2, canvas.height / 2, 0,
          canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
        )
        gradient.addColorStop(0, "rgba(248, 249, 250, 0.8)")
        gradient.addColorStop(0.5, "rgba(233, 236, 239, 0.9)")
        gradient.addColorStop(1, "rgba(241, 243, 244, 1)")
        
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }
      
      // Decair influência do scroll para suavidade
      scrollInfluenceRef.current *= 0.9
      
      // Decair influência do mouse
      mouseInfluenceRef.current *= 0.95


      // Atualizar e desenhar partículas
      particlesRef.current.forEach((particle) => {
        // Interação com o mouse
        const dx = mouseRef.current.x - particle.x
        const dy = mouseRef.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const mouseForce = mouseInfluenceRef.current * (1 - Math.min(distance / 150, 1))
        
        // Atualizar posição com movimento mais suave
        particle.x += particle.vx + (dx / distance) * mouseForce * 0.2
        particle.y += particle.vy + scrollInfluenceRef.current + (dy / distance) * mouseForce * 0.2
        
        // Atualizar pulso
        particle.pulsePhase += particle.pulseSpeed
        const pulseEffect = Math.sin(particle.pulsePhase) * 0.3 + 1
        particle.size = particle.originalSize * pulseEffect
        
        // Interpolar opacidade suavemente
        particle.opacity += (particle.targetOpacity - particle.opacity) * 0.02
        
        // Wrap around edges com suavidade
        if (particle.x < -10) particle.x = canvas.width + 10
        if (particle.x > canvas.width + 10) particle.x = -10
        if (particle.y < -10) particle.y = canvas.height + 10
        if (particle.y > canvas.height + 10) particle.y = -10
        
        // Variação de opacidade para profundidade
        const depthOpacity = isLightBackground 
          ? particle.opacity * 0.4 // Mais sutil no fundo claro
          : particle.opacity
        
        // Draw particle com preenchimento sólido
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = currentColorRef.current
        ctx.globalAlpha = depthOpacity
        ctx.fill()
      })
      
        ctx.globalAlpha = 1
        animationRef.current = requestAnimationFrame(throttledAnimate)
      }
      
      // Iniciar animação
      throttledAnimate()
    }

    resizeCanvas()
    animate()
    window.addEventListener("resize", resizeCanvas)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (internalContainer) internalContainer.removeEventListener('scroll', onScroll)
      else window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [speed, color, backgroundColor]) // Removido interpolateColor

  return <canvas ref={canvasRef} className={`w-full h-full transition-opacity duration-500 ${className}`} />
}


// Componente principal que renderiza o background baseado no tipo
export function DynamicBackground({ 
  type, 
  className, 
  speed = 1, 
  color = "#ffffff", 
  backgroundColor = "#000000"
}: BackgroundProps) {
  switch (type) {
    case "particles":
      return <ParticlesBackground speed={speed} color={color} backgroundColor={backgroundColor} className={className} />
    default:
      return <AnimatedBackground className={className} />
  }
}
