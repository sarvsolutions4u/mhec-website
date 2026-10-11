import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description: "How Muscat Higher Education Centre uses the information you send through this website.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        title="Privacy notice"
        intro="How we use the details you share with us through this website."
        crumbs={[{ name: "Privacy", path: "/privacy" }]}
      />
      <section className="py-16">
        <div className="container-x prose-mhec">
          <h2>What we collect</h2>
          <p>
            When you send an inquiry we receive your name, phone number, email address, qualification, the programme you are
            interested in and any message you write. If you choose WhatsApp, your message is sent through WhatsApp under its own
            terms.
          </p>
          <h2>How we use it</h2>
          <p>
            We use your details only to respond to your inquiry and advise you about our programmes. We do not sell your
            information. We may share it with a partner university only when you ask us to apply on your behalf.
          </p>
          <h2>How long we keep it</h2>
          <p>We keep inquiry records for as long as needed to support your studies, then delete them.</p>
          <h2>Your choices</h2>
          <p>
            To see, correct or delete your information, email <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
          </p>
          {/* Review this notice with your legal adviser before launch so it reflects your actual processes. */}
        </div>
      </section>
    </>
  );
}
