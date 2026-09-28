import { MissionArtwork } from "@/components/visuals/mission-artwork";
import type { ProjectVisualVariant } from "@/types/content";

/** The homepage background and mission schematic are shared by every project view. */
export function CaseArtwork({ variant }: { variant: ProjectVisualVariant }) {
  return <>
    <div className="case-scene-background" data-case-background="shared">
      <span className="case-scene-background__top" />
      <span className="case-scene-background__orange" />
      <span className="case-scene-background__bottom" />
      <span className="case-scene-background__green" />
      <span className="case-scene-background__lime" />
    </div>
    <MissionArtwork variant={variant} />
  </>;
}
