import { photos, photoUrl, photoSrcSet, type PhotoKey } from "@/lib/media";

/** Responsive photo from lib/media.ts. Fills its parent when `fill` is set. */
export default function Photo({
  name,
  className = "",
  sizes = "100vw",
  priority = false,
  fill = false,
}: {
  name: PhotoKey;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
}) {
  const p = photos[name];
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={photoUrl(name, 1600)}
      srcSet={photoSrcSet(name)}
      sizes={sizes}
      alt={p.alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      style={{ objectPosition: p.position }}
      className={`${fill ? "absolute inset-0 h-full w-full" : ""} object-cover bg-mist ${className}`}
    />
  );
}
