import JsonLd from "./JsonLd";
import { faqSchema } from "@/lib/schema";

export default function Faq({
  items,
  title = "Questions students ask",
  withSchema = true,
}: {
  items: { q: string; a: string }[];
  title?: string;
  withSchema?: boolean;
}) {
  return (
    <section className="py-20" aria-labelledby="faq-title">
      {withSchema && <JsonLd data={faqSchema(items)} />}
      <div className="container-x grid gap-10 lg:grid-cols-12">
        <h2 id="faq-title" className="text-h2 lg:col-span-4">
          {title}
        </h2>
        <div className="lg:col-span-8 divide-y divide-line border-y border-line">
          {items.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-display text-xl font-semibold [&::-webkit-details-marker]:hidden">
                <span>{f.q}</span>
                <span
                  aria-hidden="true"
                  className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-mist text-sky-deep transition-transform group-open:rotate-45"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12">
                    <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
              </summary>
              <p className="mt-3 max-w-[65ch] text-stone">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
