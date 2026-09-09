import * as source from "@/data/profile";
import { projects } from "@/i18n/content/en/projects";
import { services, interventionCases, missionFormats, faqItems } from "@/i18n/content/en/services";
import type { Content } from "@/i18n/content";
import type { Profile } from "@/types/content";

// Stable identifiers, organisations, technology names and links come from the
// French source. Only user-facing prose is translated here.
const experiences = [
  { ...source.experiences[0], period: "Since July 2025", summary: "Migration, preparation, integration and quality assurance of multi-source data.", highlights: [
    "Migrating, preparing and integrating data into Cloudera and Teradata.",
    "Developing and optimising analytical processes in Python, PySpark and SQL.",
    "Implementing Data Quality checks and anomaly detection rules.",
    "Combining, consolidating and improving the reliability of multi-source data for business needs.",
  ] },
  { ...source.experiences[1], role: "Software Development Engineer", period: "April 2025 — July 2025", summary: "Developing solutions for automation, data collection and data structuring.", highlights: [
    "Developing automation and data collection solutions with Python, Playwright and Web Scraping.",
    "Structuring and transforming data from heterogeneous sources, including CRM records and unstructured content, into JSON.",
    "Designing an LLM-based semantic comparison system and a modular, extensible architecture.",
  ] },
  { ...source.experiences[2], period: "February 2024 — March 2025", summary: "Integrating, automating, consolidating and checking business data flows.", highlights: [
    "Developing and automating data integration processes in SAS, Python and PowerShell.",
    "Extracting, transforming, consolidating and reconstructing data from multiple business flows.",
    "Implementing Data Quality checks and data reconciliation with Power BI.",
    "Automating extraction and loading processes to improve the reliability and structure of BI data flows.",
  ] },
  { ...source.experiences[3], period: "March 2022 — July 2023", summary: "Analysing, preparing, integrating and reporting on business data in a Datalab.", highlights: [
    "Analysing, preparing and integrating business data in a Datalab.",
    "Creating datasets, analysing anomalies and improving data reliability.",
    "Designing Power BI reports and dashboards with DAX and Power Query.",
    "Automating reporting and improving processes with Power Automate.",
  ] },
  { ...source.experiences[4], role: "Software Development Engineer", period: "November 2019 — June 2021", summary: "Productionising and developing a company rating model for credit risk assessment.", highlights: [
    "Contributing to the productionisation and development of a company rating model used for credit risk assessment.",
    "Analysing, preparing and modelling data with Python, Pandas, NumPy and Scikit-learn.",
    "Developing tools to access and present model outputs: a web service, visualisation and automated data collection.",
  ] },
];

const education = [{ ...source.education[0], degree: "Bachelor’s degree in Computer Science", description: "General computer science education covering software development, databases, algorithms and systems." }];
const skillGroups = [
  { ...source.skillGroups[0], title: "Analysis & processing" },
  { ...source.skillGroups[1], title: "BI & reporting" },
  { ...source.skillGroups[2], title: "Platforms & quality", skills: ["Cloudera", "Teradata", "Data Quality", "Consolidation", "Anomaly detection"] },
  { ...source.skillGroups[3], title: "Automation & collection" },
  { ...source.skillGroups[4], title: "Modelling & tooling" },
];
const softSkills = [
  { name: "Analytical thinking", description: "Understanding, structuring and solving complex problems." },
  { name: "Attention to detail", description: "Maintaining data quality, consistency and reliability." },
  { name: "Autonomy", description: "Taking ownership of a task from requirements analysis through to delivery." },
  { name: "Adaptability", description: "Working across varied environments, tools and business contexts." },
  { name: "Ability to synthesise", description: "Turning complex data into clear, usable information." },
  { name: "Communication", description: "Communicating effectively with technical and business teams." },
];
const languages = [{ name: "English", description: "Excellent reading and listening comprehension, with intermediate spoken English." }];
const profile: Profile = {
  ...source.profile,
  role: "Freelance Data & BI Consultant",
  headline: "Python • SQL • Power BI • Data Quality • Automation",
  summary: "As a freelance Data & BI consultant, I help businesses improve data reliability, automate processing and build useful reports. I work from source integration and consolidation through to Power BI, with Python, SQL and Data Quality underpinning the process.",
  shortSummary: "Freelance Data & BI consultant based in Tours. I improve data reliability, automate processing and make information usable with Python, SQL and Power BI.",
  workModes: ["Remote", "Hybrid", "On site"],
  experiences, education, skillGroups, softSkills, languages,
};

export const englishContent: Content = {
  profile, experiences, education, skillGroups, softSkills, languages,
  projects, featuredProjects: projects.filter((project) => project.featured),
  services, interventionCases, missionFormats, faqItems,
};
