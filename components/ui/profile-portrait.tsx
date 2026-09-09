import Image from "next/image";

import profilePhoto from "@/assets/photo-profil-christopher-vallot.webp";
import type { Locale } from "@/i18n/config";
import { projectMessages } from "@/i18n/messages/projects";

interface ProfilePortraitProps {
  className?: string;
  locale?: Locale;
}

/**
 * Shared portrait treatment for the home and About pages. The static import
 * gives Next.js the source dimensions and blur placeholder at build time.
 */
export function ProfilePortrait({
  className,
  locale = "fr",
}: ProfilePortraitProps) {
  const messages = projectMessages[locale];
  const classes = ["profile-portrait", className].filter(Boolean).join(" ");

  return (
    <div className={classes}>
      <div className="profile-portrait-frame">
        <Image
          alt={messages.portraitAlt}
          className="profile-portrait-image"
          fill
          placeholder="blur"
          quality={90}
          sizes="(max-width: 48rem) 17rem, 21rem"
          src={profilePhoto}
        />
        <div className="profile-portrait-caption" aria-hidden="true">
          <span>
            <i aria-hidden="true" /> {messages.portraitLabel}
          </span>
          <strong>Christopher Vallot</strong>
          <small>{messages.portraitRole}</small>
        </div>
      </div>
    </div>
  );
}
