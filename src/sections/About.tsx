import { portfolio } from '../data/portfolio'
import { SectionHeading } from '../components/SectionHeading'
import { SectionWrapper } from '../components/SectionWrapper'

export function About() {
  return (
    <SectionWrapper id="about">
      <SectionHeading title="About" subtitle="A bit about who I am" />
      <div className="flex flex-col gap-8 md:flex-row md:items-start">
        <div
          className="flex h-32 w-32 shrink-0 items-center justify-center rounded-lg border border-line bg-surface/50"
          aria-hidden="true"
        >
          <div className="relative">
            <span className="absolute -left-3 top-1/2 h-px w-6 bg-line" />
            <span className="block h-16 w-16 rounded-full border-2 border-line bg-node/20" />
            <span className="absolute -right-3 top-1/2 h-px w-6 bg-line" />
          </div>
        </div>
        <p className="leading-relaxed text-muted-foreground">{portfolio.bio}</p>
      </div>
    </SectionWrapper>
  )
}
