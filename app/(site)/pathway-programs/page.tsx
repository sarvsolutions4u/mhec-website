import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import DeliveryBadge from "@/components/DeliveryBadge";
import InquiryForm from "@/components/InquiryForm";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import { pathways, faqs, sections, deliveryLabels, courses, type Delivery } from "@/lib/programs";
import { courseListSchema } from "@/lib/schema";

const s = sections[1];

export const metadata: Metadata = {
  title: "Pathway Programmes in Oman — School Completion, GED, Foundation, Diploma & Top-up",
  description:
    "Finish Grade 10 or 12, prepare for the GED or IELTS, or move into a degree through foundation, diploma, top-up and pre-master's routes — with skill programmes alongside. Online through MHEC or with partner universities.",
  alternates: { canonical: s.href },
  openGraph: { title: "Pathway Programmes | MHEC Muscat", url: s.href },
};

export default function Page() {
  const stages = Array.from(new Set(pathways.map((p) => p.stage)));
  return (
    <>
      <JsonLd data={courseListSchema(pathways.map((p) => ({ name: p.title, path: `${s.href}/${p.slug}`, description: p.body })))} />
      <PageHero
        image="library"
        title={s.title}
        intro="Wherever you are starting from, there is a route to a recognised qualification. Finish school, meet entry requirements or use earlier study to complete a degree faster — and build job-ready skills along the way."
        crumbs={[{ name: s.short, path: s.href }]}
      >
        <a href="#inquiry" className="btn btn-primary">Check my eligibility</a>
        <a href="#routes" className="btn btn-outline">See all routes</a>
      </PageHero>

      <section className="py-16">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <h2 className="text-h2 lg:col-span-4">What is a pathway programme?</h2>
          <div className="lg:col-span-8 prose-mhec">
            <p>
              A pathway programme is a step that takes you from your current qualification to the next one. If you left school
              early, it lets you complete Grade 10 or 12. If your marks or English score are not yet enough for direct entry, it
              brings you up to the required level. If you already hold a diploma, it can let you join a degree in a later year.
            </p>
            <p>Every route below shows who it is for, how it is delivered, what it leads to and the skills we recommend alongside it.</p>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-mist py-8" aria-label="Delivery modes">
        <ul className="container-x grid gap-4 sm:grid-cols-3">
          {(["online", "blended", "partner"] as Delivery[]).map((d) => (
            <li key={d}>
              <DeliveryBadge delivery={d} />
              <p className="mt-2 text-sm text-stone">{deliveryLabels[d].detail}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="routes" className="py-20 scroll-mt-28">
        <div className="container-x space-y-16">
          {stages.map((stage, si) => (
            <div key={stage} className="grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-3">
                <p className="text-sm text-stone">Stage {si + 1} of {stages.length}</p>
                <h2 className="font-display text-3xl font-semibold">{stage}</h2>
              </div>
              <div className="lg:col-span-9 grid gap-6 md:grid-cols-2">
                {pathways
                  .filter((p) => p.stage === stage)
                  .map((p, i) => (
                    <Reveal key={p.slug} delay={i * 80} className="h-full">
                      <Link href={`/pathway-programs/${p.slug}`} id={p.slug} className="card-lift group flex h-full flex-col rounded-panel bg-white p-7 ring-1 ring-line scroll-mt-28">
                        <DeliveryBadge delivery={p.delivery} />
                        <h3 className="mt-4 text-h3 group-hover:text-sky-deep">{p.title}</h3>
                        <p className="mt-2 text-stone">{p.body}</p>
                        <dl className="mt-5 grid gap-3 text-[0.95rem]">
                          <div>
                            <dt className="font-semibold">Leads to</dt>
                            <dd className="text-stone">{p.leadsTo}</dd>
                          </div>
                          <div>
                            <dt className="font-semibold">Skills to add</dt>
                            <dd className="text-stone">{p.skills.map((sl) => courses.find((c) => c.slug === sl)?.title).join(", ")}</dd>
                          </div>
                        </dl>
                        <span className="mt-auto pt-5 font-semibold text-sky-deep underline underline-offset-4">Full details</span>
                      </Link>
                    </Reveal>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="border-t border-line">
        <Faq items={faqs.pathways} title="Pathway questions" />
      </div>

      <section id="inquiry" className="scroll-mt-28 bg-mist py-20">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="text-h2">Find your starting point</h2>
            <p className="mt-4 text-lg text-stone">
              Tell us your last completed qualification. We&apos;ll recommend the pathway that gets you to your goal in the fewest steps.
            </p>
          </div>
          <div className="lg:col-span-7">
            <InquiryForm section="pathways" title="Check my eligibility" />
          </div>
        </div>
      </section>
    </>
  );
}
