"use client";

import { useParams } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { NotFoundContent } from "@/components/not-found-content";

export default function NotFound() {
  const params = useParams();
  const locale = isLocale(params?.locale) ? params.locale : "fr";
  return <NotFoundContent locale={locale} />;
}
