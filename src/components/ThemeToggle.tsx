import { Moon, Sun } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/lib/utils'

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <div className="flex items-center gap-2">
      <Sun className={cn('size-3.5 text-muted-foreground', isDark && 'opacity-40')} aria-hidden="true" />
      <Switch
        checked={isDark}
        onCheckedChange={() => toggleTheme()}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      />
      <Moon className={cn('size-3.5 text-muted-foreground', !isDark && 'opacity-40')} aria-hidden="true" />
    </div>
  )
}
