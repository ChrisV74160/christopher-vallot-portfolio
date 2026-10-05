import Image from "next/image";

/** Shared header/footer mark, generated from the owl vector and its native frame. */
export function IdentityMark({ priority = false }: { priority?: boolean }) {
  return (
    <Image
      src="/brand/owl-framed.svg"
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
