import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import DeliveryBadge from "@/components/DeliveryBadge";
import InquiryForm from "@/components/InquiryForm";
import JsonLd from "@/components/JsonLd";
import Faq from "@/components/Faq";
import Reveal from "@/components/Reveal";
import { courses, onlineStudyOptions, pathways, categorySlug } from "@/lib/programs";
import { courseSchema } from "@/lib/schema";
import { whatsappLink } from "@/lib/site";
import type { PhotoKey } from "@/lib/media";

type Props = { params: Promise<{ slug: string }> };

const categoryPhoto: Record<string, PhotoKey> = {
  AI: "skills",
  "Accounting & Finance": "workshop",
  "Business & Data Analytics": "online",
  "Digital Marketing & Design": "skills",
  "Exam Preparation": "library",
  "Languages & Communication": "mentoring",
  "Kids Programme": "mentoring",
  "Soft Skills & Leadership": "training",
  Management: "training",
  "BIM & CAD": "online",
};

const Tick = () => (
  <svg className="mt-1 h-5 w-5 shrink-0 text-sky-deep" viewBox="0 0 20 20" aria-hidden="true">
    <path d="M4 10.5l4 4 8-9" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = courses.find((x) => x.slug === slug);
  if (!c) return {};
  const isDiploma = c.kind === "UK diploma";
  return {
    title: isDiploma ? `${c.title} — Study Online in Oman` : `${c.title} Online Course in Oman`,
    description: `${c.summary} ${isDiploma ? `${c.credits}, Ofqual-regulated.` : `Live online through MHEC, ${c.duration.toLowerCase()}.`} Syllabus, entry and fees.`,
    alternates: { canonical: `/online-programs/${c.slug}` },
    openGraph: { title: `${c.title} | MHEC Muscat`, url: `/online-programs/${c.slug}` },
  };
}

