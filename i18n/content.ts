import * as profileData from "@/data/profile";
import { projects } from "@/data/projects";
import { faqItems } from "@/data/faq";
import { services, interventionCases, missionFormats } from "@/data/services";
import type { Locale } from "@/i18n/config";
import type { Profile, ProjectCaseStudy, Experience, Education, Language, SkillGroup, SoftSkill, FaqItem, Service, InterventionCase, MissionFormat } from "@/types/content";
import { englishContent } from "@/i18n/content/en";

export type LocalizedProfile = Profile;
export type LocalizedProjectCaseStudy = ProjectCaseStudy;

export interface Content {
  profile: LocalizedProfile;
  experiences: readonly Experience[];
  education: readonly Education[];
  languages: readonly Language[];
  skillGroups: readonly SkillGroup[];
  softSkills: readonly SoftSkill[];
  projects: readonly LocalizedProjectCaseStudy[];
  featuredProjects: readonly LocalizedProjectCaseStudy[];
  faqItems: readonly FaqItem[];
  services: readonly Service[];
  interventionCases: readonly InterventionCase[];
  missionFormats: readonly MissionFormat[];
}

/** French content remains the original source of truth, without copied strings. */
const frenchContent: Content = {
  ...profileData,
  projects,
  featuredProjects: projects.filter((project) => project.featured),
  faqItems,
  services,
  interventionCases,
  missionFormats,
};

const contentByLocale: Record<Locale, Content> = { fr: frenchContent, en: englishContent };

export function getContent(locale: Locale): Content {
  return contentByLocale[locale];
}

export function getLocalizedProjectBySlug(locale: Locale, slug: string) {
  return getContent(locale).projects.find((project) => project.slug === slug);
}
