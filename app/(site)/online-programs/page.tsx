import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import ProgramExplorer from "@/components/ProgramExplorer";
import DeliveryBadge from "@/components/DeliveryBadge";
import InquiryForm from "@/components/InquiryForm";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import Photo from "@/components/Photo";
import Counter from "@/components/Counter";
import Reveal from "@/components/Reveal";
import { courses, courseCategories, categorySlug, categoryIntro, headlineCounts, onlineStudyOptions, faqs, sections } from "@/lib/programs";
import { courseListSchema } from "@/lib/schema";

const s = sections[3];

export const metadata: Metadata = {
  title: "50+ Online Programmes — ACCA, Excel, Power BI, IELTS, BIM, OTHM Diplomas & More",
  description:
    "Over 50 online skill and professional programmes taught live through MHEC: AI, accounting, data analytics, digital marketing, exam preparation, languages, soft skills, management, BIM & CAD and UK OTHM diplomas.",
  alternates: { canonical: s.href },
  openGraph: { title: "Online Programmes | MHEC Muscat", url: s.href },
};

export default function Page() {
  const stats = [
    { label: "Online skill and professional programmes", ...headlineCounts.onlineProgrammes },
    { label: "Subject areas", value: courseCategories.length, suffix: "" },
    { label: "Professional qualifications", value: courses.filter((c) => c.kind === "Professional qualification").length, suffix: "" },
    { label: "UK OTHM diplomas", value: courses.filter((c) => c.kind === "UK diploma").length, suffix: "" },
  ];
  const othm = courses.filter((c) => c.kind === "UK diploma");

  return (
    <>
      <JsonLd data={courseListSchema(courses.map((c) => ({ name: c.title, path: `/online-programs/${c.slug}`, description: c.summary })))} />
      <PageHero
        image="online"
        title={s.title}
        intro="More than 50 skill and professional programmes, delivered online through MHEC: live classes with a trainer, recordings of every session and an advisor who checks your progress."
        crumbs={[{ name: s.short, path: s.href }]}
      >
        <a href="#courses" className="btn btn-primary">Find your programme</a>
        <a href="#subjects" className="btn btn-outline">Browse by subject</a>
      </PageHero>

      <section aria-label="Online programmes in numbers" className="border-b border-line">
        <div className="container-x">
        <dl className="grid grid-cols-2 md:grid-cols-4 gap-px bg-line">
          {stats.map((k) => (
            <div key={k.label} className="bg-white py-8 px-5 first:pl-0 max-md:[&:nth-child(odd)]:pl-0 md:[&:not(:first-child)]:pl-8">
              <div className="flex flex-col-reverse">
                <dt className="mt-2 text-stone">{k.label}</dt>
                <dd className="font-display text-5xl font-bold"><Counter value={k.value} suffix={k.suffix} /></dd>
              </div>
            </div>
          ))}
        </dl>
        </div>
      </section>

      <section id="subjects" className="scroll-mt-28 py-20">
        <div className="container-x">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <h2 className="text-h2 lg:col-span-6">Browse by subject</h2>
            <p className="text-lg text-stone lg:col-span-6">Eleven subject areas, from AI and accounting to BIM and UK diplomas.</p>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {courseCategories.map((cat, i) => {
              const n = courses.filter((c) => c.category === cat).length;
              return (
                <Reveal as="li" key={cat} delay={Math.min(i, 6) * 40}>
                  <Link href={`/online-programs/category/${categorySlug(cat)}`} className="card-lift group flex h-full flex-col rounded-panel bg-white p-6 ring-1 ring-line">
                    <div className="flex items-baseline justify-between gap-4">
                      <p className="font-display text-xl font-semibold group-hover:text-sky-deep">{cat}</p>
                      <span className="shrink-0 rounded-full bg-mist px-2.5 py-0.5 text-sm font-semibold text-sky-deep">
                        {n} {n === 1 ? "programme" : "programmes"}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-stone">{categoryIntro[cat]}</p>
                  </Link>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      <section id="courses" className="scroll-mt-28 py-16 bg-mist/60 border-y border-line">
        <div className="container-x">
          <h2 className="text-h2">Find your programme</h2>
          <p className="mt-3 text-stone max-w-[60ch]">Search by name or topic, or filter by subject. Select a programme for the full syllabus.</p>
          <div className="mt-8">
            <ProgramExplorer />
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-ink text-white py-20">
        <div className="absolute inset-0 -z-10 opacity-25"><Photo name="graduates" fill sizes="100vw" /></div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/90 to-ink/60" />
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <DeliveryBadge delivery="othm" />
            <h2 className="mt-4 text-h2">UK diplomas from OTHM</h2>
            <p className="mt-4 text-lg text-white/75">
              Ofqual-regulated UK qualifications from Level 3 to Level 7. Study online and use your credits to top up to a UK
              bachelor&apos;s degree or an MBA.
            </p>
            <Link href="/pathway-programs/othm-diplomas" className="btn btn-primary mt-6">How OTHM pathways work</Link>
          </div>
          <ul className="lg:col-span-7 grid gap-3">
            {othm.map((d) => (
              <li key={d.slug}>
                <Link href={`/online-programs/${d.slug}`} className="flex items-center justify-between gap-4 rounded-xl bg-white/5 px-5 py-4 ring-1 ring-white/15 hover:bg-white/10">
                  <span className="font-semibold">{d.title}</span>
                  <span className="shrink-0 text-sm text-white/60">{d.duration}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-panel">
              <Photo name="mentoring" fill sizes="(min-width: 1024px) 50vw, 100vw" />
              <div className="absolute left-4 top-4"><DeliveryBadge delivery="online" /></div>
            </div>
          </div>
          <div className="lg:col-span-6">
            <h2 className="text-h2">What studying online with MHEC looks like</h2>
            <ul className="mt-6 space-y-5">
              {onlineStudyOptions.map((o) => (
                <li key={o.title} className="border-l-4 border-sky pl-4">
                  <h3 className="font-display text-xl font-semibold">{o.title}</h3>
                  <p className="text-stone">{o.body}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-stone">
              All you need is a laptop or desktop, a stable internet connection and a headset with a microphone. Evening and
              weekend batches are available for many programmes.
            </p>
          </div>
        </div>
      </section>

      <div className="border-t border-line">
        <Faq items={faqs.online} title="Online study questions" />
      </div>

      <section id="inquiry" className="scroll-mt-28 bg-mist py-20">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="text-h2">Ask about batches and fees</h2>
            <p className="mt-4 text-lg text-stone">We&apos;ll send the next batch dates, timings and fee for the programme you choose.</p>
          </div>
          <div className="lg:col-span-7">
            <InquiryForm section="online" title="Ask about a programme" />
          </div>
        </div>
      </section>
    </>
  );
}
