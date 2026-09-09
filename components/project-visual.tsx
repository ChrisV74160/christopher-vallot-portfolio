import { ArrowRight } from "lucide-react";

import type { Locale } from "@/i18n/config";
import { projectMessages, type ProjectUiMessages } from "@/i18n/messages/projects";
import type { ProjectDiagram, ProjectVisualVariant } from "@/types/content";

interface ProjectVisualProps {
  diagram?: ProjectDiagram;
  variant: ProjectVisualVariant;
  locale?: Locale;
}

type VisualMessages = ProjectUiMessages["visual"];

function DataCells({ clean = false }: { clean?: boolean }) {
  return (
    <div className={`data-table${clean ? " data-table--clean" : ""}`}>
      {Array.from({ length: 9 }, (_, index) => (
        <span key={index} />
      ))}
    </div>
  );
}

function PipelineVisual({ messages }: { messages: VisualMessages }) {
  return (
    <div className="visual-pipeline">
      <div className="visual-node">{messages.sources}</div>
      <div className="visual-node">{messages.processing}</div>
      <div className="visual-node">{messages.reliableData}</div>
    </div>
  );
}

function CollectionVisual({ messages }: { messages: VisualMessages }) {
  return (
    <div className="visual-documents">
      <div className="document-stack">
        <span className="visual-micro-label">{messages.sources}</span>
        <span className="document-sheet">CRM</span>
        <span className="document-sheet">WEB</span>
        <span className="document-sheet">TEXT</span>
      </div>
      <div className="json-lines">
        <span className="visual-micro-label">JSON / LLM</span>
        {Array.from({ length: 5 }, (_, index) => (
          <span key={index} />
        ))}
      </div>
    </div>
  );
}

function ReconcileVisual({ messages }: { messages: VisualMessages }) {
  return (
    <div className="visual-reconcile">
      <div className="visual-data-source">
        <span className="visual-micro-label">{messages.sources}</span>
        <DataCells />
      </div>
      <ArrowRight className="visual-arrow" size={24} strokeWidth={1.6} />
      <div className="visual-data-source">
        <span className="visual-micro-label">{messages.checks}</span>
        <DataCells clean />
      </div>
    </div>
  );
}

function DashboardVisual({ messages }: { messages: VisualMessages }) {
  return (
    <div className="visual-dashboard">
      <div className="visual-node">{messages.dataModel}</div>
      <ArrowRight className="visual-arrow" size={24} strokeWidth={1.6} />
      <div className="dashboard-screen">
        <span className="visual-micro-label">Power BI</span>
        <div className="dashboard-screen-grid">
          <span />
          <span />
          <span />
          <span />
        </div>
        <svg viewBox="0 0 160 52" aria-hidden="true" focusable="false">
          <path d="M2 46 C25 42 28 30 48 34 S76 38 92 22 S123 27 158 5" />
        </svg>
      </div>
    </div>
  );
}

function ModelVisual({ messages }: { messages: VisualMessages }) {
  return (
    <div className="visual-model">
      <div className="model-orbit">
        <span className="model-core">{messages.model}</span>
        <span className="model-point" />
        <span className="model-point" />
        <span className="model-point" />
      </div>
    </div>
  );
}

const visuals: Record<ProjectVisualVariant, (props: { messages: VisualMessages }) => React.ReactNode> = {
  "data-pipeline": PipelineVisual,
  "document-automation": CollectionVisual,
  "data-quality": ReconcileVisual,
  "bi-reporting": DashboardVisual,
  "ml-model": ModelVisual,
};

function ConceptFlow({ diagram }: { diagram: ProjectDiagram }) {
  return (
    <div className="concept-flow">
      <div className="concept-flow__rail">
        {diagram.stages.map((stage, index) => (
          <div className="concept-flow__segment" key={`${stage.label}-${index}`}>
            <div className="concept-flow__stage">
              <span>0{index + 1}</span>
              <strong>{stage.label}</strong>
              {stage.detail ? <small>{stage.detail}</small> : null}
            </div>
            {index < diagram.stages.length - 1 ? (
              <span className="concept-flow__connector" />
            ) : null}
          </div>
        ))}
      </div>
      {diagram.note ? (
        <p className="concept-flow__note">{diagram.note}</p>
      ) : null}
    </div>
  );
}

export function ProjectVisual({ diagram, variant, locale = "fr" }: ProjectVisualProps) {
  const Visual = visuals[variant];
  const messages = projectMessages[locale].visual;

  return (
    <div
      className={`project-visual${diagram ? " project-visual--case" : ""}`}
      aria-hidden="true"
    >
      <span className="project-visual-label">
        {diagram?.label ?? messages.labels[variant]}
      </span>
      {diagram ? <ConceptFlow diagram={diagram} /> : <Visual messages={messages} />}
    </div>
  );
}

export default ProjectVisual;
