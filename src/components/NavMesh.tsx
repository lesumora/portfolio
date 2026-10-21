import { Menu } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { ThemeToggle } from '@/components/ThemeToggle'
import { NAV_ITEMS, type SectionId } from '@/data/portfolio'
import { useActiveSection } from '@/hooks/useActiveSection'
import { cn, scrollToSection } from '@/lib/utils'

function NavLink({
  label,
  isActive,
  onClick,
  layout = 'horizontal',
}: {
  label: string
  isActive: boolean
  onClick: () => void
  layout?: 'horizontal' | 'vertical'
}) {
  const reducedMotion = useReducedMotion()

  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'relative flex items-center gap-2 rounded-md text-sm font-medium transition-colors',
        layout === 'horizontal' ? 'px-3 py-1.5' : 'w-full px-3 py-2.5 text-left',
        isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
      )}
    >
      <span
        className={cn(
          'size-1.5 shrink-0 rounded-full transition-colors',
          isActive ? 'bg-primary ring-2 ring-primary/25' : 'bg-node',
        )}
        aria-hidden="true"
      />
      {label}
      {isActive && layout === 'horizontal' && !reducedMotion && (
        <motion.span
          layoutId="nav-active"
          className="absolute inset-x-1 -bottom-0.5 h-px bg-primary"
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          aria-hidden="true"
        />
      )}
    </button>
  )
}

export function NavMesh() {
  const activeSection = useActiveSection()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleNav = (id: SectionId) => {
    scrollToSection(id)
    setMobileOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 md:px-6">
      <div
        className="mx-auto flex max-w-5xl items-center justify-between gap-4 rounded-2xl border border-border bg-surface/90 px-4 py-2.5 shadow-sm backdrop-blur-md"
        aria-label="Site header"
      >
        <button
          type="button"
          onClick={() => handleNav('hero')}
          className="flex items-center gap-2 rounded-lg px-2 py-1 text-sm font-semibold text-foreground transition-colors hover:text-primary"
        >
          <span className="relative flex size-2.5 items-center justify-center" aria-hidden="true">
            <span className="absolute size-full rounded-full bg-primary/20" />
            <span className="size-1.5 rounded-full bg-primary" />
          </span>
          Portfolio
        </button>

        <nav className="hidden items-center lg:flex" aria-label="Main navigation">
          <div className="flex items-center rounded-xl border border-border/60 bg-background/50 px-1 py-0.5">
            {NAV_ITEMS.map((item, index) => (
              <div key={item.id} className="flex items-center">
                <NavLink
                  label={item.label}
                  isActive={activeSection === item.id}
                  onClick={() => handleNav(item.id)}
                />
                {index < NAV_ITEMS.length - 1 && (
                  <Separator orientation="vertical" className="mx-0.5 h-4 bg-line" />
                )}
              </div>
            ))}
          </div>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              render={
                <Button variant="outline" size="icon-sm" className="lg:hidden" aria-label="Open menu" />
              }
            >
              <Menu />
            </SheetTrigger>
            <SheetContent side="right" className="w-72 border-border bg-popover">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
                  Navigate
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4" aria-label="Mobile navigation">
                {NAV_ITEMS.map((item) => (
                  <NavLink
                    label={item.label}
                    isActive={activeSection === item.id}
                    onClick={() => handleNav(item.id)}
                    layout="vertical"
                  />
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
