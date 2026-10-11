import Link from "next/link";
import HeroBanner, { type Slide } from "@/components/HeroBanner";
import StatsBand from "@/components/StatsBand";
import Marquee from "@/components/Marquee";
import SkillPlanner from "@/components/SkillPlanner";
import PathFinder from "@/components/PathFinder";
import ProgramExplorer from "@/components/ProgramExplorer";
import DeliveryBadge from "@/components/DeliveryBadge";
import InquiryForm from "@/components/InquiryForm";
import Faq from "@/components/Faq";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";
import {
  sections,
  admissionRoutes,
  admissionSteps,
  pathways,
  corporateFormats,
  corporateAreas,
  onlineStudyOptions,
  deliveryLabels,
  whyMhec,
  faqs,
  courses,
  courseCategories,
  categorySlug,
  type Delivery,
} from "@/lib/programs";
import { getAllPosts, formatDate } from "@/lib/blog";

const slides: Slide[] = [
  {
    label: "Qualification + skills",
    title: "Secure a recognised qualification. Build the skills to use it.",
    body: `For ${site.stats.years} years, MHEC has helped students in Oman earn the qualifications they need — and the practical skills that make those qualifications count at work.`,
    image: "skills",
    primary: { href: "#planner", label: "Plan my qualification and skills" },
    secondary: { href: "/contact", label: "Get free advice" },
  },
  {
    label: "University admissions",
    title: "Get into the right university, in Oman or abroad.",
    body: "Free profile review, university shortlisting, applications, offers and visas — with an advisor at every step.",
    image: "graduates",
    primary: { href: "/university-admissions", label: "See admission services" },
    secondary: { href: "/university-admissions#inquiry", label: "Book a free profile review" },
  },
  {
    label: "Pathway programmes",
    title: "Finish school or bridge the gap to a degree.",
    body: "Grade 10 and 12 completion, GED, foundation, diplomas, UK diplomas, degree top-up and pre-master's routes.",
    image: "library",
    primary: { href: "/pathway-programs", label: "Explore pathways" },
    secondary: { href: "/pathway-programs#inquiry", label: "Check my eligibility" },
  },
  {
    label: "Corporate training",
    title: "Practical training that changes how your team works.",
    body: "Excel and Power BI, AI tools, business English, leadership and more — at your premises in Oman or live online.",
    image: "workshop",
    primary: { href: "/corporate-training", label: "Plan training for my team" },
    secondary: { href: "/corporate-training#inquiry", label: "Request a proposal" },
  },
  {
    label: "Online programmes",
    title: "Professional qualifications and job skills, live online.",
    body: "50+ programmes — ACCA, Excel with AI, Power BI, IELTS, BIM, digital marketing and more — studied live online through MHEC.",
    image: "online",
    primary: { href: "/online-programs", label: "Browse online programmes" },
    secondary: { href: "/online-programs#inquiry", label: "Ask about batches" },
  },
];

