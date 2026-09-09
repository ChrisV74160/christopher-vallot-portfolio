import { NotFoundContent } from "@/components/not-found-content";
import { requireLocale, type LocalePageProps } from "@/i18n/server";

export { localizedNotFoundMetadata as generateMetadata } from "@/i18n/not-found";

/** The proxy supplies HTTP 404; direct rendering also works without JavaScript. */
export default async function MissingPage({ params }: LocalePageProps) {
  return <NotFoundContent locale={requireLocale((await params).locale)} />;
}
