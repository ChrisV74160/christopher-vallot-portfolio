export type WorkMode = "À distance" | "Hybride" | "Sur site" | "Remote" | "Hybrid" | "On site";

export interface ProfileContact {
  email: string;
  linkedinUrl: string;
  cvUrl: string;
}

export interface Experience {
  id: string;
  company: string;
  employer: string;
  startDate: string;
  endDate: string | null;
  role: string;
  period: string;
  location: string;
  summary: string;
  interventions: readonly string[];
  technologies: readonly string[];
  caseStudySlug?: string;
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  location: string;
  description: string;
}

export interface WorkPrinciple {
  name: string;
  description: string;
}

export interface Language {
  name: string;
  description: string;
}

export interface Profile {
  firstName: string;
  lastName: string;
  fullName: string;
  role: string;
  experienceLabel: string;
  summary: string;
  shortSummary: string;
  location: string;
  workModes: readonly WorkMode[];
  contact: ProfileContact;
  experiences: readonly Experience[];
  education: readonly Education[];
  languages: readonly Language[];
  workPrinciples: readonly WorkPrinciple[];
}

export type ServiceId = "integration-consolidation" | "data-quality" | "automatisation" | "business-intelligence";

export interface Service {
  id: ServiceId;
  title: string;
  problem: string;
  intervention: string;
  outcome: string;
  technologies: readonly string[];
}

export type ProjectStatus =
  | "Expérience professionnelle"
  | "Projet public"
  | "Projet personnel"
  | "Cas pratique"
  | "Professional experience"
  | "Public project"
  | "Personal project"
  | "Practice case";

export type ProjectVisualVariant =
  | "data-pipeline"
  | "document-automation"
  | "data-quality"
  | "bi-reporting"
  | "ml-model"
  | "python-api";

export interface ProjectCaseStudy {
  slug: string;
  experienceId: string;
  title: string;
  status: ProjectStatus;
  shortSummary: string;
  seoDescription: string;
  context: string;
  problem: string;
  objectives: readonly string[];
  data: readonly string[];
  method: readonly string[];
  intervention: string;
  result: string;
  technologies: readonly string[];
  sector: string;
  featured: boolean;
  visualVariant: ProjectVisualVariant;
}
