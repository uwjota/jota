'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from './components/ui/button'

// Força renderização dinâmica para evitar problemas com Framer Motion
export const dynamic = 'force-dynamic'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log do erro para monitoramento (apenas em desenvolvimento)
    if (process.env.NODE_ENV === 'development') {
      console.error('Erro capturado:', error)
    }
  }, [error])

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center px-6 max-w-2xl mx-auto">
        {/* Título */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-[5rem] xl:text-[6rem] 2xl:text-[7rem] 3xl:text-[8rem] font-bold leading-[1.1] tracking-tight max-w-4xl 2xl:max-w-6xl mb-8"
        >
          Algo deu errado
        </motion.h1>

        {/* Botões */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            onClick={reset}
            variant="outline"
            size="lg"
            className="group relative text-black !bg-gradient-to-r from-white to-gray-100 border-2 border-gray-300 hover:!bg-gradient-to-r hover:from-gray-100 hover:to-gray-200 hover:border-gray-400 hover:text-black transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-gray-500/25 px-8 py-4 rounded-full font-medium overflow-hidden"
          >
            <span className="relative z-10">Tentar Novamente</span>
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-gray-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-gray-800/30 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
          </Button>

          <Button
            onClick={() => window.location.href = '/'}
            variant="outline"
            size="lg"
            className="group relative text-white bg-gradient-to-r from-black/20 to-gray-800/20 border-2 border-white/30 hover:from-black/40 hover:to-gray-800/40 hover:border-white/50 hover:text-white transition-all duration-500 backdrop-blur-sm shadow-lg hover:shadow-2xl hover:shadow-white/25 px-8 py-4 rounded-full font-medium overflow-hidden"
          >
            <span className="relative z-10">Voltar ao Início</span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-gray-200/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-gray-200/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
