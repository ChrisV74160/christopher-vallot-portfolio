import { projects as source, type ProjectSlug } from "@/data/projects";
import type { ProjectCaseStudy } from "@/types/content";

const copy = {
  "developpement-api-python-automatisation": {
    "title": "Python API, checks and automation",
    "shortSummary": "Centralising data, generating PDFs and detecting data changes through checks and alerts.",
    "seoDescription": "At Dstny: Python API, PDF generation, database and external API integration, consistency checks, alerts and multithreading.",
    "context": "From November 2018 to March 2019, I developed Python solutions at Dstny in Saint-Avertin to centralise, process and check data from multiple sources.",
    "problem": "The application needed to retrieve information from databases and external APIs, generate PDF documents and flag data changes.",
    "objectives": [
      "Develop a Python API and automate PDF generation.",
      "Implement exchanges with databases and external APIs.",
      "Check data consistency and flag changes.",
      "Optimise selected processes through multithreading."
    ],
    "data": [
      "Data from databases",
      "Information retrieved from external APIs",
      "Data used to generate PDF documents"
    ],
    "method": [
      "Developing a Python API with automated PDF generation.",
      "Connecting the application to databases and automating information retrieval from external APIs.",
      "Implementing consistency checks and alerts for data changes.",
      "Optimising selected processes through multithreading."
    ],
    "intervention": "I developed the API, data-source integrations, PDF generation, checks and alerts. Selected processes were optimised through multithreading.",
    "result": "A Python API with automated PDF generation, connections to databases and external APIs, consistency checks and an alert system.",
    "sector": "Python development and automation",
  },
  "migration-integration-donnees": {
    "title": "Migrating processing from Cloudera to Teradata",
    "shortSummary": "Adapting PySpark processing for Teradata and integrating data from multiple sources.",
    "seoDescription": "CNAV assignment through Apside: PySpark on Cloudera, migration to Teradata with SQL and Shell, pseudonymisation and reconciliation with Python.",
    "context": "Since July 2025, I have worked through Apside within CNAV’s Data Factory on data processing, integration and migration.",
    "problem": "Migrating from Cloudera to Teradata requires adapting processes to the target environment while implementing business rules.",
    "objectives": [
      "Develop PySpark processing on Cloudera.",
      "Adapt processing for Teradata with SQL and Shell.",
      "Integrate data from multiple sources and develop reconciliation processes with Python."
    ],
    "data": [
      "Business data from multiple sources",
      "Data to pseudonymise and reconcile",
      "Public data collected automatically"
    ],
    "method": [
      "Developing and updating PySpark processing on Cloudera.",
      "Translating business rules and adapting processing for Teradata with SQL and Shell.",
      "Developing a Python process for data pseudonymisation and reconciliation."
    ],
    "intervention": "I translate business rules into integration and migration processes. My work also includes a pseudonymisation and reconciliation process, and a tool for automated public data collection.",
    "result": "The assignment is ongoing. Work to date covers PySpark updates, adaptation for Teradata and Python tools for data pseudonymisation, reconciliation and collection.",
    "sector": "Data integration and migration",
  },
  "automatisation-collecte-donnees": {
    "title": "Document collection and semantic comparison prototypes",
    "shortSummary": "Automating document collection, structuring content as JSON and experimenting with semantic comparison.",
    "seoDescription": "Within Apside’s Innovation team: prototypes for document collection, CRM data structuring and semantic comparison with Python, Playwright and LLaMA.",
    "context": "From April to June 2025, I worked within Apside’s Innovation team on several prototypes involving collection, automation and artificial intelligence.",
    "problem": "The work addressed several needs: retrieving documents from public procurement platforms, structuring CRM data and experimenting with semantic content comparison.",
    "objectives": [
      "Automate public procurement document collection.",
      "Structure CRM data to automate certain assignment tasks.",
      "Transform unstructured content into JSON.",
      "Experiment with semantic comparison using similarity measures and language models."
    ],
    "data": [
      "Documents from public procurement platforms",
      "CRM data",
      "Unstructured content to transform into JSON"
    ],
    "method": [
      "Automating document retrieval with Python and Playwright.",
      "Structuring CRM data and converting content into JSON.",
      "Combining similarity measures and language models, including LLaMA, to compare content.",
      "Organising the code in a modular architecture to support future changes."
    ],
    "intervention": "I developed prototypes across these topics, working on collection, content transformation and comparison. The modular architecture was designed to make code maintenance and future changes easier.",
    "result": "Prototypes for automated collection, data structuring and semantic comparison. This exploratory work combined Python, Playwright, JSON and language models.",
    "sector": "Automation and data collection",
  },
  "integration-fiabilisation-flux-metier": {
    "title": "Automation and reliability of BI data flows",
    "shortSummary": "Integrating health and protection insurance data flows, automating processing and checking consistency.",
    "seoDescription": "Harmonie Mutuelle assignment through Apside: SAS integration, Python data reconstruction, PowerShell loading and Power BI checks.",
    "context": "From February 2024 to March 2025, I worked through Apside within Harmonie Mutuelle’s BI team on health and protection insurance data flows.",
    "problem": "The challenge was to consolidate data from multiple sources and check its consistency to feed the BI system.",
    "objectives": [
      "Develop and update integration processes.",
      "Extract, transform and consolidate data.",
      "Check data consistency and reconcile sources.",
      "Automate data reconstruction and loading."
    ],
    "data": [
      "Health and protection insurance data flows",
      "Data from multiple sources",
      "Data to consolidate, reconcile and reconstruct"
    ],
    "method": [
      "Developing integration and consolidation processes in SAS.",
      "Automating data reconstruction with Python.",
      "Automating integration and loading with PowerShell.",
      "Implementing consistency checks and reconciliation with Power BI."
    ],
    "intervention": "I contributed across the data flows: extraction, transformation, consolidation, reconstruction and loading. Power BI checks and reconciliation complemented these processes to address data reliability.",
    "result": "Developed and maintained SAS processes, automated reconstruction with Python, automated loading with PowerShell and consistency checks with Power BI.",
    "sector": "BI data flows",
  },
  "reporting-power-bi-datalab": {
    "title": "Power BI reports and automated delivery",
    "shortSummary": "Preparing and validating business data, creating Power BI reports and automating their delivery.",
    "seoDescription": "Harmonie Mutuelle Datalab assignment through Apside: data quality, Power BI reports with DAX and Power Query, delivery with Power Automate.",
    "context": "From March 2022 to July 2023, I worked through Apside within Harmonie Mutuelle’s Datalab on analysis, reporting and data quality.",
    "problem": "Business needs called for structured datasets, resolved anomalies and reports whose delivery could be automated.",
    "objectives": [
      "Integrate business data into a Datalab.",
      "Create datasets and improve their reliability.",
      "Design Power BI reports and dashboards.",
      "Automate report delivery."
    ],
    "data": [
      "Business data integrated into the Datalab",
      "Datasets for analysis and reporting",
      "Indicators presented in Power BI reports"
    ],
    "method": [
      "Preparing and integrating data in the Datalab.",
      "Structuring datasets, identifying and correcting anomalies.",
      "Creating reports and dashboards with Power BI, DAX and Power Query.",
      "Automating report delivery with Power Automate."
    ],
    "intervention": "I worked from data preparation to Power BI reporting, correcting anomalies and automating report delivery. The assignment also included maintaining and updating a contract management robot.",
    "result": "Structured datasets, corrected anomalies, Power BI reports and dashboards, with automated delivery through Power Automate.",
    "sector": "Datalab and reporting",
  },
  "industrialisation-modele-cotation": {
    "title": "Adapting a company rating model",
    "shortSummary": "Adapting a rating model to technical constraints and exposing it through a web service.",
    "seoDescription": "Banque de France assignment through Apside: adapting a company rating model, preparing data and developing a web service.",
    "context": "From November 2019 to June 2021, I contributed through Apside to adapting and updating a company rating model within Banque de France’s Artificial Intelligence team.",
    "problem": "The model, used to assess credit risk, needed to be adapted to the target technical environment and exposed through a web service.",
    "objectives": [
      "Adapt the model to technical constraints.",
      "Update the associated processing and prepare the data.",
      "Make the model accessible through a web service."
    ],
    "data": [
      "Company data used for rating",
      "Data needed to run the model"
    ],
    "method": [
      "Adapting the model and maintaining its associated processing.",
      "Preparing and analysing the data needed by the model.",
      "Developing a web service to expose the model."
    ],
    "intervention": "I contributed to adapting the model, updating its processing and exposing it through a web service. During this assignment, I also developed a prototype to predict property prices per square metre.",
    "result": "A contribution to adapting the rating model, maintained processing and a web service developed to expose the model.",
    "sector": "Credit risk",
  }
} satisfies Record<ProjectSlug, Pick<ProjectCaseStudy,
  "title" | "shortSummary" | "seoDescription" | "context" | "problem" |
  "objectives" | "data" | "method" | "intervention" | "result" | "sector"
>>;
/** Slugs, source experience, technologies and featured selection are shared with French. */
export const projects: readonly ProjectCaseStudy[] = source.map((project) => ({
  ...project, ...copy[project.slug], status: "Professional experience",
}));
