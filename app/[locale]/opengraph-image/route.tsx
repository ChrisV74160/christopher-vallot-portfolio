import { ImageResponse } from "next/og";

import { requireLocale, type LocalePageProps } from "@/i18n/server";
import { metaMessages } from "@/i18n/messages/meta";
import { locales } from "@/i18n/config";
const size = { width: 1200, height: 630 };
export const dynamic = "force-static";

// Render both assets at build time, including validation by the image renderer.
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function GET(_request: Request, { params }: LocalePageProps) {
  const locale = requireLocale((await params).locale);
  const t = metaMessages[locale].og;
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#020812",
        color: "#f3fbff",
        padding: "72px 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 460,
          height: 460,
          borderRadius: 999,
          border: "1px solid rgba(103,232,249,.28)",
          right: -80,
          top: -160,
          boxShadow: "0 0 0 70px rgba(103,232,249,.035)",
        }}
      />
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            width: 52,
            height: 52,
            border: "1px solid #67e8f9",
            borderRadius: 12,
            background: "#061521",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="44" height="44" viewBox="0 0 64 64">
            <path d="M23 11H41L53 23V41L41 53H23L11 41V23Z" fill="rgba(103,232,249,.04)" stroke="#67e8f9" strokeWidth="1.5" />
            <path d="M7 22H16L23 28M7 42H16L23 36M41 32H48L56 24" fill="none" stroke="#67e8f9" strokeWidth="2" strokeLinecap="round" />
            <circle cx="7" cy="22" r="2.5" fill="#67e8f9" />
            <circle cx="7" cy="42" r="2.5" fill="#67e8f9" />
            <circle cx="56" cy="24" r="2.5" fill="#45e0c4" />
            <ellipse cx="32" cy="25" rx="8" ry="3.5" fill="#061521" stroke="#67e8f9" strokeWidth="1.7" />
            <path d="M24 25V39C24 41 27.6 42.5 32 42.5S40 41 40 39V25M24 32C24 34 27.6 35.5 32 35.5S40 34 40 32M24 38.5C24 40.5 27.6 42 32 42S40 40.5 40 38.5" fill="none" stroke="#67e8f9" strokeWidth="1.7" />
          </svg>
        </div>
        <div style={{ fontSize: 24, color: "#c7d5db" }}>
          {`Christopher Vallot · ${t.role}`}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 76, lineHeight: 1.02, letterSpacing: -4 }}>
          {t.firstLine}
        </div>
        <div style={{ fontSize: 76, lineHeight: 1.02, letterSpacing: -4 }}>
          {t.secondLine}
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 36 }}>
          {["Power BI", "Python", "SQL", "Data Quality", t.automation].map(
            (item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  border: "1px solid rgba(255,255,255,.16)",
                  borderRadius: 10,
                  color: "#a9bdc8",
                  padding: "10px 16px",
                  fontSize: 16,
                }}
              >
                {item}
              </div>
            ),
          )}
        </div>
      </div>
    </div>,
    size,
  );
}
