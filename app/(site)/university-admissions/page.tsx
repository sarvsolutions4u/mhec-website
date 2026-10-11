import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import DeliveryBadge from "@/components/DeliveryBadge";
import InquiryForm from "@/components/InquiryForm";
import Faq from "@/components/Faq";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import {
  admissionLevels,
  admissionRoutes,
  admissionSteps,
  admissionDocuments,
  studyDestinations,
  partnerUniversities,
  courses,
  faqs,
  sections,
} from "@/lib/programs";
import { whatsappLink } from "@/lib/site";

const s = sections[0];
const prepCourses = ["ielts", "business-communication", "excel-with-ai", "python-with-ai"].map((slug) => courses.find((c) => c.slug === slug)!);

export const metadata: Metadata = {
  title: "University Admission Services in Oman — Study in Oman, GCC & Abroad",
  description:
    "Get admitted to the right university in Oman, the GCC, the UK, Malaysia, India and more. MHEC reviews your profile, shortlists universities, prepares your application and helps with offers and visas. Free profile review.",
  alternates: { canonical: s.href },
  openGraph: { title: "University Admission Services | MHEC Muscat", url: s.href },
};

export default function Page() {
  return (
    <>
      <PageHero
        image="graduates"
        title={s.title}
        intro="Choose a recognised university and programme with confidence. We review your profile, compare your options, prepare your application and stay with you through offers, visas and enrolment."
        crumbs={[{ name: s.short, path: s.href }]}
        aside={
          <div className="rounded-panel bg-white p-6 shadow-xl">
            <p className="font-display text-xl font-semibold">Free profile review</p>
            <p className="mt-2 text-stone">Send your marks and goals. We&apos;ll tell you which universities and levels you qualify for.</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <a href="#inquiry" className="btn btn-dark">Book my review</a>
              <a href={whatsappLink("Hello MHEC, I'd like a free profile review for university admission.")} target="_blank" rel="noopener" className="btn btn-outline">
                WhatsApp
              </a>
            </div>
          </div>
        }
      />

      {/* In-page navigation */}
      <nav aria-label="On this page" className="sticky top-[4.5rem] md:top-[6.75rem] z-30 border-b border-line bg-white/95 backdrop-blur">
        <ul className="container-x flex gap-6 overflow-x-auto py-3 text-sm font-semibold whitespace-nowrap">
          {[
            ["routes", "Study options"],
            ["destinations", "Destinations"],
            ["levels", "Levels"],
            ["process", "How it works"],
            ["documents", "Documents"],
            ["skills", "Skills to add"],
            ["inquiry", "Apply"],
          ].map(([id, label]) => (
            <li key={id}><a href={`#${id}`} className="text-stone hover:text-sky-deep">{label}</a></li>
          ))}
        </ul>
      </nav>

      <section className="py-16">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <h2 className="text-h2 lg:col-span-4">What the service includes</h2>
          <div className="lg:col-span-8 prose-mhec">
            <p>
              MHEC&apos;s university admission service covers every step from choosing a programme to your first day. We review
              your qualifications, compare universities on recognition, fees, duration, location and entry requirements,
              prepare and submit your application, and help you accept your offer, complete visa steps where needed and enrol.
            </p>
            <p>
              Because a qualification works best with practical skills, we also recommend short skill programmes — English,
              Excel, AI and more — to complete before your studies start.
            </p>
          </div>
        </div>
      </section>

      <section id="routes" className="scroll-mt-40 border-t border-line py-20">
        <div className="container-x">
          <h2 className="text-h2">Two ways to study for a degree</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {admissionRoutes.map((r, i) => (
              <Reveal key={r.title} delay={i * 80} className="card-lift overflow-hidden rounded-panel bg-white ring-1 ring-line">
                <div className="relative aspect-[16/7]">
                  <Photo name={i === 0 ? "muscat" : "graduates"} fill sizes="(min-width: 768px) 50vw, 100vw" />
                </div>
                <div className="p-7">
                  <DeliveryBadge delivery={r.delivery} />
                  <h3 className="mt-4 text-h3">{r.title}</h3>
                  <p className="mt-2 text-stone">{r.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="destinations" className="scroll-mt-40 bg-mist py-20">
        <div className="container-x">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <h2 className="text-h2 lg:col-span-6">Study destinations</h2>
            <p className="text-lg text-stone lg:col-span-6">We advise on universities across these destinations and help you compare them side by side.</p>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {studyDestinations.map((d, i) => (
              <Reveal as="li" key={d.name} delay={i * 50} className="card-lift rounded-panel bg-white p-6 ring-1 ring-line">
                <p className="font-display text-2xl font-semibold">{d.name}</p>
                <p className="mt-2 text-stone">{d.note}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section id="levels" className="scroll-mt-40 py-20">
        <div className="container-x">
          <h2 className="text-h2">Levels we help with</h2>
          <div className="mt-10 overflow-x-auto rounded-panel ring-1 ring-line">
            <table className="w-full min-w-[640px] text-left">
              <thead className="bg-ink text-white">
                <tr>
                  <th scope="col" className="p-4 font-semibold">Level</th>
                  <th scope="col" className="p-4 font-semibold">Examples</th>
                  <th scope="col" className="p-4 font-semibold">Right for you if</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {admissionLevels.map((l) => (
                  <tr key={l.title}>
                    <th scope="row" className="p-4 font-display text-lg font-semibold">{l.title}</th>
                    <td className="p-4">{l.examples}</td>
                    <td className="p-4 text-stone">{l.forWho}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-stone">
            Not yet eligible for direct entry? See our <Link href="/pathway-programs" className="link">pathway programmes</Link>.
          </p>
        </div>
      </section>

      <section id="process" className="scroll-mt-40 bg-ink text-white py-20">
        <div className="container-x">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <h2 className="text-h2 lg:col-span-6">How admission works</h2>
            <p className="text-lg text-white/70 lg:col-span-6">Five steps, with an advisor beside you at each one.</p>
          </div>
          <ol className="mt-12 grid gap-6 md:grid-cols-5">
            {admissionSteps.map((st, i) => (
              <Reveal as="li" key={st.title} delay={i * 80}>
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-sky font-display text-lg font-bold text-ink" aria-hidden="true">{i + 1}</span>
                  {i < admissionSteps.length - 1 && <span className="hidden md:block h-0.5 flex-1 bg-white/20" aria-hidden="true" />}
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold">{st.title}</h3>
                <p className="mt-1 text-white/70">{st.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section id="documents" className="scroll-mt-40 py-20">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="text-h2">Documents checklist</h2>
            <p className="mt-4 text-lg text-stone">
              Requirements vary by university and programme. This is the typical list — your advisor gives you the exact one for
              your application.
            </p>
          </div>
          <ul className="lg:col-span-7 grid gap-3">
            {admissionDocuments.map((d) => (
              <li key={d} className="flex gap-3 rounded-xl bg-mist p-4">
                <svg className="mt-0.5 h-5 w-5 shrink-0 text-sky-deep" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M4 10.5l4 4 8-9" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {d}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="skills" className="scroll-mt-40 border-t border-line bg-mist py-20">
        <div className="container-x">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <h2 className="text-h2 lg:col-span-6">Arrive at university with skills, not just an offer</h2>
            <p className="text-lg text-stone lg:col-span-6">Short online programmes our admission students often take before their first semester.</p>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {prepCourses.map((c) => (
              <li key={c.slug}>
                <Link href={`/online-programs/${c.slug}`} className="card-lift block h-full rounded-panel bg-white p-6 ring-1 ring-line">
                  <p className="text-sm font-semibold text-sky-deep">{c.kind}</p>
                  <p className="mt-1 font-display text-xl font-semibold">{c.title}</p>
                  <p className="mt-2 text-sm text-stone">{c.summary}</p>
                  <p className="mt-4 text-sm font-semibold">{c.duration}, live online</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {partnerUniversities.length > 0 && (
        <section className="py-20">
          <div className="container-x">
            <h2 className="text-h2">University partners</h2>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {partnerUniversities.map((u) => (
                <li key={u.name} className="rounded-panel p-6 ring-1 ring-line">
                  <p className="font-display text-xl font-semibold">{u.name}</p>
                  <p className="text-sm text-sky-deep font-semibold">{u.country}</p>
                  <p className="mt-2 text-stone">{u.note}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="border-y border-line bg-white py-14">
        <div className="container-x grid gap-6 lg:grid-cols-12 lg:items-center">
          <h2 className="lg:col-span-4 font-display text-2xl font-semibold">Recognition, explained before you apply</h2>
          <p className="lg:col-span-8 text-stone text-lg">
            Recognition depends on the university and the programme. Before you pay any fee, we explain how the qualification
            can be used for employment and further study in Oman, and any attestation or equivalency steps that may apply.
          </p>
        </div>
      </section>

      <Faq items={faqs.admissions} title="Admission questions" />

      <section id="inquiry" className="scroll-mt-40 bg-mist py-20">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="text-h2">Start your application</h2>
            <p className="mt-4 text-lg text-stone">Send your details and an advisor will contact you for your free profile review.</p>
          </div>
          <div className="lg:col-span-7">
            <InquiryForm section="admissions" title="Book a free profile review" />
          </div>
        </div>
      </section>
    </>
  );
}
