import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, isLocale, localeCookieName, localizedHref, stripLocale } from "./i18n/config";
import { isKnownPagePath } from "./i18n/routes";

/** Old bookmarks keep working; explicit locale URLs remain independently crawlable. */
export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  if (/^\/(fr|en)(?:\/|$)/.test(path)) {
    const pagePath = stripLocale(path);
    // Keep a real HTTP 404 while rendering the translated page on the server.
    // Throwing notFound() under a dynamic root layout otherwise yields a blank
    // recovery document until hydration in this Next.js version.
    const knownPath = isKnownPagePath(pagePath) || pagePath === "/opengraph-image" || pagePath === "/manifest.webmanifest";
    if (knownPath) return NextResponse.next();
    const response = NextResponse.next({ status: 404 });
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    return response;
  }

  const target = request.nextUrl.clone();
  if (path === "/") {
    const preferred = request.cookies.get(localeCookieName)?.value;
    target.pathname = localizedHref(path, isLocale(preferred) ? preferred : defaultLocale);
    const response = NextResponse.redirect(target, 307);
    response.headers.set("Cache-Control", "private, no-store");
    response.headers.set("Vary", "Cookie");
    return response;
  }

  // Permanent, preference-independent redirects avoid competing legacy pages.
  target.pathname = localizedHref(path, defaultLocale);
  return NextResponse.redirect(target, 308);
}

export const config = {
  matcher: [
    "/fr/:path*",
    "/en/:path*",
    "/((?!api(?:/|$)|_next(?:/|$)|robots\\.txt$|sitemap\\.xml$|manifest\\.webmanifest$|apple-icon$|.*\\.[^/]+$).*)",
  ],
};
