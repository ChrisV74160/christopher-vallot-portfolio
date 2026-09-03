import { DataBrandIcon } from "./data-brand-icon";

/**
 * Compact code-native identity used in navigation areas. The surrounding link
 * already carries the accessible name, so the glyph is intentionally
 * decorative.
 */
export function IdentityMark() {
  return (
    <span aria-hidden="true" className="wordmark-mark">
      <DataBrandIcon className="identity-glyph" />
    </span>
  );
}
