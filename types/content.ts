export type WorkMode = "À distance" | "Hybride" | "Sur site" | "Remote" | "Hybrid" | "On site";

export interface ProfileContact {
  email: string;
  linkedinUrl: string;
  cvUrl: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  highlights: readonly string[];
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

export interface SkillGroup {
  title: string;
  skills: readonly string[];
}

export interface SoftSkill {
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
  headline: string;
  summary: string;
  shortSummary: string;
  location: string;
  workModes: readonly WorkMode[];
  contact: ProfileContact;
  experiences: readonly Experience[];
  education: readonly Education[];
  languages: readonly Language[];
  skillGroups: readonly SkillGroup[];
  softSkills: readonly SoftSkill[];
}

export type ServiceId =
  | "business-intelligence"
  | "analyse-donnees"
  | "data-quality"
  | "automatisation"
  | "integration-consolidation";

export interface Service {
  id: ServiceId;
  title: string;
  problem: string;
  intervention: string;
  deliverables: readonly string[];
}

export interface InterventionCase {
  id: string;
  title: string;
  description: string;
}

export interface MissionFormat {
  id: string;
  title: string;
  description: string;
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
  | "ml-model";

export interface ProjectHeroMeta {
  label: string;
  value: string;
}

export interface ProjectDataGroup {
  label: string;
  items: readonly string[];
}

export interface ProjectResultHighlight {
  title: string;
  description: string;
}

export interface ProjectDiagramStage {
  label: string;
  detail?: string;
}

export interface ProjectDiagram {
  label: string;
  stages: readonly ProjectDiagramStage[];
  note?: string;
}

export interface ProjectCaseStudy {
  slug: string;
  title: string;
  status: ProjectStatus;
  shortSummary: string;
  seoDescription: string;
  heroMeta: readonly ProjectHeroMeta[];
  context: string;
  problem: string;
  objectives: readonly string[];
  data: readonly string[];
  dataGroups?: readonly ProjectDataGroup[];
  method: readonly string[];
  intervention: string;
  result: string;
  resultHighlights?: readonly ProjectResultHighlight[];
  technologies: readonly string[];
  sector: string;
  featured: boolean;
  visualVariant: ProjectVisualVariant;
  diagram: ProjectDiagram;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}
