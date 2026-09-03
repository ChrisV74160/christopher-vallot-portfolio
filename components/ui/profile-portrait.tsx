import Image from "next/image";

import profilePhoto from "@/assets/photo-profil-christopher-vallot.webp";

interface ProfilePortraitProps {
  className?: string;
}

/**
 * Shared portrait treatment for the home and About pages. The static import
 * gives Next.js the source dimensions and blur placeholder at build time.
 */
export function ProfilePortrait({
  className,
}: ProfilePortraitProps) {
  const classes = ["profile-portrait", className].filter(Boolean).join(" ");

  return (
    <div className={classes}>
      <div className="profile-portrait-frame">
        <Image
          alt="Portrait de Christopher Vallot"
          className="profile-portrait-image"
          fill
          placeholder="blur"
          quality={90}
          sizes="(max-width: 48rem) 17rem, 21rem"
          src={profilePhoto}
        />
        <div className="profile-portrait-caption" aria-hidden="true">
          <span>
            <i aria-hidden="true" /> Profil / Data
          </span>
          <strong>Christopher Vallot</strong>
          <small>Consultant Data &amp; BI Freelance · Tours</small>
        </div>
      </div>
    </div>
  );
}
