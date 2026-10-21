interface SkillGroupProps {
  category: string
  items: string[]
}

export function SkillGroup({ category, items }: SkillGroupProps) {
  return (
    <div>
      <h3 className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
        {category}
      </h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-md border border-line px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-accent/40 hover:text-foreground"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
