"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { courses, courseCategories, type CourseCategory } from "@/lib/programs";

const PAGE = 12;

export default function ProgramExplorer({
  limit,
  showSearch = true,
  category,
  showFilters = true,
}: {
  limit?: number;
  showSearch?: boolean;
  category?: CourseCategory;
  showFilters?: boolean;
}) {
  const [cat, setCat] = useState<CourseCategory | "All">(category || "All");
  const [q, setQ] = useState("");
  const [shown, setShown] = useState(PAGE);

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    return courses.filter(
      (c) =>
        (cat === "All" || c.category === cat) &&
        (!term || `${c.title} ${c.summary} ${c.category} ${c.modules.join(" ")}`.toLowerCase().includes(term))
    );
  }, [cat, q]);

  const max = limit ?? shown;
  const visible = list.slice(0, max);

  return (
    <div>
      {(showFilters || showSearch) && (
        <div className="flex flex-col gap-4">
          {showSearch && (
            <div className="max-w-md">
              <label htmlFor="course-search" className="sr-only">Search programmes</label>
              <input
                id="course-search"
                type="search"
                className="field"
                placeholder={`Search ${courses.length} programmes — e.g. Excel, IELTS, BIM`}
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setShown(PAGE);
                }}
              />
            </div>
          )}
          {showFilters && (
            <div role="group" aria-label="Filter by subject" className="flex flex-wrap gap-2">
              {(["All", ...courseCategories] as const).map((c) => {
                const n = c === "All" ? courses.length : courses.filter((x) => x.category === c).length;
                return (
                  <button
                    key={c}
                    type="button"
                    aria-pressed={cat === c}
                    onClick={() => {
                      setCat(c);
                      setShown(PAGE);
                    }}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                      cat === c ? "bg-ink text-white" : "bg-white text-ink ring-1 ring-line hover:ring-sky"
                    }`}
                  >
                    {c} <span className={cat === c ? "text-white/60" : "text-stone"}>{n}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      <p className="sr-only" aria-live="polite">{list.length} programmes found</p>

      {visible.length === 0 ? (
        <div className="mt-8 rounded-panel bg-white p-8 ring-1 ring-line">
          <p className="font-semibold">No programmes match “{q}”.</p>
          <p className="mt-1 text-stone">Try another word or a different subject — or ask an advisor, as we run programmes that are not listed here.</p>
        </div>
      ) : (
        <ul className="mt-8 divide-y divide-line rounded-panel bg-white ring-1 ring-line">
          {visible.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/online-programs/${c.slug}`}
                className="group grid gap-3 p-5 sm:p-6 md:grid-cols-12 md:items-center hover:bg-mist/60 transition-colors"
              >
                <div className="md:col-span-6">
                  <p className="text-sm text-sky-deep font-semibold">{c.category}</p>
                  <h3 className="mt-0.5 font-display text-xl font-semibold group-hover:underline underline-offset-4">{c.title}</h3>
                  <p className="mt-1 text-stone text-[0.975rem]">{c.summary}</p>
                </div>
                <dl className="md:col-span-6 grid grid-cols-3 gap-3 text-sm">
                  <div>
                    <dt className="text-stone">{c.kind === "UK diploma" ? "Credits" : "Duration"}</dt>
                    <dd className="font-semibold">{c.duration}</dd>
                  </div>
                  <div>
                    <dt className="text-stone">Level</dt>
                    <dd className="font-semibold">{c.level}</dd>
                  </div>
                  <div>
                    <dt className="text-stone">Type</dt>
                    <dd className="font-semibold">{c.kind === "Skill programme" ? "Live online" : c.kind}</dd>
                  </div>
                </dl>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {limit ? (
        list.length > limit && (
          <p className="mt-6">
            <Link href="/online-programs" className="link">See all {courses.length} online programmes</Link>
          </p>
        )
      ) : (
        list.length > visible.length && (
          <div className="mt-6 flex items-center gap-4">
            <button type="button" className="btn btn-dark" onClick={() => setShown((s) => s + PAGE)}>
              Show more programmes
            </button>
            <p className="text-sm text-stone">Showing {visible.length} of {list.length}</p>
          </div>
        )
      )}
    </div>
  );
}
