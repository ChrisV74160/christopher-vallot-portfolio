import { TechnologyIcon } from "@/components/ui/technology-icon";

export function TechnologyBadge({ technology }: { technology: string }) {
  return (
    <span className="badge technology-badge">
      <TechnologyIcon name={technology} size={16} />
      <span>{technology}</span>
    </span>
  );
}
