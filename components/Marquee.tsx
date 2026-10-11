import Link from "next/link";
import { courses, pathways } from "@/lib/programs";

const popular = ["acca", "cma", "excel-with-ai", "generative-ai", "power-bi", "data-analytics", "digital-marketing", "ielts", "pte", "spoken-english", "project-management", "autocad", "bim-coordinator", "sql"];

/** A slow-moving ribbon of programme names. Pauses on hover; static for reduced motion. */
export default function Marquee() {
  const items = [
    ...pathways.filter((p) => p.slug !== "uk-diplomas").map((p) => ({ label: p.title, href: `/pathway-programs/${p.slug}` })),
    ...popular.map((slug) => courses.find((c) => c.slug === slug)).filter(Boolean).map((c) => ({ label: c!.title, href: `/online-programs/${c!.slug}` })),
  ];
  const row = (hidden: boolean) => (
    <ul className="marquee-row flex shrink-0 items-center gap-10 pr-10" aria-hidden={hidden || undefined}>
      {items.map((it) => (
        <li key={it.label} className="flex items-center gap-10 whitespace-nowrap">
          <Link href={it.href} tabIndex={hidden ? -1 : undefined} className="font-display text-lg font-semibold text-ink/80 hover:text-sky-deep">
            {it.label}
          </Link>
          <span className="h-2 w-2 rotate-45 bg-sky" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );
  return (
    <nav aria-label="Programmes" className="marquee border-y border-line bg-mist/60 py-5 overflow-hidden">
      <div className="marquee-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </nav>
  );
}
