import { portfolio } from '../data/portfolio'

export function Footer() {
  return (
    <footer className="border-t border-line px-6 py-8 md:px-12 lg:px-24">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-2">
          <span className="h-px w-6 bg-line" aria-hidden="true" />
          <span className="h-1.5 w-1.5 rounded-full bg-node" aria-hidden="true" />
          <span className="h-px w-6 bg-line" aria-hidden="true" />
        </div>
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} {portfolio.name}.
        </p>
      </div>
    </footer>
  )
}
