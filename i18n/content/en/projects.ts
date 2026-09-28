import { projects as source } from "@/data/projects";
import type { ProjectCaseStudy } from "@/types/content";

const copy = {
  "developpement-api-python-automatisation": {
    "title": "Python API development and data automation",
    "shortSummary": "Centralising data, generating PDFs and automating checks and alerts with Python.",
    "seoDescription": "Dstny case study: Python API development, SQL and external API integration, PDF generation, consistency checks and alerts for data changes.",
    "context": "At Dstny in Saint-Avertin, from November 2018 to March 2019, I worked on Python solutions to centralise, process and check data from different sources.",
    "problem": "The application needed to exchange information with databases and external APIs, generate documents and check the data retrieved and subsequent changes.",
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
    "intervention": "I developed the Python API, data-source integrations and PDF generation. I also implemented consistency checks and alerts for data changes, and optimised selected processes through multithreading.",
    "result": "A Python API for processing data from multiple sources and generating PDFs, complemented by consistency checks and alerts when data changes.",
    "sector": "Python development and automation",
  },
  "migration-integration-donnees": {
    "title": "Multi-source data migration and integration",
    "shortSummary": "Adapting processing from Cloudera to Teradata and reconciling multi-source data.",
    "seoDescription": "Data & BI case study: migrating, integrating and improving multi-source data reliability with Python, PySpark, SQL, Cloudera and Teradata.",
    "context": "Within a Data Factory, I work on data processing, integration and migration between Cloudera and Teradata.",
    "problem": "Existing processing needs to be adapted to the target environment while translating business rules and bringing multiple sources together.",
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
    "intervention": "I develop and adapt integration processes. I have also built Python processing for data pseudonymisation and reconciliation.",
    "result": "Processing adapted for Teradata and data prepared, integrated and reconciled for business needs. The assignment is ongoing.",
    "sector": "Business intelligence data",
  },
  "automatisation-collecte-donnees": {
    "title": "Automating and structuring heterogeneous data",
    "shortSummary": "Automating collection and turning heterogeneous content into consistent, usable data.",
    "seoDescription": "Data & BI case study: automated collection and structuring of heterogeneous data with Python, Playwright, JSON and LLaMA.",
    "context": "Within an Innovation team, I developed prototypes to collect and structure data from public procurement platforms and a CRM.",
    "problem": "The process needed to combine automated collection, content transformation and semantic comparison within an extensible architecture.",
    "objectives": [
      "Automate data collection.",
      "Structure the information collected.",
      "Transform unstructured content into JSON.",
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
      "Transforming content into JSON.",
      "Designing an LLM-based semantic comparison system."
    ],
    "intervention": "I automated document retrieval with Python and Playwright, structured content into JSON and developed a semantic comparison system using LLMs.",
    "result": "Prototypes that automate collection, structure content into JSON and support semantic comparison within a modular architecture.",
    "sector": "Automation and data collection",
  },
  "integration-fiabilisation-flux-metier": {
    "title": "Automating and improving the reliability of BI data flows",
    "shortSummary": "Automating, consolidating and checking business data flows before they are used for decision-making.",
    "seoDescription": "Data & BI case study: automating and improving BI data flow reliability with SAS, Python, SQL, PowerShell and Power BI.",
    "context": "Within a BI team, data from health and personal protection insurance flows needed to be integrated, consolidated and reconciled.",
    "problem": "The data needed to be reconciled and checked despite the variety of flows and integration processes.",
    "objectives": [
      "Automate integration processes.",
      "Extract, transform and consolidate data.",
      "Check Data Quality and reconcile sources.",
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
      "Checking Data Quality and reconciling data with Power BI.",
      "Consolidating and reconstructing data."
    ],
    "intervention": "I developed SAS processing, automated data reconstruction with Python and integration with PowerShell, and set up consistency checks and reconciliation with Power BI.",
    "result": "More repeatable integration processes, with consolidated and checked data before it is loaded into BI flows.",
    "sector": "BI data flows",
  },
  "reporting-power-bi-datalab": {
    "title": "Power BI reporting and process automation",
    "shortSummary": "Preparing data and automating its presentation in Power BI reports.",
    "seoDescription": "Data & BI case study: data preparation, Power BI reporting and process automation with DAX, Power Query and Power Automate.",
    "context": "Preparing business data for use in a Datalab and in reports.",
    "problem": "Preparation, anomaly analysis, reporting and automation involved several complementary steps.",
    "objectives": [
      "Integrate business data into a Datalab.",
      "Create datasets and improve their reliability.",
      "Design Power BI reports and dashboards.",
      "Automate reporting and improve processes."
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
    "intervention": "I prepared and structured datasets, identified and resolved anomalies, built Power BI reports with DAX and Power Query and automated delivery with Power Automate.",
    "result": "Structured, reliable data combined with Power BI reports that business users can use directly, alongside automated reporting processes.",
    "sector": "Datalab and reporting",
  },
  "industrialisation-modele-cotation": {
    "title": "Productionising a risk analysis model",
    "shortSummary": "Bringing a risk analysis model into production and making its outputs usable.",
    "seoDescription": "Data & BI case study: productionising a risk analysis model with Python, Scikit-learn, ONNX and access through a web service.",
    "context": "Within an Artificial Intelligence team, I contributed to the productionisation and development of a company rating model for credit risk assessment.",
    "problem": "The model needed to be adapted to the technical environment and exposed for use by other components.",
    "objectives": [
      "Adapt the model to technical constraints.",
      "Maintain its processing and prepare the data.",
      "Expose the model through a web service."
    ],
    "data": [
      "Company data used for rating",
      "Data needed to run the model"
    ],
    "method": [
      "Adapting the model and maintaining its associated processing.",
      "Preparing and analysing data with Python, Pandas and NumPy.",
      "Developing a web service to expose the model."
    ],
    "intervention": "I contributed to model adaptation and maintenance, data preparation and analysis, and the development of its web service.",
    "result": "A model adapted to the technical environment, maintained processing and a web service exposing the model.",
    "sector": "Credit risk",
  }
};
/** Slugs, source experience, technologies and featured selection are shared with French. */
export const projects: readonly ProjectCaseStudy[] = source.map((project) => ({
  ...project, ...copy[project.slug as keyof typeof copy], status: "Professional experience",
}));
