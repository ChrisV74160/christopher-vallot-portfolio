import { NextResponse } from "next/server";
import { requireLocale, type LocalePageProps } from "@/i18n/server";
import { metaMessages } from "@/i18n/messages/meta";
import { locales } from "@/i18n/config";
import icon from "../../icon.png";

export const dynamic = "force-static";
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function GET(_request: Request, { params }: LocalePageProps) {
  const locale = requireLocale((await params).locale);
  return NextResponse.json({
    name: metaMessages[locale].siteName,
    short_name: "Data & BI",
    description: metaMessages[locale].siteDescription,
    start_url: `/${locale}`,
    scope: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#003f5c",
    lang: locale,
    icons: [{ src: icon.src, sizes: `${icon.width}x${icon.height}`, type: "image/png" }],
  }, { headers: { "Content-Type": "application/manifest+json" } });
}
