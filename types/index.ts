export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
  description?: string;
  icon?: string;
}

export interface Service {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  icon: string;
  features: { title: string; description: string }[];
  useCases?: string[];
  benefits?: string[];
  process?: ProcessStep[];
  category: 'data-collection' | 'data-labeling' | 'data-processing';
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  icon: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin?: string;
  twitter?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: Author;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
  featured?: boolean;
}

export interface Author {
  name: string;
  avatar: string;
  role: string;
  bio?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface CaseStudy {
  title: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  image: string;
  slug: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
  icon?: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon?: string;
}

export interface Industry {
  name: string;
  icon: string;
  description: string;
}

export interface Technology {
  name: string;
  icon: string;
  category: string;
}

export interface OfficeLocation {
  city: string;
  country: string;
  address: string;
  phone: string;
  email: string;
  timezone: string;
}
