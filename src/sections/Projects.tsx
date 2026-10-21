import { portfolio } from '../data/portfolio'
import { ProjectCard } from '../components/ProjectCard'
import { SectionHeading } from '../components/SectionHeading'
import { SectionWrapper } from '../components/SectionWrapper'

export function Projects() {
  return (
    <SectionWrapper id="projects">
      <SectionHeading title="Projects" subtitle="Selected work" />
      <div className="grid gap-6 md:grid-cols-2">
        {portfolio.projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </SectionWrapper>
  )
}
