interface DataBrandIconProps {
  className?: string;
}

/**
 * Code-native brand mark shared by the header and footer. The glyph combines
 * incoming data nodes, a central processing core and an outgoing BI signal.
 */
export function DataBrandIcon({ className }: DataBrandIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      focusable="false"
      viewBox="0 0 64 64"
    >
      <path className="identity-glyph__grid" d="M8 19H56M8 32H56M8 45H56M19 8V56M32 8V56M45 8V56" />
      <path className="identity-glyph__frame" d="M23 11H41L53 23V41L41 53H23L11 41V23Z" />
      <path className="identity-glyph__signal" d="M7 22H16L23 28M7 42H16L23 36M41 32H48L56 24" />
      <circle className="identity-glyph__node" cx="7" cy="22" r="2.2" />
      <circle className="identity-glyph__node" cx="7" cy="42" r="2.2" />
      <circle className="identity-glyph__node identity-glyph__node--output" cx="56" cy="24" r="2.2" />
      <g className="identity-glyph__core">
        <ellipse cx="32" cy="25" rx="8" ry="3.5" />
        <path d="M24 25V39C24 41 27.6 42.5 32 42.5S40 41 40 39V25" />
        <path d="M24 32C24 34 27.6 35.5 32 35.5S40 34 40 32" />
        <path d="M24 38.5C24 40.5 27.6 42 32 42S40 40.5 40 38.5" />
      </g>
    </svg>
  );
}
