import Link from "next/link";
import JsonLd from "./JsonLd";
import Photo from "./Photo";
import { breadcrumbSchema } from "@/lib/schema";
import type { PhotoKey } from "@/lib/media";

export default function PageHero({
  title,
  intro,
  crumbs,
  children,
  aside,
  image,
}: {
  title: string;
  intro: string;
  crumbs: { name: string; path: string }[];
  children?: React.ReactNode;
  aside?: React.ReactNode;
  image?: PhotoKey;
}) {
  const all = [{ name: "Home", path: "/" }, ...crumbs];
  const dark = !!image;

  return (
    <section className={`relative isolate overflow-hidden ${dark ? "bg-ink text-white" : "bg-mist"}`}>
      <JsonLd data={breadcrumbSchema(all)} />
      {image ? (
        <>
          <div className="absolute inset-0 -z-10 kenburns">
            <Photo name={image} fill priority sizes="100vw" />
          </div>
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(35,31,32,0.93)_0%,rgba(35,31,32,0.82)_45%,rgba(35,31,32,0.35)_100%)]" />
        </>
      ) : (
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute -right-48 top-8 h-[30rem] w-[30rem] text-sky/35 hidden md:block"
          viewBox="0 0 200 200"
          fill="none"
        >
          <path d="M30 100a70 70 0 1 1 122 47" stroke="currentColor" strokeWidth="10" strokeLinecap="butt" />
        </svg>
      )}
      <div className={`container-x relative grid gap-10 lg:grid-cols-12 lg:items-end ${image ? "py-16 md:py-28" : "py-14 md:py-20"}`}>
        <div className="lg:col-span-7 slide-in">
          <nav aria-label="Breadcrumb" className={`text-sm ${dark ? "text-white/70" : "text-stone"}`}>
            <ol className="flex flex-wrap items-center gap-2">
              {all.map((c, i) => (
                <li key={c.path} className="flex items-center gap-2">
                  {i < all.length - 1 ? (
                    <>
                      <Link href={c.path} className={`underline-offset-4 hover:underline ${dark ? "hover:text-white" : "hover:text-ink"}`}>
                        {c.name}
                      </Link>
                      <span aria-hidden="true">/</span>
                    </>
                  ) : (
                    <span aria-current="page" className={`font-medium ${dark ? "text-white" : "text-ink"}`}>
                      {c.name}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <h1 className="mt-5 text-h1">{title}</h1>
          <p className={`mt-5 max-w-[60ch] text-lg ${dark ? "text-white/85" : "text-stone"}`}>{intro}</p>
          {children && <div className={`mt-8 flex flex-wrap gap-3 ${dark ? "[&_.btn-outline]:text-white" : ""}`}>{children}</div>}
        </div>
        {aside && <div className="lg:col-span-5 text-ink">{aside}</div>}
      </div>
    </section>
  );
}
