import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  github: string
  demo: string | null
}

export function ProjectCard({ title, description, tags, github, demo }: ProjectCardProps) {
  return (
    <article className="group relative flex h-full flex-col rounded-lg border border-line bg-surface/50 p-6 backdrop-blur-sm transition-colors duration-200 hover:border-accent/40">
      <div
        className="absolute left-0 top-6 h-px w-4 bg-line transition-colors group-hover:bg-accent"
        aria-hidden="true"
      />
      <span
        className="absolute -left-1 top-[22px] h-2 w-2 rounded-full bg-node ring-2 ring-line transition-colors group-hover:bg-accent"
        aria-hidden="true"
      />
      <div className="flex flex-1 flex-col">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded border border-line px-2 py-0.5 font-mono text-xs text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-auto flex flex-wrap gap-3 pt-6 text-sm">
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
          >
            GitHub
          </a>
          {demo && (
            <a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ size: 'sm' }))}
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
