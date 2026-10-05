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
    "summary": "Within CNAV’s Data Factory, I work on data integration and the migration of processing from Cloudera to Teradata.",
    "interventions": [
      "Developing PySpark processing on Cloudera and adapting it for Teradata with SQL and Shell, while implementing business rules.",
      "Pseudonymising and reconciling data with Python.",
      "Developing a tool to automate public data collection."
    ]
  },
  "apside-ingenieur-etudes": {
    "role": "Software Development Engineer",
    "summary": "Within Apside’s Innovation team, I developed prototypes for document collection, automation and semantic comparison.",
    "interventions": [
      "Automating document collection from public procurement platforms with Python and Playwright.",
      "Structuring CRM data, automating certain assignment tasks and transforming unstructured content into JSON.",
      "Experimenting with semantic comparison using similarity measures and language models within a modular architecture."
    ]
  },
  "harmonie-mutuelle-data-analyst-2024": {
    "role": "Data Analyst",
    "summary": "Within Harmonie Mutuelle’s BI team, I worked on the integration, automation and reliability of health and protection insurance data flows.",
    "interventions": [
      "Developing and updating SAS processes to integrate, transform and consolidate data from multiple sources.",
      "Implementing consistency checks and data reconciliation with Power BI.",
      "Automating data reconstruction with Python and loading with PowerShell."
    ]
  },
  "harmonie-mutuelle-data-analyst-datalab": {
    "role": "Data Analyst",
    "summary": "Within Harmonie Mutuelle’s Datalab, I prepared business data and created Power BI reports. I also maintained and updated a contract management robot.",
    "interventions": [
      "Analysing, integrating and structuring datasets for reporting.",
      "Identifying and correcting anomalies to improve data quality.",
      "Creating reports and dashboards with Power BI, DAX and Power Query, then automating their delivery with Power Automate."
    ]
  },
  "banque-de-france-ingenieur-etudes": {
    "role": "Software Development Engineer",
    "summary": "Within Banque de France’s Artificial Intelligence team, I contributed to adapting and updating a company rating model used to assess credit risk.",
    "interventions": [
      "Adapting the model to technical constraints and maintaining its associated processing.",
      "Preparing and analysing the data needed by the model.",
      "Developing a web service to expose the model and a prototype to predict property prices per square metre."
    ]
  },
  "dstny-developpeur-python": {
    "role": "Python Developer",
    "summary": "At Dstny, I developed Python solutions to centralise and check data from databases and external APIs.",
    "interventions": [
      "Developing a Python API with automated PDF generation and connections to databases and external APIs.",
      "Creating consistency checks and alerts for data changes.",
      "Optimising selected processes through multithreading."
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
    "description": "I start with business needs and available data to translate requirements into processes, checks and reports."
  },
  {
    "name": "Build for the long term",
    "description": "I prioritise readable code and modular architecture to make maintenance and future changes easier."
  },
  {
    "name": "Make data understandable",
    "description": "I structure data and indicators to produce clear reports that business teams can use."
  }
];
const languages = [{ name: "English", description: "Very good reading comprehension, intermediate spoken English." }];
const profile: Profile = {
  ...source.profile,
  role: "Freelance Data & BI Consultant",
  experienceLabel: "Over 6 years of experience",
  summary: "I integrate and validate your data, automate your processes and build your Power BI reports.",
  shortSummary: "As a freelance Data & BI consultant based in Tours, I help businesses integrate their data, improve its reliability, automate their processes and create clear reports using Power BI, SQL and Python.",
  workModes: ["Remote", "Hybrid", "On site"],
  experiences, education, workPrinciples, languages,
};
export const englishContent: Content = {
  profile, experiences, education, workPrinciples, languages,
  projects, featuredProjects: projects.filter((project) => project.featured),
  services,
};
