import { motion, useReducedMotion } from 'framer-motion'
import { Button, buttonVariants } from '@/components/ui/button'
import { portfolio } from '@/data/portfolio'
import { cn, scrollToSection } from '@/lib/utils'

export function Hero() {
  const reducedMotion = useReducedMotion()

  return (
    <motion.section
      id="hero"
      className="relative flex min-h-[100svh] snap-start scroll-mt-28 flex-col items-start justify-center px-6 py-24 md:px-12 lg:px-24"
      initial={reducedMotion ? false : { opacity: 0, scale: 0.96, y: 28 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: false, amount: 0.45 }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
    >
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-6 flex items-center gap-3">
          <span className="h-px w-12 bg-line" aria-hidden="true" />
          <span className="size-2 rounded-full bg-primary ring-4 ring-accent-glow" aria-hidden="true" />
          <span className="h-px w-24 bg-line" aria-hidden="true" />
        </div>
        <p className="font-mono text-sm text-primary">{portfolio.role}</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
          {portfolio.name}
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground">{portfolio.tagline}</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button size="lg" onClick={() => scrollToSection('projects')}>
            View Work
          </Button>
          <a
            href="/resume.pdf"
            download
            className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
          >
            Download Resume
          </a>
        </div>
      </div>
    </motion.section>
  )
}
