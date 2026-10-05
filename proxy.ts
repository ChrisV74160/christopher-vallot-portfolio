import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, isLocale, localeCookieName, localizedHref, stripLocale } from "./i18n/config";
import { isKnownPagePath } from "./i18n/routes";

/** Decode once without allowing escaped separators to change route boundaries. */
function decodePathSegment(segment: string): string | null {
  try {
    const decoded = decodeURIComponent(segment);
    return /[/\\]/.test(decoded) ? null : decoded;
  } catch {
    return null;
  }
}

/** Old bookmarks keep working; explicit locale URLs remain independently crawlable. */
export function proxy(request: NextRequest) {
  const rawPath = request.nextUrl.pathname;
  const segments = rawPath.split("/").map(decodePathSegment);
  if (segments.includes(null)) {
    // Malformed escapes would fail in Next.js routing before the 404 can render.
    const locale = isLocale(segments[1]) ? segments[1] : defaultLocale;
    const target = request.nextUrl.clone();
    target.pathname = `/${locale}/__invalid-path__`;
    const response = NextResponse.rewrite(target, { status: 404 });
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    return response;
  }

  const path = segments.join("/");
  if (/^\/(fr|en)(?:\/|$)/.test(path)) {
    const pagePath = stripLocale(path);
    // Keep a real HTTP 404 while rendering the translated page on the server.
    // Throwing notFound() under a dynamic root layout otherwise yields a blank
    // recovery document until hydration in this Next.js version.
    const knownPath = isKnownPagePath(pagePath) || pagePath === "/opengraph-image" || pagePath === "/manifest.webmanifest";
    if (knownPath) {
      if (rawPath !== path) {
        // Literal routes need the normalized path too; decoding for lookup alone
        // can otherwise send a successful status with the catch-all 404 content.
        const target = request.nextUrl.clone();
        target.pathname = path;
        return NextResponse.rewrite(target);
      }
      return NextResponse.next();
    }
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
  target.pathname = localizedHref(rawPath, defaultLocale);
  return NextResponse.redirect(target, 308);
}

export const config = {
  matcher: [
    "/fr/:path*",
    "/en/:path*",
    "/((?!api(?:/|$)|_next(?:/|$)|robots\\.txt$|sitemap\\.xml$|manifest\\.webmanifest$|apple-icon$|.*\\.[^/]+$).*)",
  ],
};