export default async function CoursePage({ params }: Props) {
  const { slug } = await params;
  const c = courses.find((x) => x.slug === slug);
  if (!c) notFound();

  const isDiploma = c.kind === "UK diploma";
  const related = courses.filter((x) => x.category === c.category && x.slug !== c.slug).slice(0, 4);
  const pairsWith = pathways.filter((p) => p.skills.includes(c.slug)).slice(0, 3);

  return (
    <>
      <JsonLd data={courseSchema(c)} />
      <PageHero
        image={categoryPhoto[c.category] || "online"}
        title={c.title}
        intro={c.summary}
        crumbs={[
          { name: "Online Programmes", path: "/online-programs" },
          { name: c.category, path: `/online-programs/category/${categorySlug(c.category)}` },
          { name: c.title, path: `/online-programs/${c.slug}` },
        ]}
        aside={
          <div className="rounded-panel bg-white p-6 shadow-xl">
            <DeliveryBadge delivery={isDiploma ? "othm" : "online"} />
            <dl className="mt-5 grid grid-cols-2 gap-4">
              <div>
                <dt className="text-sm text-stone">{isDiploma ? "Credits" : "Duration"}</dt>
                <dd className="font-semibold">{c.duration}</dd>
              </div>
              <div>
                <dt className="text-sm text-stone">Level</dt>
                <dd className="font-semibold">{c.level}</dd>
              </div>
              <div>
                <dt className="text-sm text-stone">Type</dt>
                <dd className="font-semibold">{c.kind}</dd>
              </div>
              <div>
                <dt className="text-sm text-stone">{isDiploma ? "Ofqual number" : "Subject"}</dt>
                <dd className="font-semibold">{isDiploma ? c.qualificationNumber : c.category}</dd>
              </div>
            </dl>
            <div className="mt-6 flex flex-wrap gap-2">
              <a href="#inquiry" className="btn btn-dark">{isDiploma ? "Check my eligibility" : "Ask about the next batch"}</a>
              <a href={whatsappLink(`Hello MHEC, I'm interested in ${c.title}. Please share the details and fees.`)} target="_blank" rel="noopener" className="btn btn-outline">
                WhatsApp
              </a>
            </div>
          </div>
        }
      />

      <section className="py-16">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {c.outcomes.length > 0 && (
              <>
                <h2 className="text-h2">What you&apos;ll achieve</h2>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {c.outcomes.map((o) => (
                    <li key={o} className="flex gap-3 rounded-xl bg-mist p-4"><Tick />{o}</li>
                  ))}
                </ul>
              </>
            )}

            <h2 className={`${c.outcomes.length ? "mt-14" : ""} text-h2`}>{isDiploma ? "Units" : "Syllabus"}</h2>
            <ol className="mt-6 divide-y divide-line rounded-panel ring-1 ring-line">
              {c.modules.map((m, i) => (
                <Reveal as="li" key={m} delay={Math.min(i, 8) * 40} className="flex items-start gap-4 p-5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink font-display text-sm font-bold text-white" aria-hidden="true">
                    {i + 1}
                  </span>
                  <span className="pt-1.5 font-medium">{m}</span>
                </Reveal>
              ))}
            </ol>

            {isDiploma && c.entry && (
              <>
                <h2 className="mt-14 text-h2">Entry requirements</h2>
                <ul className="mt-5 space-y-2">
                  {c.entry.map((e) => <li key={e} className="flex gap-3"><Tick />{e}</li>)}
                </ul>
              </>
            )}

            {isDiploma && c.progression && (
              <>
                <h2 className="mt-14 text-h2">Where it leads</h2>
                <ul className="mt-5 space-y-2">
                  {c.progression.map((e) => <li key={e} className="flex gap-3"><Tick />{e}</li>)}
                </ul>
                <p className="mt-4 text-sm text-stone">Each university assesses applicants individually and may set further entry requirements.</p>
              </>
            )}

            {c.audience.length > 0 && (
              <>
                <h2 className="mt-14 text-h2">Who it&apos;s for</h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {c.audience.map((a) => (
                    <li key={a} className="rounded-xl p-4 ring-1 ring-line">{a}</li>
                  ))}
                </ul>
              </>
            )}

            <h2 className="mt-14 text-h2">{isDiploma ? "Qualification" : "Certificate"}</h2>
            <p className="mt-4 text-lg text-stone max-w-[60ch]">{c.certificate}</p>
            {isDiploma && c.tqt && <p className="mt-2 text-stone">{c.credits} — {c.tqt}.</p>}
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="rounded-panel bg-mist p-7 lg:sticky lg:top-32">
              <h2 className="font-display text-xl font-semibold">How you study</h2>
              <ul className="mt-4 space-y-4">
                {onlineStudyOptions.map((o) => (
                  <li key={o.title}>
                    <p className="font-semibold">{o.title}</p>
                    <p className="text-sm text-stone">{o.body}</p>
                  </li>
                ))}
              </ul>
              {pairsWith.length > 0 && (
                <div className="mt-6 border-t border-line pt-5">
                  <p className="font-semibold">Pairs well with</p>
                  <ul className="mt-2 space-y-1.5">
                    {pairsWith.map((p) => (
                      <li key={p.slug}><Link href={`/pathway-programs/${p.slug}`} className="link">{p.title}</Link></li>
                    ))}
                  </ul>
                </div>
              )}
              {related.length > 0 && (
                <div className="mt-6 border-t border-line pt-5">
                  <p className="font-semibold">More in {c.category}</p>
                  <ul className="mt-2 space-y-1.5">
                    {related.map((r) => (
                      <li key={r.slug}><Link href={`/online-programs/${r.slug}`} className="link">{r.title}</Link></li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </aside>
        </div>
      </section>

      {c.faqs.length > 0 && (
        <div className="border-t border-line">
          <Faq items={c.faqs} title={`${c.title}: questions`} />
        </div>
      )}

      <section id="inquiry" className="scroll-mt-28 bg-mist py-20">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="text-h2">{isDiploma ? `Enrol in the ${c.title}` : `Join the next ${c.title} batch`}</h2>
            <p className="mt-4 text-lg text-stone">
              {isDiploma ? "Tell us your current qualification and we'll confirm your eligibility and study plan." : "We'll send batch dates, class timings and the fee."}
            </p>
          </div>
          <div className="lg:col-span-7">
            <InquiryForm section="online" defaultCourse={c.title} title={`Ask about ${c.title}`} />
          </div>
        </div>
      </section>
    </>
  );
}
