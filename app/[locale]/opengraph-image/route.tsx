/* eslint-disable @next/next/no-img-element -- ImageResponse embeds the brand PNG at build time. */
import { readFile } from "node:fs/promises";
import { join } from "node:path";
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
  const logo = await readFile(join(process.cwd(), "app/icon.png"), "base64");
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#003f5c",
        color: "#ffffff",
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
          border: "2px solid #78a50a",
          background: "#006572",
          right: -80,
          top: -160,
        }}
      />
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <img src={`data:image/png;base64,${logo}`} alt="" width={72} height={72} />
        <div style={{ fontSize: 24, color: "#ffffff" }}>
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
                  border: "1px solid #008b56",
                  borderRadius: 10,
                  color: "#ffffff",
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
