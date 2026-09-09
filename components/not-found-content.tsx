import { ArrowLeft, FolderOpen } from "lucide-react";
import Link from "next/link";

import { localizedHref, type Locale } from "@/i18n/config";
import { pageMessages } from "@/i18n/messages/pages";

/** Shared by the server-rendered missing pages and the framework fallback. */
export function NotFoundContent({ locale }: { locale: Locale }) {
  const t = pageMessages[locale].notFound;
  return (
    <section className="not-found" aria-labelledby="not-found-title">
      <div className="container-shell not-found__content">
        <p className="eyebrow">{t.label}</p>
        <h1 className="page-title" id="not-found-title">{t.title}</h1>
        <p className="not-found__description">{t.description}</p>
        <div className="button-row not-found__actions">
          <Link className="button-link button-link--primary" href={localizedHref("/", locale)}>
            <ArrowLeft size={17} aria-hidden="true" />
            {t.home}
          </Link>
          <Link className="button-link button-link--secondary" href={localizedHref("/projets", locale)}>
            <FolderOpen size={17} aria-hidden="true" />
            {t.projects}
          </Link>
        </div>
      </div>
    </section>
  );
}
