import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import DeliveryBadge from "@/components/DeliveryBadge";
import InquiryForm from "@/components/InquiryForm";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import { pathways, courses, deliveryLabels, othmDiplomas } from "@/lib/programs";
import { absoluteUrl, site, whatsappLink } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return pathways.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = pathways.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: `${p.title} in Oman`,
    description: `${p.body} Leads to: ${p.leadsTo}. ${deliveryLabels[p.delivery].label}.`,
    alternates: { canonical: `/pathway-programs/${p.slug}` },
    openGraph: { title: `${p.title} | MHEC Muscat`, url: `/pathway-programs/${p.slug}` },
  };
}

export default async function PathwayPage({ params }: Props) {
  const { slug } = await params;
  const idx = pathways.findIndex((x) => x.slug === slug);
  if (idx < 0) notFound();
  const p = pathways[idx];
  const next = pathways[idx + 1];
  const skillCourses = p.skills.map((sl) => courses.find((c) => c.slug === sl)!).filter(Boolean);
  const othm = othmDiplomas;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Course",
          name: p.title,
          description: p.body,
          url: absoluteUrl(`/pathway-programs/${p.slug}`),
          provider: { "@type": "EducationalOrganization", name: site.name, "@id": `${site.url}/#organization` },
          hasCourseInstance: {
            "@type": "CourseInstance",
            courseMode: p.delivery === "partner" ? "onsite" : p.delivery === "blended" ? "blended" : "online",
          },
        }}
      />
      <PageHero
        image="library"
        title={p.title}
        intro={p.body}
        crumbs={[
          { name: "Pathway Programmes", path: "/pathway-programs" },
          { name: p.title, path: `/pathway-programs/${p.slug}` },
        ]}
        aside={
          <div className="rounded-panel bg-white p-6 shadow-xl">
            <DeliveryBadge delivery={p.delivery} />
            <dl className="mt-5 space-y-4">
              <div>
                <dt className="text-sm text-stone">Stage</dt>
                <dd className="font-semibold">{p.stage}</dd>
              </div>
              <div>
                <dt className="text-sm text-stone">Duration</dt>
                <dd className="font-semibold">{p.duration}</dd>
              </div>
              <div>
                <dt className="text-sm text-stone">Leads to</dt>
                <dd className="font-semibold">{p.leadsTo}</dd>
              </div>
            </dl>
            <div className="mt-6 flex flex-wrap gap-2">
              <a href="#inquiry" className="btn btn-dark">Check my eligibility</a>
              <a href={whatsappLink(`Hello MHEC, I'm interested in ${p.title}. Please advise me.`)} target="_blank" rel="noopener" className="btn btn-outline">
                WhatsApp
              </a>
            </div>
          </div>
        }
      />

      <section className="py-16">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="text-h2">Overview</h2>
            <div className="prose-mhec mt-5">
              {p.overview.map((para) => <p key={para}>{para}</p>)}
            </div>
            <h2 className="mt-12 text-h2">Who it&apos;s for</h2>
            <p className="mt-4 text-lg text-stone max-w-[60ch]">{p.forWho}</p>

            <h2 className="mt-12 text-h2">How it works</h2>
            <ol className="mt-6 space-y-5">
              {p.structure.map((st, i) => (
                <Reveal as="li" key={st.title} delay={i * 60} className="grid grid-cols-[2.75rem_1fr] gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-mist font-display text-lg font-bold text-sky-deep ring-2 ring-sky" aria-hidden="true">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold">{st.title}</h3>
                    <p className="text-stone">{st.body}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>

          <aside className="lg:col-span-4 lg:col-start-9 space-y-6">
            <div className="rounded-panel bg-mist p-7">
              <h2 className="font-display text-xl font-semibold">Eligibility</h2>
              <ul className="mt-3 list-disc space-y-1.5 pl-5">
                {p.eligibility.map((e) => <li key={e}>{e}</li>)}
              </ul>
            </div>
            <div className="rounded-panel p-7 ring-1 ring-line">
              <h2 className="font-display text-xl font-semibold">What you achieve</h2>
              <ul className="mt-3 space-y-2">
                {p.outcomes.map((o) => (
                  <li key={o} className="flex gap-2">
                    <svg className="mt-1 h-4 w-4 shrink-0 text-sky-deep" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M4 10.5l4 4 8-9" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {o}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-panel p-7 ring-1 ring-line">
              <h2 className="font-display text-xl font-semibold">How it&apos;s delivered</h2>
              <p className="mt-2 text-stone">{deliveryLabels[p.delivery].detail}</p>
            </div>
          </aside>
        </div>
      </section>

      {p.slug === "uk-diplomas" && (
        <section className="border-t border-line bg-mist py-20">
          <div className="container-x">
            <h2 className="text-h2">Example UK diplomas</h2>
            <p className="mt-3 max-w-[62ch] text-stone">These OTHM diplomas show how the levels work. Equivalent Qualifi diplomas and other subjects are available — ask an advisor. Select a diploma for its units, entry requirements and progression.</p>
            <div className="mt-8 overflow-x-auto rounded-panel bg-white ring-1 ring-line">
              <table className="w-full min-w-[720px] text-left">
                <thead className="bg-ink text-white">
                  <tr>
                    <th scope="col" className="p-4 font-semibold">Diploma</th>
                    <th scope="col" className="p-4 font-semibold">Credits</th>
                    <th scope="col" className="p-4 font-semibold">Leads to</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {othm.map((d) => (
                    <tr key={d.slug}>
                      <th scope="row" className="p-4">
                        <a href={`#${d.slug}`} className="link">{d.title}</a>
                        <span className="block text-sm font-normal text-stone">Ofqual number {d.qualificationNumber}</span>
                      </th>
                      <td className="p-4">{d.credits}</td>
                      <td className="p-4 text-stone">{d.progression?.find((x) => /bachelor|MBA|Year/.test(x)) ?? d.progression?.[0]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-12 space-y-4">
              {othm.map((d) => (
                <details key={d.slug} id={d.slug} className="group scroll-mt-28 rounded-panel bg-white ring-1 ring-line open:shadow-[0_20px_40px_-28px_rgba(35,31,32,0.35)]">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 p-6 [&::-webkit-details-marker]:hidden">
                    <span>
                      <span className="block font-display text-xl font-semibold">{d.title}</span>
                      <span className="mt-1 block text-stone">{d.summary}</span>
                      <span className="mt-2 block text-sm text-stone">{d.credits} · Ofqual {d.qualificationNumber}</span>
                    </span>
                    <span aria-hidden="true" className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-mist text-sky-deep transition-transform group-open:rotate-45">
                      <svg width="12" height="12" viewBox="0 0 12 12"><path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                    </span>
                  </summary>
                  <div className="grid gap-8 border-t border-line p-6 md:grid-cols-3">
                    <div>
                      <h3 className="font-display text-lg font-semibold">Units</h3>
                      <ol className="mt-2 list-decimal space-y-1 pl-5 text-[0.95rem]">
                        {d.modules.map((m) => <li key={m}>{m}</li>)}
                      </ol>
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold">Entry requirements</h3>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-[0.95rem]">
                        {d.entry.map((e) => <li key={e}>{e}</li>)}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold">Where it leads</h3>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-[0.95rem]">
                        {d.progression.map((e) => <li key={e}>{e}</li>)}
                      </ul>
                      <p className="mt-3 text-sm text-stone">{d.tqt}</p>
                    </div>
                  </div>
                </details>
              ))}
            </div>
            <p className="mt-4 text-sm text-stone">The diplomas above are awarded by OTHM; Qualifi diplomas are awarded by Qualifi. Both are regulated by Ofqual. Each university assesses applicants individually.</p>
          </div>
        </section>
      )}

      <section className="bg-ink text-white py-20">
        <div className="container-x">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <h2 className="text-h2 lg:col-span-6">Add these skills alongside</h2>
            <p className="text-lg text-white/70 lg:col-span-6">
              A qualification gets you in; skills help you perform. These live online programmes pair well with this pathway.
            </p>
          </div>
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {skillCourses.map((c) => (
              <li key={c.slug}>
                <Link href={`/online-programs/${c.slug}`} className="card-lift block h-full rounded-panel bg-white/5 p-6 ring-1 ring-white/15 hover:bg-white/10">
                  <p className="text-sm font-semibold text-sky-light">{c.category}</p>
                  <p className="mt-1 font-display text-xl font-semibold">{c.title}</p>
                  <p className="mt-2 text-sm text-white/70">{c.summary}</p>
                  <p className="mt-4 text-sm font-semibold">{c.duration}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {next && (
        <section className="border-b border-line py-10">
          <div className="container-x flex flex-wrap items-center justify-between gap-4">
            <p className="text-stone">Next step on the pathway</p>
            <Link href={`/pathway-programs/${next.slug}`} className="font-display text-2xl font-semibold hover:text-sky-deep">
              {next.title}
            </Link>
          </div>
        </section>
      )}

      <section id="inquiry" className="scroll-mt-28 bg-mist py-20">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="text-h2">Ask about {p.title.toLowerCase()}</h2>
            <p className="mt-4 text-lg text-stone">Tell us your last completed qualification and we&apos;ll confirm your eligibility.</p>
          </div>
          <div className="lg:col-span-7">
            <InquiryForm section="pathways" defaultCourse={p.title} title="Check my eligibility" />
          </div>
        </div>
      </section>
    </>
  );
}
