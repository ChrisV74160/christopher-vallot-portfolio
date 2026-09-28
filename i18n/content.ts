import * as profileData from "@/data/profile";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import type { Locale } from "@/i18n/config";
import type { Profile, ProjectCaseStudy, Experience, Education, Language, WorkPrinciple, Service } from "@/types/content";
import { englishContent } from "@/i18n/content/en";

export interface Content {
  profile: Profile;
  experiences: readonly Experience[];
  education: readonly Education[];
  languages: readonly Language[];
  workPrinciples: readonly WorkPrinciple[];
  projects: readonly ProjectCaseStudy[];
  featuredProjects: readonly ProjectCaseStudy[];
  services: readonly Service[];
}

/** French content remains the original source of truth, without copied strings. */
const frenchContent: Content = {
  profile: profileData.profile,
  experiences: profileData.experiences,
  education: profileData.education,
  languages: profileData.languages,
  workPrinciples: profileData.workPrinciples,
  projects,
  featuredProjects: projects.filter((project) => project.featured),
  services,
};

const contentByLocale: Record<Locale, Content> = { fr: frenchContent, en: englishContent };

export function getContent(locale: Locale): Content {
  return contentByLocale[locale];
}

export function getLocalizedProjectBySlug(locale: Locale, slug: string) {
  return getContent(locale).projects.find((project) => project.slug === slug);
}
