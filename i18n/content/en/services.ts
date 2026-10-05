import { services as source } from "@/data/services";
import type { Service } from "@/types/content";

const serviceCopy = {
  "integration-consolidation": {
    "title": "Integrate & consolidate",
    "problem": "Your data is scattered across files, databases and applications.",
    "intervention": "I prepare, transform and reconcile your data to bring your sources together.",
    "outcome": "Consolidated data structured for your analysis and reporting."
  },
  "data-quality": {
    "title": "Validate & improve reliability",
    "problem": "Discrepancies between sources make your data difficult to use.",
    "intervention": "I implement consistency checks and reconciliation to identify and address anomalies.",
    "outcome": "Data quality checks and identified anomalies to guide corrections."
  },
  "automatisation": {
    "title": "Automate processes",
    "problem": "Data extraction, transformation or report delivery still rely on repetitive manual tasks.",
    "intervention": "I automate these tasks with tools suited to your environment.",
    "outcome": "Automated processes structured to make maintenance easier."
  },
  "business-intelligence": {
    "title": "Analyse & inform decisions",
    "problem": "Your reports no longer meet your teams’ needs or are difficult to update.",
    "intervention": "I build or redesign your Power BI reports, from preparing data to defining indicators.",
    "outcome": "Dashboards built around business needs, with clear indicators."
  }
} satisfies Record<Service["id"], Pick<Service, "title" | "problem" | "intervention" | "outcome">>;
export const services: readonly Service[] = source.map((service) => ({ ...service, ...serviceCopy[service.id] }));
