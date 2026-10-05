import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { requireLocale, type LocalePageProps } from "@/i18n/server";
import { locales } from "@/i18n/config";

export const dynamic = "force-static";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/** Keep existing sharing URLs while serving the checked, generated PNG assets. */
export async function GET(_request: Request, { params }: LocalePageProps) {
  const locale = requireLocale((await params).locale);
  const image = await readFile(join(process.cwd(), "public", "social", `${locale}.png`));
  return new Response(new Uint8Array(image), {
    headers: { "Content-Type": "image/png" },
  });
}
