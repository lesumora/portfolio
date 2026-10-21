import { portfolio } from '../data/portfolio'
import { SectionHeading } from '../components/SectionHeading'
import { SectionWrapper } from '../components/SectionWrapper'
import { SkillGroup } from '../components/SkillGroup'

export function Skills() {
  return (
    <SectionWrapper id="skills">
      <SectionHeading title="Skills" subtitle="Technologies I work with" />
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {portfolio.skills.map((group) => (
          <SkillGroup key={group.category} {...group} />
        ))}
      </div>
    </SectionWrapper>
  )
}