export default async function HomePage() {
  const posts = (await getAllPosts()).slice(0, 3);
  const stages = Array.from(new Set(pathways.map((p) => p.stage)));

  return (
    <>
      <HeroBanner slides={slides} />
      <StatsBand />
      <Marquee />

      {/* ---------------- Theme: qualification + skills ---------------- */}
      <section id="planner" className="scroll-mt-28 bg-mist py-20 md:py-28">
        <div className="container-x">
          <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <h2 className="text-h2 lg:col-span-6">A qualification opens the door. Skills take you through it.</h2>
            <p className="text-lg text-stone lg:col-span-6">
              Employers look for both: a recognised qualification and the practical skills to perform from day one. Choose your
              goal and see how MHEC pairs the two.
            </p>
          </Reveal>
          <Reveal className="mt-12" delay={100}>
            <SkillPlanner />
          </Reveal>
        </div>
      </section>

      {/* ---------------- 1. University Admission Services ---------------- */}
      <section id="admissions" className="scroll-mt-28 py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-panel">
              <Photo name="graduates" fill sizes="(min-width: 1024px) 50vw, 100vw" />
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto rounded-xl bg-white/95 p-4 shadow-lg">
                <p className="font-display text-lg font-semibold text-ink">Free profile review</p>
                <p className="text-sm text-stone">Find out which universities you qualify for.</p>
              </div>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-6" delay={100}>
            <h2 className="text-h2">University Admission Services</h2>
            <p className="mt-4 text-lg text-stone">{sections[0].summary}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {admissionRoutes.map((r) => (
                <div key={r.title} className="rounded-xl bg-mist p-5">
                  <h3 className="font-display text-lg font-semibold">{r.title}</h3>
                  <p className="mt-1 text-sm text-stone">{r.body}</p>
                </div>
              ))}
            </div>
            <ol className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm" aria-label="Admission steps">
              {admissionSteps.map((s, i) => (
                <li key={s.title} className="flex items-center gap-2">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-sky text-xs font-bold text-ink" aria-hidden="true">{i + 1}</span>
                  {s.title}
                </li>
              ))}
            </ol>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/university-admissions" className="btn btn-dark">See admission services</Link>
              <Link href="/university-admissions#inquiry" className="btn btn-outline">Book a free profile review</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- 2. Pathway Programmes ---------------- */}
      <section id="pathways" className="scroll-mt-28 border-t border-line py-20 md:py-28">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <Reveal className="lg:col-span-6 lg:order-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-panel">
                <Photo name="library" fill sizes="(min-width: 1024px) 50vw, 100vw" />
              </div>
            </Reveal>
            <Reveal className="lg:col-span-6 lg:order-1" delay={100}>
              <h2 className="text-h2">Pathway Programmes</h2>
              <p className="mt-4 text-lg text-stone">{sections[1].summary}</p>
              <p className="mt-4 text-stone">
                Every pathway leads to a recognised next step — and we recommend the skill programmes to take alongside it.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/pathway-programs" className="btn btn-dark">Explore pathways</Link>
                <Link href="/pathway-programs#inquiry" className="btn btn-outline">Check my eligibility</Link>
              </div>
            </Reveal>
          </div>

          <Reveal className="mt-14">
            <ol className="grid gap-px overflow-hidden rounded-panel bg-line ring-1 ring-line md:grid-cols-5" aria-label="Pathway stages, in order">
              {stages.map((stage, i) => (
                <li key={stage} className="bg-white p-5">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 rounded-full bg-sky" style={{ width: `${(i + 1) * 12}px` }} aria-hidden="true" />
                    <p className="font-display text-lg font-semibold">{stage}</p>
                  </div>
                  <ul className="mt-4 space-y-4">
                    {pathways
                      .filter((p) => p.stage === stage)
                      .map((p) => (
                        <li key={p.slug}>
                          <Link href={`/pathway-programs/${p.slug}`} className="font-semibold hover:text-sky-deep hover:underline underline-offset-4">
                            {p.title}
                          </Link>
                          <div className="mt-1.5"><DeliveryBadge delivery={p.delivery} /></div>
                        </li>
                      ))}
                  </ul>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* ---------------- 3. Corporate Training ---------------- */}
      <section id="corporate" className="scroll-mt-28 relative isolate overflow-hidden bg-ink text-white py-20 md:py-28">
        <div className="absolute inset-y-0 right-0 -z-10 hidden w-1/2 lg:block">
          <Photo name="workshop" fill sizes="50vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/50 to-transparent" />
        </div>
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <h2 className="text-h2">Corporate Training</h2>
            <p className="mt-4 text-lg text-white/75 max-w-[48ch]">{sections[2].summary}</p>
            <ul className="mt-8 space-y-5">
              {corporateFormats.map((f) => (
                <li key={f.title} className="border-l-4 border-sky pl-4">
                  <p className="font-display text-xl font-semibold">{f.title}</p>
                  <p className="text-white/70">{f.body}</p>
                </li>
              ))}
            </ul>
            <ul className="mt-8 flex flex-wrap gap-2">
              {corporateAreas.map((a) => (
                <li key={a.title} className="rounded-full bg-white/10 px-3 py-1.5 text-sm ring-1 ring-white/15">{a.title}</li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/corporate-training" className="btn btn-primary">Plan training for my team</Link>
              <Link href="/corporate-training#inquiry" className="btn btn-outline text-white">Request a proposal</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- 4. Online Programmes ---------------- */}
      <section id="online" className="scroll-mt-28 bg-mist py-20 md:py-28">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <Reveal className="lg:col-span-7">
              <h2 className="text-h2">Online Programmes</h2>
              <p className="mt-4 text-lg text-stone max-w-[56ch]">{sections[3].summary}</p>
              <ul className="mt-6 grid gap-4 sm:grid-cols-3">
                {onlineStudyOptions.map((o) => (
                  <li key={o.title}>
                    <p className="font-display font-semibold">{o.title}</p>
                    <p className="mt-1 text-sm text-stone">{o.body}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal className="lg:col-span-5" delay={100}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-panel">
                <Photo name="online" fill sizes="(min-width: 1024px) 40vw, 100vw" />
                <div className="absolute left-4 top-4"><DeliveryBadge delivery="online" /></div>
              </div>
            </Reveal>
          </div>
          <Reveal className="mt-12">
            <ProgramExplorer limit={6} showSearch={false} />
          </Reveal>
          <Reveal className="mt-10">
            <p className="font-display text-lg font-semibold">Browse {courseCategories.length} subject areas</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {courseCategories.map((cat) => (
                <li key={cat}>
                  <Link href={`/online-programs/category/${categorySlug(cat)}`} className="inline-block rounded-full bg-white px-4 py-2 text-sm font-semibold ring-1 ring-line hover:ring-sky">
                    {cat} <span className="text-stone">{courses.filter((c) => c.category === cat).length}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Delivery modes ---------------- */}
      <section aria-labelledby="delivery-title" className="border-b border-line">
        <div className="container-x py-12 grid gap-6 lg:grid-cols-12 lg:items-center">
          <h2 id="delivery-title" className="lg:col-span-3 font-display text-2xl font-semibold">How programmes are delivered</h2>
          <ul className="lg:col-span-9 grid gap-6 sm:grid-cols-3">
            {(["online", "partner", "blended"] as Delivery[]).map((d) => (
              <li key={d}>
                <DeliveryBadge delivery={d} />
                <p className="mt-2 text-sm text-stone">{deliveryLabels[d].detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- Why MHEC ---------------- */}
      <section className="py-20 md:py-28" aria-labelledby="why-title">
        <div className="container-x">
          <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <h2 id="why-title" className="text-h2 lg:col-span-6">Why students and employers choose MHEC</h2>
            <p className="text-lg text-stone lg:col-span-6">
              {site.stats.years} years in Muscat and {site.stats.studentsLabel} students later, our approach is the same: the right
              qualification, the right skills and honest advice.
            </p>
          </Reveal>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyMhec.map((w, i) => (
              <Reveal as="li" key={w.title} delay={i * 60} className="card-lift rounded-panel bg-white p-7 ring-1 ring-line">
                <span className="block h-1 w-10 rounded-full bg-sky" aria-hidden="true" />
                <h3 className="mt-5 text-h3">{w.title}</h3>
                <p className="mt-2 text-stone">{w.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- Find your route ---------------- */}
      <section className="relative isolate overflow-hidden bg-ink py-20 md:py-28" aria-labelledby="finder-heading">
        <div className="absolute inset-0 -z-10 opacity-30">
          <Photo name="mentoring" fill sizes="100vw" />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/90 to-ink/70" />
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-6 text-white">
            <h2 id="finder-heading" className="text-h2">Not sure where to start?</h2>
            <p className="mt-4 text-lg text-white/80 max-w-[46ch]">
              Tell us where you are today. We&apos;ll point you to the right route — and an advisor can build a personal plan for you, free.
            </p>
            <Link href="/about" className="mt-6 inline-block font-semibold text-sky-light underline underline-offset-4">
              Read about MHEC&apos;s {site.stats.years} years in Muscat
            </Link>
          </Reveal>
          <Reveal className="lg:col-span-6" delay={100}>
            <PathFinder />
          </Reveal>
        </div>
      </section>

      {/* ---------------- Blog ---------------- */}
      {posts.length > 0 && (
        <section className="py-20" aria-labelledby="blog-title">
          <div className="container-x">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 id="blog-title" className="text-h2">Guides for students</h2>
              <Link href="/blog" className="link">All articles</Link>
            </div>
            <ul className="mt-10 grid gap-6 md:grid-cols-3">
              {posts.map((p, i) => (
                <Reveal as="li" key={p.slug} delay={i * 80}>
                  <Link href={`/blog/${p.slug}`} className="card-lift group block h-full rounded-panel bg-white p-6 ring-1 ring-line">
                    <p className="text-sm text-sky-deep font-semibold">{p.category}</p>
                    <h3 className="mt-2 font-display text-xl font-semibold leading-snug group-hover:underline underline-offset-4">{p.title}</h3>
                    <p className="mt-2 text-stone text-[0.975rem]">{p.description}</p>
                    <p className="mt-4 text-sm text-stone">
                      <time dateTime={p.date}>{formatDate(p.date)}</time>, {p.readingMinutes} min read
                    </p>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      <div className="bg-mist/60 border-t border-line">
        <Faq items={faqs.general} />
      </div>

      {/* ---------------- Inquiry ---------------- */}
      <section id="inquiry" className="scroll-mt-28 bg-ink py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5 text-white">
            <h2 className="text-h2">Plan your qualification and skills with an advisor</h2>
            <p className="mt-4 text-lg text-white/75 max-w-[44ch]">
              Tell us where you are now and where you want to be. We&apos;ll recommend the programmes you qualify for — free, with
              no obligation.
            </p>
            <ul className="mt-8 space-y-3 text-white/80">
              <li>Call <a href={site.contact.phoneHref} className="font-semibold text-white underline">{site.contact.phoneDisplay}</a></li>
              <li>Email <a href={`mailto:${site.contact.email}`} className="font-semibold text-white underline">{site.contact.email}</a></li>
            </ul>
          </div>
          <div className="lg:col-span-7">
            <InquiryForm tone="dark" />
          </div>
        </div>
      </section>
    </>
  );
}
