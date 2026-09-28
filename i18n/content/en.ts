import * as source from "@/data/profile";
import type { ExperienceId } from "@/data/profile";
import { formatExperiencePeriod } from "@/i18n/format-period";
import { projects } from "@/i18n/content/en/projects";
import { services } from "@/i18n/content/en/services";
import type { Content } from "@/i18n/content";
import type { Experience, Profile } from "@/types/content";

// Dates, organisations, technologies and identifiers always come from the same facts.
const experienceCopy = {
  "cnav-data-analyst": {
    "role": "Data Analyst",
    "summary": "Within CNAV’s Data Factory, I work on multi-source data integration and migration between different environments.",
    "interventions": [
      "Translating business rules and adapting processing during migrations.",
      "Developing a process for pseudonymising and reconciling data.",
      "Building a tool to automate public data collection."
    ]
  },
  "apside-ingenieur-etudes": {
    "role": "Software Development Engineer",
    "summary": "At Apside’s Innovation team, I contributed to exploratory projects involving data collection, automation and artificial intelligence.",
    "interventions": [
      "Collecting documents from public procurement platforms and structuring unstructured content.",
      "Using CRM data to automate certain assignment tasks.",
      "Developing a semantic comparison system and a modular architecture to support future changes."
    ]
  },
  "harmonie-mutuelle-data-analyst-2024": {
    "role": "Data Analyst",
    "summary": "Within Harmonie Mutuelle’s BI team, I worked on the reliability of health and personal protection insurance data flows.",
    "interventions": [
      "Evolving integration processes, extracting, transforming and consolidating data from multiple sources.",
      "Checking consistency and reconciling the processed data.",
      "Automating data reconstruction and loading into the BI system."
    ]
  },
  "harmonie-mutuelle-data-analyst-datalab": {
    "role": "Data Analyst",
    "summary": "At Harmonie Mutuelle, I worked within a Datalab on business needs for analysis, reporting and data quality.",
    "interventions": [
      "Analysing, integrating and structuring datasets for business needs.",
      "Identifying and correcting data anomalies.",
      "Creating reports and dashboards, then automating their distribution."
    ]
  },
  "banque-de-france-ingenieur-etudes": {
    "role": "Software Development Engineer",
    "summary": "Within Banque de France’s Artificial Intelligence team, I contributed to bringing a company rating model into operational use for credit risk assessment.",
    "interventions": [
      "Adapting the model to technical constraints and evolving its associated processing.",
      "Preparing and analysing the data needed for the model to function.",
      "Developing a web service to expose the model."
    ]
  },
  "dstny-developpeur-python": {
    "role": "Python Developer",
    "summary": "At Dstny, I worked on centralising, processing and checking data from multiple sources.",
    "interventions": [
      "Exchanging data with databases, automating external information retrieval and generating PDFs.",
      "Checking consistency and setting up alerts for data changes.",
      "Optimising some processes through parallel execution."
    ]
  }
} satisfies Record<ExperienceId, Pick<Experience, "role" | "summary" | "interventions">>;
const experiences = source.experiences.map((experience) => ({
  ...experience, ...experienceCopy[experience.id],
  period: formatExperiencePeriod(experience.startDate, experience.endDate, "en"),
}));
const education = [{ ...source.education[0], degree: "Bachelor’s degree in Computer Science", description: "General computer science education covering software development, databases, algorithms and systems." }];
const workPrinciples = [
  {
    "name": "Scope before building",
    "description": "I start with the business need, available sources and expected outcome to define what will be useful."
  },
  {
    "name": "Build for the long term",
    "description": "I favour processing that is readable, repeatable and straightforward to maintain."
  },
  {
    "name": "Make data understandable",
    "description": "I document processing and present information so teams can understand it and take ownership."
  }
];
const languages = [{ name: "English", description: "Very good reading comprehension, intermediate spoken English." }];
const profile: Profile = {
  ...source.profile,
  role: "Freelance Data & BI Consultant",
  experienceLabel: "Over 6 years of experience",
  summary: "I integrate, validate and automate your data so your teams can put it to practical use.",
  shortSummary: "Freelance Data & BI consultant based in Tours. Data integration, Data Quality, automation and Power BI reporting, with SQL and Python.",
  workModes: ["Remote", "Hybrid", "On site"],
  experiences, education, workPrinciples, languages,
};
export const englishContent: Content = {
  profile, experiences, education, workPrinciples, languages,
  projects, featuredProjects: projects.filter((project) => project.featured),
  services,
};
