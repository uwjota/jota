'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    // Scroll para o topo sempre que a rota mudar
    window.scrollTo(0, 0)
    
    // Também scrollar o container principal se existir
    const mainContainer = document.querySelector('.h-full.overflow-y-auto')
    if (mainContainer) {
      mainContainer.scrollTo(0, 0)
    }
  }, [pathname])

  useEffect(() => {
    // Scroll para o topo quando a página carregar
    window.scrollTo(0, 0)
    
    // Aguardar um pouco para garantir que o DOM esteja pronto
    const timer = setTimeout(() => {
      const mainContainer = document.querySelector('.h-full.overflow-y-auto')
      if (mainContainer) {
        mainContainer.scrollTo(0, 0)
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return null
}
