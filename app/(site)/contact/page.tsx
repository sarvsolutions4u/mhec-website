import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import InquiryForm from "@/components/InquiryForm";
import { WhatsAppIcon } from "@/components/WhatsAppFloat";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact MHEC — Admissions Advice in Muscat, Oman",
  description: `Talk to an MHEC advisor about university admission, pathway programmes, corporate training or online courses. Call ${site.contact.phoneDisplay}, WhatsApp us or visit our centre in Al Ghubra, Muscat.`,
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact MHEC Muscat", url: "/contact" },
};

export default function ContactPage() {
  const a = site.contact.address;
  return (
    <>
      <PageHero
        title="Talk to an advisor"
        intro="Ask about admissions, pathways, corporate training or online courses. We usually reply within one working day — faster on WhatsApp."
        crumbs={[{ name: "Contact", path: "/contact" }]}
      />
      <section className="py-16 md:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="font-display text-xl font-semibold">WhatsApp</h2>
              <a href={whatsappLink("Hello MHEC, I would like some advice.")} target="_blank" rel="noopener" className="btn btn-dark mt-3">
                <WhatsAppIcon /> Chat with an advisor
              </a>
            </div>
            <div>
              <h2 className="font-display text-xl font-semibold">Phone</h2>
              <a href={site.contact.phoneHref} className="link text-lg">{site.contact.phoneDisplay}</a>
            </div>
            <div>
              <h2 className="font-display text-xl font-semibold">Email</h2>
              <a href={`mailto:${site.contact.email}`} className="link text-lg">{site.contact.email}</a>
            </div>
            <div>
              <h2 className="font-display text-xl font-semibold">Visit</h2>
              <address className="not-italic text-lg text-stone">
                {a.line1}
                <br />
                {a.area}, {a.city} {a.postalCode}
                <br />
                {a.country}
              </address>
              <a href={site.contact.mapUrl} target="_blank" rel="noopener" className="link mt-2 inline-block">Open in Google Maps</a>
              {site.contact.hours && <p className="mt-3 text-stone">{site.contact.hours}</p>}
            </div>
          </div>
          <div className="lg:col-span-7">
            <InquiryForm title="Send an inquiry" />
          </div>
        </div>
      </section>
    </>
  );
}
