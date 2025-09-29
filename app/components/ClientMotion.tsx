'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode } from 'react'

interface ClientMotionProps {
  children: ReactNode
  [key: string]: unknown
}

export function ClientMotion({ children, ...props }: ClientMotionProps) {
  return <motion.div {...props}>{children}</motion.div>
}

export { AnimatePresence }
