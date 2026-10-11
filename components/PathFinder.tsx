"use client";

import Link from "next/link";
import { useState } from "react";
import DeliveryBadge from "./DeliveryBadge";
import { sections, pathways, courses, admissionRoutes, corporateFormats, type SectionKey, type Delivery } from "@/lib/programs";
import { whatsappLink } from "@/lib/site";

const choices: { key: SectionKey; label: string }[] = [
  { key: "admissions", label: "I want to get into university" },
  { key: "pathways", label: "I need to finish school or bridge a gap" },
  { key: "corporate", label: "I'm arranging training for my team" },
  { key: "online", label: "I want a professional qualification or job skills" },
];

const picks: Record<SectionKey, { title: string; delivery: Delivery; href: string }[]> = {
  admissions: admissionRoutes.map((r) => ({ title: r.title, delivery: r.delivery, href: "/university-admissions" })),
  pathways: pathways
    .filter((p) => ["school-completion", "foundation", "top-up"].includes(p.slug))
    .map((p) => ({ title: p.title, delivery: p.delivery, href: `/pathway-programs/${p.slug}` })),
  corporate: corporateFormats.map((c) => ({ title: c.title, delivery: c.delivery, href: "/corporate-training" })),
  online: courses
    .filter((c) => ["acca", "ielts", "excel-with-ai"].includes(c.slug))
    .map((c) => ({ title: c.title, delivery: "online" as Delivery, href: `/online-programs/${c.slug}` })),
};

export default function PathFinder() {
  const [choice, setChoice] = useState<SectionKey | null>(null);
  const section = sections.find((s) => s.key === choice);

  return (
    <div className="relative rounded-panel bg-white p-6 sm:p-7 shadow-[0_30px_70px_-35px_rgba(35,31,32,0.45)] ring-1 ring-line">
      <h2 id="finder-title" className="font-display text-2xl font-semibold">Where are you starting?</h2>
      <p className="mt-1 text-stone text-[0.975rem]">Pick one and we&apos;ll show the right route.</p>

      <div role="radiogroup" aria-labelledby="finder-title" className="mt-5 grid gap-2">
        {choices.map((c) => {
          const active = choice === c.key;
          return (
            <button
              key={c.key}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setChoice(c.key)}
              className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3 text-left font-medium transition-colors ${
                active ? "border-sky bg-mist" : "border-line hover:border-sky/60"
              }`}
            >
              <span
                aria-hidden="true"
                className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 ${active ? "border-sky-deep" : "border-stone/40"}`}
              >
                {active && <span className="h-2.5 w-2.5 rounded-full bg-sky-deep" />}
              </span>
              {c.label}
            </button>
          );
        })}
      </div>

      <div aria-live="polite">
        {section && (
          <div key={section.key} className="rise mt-6 border-t border-line pt-5">
            <p className="font-display text-xl font-semibold">{section.title}</p>
            <ul className="mt-3 space-y-2">
              {picks[section.key].map((p) => (
                <li key={p.title} className="flex flex-wrap items-center justify-between gap-2">
                  <Link href={p.href} className="link">
                    {p.title}
                  </Link>
                  <DeliveryBadge delivery={p.delivery} />
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link href={section.href} className="btn btn-dark">
                See {section.short.toLowerCase()}
              </Link>
              <a
                href={whatsappLink(`Hello MHEC, I'm interested in ${section.title}. Please advise me.`)}
                target="_blank"
                rel="noopener"
                className="btn btn-outline"
              >
                Ask on WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
