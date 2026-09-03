import { ArrowRight } from "lucide-react";

import type { ProjectDiagram, ProjectVisualVariant } from "@/types/content";

interface ProjectVisualProps {
  diagram?: ProjectDiagram;
  variant: ProjectVisualVariant;
}

function DataCells({ clean = false }: { clean?: boolean }) {
  return (
    <div className={`data-table${clean ? " data-table--clean" : ""}`}>
      {Array.from({ length: 9 }, (_, index) => (
        <span key={index} />
      ))}
    </div>
  );
}

function PipelineVisual() {
  return (
    <div className="visual-pipeline">
      <div className="visual-node">Sources</div>
      <div className="visual-node">Traitements</div>
      <div className="visual-node">Données fiables</div>
    </div>
  );
}

function CollectionVisual() {
  return (
    <div className="visual-documents">
      <div className="document-stack">
        <span className="visual-micro-label">Sources</span>
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

function ReconcileVisual() {
  return (
    <div className="visual-reconcile">
      <div className="visual-data-source">
        <span className="visual-micro-label">Sources</span>
        <DataCells />
      </div>
      <ArrowRight className="visual-arrow" size={24} strokeWidth={1.6} />
      <div className="visual-data-source">
        <span className="visual-micro-label">Contrôles</span>
        <DataCells clean />
      </div>
    </div>
  );
}

function DashboardVisual() {
  return (
    <div className="visual-dashboard">
      <div className="visual-node">Modèle de données</div>
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

function ModelVisual() {
  return (
    <div className="visual-model">
      <div className="model-orbit">
        <span className="model-core">Modèle</span>
        <span className="model-point" />
        <span className="model-point" />
        <span className="model-point" />
      </div>
    </div>
  );
}

const visuals: Record<ProjectVisualVariant, () => React.ReactNode> = {
  "data-pipeline": PipelineVisual,
  "document-automation": CollectionVisual,
  "data-quality": ReconcileVisual,
  "bi-reporting": DashboardVisual,
  "ml-model": ModelVisual,
};

const visualLabels: Record<ProjectVisualVariant, string> = {
  "data-pipeline": "Migration / contrôles",
  "document-automation": "Collecte / JSON / sémantique",
  "data-quality": "Sources / contrôle",
  "bi-reporting": "Modèle / reporting",
  "ml-model": "Variables / modèle / webservice",
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

export function ProjectVisual({ diagram, variant }: ProjectVisualProps) {
  const Visual = visuals[variant];

  return (
    <div
      className={`project-visual${diagram ? " project-visual--case" : ""}`}
      aria-hidden="true"
    >
      <span className="project-visual-label">
        {diagram?.label ?? visualLabels[variant]}
      </span>
      {diagram ? <ConceptFlow diagram={diagram} /> : <Visual />}
    </div>
  );
}

export default ProjectVisual;
