import { services as source } from "@/data/services";
import type { Service } from "@/types/content";

const serviceCopy = {
  "integration-consolidation": {
    "title": "Integrate & consolidate",
    "problem": "Your data is scattered across files, databases and applications.",
    "intervention": "Data preparation, transformation and reconciliation bring your sources together.",
    "outcome": "A consolidated dataset structured around your needs."
  },
  "data-quality": {
    "title": "Validate & improve reliability",
    "problem": "Inconsistencies or anomalies make your data hard to trust and use.",
    "intervention": "Data quality checks and reconciliation help identify anomalies and inconsistencies.",
    "outcome": "Checked data and identified anomalies."
  },
  "automatisation": {
    "title": "Automate & industrialise",
    "problem": "Extraction, transformation and reporting still involve repetitive manual work.",
    "intervention": "Recurring workflows are automated with tools suited to your environment.",
    "outcome": "Repeatable, documented processing that is straightforward to maintain."
  },
  "business-intelligence": {
    "title": "Analyse & inform decisions",
    "problem": "Your reports are difficult to understand, update or maintain.",
    "intervention": "Data analysis supports the creation or improvement of Power BI models, KPIs and reports.",
    "outcome": "Reports that business teams can use, with clear indicators."
  }
} satisfies Record<Service["id"], Pick<Service, "title" | "problem" | "intervention" | "outcome">>;
export const services: readonly Service[] = source.map((service) => ({ ...service, ...serviceCopy[service.id] }));
