import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Apple touch icon generated with the same data-interface language as the UI. */
export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "#04111d",
        color: "#67e8f9",
        display: "flex",
        height: "100%",
        justifyContent: "center",
        position: "relative",
        width: "100%",
      }}
    >
      <div
        style={{
          alignItems: "center",
          border: "3px solid #45e0c4",
          borderRadius: 28,
          boxShadow: "0 0 36px rgba(103,232,249,.24)",
          display: "flex",
          flexDirection: "column",
          height: 116,
          justifyContent: "center",
          width: 116,
        }}
      >
        <span style={{ fontSize: 23, fontWeight: 700, letterSpacing: 3 }}>
          DATA
        </span>
        <span style={{ color: "#f3fbff", fontSize: 36, fontWeight: 800 }}>
          &amp; BI
        </span>
      </div>
    </div>,
    size,
  );
}
