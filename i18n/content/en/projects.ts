import { projects as source, type ProjectSlug } from "@/data/projects";
import type { ProjectCaseStudy } from "@/types/content";

const copy = {
  "developpement-api-python-automatisation": {
    "title": "Python API development and process automation",
    "shortSummary": "Centralising data, generating PDFs and automating checks and alerts with Python.",
    "seoDescription": "Dstny case study: Python API development, SQL and external API integration, PDF generation, consistency checks and alerts for data changes.",
    "context": "The assignment at Dstny in Saint-Avertin, from November 2018 to March 2019, focused on Python solutions to centralise, process and check data from multiple sources.",
    "problem": "The application needed to exchange information with databases and external APIs, generate documents, check the retrieved data and detect changes.",
    "objectives": [
      "Develop a Python API and automate PDF generation.",
      "Implement exchanges with databases and external APIs.",
      "Check data consistency and flag changes.",
      "Optimise selected processes through multithreading."
    ],
    "data": [
      "Data from databases",
      "Information retrieved from external APIs",
      "Data processed by the application and used in PDF documents"
    ],
    "method": [
      "Developing a Python API supporting automated PDF document generation.",
      "Implementing exchanges between the application and databases, and automating external information retrieval.",
      "Developing consistency checks and an alert system for data changes.",
      "Optimising selected processes through multithreading."
    ],
    "intervention": "The work covered the Python API, data-source integrations and PDF generation. It also included consistency checks, alerts for data changes and optimisation of selected processes through multithreading.",
    "result": "A Python API for processing data from multiple sources and generating PDFs, complemented by consistency checks and alerts when data changes.",
    "sector": "Python development and automation",
  },
  "migration-integration-donnees": {
    "title": "Multi-source data migration and integration",
    "shortSummary": "Migrating and adapting processing from Cloudera to Teradata, and reconciling data from multiple sources.",
    "seoDescription": "Data & BI case study: migrating, integrating and improving multi-source data reliability with Python, PySpark, SQL, Cloudera and Teradata.",
    "context": "The ongoing assignment within a Data Factory involves data processing, integration and migration between Cloudera and Teradata.",
    "problem": "The challenge is to adapt processing to the target environment, implement business rules and reconcile data from multiple sources.",
    "objectives": [
      "Develop PySpark processing on Cloudera.",
      "Adapt processing for Teradata with SQL and Shell.",
      "Integrate and reconcile multi-source data."
    ],
    "data": [
      "Business data from multiple sources",
      "PySpark processing on Cloudera",
      "Data destined for Teradata"
    ],
    "method": [
      "Developing PySpark processing and translating business rules.",
      "Migrating and adapting processing for Teradata with SQL and Shell.",
      "Pseudonymising and reconciling data with Python."
    ],
    "intervention": "The work involves developing and adapting integration processes. A Python process for data pseudonymisation and reconciliation has also been built.",
    "result": "Processing adapted for Teradata and data prepared, integrated and reconciled for business needs. The assignment is ongoing.",
    "sector": "Business intelligence data",
  },
  "automatisation-collecte-donnees": {
    "title": "Automating and structuring heterogeneous data",
    "shortSummary": "Automating collection and structuring heterogeneous content in a consistent, usable format.",
    "seoDescription": "Data & BI case study: automated collection and structuring of heterogeneous data with Python, Playwright, JSON and LLaMA.",
    "context": "The assignment within an Innovation team focused on prototypes to collect and structure data from public procurement platforms and a CRM.",
    "problem": "The process needed to combine automated collection, content transformation and semantic comparison within an extensible architecture.",
    "objectives": [
      "Automate data collection.",
      "Structure the information collected.",
      "Structure unstructured content as JSON.",
      "Compare the collected data semantically."
    ],
    "data": [
      "CRM data",
      "Unstructured content",
      "Data collected from the web",
      "Data structured as JSON"
    ],
    "method": [
      "Automating collection with Python and Playwright.",
      "Structuring data from heterogeneous sources.",
      "Structuring content as JSON.",
      "Designing a semantic comparison system based on a large language model (LLM)."
    ],
    "intervention": "Document retrieval was automated with Python and Playwright. Content was structured as JSON, and a semantic comparison system was developed using large language models (LLMs).",
    "result": "Prototypes that automate collection, structure content into JSON and support semantic comparison within a modular architecture.",
    "sector": "Automation and data collection",
  },
  "integration-fiabilisation-flux-metier": {
    "title": "Automating and improving the reliability of BI data flows",
    "shortSummary": "Automating, consolidating and checking business data flows before they are used for decision-making.",
    "seoDescription": "Data & BI case study: automating and improving BI data flow reliability with SAS, Python, SQL, PowerShell and Power BI.",
    "context": "Within a BI team, data from health and personal protection insurance flows needed to be integrated, consolidated and reconciled.",
    "problem": "The variety of data flows and integration processes required consistency checks and reconciliation across sources.",
    "objectives": [
      "Automate integration processes.",
      "Extract, transform and consolidate data.",
      "Check data quality and reconcile data across sources.",
      "Improve the reliability of extraction and loading for BI data flows."
    ],
    "data": [
      "Business data flows",
      "Data extracted from multiple sources",
      "Consolidated and reconstructed data",
      "Check and reconciliation results"
    ],
    "method": [
      "Developing integration processes in SAS.",
      "Automating with Python and PowerShell.",
      "Checking data quality and reconciling data with Power BI.",
      "Consolidating and reconstructing data."
    ],
    "intervention": "The work combined SAS processing, automated data reconstruction with Python and integration with PowerShell. Consistency checks and reconciliation were then implemented with Power BI.",
    "result": "More repeatable integration processes, with consolidated and checked data ready to be loaded into the BI system.",
    "sector": "BI data flows",
  },
  "reporting-power-bi-datalab": {
    "title": "Power BI reporting and process automation",
    "shortSummary": "Preparing data and automating the delivery of Power BI reports.",
    "seoDescription": "Data & BI case study: data preparation, Power BI reporting and process automation with DAX, Power Query and Power Automate.",
    "context": "The assignment within a Datalab focused on preparing business data for use in Power BI reports.",
    "problem": "The challenge was to improve data reliability, resolve anomalies and automate report delivery, from data preparation through to reporting.",
    "objectives": [
      "Integrate business data into a Datalab.",
      "Create datasets and improve their reliability.",
      "Design Power BI reports and dashboards.",
      "Automate report delivery and improve reporting processes."
    ],
    "data": [
      "Business data",
      "Datalab datasets",
      "Data anomalies",
      "Reporting indicators"
    ],
    "method": [
      "Preparing and integrating data in the Datalab.",
      "Creating datasets and analysing anomalies.",
      "Designing reports with Power BI, DAX and Power Query.",
      "Automating with Power Automate."
    ],
    "intervention": "Datasets were prepared and structured, and anomalies identified and corrected. Power BI reports were built with DAX and Power Query, and their delivery automated with Power Automate.",
    "result": "Structured, reliable datasets, usable Power BI reports for business teams and automated report delivery.",
    "sector": "Datalab and reporting",
  },
  "industrialisation-modele-cotation": {
    "title": "Adapting a company rating model for operational use",
    "shortSummary": "Adapting a company rating model for credit risk assessment and making it accessible through a web service.",
    "seoDescription": "Data & BI case study: adapting a company rating model for credit risk assessment with Python, Scikit-learn, ONNX and a web service.",
    "context": "Contribution to adapting and developing a company rating model for operational use in credit risk assessment, within an Artificial Intelligence team.",
    "problem": "The model needed to be adapted to the technical environment and made accessible to other components through a web service.",
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
      "Preparing and analysing data with Python, Pandas and NumPy.",
      "Developing a web service giving other components access to the model."
    ],
    "intervention": "The contribution covered model adaptation and development, data preparation and analysis, and the development of the model’s web service.",
    "result": "A model adapted to the technical environment, maintained data processing workflows and a web service giving other components access to the model.",
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
