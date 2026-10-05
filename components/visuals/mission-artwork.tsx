import type { ProjectVisualVariant } from "@/types/content";

/** Cards and case-study pages use the same generated, text-free schematic. */
export function MissionArtwork({ variant }: { variant: ProjectVisualVariant }) {
  return <svg className="mission-artwork" data-mission={variant} viewBox="0 0 720 400" aria-hidden="true" focusable="false">
    <image href={`/artwork/mission-${variant}.svg`} width="720" height="400" />
  </svg>;
}
