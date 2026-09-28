import { getSiteUrl } from "@/lib/site-config";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * Preserve the previously indexed URL while using the current brand asset.
 * Serving a different legacy icon here lets crawlers pick an outdated logo.
 */
export default function AppleIcon() {
  return Response.redirect(new URL("/apple-icon.png", getSiteUrl()), 308);
}
