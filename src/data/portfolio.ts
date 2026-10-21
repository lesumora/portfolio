export const SECTION_IDS = [
  'hero',
  'about',
  'projects',
  'skills',
  'contact',
  'resume',
] as const

export type SectionId = (typeof SECTION_IDS)[number]

export const NAV_ITEMS: { id: SectionId; label: string }[] = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
]

export const portfolio = {
  name: 'Jaden G. Mimura',
  role: 'Full Stack Developer',
  tagline: 'Building minimal, thoughtful digital experiences.',
  email: 'lesumoracode@gmail.com',
  bio: `I'm a developer passionate about clean architecture, accessible interfaces, and the intersection of design and code. I enjoy turning complex problems into elegant, performant solutions.`,
  social: [
    { label: 'GitHub', href: 'https://github.com/bulsu-mimurajg' },
    { label: 'LinkedIn', href: 'https://linkedin.com/jaden-m-b0a01b375' },
    { label: 'Facebook', href: 'https://facebook.com/lesumora' },
  ],
  projects: [
    {
      title: 'InternConnect',
      description:
        'Web-based Internship Skills Matching System that connects students with internship opportunities based on their skills and interests.',
      tags: ['Laravel','React', 'TypeScript', 'PHP', 'MySQL', 'Tailwind CSS'],
      github: 'https://github.com/bulsu-mimurajg/InternConnect-BulSU',
      demo: null,
    },
    {
      title: 'Bhengs',
      description:
        'Web-based Order Management System for a local restaurant that streamlines the ordering process and improves customer experience.',
      tags: ['PHP', 'HTML', 'CSS', 'JavaScript'],
      github: 'https://github.com/bulsu-mimurajg/IT304-Bhengs',
      demo: null,
    },
  ],
  skills: [
    {
      category: 'Frontend',
      items: ['React', 'TypeScript', 'Tailwind CSS'],
    },
    {
      category: 'Backend',
      items: ['PHP', 'Java', 'Python', 'MySQL', 'REST'],
    },
    {
      category: 'Tools',
      items: ['Git', 'Docker', 'Vite', 'Figma'],
    },
  ],
}
