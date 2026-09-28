import { services as source } from "@/data/services";
import type { Service } from "@/types/content";

const serviceCopy = {
  "integration-consolidation": {
    "title": "Integrate & consolidate",
    "problem": "Your data is scattered across files, databases and applications.",
    "intervention": "I prepare, transform and reconcile sources so they can be used together.",
    "outcome": "A consolidated dataset structured around your needs."
  },
  "data-quality": {
    "title": "Validate & improve reliability",
    "problem": "Inconsistencies or anomalies make your data hard to trust and use.",
    "intervention": "I set up the Data Quality checks and reconciliation your sources need.",
    "outcome": "Checked data and identified anomalies."
  },
  "automatisation": {
    "title": "Automate & industrialise",
    "problem": "Extraction, transformation and reporting still involve repetitive manual work.",
    "intervention": "I automate recurring processing with tools suited to your environment.",
    "outcome": "Repeatable, documented processing that is straightforward to maintain."
  },
  "business-intelligence": {
    "title": "Analyse & inform decisions",
    "problem": "Your reports are difficult to understand, develop or maintain.",
    "intervention": "I analyse your data and build or improve Power BI models, KPIs and reports.",
    "outcome": "Useful reporting with indicators that business teams understand."
  }
} satisfies Record<Service["id"], Pick<Service, "title" | "problem" | "intervention" | "outcome">>;
export const services: readonly Service[] = source.map((service) => ({ ...service, ...serviceCopy[service.id] }));
