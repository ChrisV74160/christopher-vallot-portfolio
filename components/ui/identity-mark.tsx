import Image from "next/image";

/** Shared header/footer mark, generated from the corrected brand master. */
export function IdentityMark({ priority = false }: { priority?: boolean }) {
  return (
    <Image
      src="/brand/owl.webp"
      alt=""
      aria-hidden="true"
      className="wordmark-icon"
      width={48}
      height={48}
      priority={priority}
      unoptimized
    />
  );
}
