interface SectionHeadingProps {
  title: string
  subtitle?: string
}

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-12">
      <div className="mb-4 flex items-center gap-3">
        <span className="h-px w-8 bg-accent" aria-hidden="true" />
        <span className="h-2 w-2 rounded-full bg-node ring-2 ring-line" aria-hidden="true" />
        <span className="h-px flex-1 max-w-24 bg-line" aria-hidden="true" />
      </div>
      <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">{title}</h2>
      {subtitle && <p className="mt-2 text-muted-foreground">{subtitle}</p>}
    </div>
  )
}
