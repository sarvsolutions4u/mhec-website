/**
 * Photos used across the site.
 * These are free Unsplash photos (Unsplash License — free for commercial use, no attribution required).
 * To use your own MHEC photos: put the file in /public/images/ and replace `src` with e.g. "/images/campus.jpg".
 */

export type Photo = { src: string; alt: string; position?: string };

const unsplash = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&q=75`;

export const photos = {
  skills: {
    src: unsplash("photo-1758270705290-62b6294dd044"),
    alt: "Students working together around a laptop",
    position: "center",
  },
  graduates: {
    src: unsplash("photo-1627556704290-2b1f5853ff78"),
    alt: "Graduates throwing their caps in the air",
    position: "center 30%",
  },
  library: {
    src: unsplash("photo-1741699428220-65f37f3fbbcb"),
    alt: "A student studying in a university library reading room",
    position: "center",
  },
  workshop: {
    src: unsplash("photo-1542744173-8e7e53415bb0"),
    alt: "A trainer leading a workshop for professionals with laptops",
    position: "center",
  },
  online: {
    src: unsplash("photo-1513258496099-48168024aec0"),
    alt: "A learner wearing headphones studying on a laptop",
    position: "center",
  },
  mentoring: {
    src: unsplash("photo-1525130413817-d45c1d127c42"),
    alt: "A trainer helping a learner on a laptop",
    position: "center",
  },
  training: {
    src: unsplash("photo-1524178232363-1fb2b075b655"),
    alt: "Participants in a training room facing a presentation screen",
    position: "center",
  },
  muscat: {
    src: unsplash("photo-1504257538320-8a5d5f1c0f31"),
    alt: "Muscat, Oman — white buildings between rocky mountains",
    position: "center",
  },
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;

/** Return a sized URL (Unsplash resizes on its CDN; local files are returned as-is). */
export function photoUrl(key: PhotoKey, width = 1600) {
  const p = photos[key];
  return p.src.includes("images.unsplash.com") ? `${p.src}&w=${width}` : p.src;
}

export function photoSrcSet(key: PhotoKey, widths = [640, 960, 1280, 1920]) {
  const p = photos[key];
  if (!p.src.includes("images.unsplash.com")) return undefined;
  return widths.map((w) => `${p.src}&w=${w} ${w}w`).join(", ");
}
