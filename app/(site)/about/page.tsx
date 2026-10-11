import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import StatsBand from "@/components/StatsBand";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";
import { sections, whyMhec } from "@/lib/programs";

export const metadata: Metadata = {
  title: "About MHEC — 25 Years of Qualifications and Skills in Muscat",
  description:
    "Muscat Higher Education Centre has helped more than 10,000 students in Oman secure recognised qualifications and build job-ready skills over 25 years.",
  alternates: { canonical: "/about" },
  openGraph: { title: "About MHEC | Muscat Higher Education Centre", url: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        image="muscat"
        title={`${site.stats.years} years of helping Oman learn, qualify and grow`}
        intro={`${site.name} (MHEC) is an education centre in Al Ghubra, Muscat. We help students secure recognised qualifications and build the practical skills to use them — and we train teams for organisations across Oman.`}
        crumbs={[{ name: "About", path: "/about" }]}
      />

      <StatsBand />

      <section className="border-t border-line py-20">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-6 lg:order-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-panel">
              <Photo name="mentoring" fill sizes="(min-width: 1024px) 50vw, 100vw" />
            </div>
          </Reveal>
          <Reveal className="lg:col-span-6 lg:order-1" delay={100}>
            <h2 className="text-h2">Our legacy</h2>
            <div className="prose-mhec mt-5">
              <p>
                For {site.stats.years} years, MHEC has helped people in Muscat and across Oman take the next step in their
                education — school leavers looking for the right university, adults finishing what they started, and working
                professionals building a career.
              </p>
              <p>
                Over that time we have guided more than {site.stats.studentsLabel} students. What we learned from them shapes how
                we work today: a qualification opens the door, but practical skills are what carry people through it. That is why
                we pair university admissions and pathway programmes with live online skill programmes, and why organisations
                across Oman trust us to train their teams.
              </p>
              <p>Our promise has not changed: clear advice before you enrol, and support until you finish.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-mist py-20">
        <div className="container-x">
          <h2 className="text-h2">What we stand for</h2>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyMhec.map((v, i) => (
              <Reveal as="li" key={v.title} delay={i * 60} className="card-lift rounded-panel bg-white p-7 ring-1 ring-line">
                <span className="block h-1 w-10 rounded-full bg-sky" aria-hidden="true" />
                <h3 className="mt-5 text-h3">{v.title}</h3>
                <p className="mt-2 text-stone">{v.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <h2 className="text-h2 lg:col-span-4">What we do today</h2>
          <ul className="lg:col-span-8 grid gap-4 sm:grid-cols-2">
            {sections.map((s) => (
              <li key={s.key}>
                <Link href={s.href} className="card-lift group block h-full overflow-hidden rounded-panel bg-white ring-1 ring-line">
                  <div className="relative aspect-[16/9]">
                    <Photo name={s.image} fill sizes="(min-width: 640px) 33vw, 100vw" />
                  </div>
                  <div className="p-6">
                    <p className="font-display text-xl font-semibold group-hover:text-sky-deep">{s.title}</p>
                    <p className="mt-2 text-sm text-stone">{s.summary}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-ink text-white py-16">
        <div className="container-x flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-h2">Visit us in Al Ghubra</h2>
            <p className="mt-2 text-white/75">
              {site.contact.address.line1}, {site.contact.address.area}, {site.contact.address.city}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className="btn btn-primary">Contact us</Link>
            <a href={site.contact.mapUrl} target="_blank" rel="noopener" className="btn btn-outline text-white">Get directions</a>
          </div>
        </div>
      </section>
    </>
  );
}
