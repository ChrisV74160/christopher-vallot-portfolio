import * as source from "@/data/services";
import { faqItems as sourceFaq } from "@/data/faq";
import type { Service, InterventionCase, MissionFormat, FaqItem } from "@/types/content";

export const services: readonly Service[] = [
  {
    ...source.services[0],
    title: "Business Intelligence & Power BI",
    problem: "Your indicators are scattered, difficult to read, or your reporting is becoming complex to maintain.",
    intervention: "I structure the data, KPIs and reporting model to build, take over or improve the reliability of Power BI reports that business teams can use.",
    deliverables: ["Power BI dashboard", "KPI definition and documentation", "Data model", "DAX", "Power Query", "Review or optimisation of existing reporting"],
  },
  {
    ...source.services[1],
    title: "Data analysis & use",
    problem: "You have data, but working with it still requires manual extracts, one-off queries or analyses that are difficult to reproduce.",
    intervention: "I explore, combine and contextualise data with SQL and Python to identify discrepancies, produce the required datasets and answer business questions.",
    deliverables: ["Exploratory or business analysis", "SQL queries", "Python scripts", "Combining data", "Prepared dataset", "Summary of findings"],
  },
  {
    ...source.services[2],
    title: "Data Quality & reliability",
    problem: "Missing values, inconsistencies or discrepancies between sources undermine your analyses.",
    intervention: "I define checks, reconcile sources and address anomalies before the data is used.",
    deliverables: ["Checking and validation rules", "Anomaly analysis", "Source reconciliation", "Cleaned and consolidated data", "Quality check monitoring"],
  },
  {
    ...source.services[3],
    title: "Processing & reporting automation",
    problem: "Data extraction, consolidation or report delivery is still handled manually.",
    intervention: "I automate repetitive steps with Python, SQL, PowerShell, Power Query or Power Automate, depending on the environment.",
    deliverables: ["Automated scripts and processes", "Repeatable reporting pipeline", "Built-in checks", "Operational documentation"],
  },
  {
    ...source.services[4],
    title: "Data integration & consolidation",
    problem: "Your data comes from multiple flows, databases, files or tools and cannot be used together directly.",
    intervention: "I prepare, standardise and consolidate sources to build a consistent, checked data foundation ready for analysis or reporting.",
    deliverables: ["Source mapping", "Transformation rules", "Data preparation pipeline", "Consolidated dataset", "Cross-source consistency checks"],
  },
];

export const interventionCases: readonly InterventionCase[] = [
  { ...source.interventionCases[0], title: "Your Power BI reporting is becoming difficult to maintain", description: "Reviewing sources, transformations, the data model, KPIs, DAX and reports to simplify the existing setup and improve its reliability." },
  { ...source.interventionCases[1], title: "Your data is not reliable enough", description: "Implementing checks, reconciliation, consolidation and anomaly detection across different sources." },
  { ...source.interventionCases[2], title: "Processing is still being done manually", description: "Automating extraction, transformation, checks and reporting with tools suited to your environment." },
  { ...source.interventionCases[3], title: "Your data comes from multiple systems", description: "Preparing, standardising and consolidating files, databases, APIs and other sources into a consistent dataset." },
];

export const missionFormats: readonly MissionFormat[] = [
  { ...source.missionFormats[0], title: "Focused audit", description: "Identifying what needs to be made more reliable, automated or simplified." },
  { ...source.missionFormats[1], title: "Data / BI team support", description: "Joining an existing team to work on a defined problem or scope." },
  { ...source.missionFormats[2], title: "Taking over an existing setup", description: "Improving the reliability or developing an existing report, process or data flow." },
  { ...source.missionFormats[3], title: "End-to-end delivery", description: "Handling the requirement from source data through to the business deliverable." },
];

export const faqItems: readonly FaqItem[] = [
  { ...sourceFaq[0], question: "What types of assignments can you work on?", answer: "Data integration and consolidation, Data Quality, automation and Business Intelligence. The scope can cover everything from sources and checks through to KPIs and Power BI reporting." },
  { ...sourceFaq[1], question: "Do you work remotely or on site?", answer: "Both. Based in Tours, I can work remotely, in a hybrid setup or on site, depending on the context, teams and assignment requirements." },
  { ...sourceFaq[2], question: "Can you take over an existing report or dashboard?", answer: "Yes. The work can start with an audit of sources, transformations, the model, KPIs and use cases to identify what needs to be made more reliable, simplified or automated." },
  { ...sourceFaq[3], question: "Which technologies do you mainly use?", answer: "Primarily Python, SQL, Power BI, DAX and Power Query. Depending on the environment, my experience also includes PySpark, SAS, PowerShell, Power Automate, Cloudera, Teradata, GitLab and Jenkins." },
  { ...sourceFaq[4], question: "How does an assignment start?", answer: "With a discussion about the business need, users, available data and constraints. The scope and deliverables are then defined before implementation starts." },
  { ...sourceFaq[5], question: "How do you handle confidential data and projects?", answer: "The case studies presented here draw on professional experience without disclosing internal data or confidential information. For an assignment, access, data handling and security rules are agreed with the organisation before work starts." },
  { ...sourceFaq[6], question: "What engagement formats do you offer?", answer: "Focused audits, support within an existing team, taking over an existing setup or end-to-end delivery. The format depends on the need, scope and expected level of autonomy." },
];
