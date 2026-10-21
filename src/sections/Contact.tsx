import { portfolio } from '../data/portfolio'
import { SectionHeading } from '../components/SectionHeading'
import { SectionWrapper } from '../components/SectionWrapper'

export function Contact() {
  return (
    <SectionWrapper id="contact">
      <SectionHeading title="Contact" subtitle="Let's connect" />
      <div className="rounded-lg border border-line bg-surface/50 p-8 backdrop-blur-sm">
        <p className="text-muted-foreground">
          Open to new opportunities and collaborations. Reach out anytime.
        </p>
        <a
          href={`mailto:${portfolio.email}`}
          className="mt-4 inline-flex items-center gap-2 text-lg font-medium text-accent-foreground transition-opacity hover:opacity-80"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent-foreground" aria-hidden="true" />
          {portfolio.email}
        </a>
        <div className="mt-8 flex flex-wrap gap-6">
          {portfolio.social.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
            >
              <span className="h-1 w-1 rounded-full bg-node" aria-hidden="true" />
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
