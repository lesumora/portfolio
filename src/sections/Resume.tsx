import { buttonVariants } from '@/components/ui/button'
import { SectionHeading } from '@/components/SectionHeading'
import { SectionWrapper } from '@/components/SectionWrapper'
import { cn } from '@/lib/utils'

export function Resume() {
  return (
    <SectionWrapper id="resume">
      <SectionHeading title="Resume" subtitle="Download my full CV" />
      <div className="flex flex-col items-start gap-4 rounded-lg border border-border bg-card/50 p-8 backdrop-blur-sm">
        <p className="text-muted-foreground">
          A detailed overview of my experience, education, and skills — available as a PDF.
        </p>
        <a href="/resume.pdf" download className={cn(buttonVariants({ size: 'lg' }))}>
          Download Resume (PDF)
        </a>
      </div>
    </SectionWrapper>
  )
}
