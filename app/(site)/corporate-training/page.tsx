import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import DeliveryBadge from "@/components/DeliveryBadge";
import InquiryForm from "@/components/InquiryForm";
import Faq from "@/components/Faq";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import { corporateAreas, corporateFormats, corporateSteps, corporateSectors, faqs, sections } from "@/lib/programs";
import { whatsappLink } from "@/lib/site";

const s = sections[2];

export const metadata: Metadata = {
  title: "Corporate Training in Oman — On-site in Muscat & Live Online",
  description:
    "Customised corporate training for organisations in Oman: Excel and Power BI, AI tools, business English, leadership, project management and more. At your premises or live online. Proposal within two working days.",
  alternates: { canonical: s.href },
  openGraph: { title: "Corporate Training | MHEC Muscat", url: s.href },
};

export default function Page() {
  return (
    <>
      <PageHero
        image="workshop"
        title={s.title}
        intro="Training built around your team's real work. Tell us the roles and the skill gap; we design the syllabus, deliver it at your premises or online, and report back on results."
        crumbs={[{ name: s.short, path: s.href }]}
      >
        <a href="#inquiry" className="btn btn-primary">Request a proposal</a>
        <a href={whatsappLink("Hello MHEC, I'd like to discuss corporate training for my team.")} target="_blank" rel="noopener" className="btn btn-outline">
          Discuss on WhatsApp
        </a>
      </PageHero>

      <section className="py-20">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-5">
            <h2 className="text-h2">Skills your team uses the next morning</h2>
            <p className="mt-4 text-lg text-stone">
              Every programme starts from your goals, uses examples from your own work and ends with an assessment, so you can
              see what changed. Participants receive MHEC certificates and HR receives a summary report.
            </p>
          </Reveal>
          <Reveal className="lg:col-span-7" delay={100}>
            <div className="relative aspect-[16/10] overflow-hidden rounded-panel">
              <Photo name="training" fill sizes="(min-width: 1024px) 55vw, 100vw" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line bg-mist py-20">
        <div className="container-x">
          <h2 className="text-h2">Choose how your team learns</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {corporateFormats.map((f, i) => (
              <Reveal key={f.title} delay={i * 80} className="card-lift rounded-panel bg-white p-7 ring-1 ring-line">
                <DeliveryBadge delivery={f.delivery} />
                <h3 className="mt-4 text-h3">{f.title}</h3>
                <p className="mt-2 text-stone">{f.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="areas" className="scroll-mt-28 bg-ink text-white py-20">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="text-h2">Training areas</h2>
            <p className="mt-4 text-white/70">Every programme is tailored. These are the areas organisations ask us for most often.</p>
          </div>
          <ul className="lg:col-span-8 grid gap-x-10 sm:grid-cols-2">
            {corporateAreas.map((a) => (
              <li key={a.title} className="border-t border-white/15 py-5">
                <h3 className="font-display text-xl font-semibold">{a.title}</h3>
                <p className="mt-1 text-white/70">{a.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="text-h2">Built for teams across sectors</h2>
            <p className="mt-4 text-stone">We adapt examples, case studies and exercises to the way your industry works.</p>
          </div>
          <ul className="lg:col-span-8 grid gap-3 sm:grid-cols-2">
            {corporateSectors.map((sec) => (
              <li key={sec} className="rounded-xl bg-mist px-5 py-4 font-semibold">{sec}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-line py-20">
        <div className="container-x">
          <h2 className="text-h2">How we work with you</h2>
          <ol className="mt-10 grid gap-6 md:grid-cols-4">
            {corporateSteps.map((st, i) => (
              <Reveal as="li" key={st.title} delay={i * 80}>
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-sky font-display font-bold text-ink" aria-hidden="true">{i + 1}</span>
                  {i < corporateSteps.length - 1 && <span className="hidden md:block h-0.5 flex-1 bg-line" aria-hidden="true" />}
                </div>
                <h3 className="mt-4 text-h3">{st.title}</h3>
                <p className="mt-1 text-stone">{st.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <div className="border-t border-line">
        <Faq items={faqs.corporate} title="Questions from HR and managers" />
      </div>

      <section id="inquiry" className="scroll-mt-28 bg-mist py-20">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="text-h2">Request a training proposal</h2>
            <p className="mt-4 text-lg text-stone">
              Share the training area and the number of staff in your message. We usually reply with a proposal within two working days.
            </p>
          </div>
          <div className="lg:col-span-7">
            <InquiryForm
              section="corporate"
              defaultCourse="Corporate training for my team"
              title="Tell us about your team"
              intro="Include your company name, the roles and the number of participants in the message box."
            />
          </div>
        </div>
      </section>
    </>
  );
}
