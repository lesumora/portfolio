import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

interface SectionWrapperProps {
  id: string
  children: ReactNode
  className?: string
}

export function SectionWrapper({ id, children, className = '' }: SectionWrapperProps) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.section
      id={id}
      className={`flex min-h-[100svh] snap-start items-center scroll-mt-24 px-6 py-20 md:px-12 lg:px-24 ${className}`}
      initial={reducedMotion ? false : { opacity: 0, scale: 0.96, y: 28 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: false, amount: 0.45 }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
    >
      <div className="mx-auto w-full max-w-4xl">{children}</div>
    </motion.section>
  )
}
