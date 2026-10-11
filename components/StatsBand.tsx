import Counter from "./Counter";
import { site } from "@/lib/site";
import { headlineCounts } from "@/lib/programs";

export default function StatsBand({ tone = "light" }: { tone?: "light" | "dark" }) {
  const stats = [
    { value: site.stats.years, suffix: "+", label: "Years serving students in Oman" },
    { value: site.stats.students, suffix: "+", label: "Students guided to their next qualification" },
    { value: headlineCounts.onlineProgrammes.value, suffix: headlineCounts.onlineProgrammes.suffix, label: "Online skill and professional programmes" },
    { value: headlineCounts.pathwayRoutes.value, suffix: headlineCounts.pathwayRoutes.suffix, label: "Pathway routes, including UK OTHM diplomas" },
  ];
  const dark = tone === "dark";
  return (
    <section aria-label="MHEC in numbers" className={dark ? "bg-ink text-white" : "bg-white"}>
      <div className="container-x">
        <dl className={`grid grid-cols-2 lg:grid-cols-4 gap-px ${dark ? "bg-white/10" : "bg-line"}`}>
          {stats.map((s) => (
            <div key={s.label} className={`px-4 py-8 sm:px-8 md:py-10 first:pl-0 lg:[&:not(:first-child)]:pl-8 max-lg:[&:nth-child(odd)]:pl-0 ${dark ? "bg-ink" : "bg-white"}`}>
              <div className="flex flex-col-reverse">
                <dt className={`mt-3 text-[0.95rem] ${dark ? "text-white/70" : "text-stone"}`}>{s.label}</dt>
                <dd className="font-display text-[clamp(2.4rem,5vw,3.6rem)] font-bold leading-none">
                  <Counter value={s.value} suffix={s.suffix} />
                </dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
