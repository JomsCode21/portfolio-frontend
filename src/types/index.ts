export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
export interface Settings {
  name: string;
  title: string;
  tagline: string;
  aboutHeading: string;
  bio: string;
  focus: string;
  approach: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  resumeUrl: string;
  heroImageUrl: string;
  profileImage: string;
  availableForWork: boolean;
  footerText: string;
  socialLinks?: { label: string; url: string }[];
}
export interface Project {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  longDescription?: string;
  image?: string;
  screenshots?: string[];
  technologies?: string[];
  features?: string[];
  githubUrl?: string;
  githubBackendUrl?: string;
  liveUrl?: string;
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}
export interface Skill {
  _id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'Tools' | 'Other';
  icon?: string;
  order: number;
}
export interface Experience {
  _id: string;
  jobTitle: string;
  company: string;
  employmentType: string;
  startDate: string;
  endDate?: string | null;
  description?: string;
  responsibilities?: string[];
  technologies?: string[];
  order: number;
}
export interface Education {
  _id: string;
  degree: string;
  program?: string;
  school: string;
  startYear: number;
  endYear?: number;
  description?: string;
  achievements?: string[];
  order: number;
}
export interface Certification {
  _id: string;
  title: string;
  organization: string;
  date: string;
  credentialUrl?: string;
  image?: string;
  order: number;
}
export interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin';
}
