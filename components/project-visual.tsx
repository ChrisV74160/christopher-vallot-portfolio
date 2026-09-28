import { CaseArtwork } from "@/components/visuals/case-artwork";
import type { ProjectVisualVariant } from "@/types/content";

interface ProjectVisualProps {
  detail?: boolean;
  variant: ProjectVisualVariant;
}

export function ProjectVisual({ detail = false, variant }: ProjectVisualProps) {
  return (
    <div className={`project-visual${detail ? " project-visual--case" : ""}`} aria-hidden="true">
      <div className="case-illustration"><CaseArtwork variant={variant} /></div>
    </div>
  );
}

export default ProjectVisual;
