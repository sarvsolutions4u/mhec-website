"use client";

import Link from "next/link";
import { useState } from "react";
import { planner, courses } from "@/lib/programs";
import { whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "./WhatsAppFloat";

export default function SkillPlanner() {
  const [active, setActive] = useState(planner[0].key);
  const plan = planner.find((p) => p.key === active)!;

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div role="tablist" aria-label="Your goal" aria-orientation="vertical" className="flex gap-2 overflow-x-auto pb-1 lg:col-span-4 lg:flex-col lg:overflow-visible">
        {planner.map((p) => {
          const sel = p.key === active;
          return (
            <button
              key={p.key}
              role="tab"
              id={`tab-${p.key}`}
              aria-selected={sel}
              aria-controls="planner-panel"
              onClick={() => setActive(p.key)}
              onKeyDown={(e) => {
                const i = planner.findIndex((x) => x.key === p.key);
                if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                  e.preventDefault();
                  const n = planner[(i + 1) % planner.length].key;
                  setActive(n);
                  document.getElementById(`tab-${n}`)?.focus();
                }
                if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
                  e.preventDefault();
                  const n = planner[(i - 1 + planner.length) % planner.length].key;
                  setActive(n);
                  document.getElementById(`tab-${n}`)?.focus();
                }
              }}
              tabIndex={sel ? 0 : -1}
              className={`shrink-0 rounded-xl px-5 py-4 text-left font-display text-lg font-semibold transition-colors ${
                sel ? "bg-ink text-white" : "bg-white text-ink ring-1 ring-line hover:ring-sky"
              }`}
            >
              {p.goal}
            </button>
          );
        })}
      </div>

      <div id="planner-panel" role="tabpanel" aria-labelledby={`tab-${plan.key}`} className="lg:col-span-8">
        <div key={plan.key} className="rise grid gap-4 md:grid-cols-[1fr_auto_1.35fr] md:items-stretch">
          <div className="rounded-panel bg-white p-6 ring-1 ring-line">
            <p className="text-sm font-semibold text-sky-deep">Your qualification</p>
            <h3 className="mt-2 text-h3">{plan.qualification.title}</h3>
            <p className="mt-2 text-stone">{plan.qualification.note}</p>
            <Link href={plan.qualification.href} className="link mt-4 inline-block">
              See the details
            </Link>
          </div>

          <div className="flex items-center justify-center" aria-hidden="true">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-sky font-display text-2xl font-bold text-ink">+</span>
          </div>

          <div className="rounded-panel bg-white p-6 ring-1 ring-line">
            <p className="text-sm font-semibold text-sky-deep">Skills to build alongside it</p>
            <ul className="mt-3 divide-y divide-line">
              {plan.skills.map((s) => {
                const c = courses.find((x) => x.slug === s.slug)!;
                return (
                  <li key={s.slug} className="py-3 first:pt-1 last:pb-0">
                    <Link href={`/online-programs/${c.slug}`} className="group flex items-start justify-between gap-4">
                      <span>
                        <span className="block font-semibold group-hover:text-sky-deep group-hover:underline underline-offset-4">{c.title}</span>
                        <span className="block text-sm text-stone">{s.why}</span>
                      </span>
                      <span className="shrink-0 text-sm text-stone">{c.duration}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href={whatsappLink(`Hello MHEC, my goal is to ${plan.goal.toLowerCase()}. Please advise me on a qualification and skills plan.`)}
            target="_blank"
            rel="noopener"
            className="btn btn-dark"
          >
            <WhatsAppIcon /> Ask about this plan
          </a>
          <a href="#inquiry" className="btn btn-outline">Send an inquiry</a>
        </div>
      </div>
    </div>
  );
}
