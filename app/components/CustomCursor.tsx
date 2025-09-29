'use client'

import { useEffect, useState } from 'react'

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    // Detectar se é dispositivo touch (mais robusto)
    const checkTouchDevice = () => {
      const isTouch = 
        'ontouchstart' in window || 
        navigator.maxTouchPoints > 0 || 
        window.matchMedia('(pointer: coarse)').matches ||
        /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      
      setIsTouchDevice(isTouch)
      return isTouch
    }

    const touchDevice = checkTouchDevice()

    // Se for dispositivo touch, não adicionar event listeners
    if (touchDevice) return

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    // Adicionar event listeners para elementos clicáveis
    const clickableElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select')
    
    clickableElements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter)
      element.addEventListener('mouseleave', handleMouseLeave)
    })

    window.addEventListener('mousemove', updateMousePosition)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      clickableElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter)
        element.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [isTouchDevice])

  // Não renderizar cursor em dispositivos touch
  if (isTouchDevice) return null

  return (
    <>
      {/* Cursor principal */}
      <div
        className={`custom-cursor ${isHovering ? 'cursor-hover' : ''}`}
        style={{
          transform: `translate(${mousePosition.x - 25}px, ${mousePosition.y - 25}px)`,
        }}
      />
    </>
  )
}
