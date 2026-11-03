// the words on the home page. edit here, not in the components.

export const site = {
  name: 'Paul Yoon',
  role: 'Software Engineer & Researcher',
  place: 'Menlo Park, CA',
  description:
    'Fourth year at Stanford studying Computer Science, Mathematics, and Music. Engineer at Numenor AI.',
}

export type Org = {
  name: string
  url: string
  icon: string
  /** the mark sits on its own white square and wants a hairline edge */
  boxed?: boolean
}

export const orgs = {
  numenor: { name: 'Numenor AI', url: 'https://numenor.ai/', icon: '' },
  sso: { name: 'Stanford Symphony Orchestra', url: 'https://orchestras.stanford.edu/ensembles/sso', icon: '/icons/sso.png' },
  aws: { name: 'Amazon Web Services', url: 'https://aws.amazon.com/sagemaker/hyperpod/', icon: '/icons/aws.png' },
  ashley: { name: 'Stanford Ashley Lab', url: 'https://ashleylab.stanford.edu', icon: '/icons/math.png', boxed: true },
  aimi: { name: 'Stanford AIMI', url: 'https://aimi.stanford.edu', icon: '/icons/aimi.png', boxed: true },
  math: { name: 'Stanford Mathematics', url: 'https://fredraj3.github.io/SemicircleLaw/', icon: '/icons/math.png', boxed: true },
  sundial: { name: 'Sundial', url: 'https://www.axios.com/2026/10/23/meta-ai-data-platform-sundial', icon: '/icons/sundial.png' },
  med: { name: 'Stanford School of Medicine', url: 'https://jnm.snmjournals.org/content/62/supplement_1/143', icon: '/icons/med.png', boxed: true },
} satisfies Record<string, Org>

export const previously: { org: Org; start: string; end: string }[] = [
  { org: orgs.aws, start: 'Jun 2026', end: 'Aug 2026' },
  { org: orgs.ashley, start: 'Jan 2026', end: 'Jun 2026' },
  { org: orgs.aimi, start: 'Sep 2025', end: 'Mar 2026' },
  { org: orgs.math, start: 'Jun 2025', end: 'Aug 2025' },
  { org: orgs.sundial, start: 'Jul 2024', end: 'Sep 2024' },
  { org: orgs.med, start: 'May 2020', end: 'Jun 2023' },
]

export const contact: { label: string; handle: string; href: string }[] = [
  { label: 'github', handle: 'pauly00n', href: 'https://github.com/pauly00n' },
  { label: 'email', handle: 'pauljy@stanford.edu', href: 'mailto:pauljy@stanford.edu' },
  { label: 'linkedin', handle: 'pauljinyoon', href: 'https://linkedin.com/in/pauljinyoon' },
  { label: 'twitter', handle: '@asian1x', href: 'https://x.com/asian1x' },
  { label: 'resume', handle: 'pdf', href: '/resume.pdf' },
]

export const people = {
  clevenger: { name: 'Jesse Clevenger', url: 'https://jesseclevenger.com' },
  beli: { name: '@asians on Beli', url: 'https://beliapp.co/app/asians' },
}
