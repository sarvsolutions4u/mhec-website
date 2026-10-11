import Link from "next/link";
import Logo from "./Logo";
import { site, whatsappLink } from "@/lib/site";
import { sections, courses } from "@/lib/programs";

export default function Footer() {
  const a = site.contact.address;
  const social = Object.entries(site.social).filter(([, v]) => v);
  return (
    <footer className="bg-ink text-white/80 border-t border-white/10">
      <div className="container-x py-16 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo inverted />
          <p className="mt-5 max-w-sm text-white/70">
            {site.stats.years} years helping students in Oman secure recognised qualifications and build the skills to use them.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={whatsappLink("Hello MHEC, I would like to know more about your programmes.")} className="btn btn-primary">
              WhatsApp us
            </a>
            <a href={site.contact.phoneHref} className="btn btn-outline text-white">
              Call
            </a>
          </div>
          {social.length > 0 && (
            <ul className="mt-6 flex gap-4 text-sm">
              {social.map(([k, v]) => (
                <li key={k}>
                  <a href={v} className="capitalize hover:text-white" rel="noopener" target="_blank">
                    {k}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav aria-label="Programmes" className="md:col-span-3">
          <h2 className="text-white text-base font-semibold font-sans tracking-normal">What we offer</h2>
          <ul className="mt-4 space-y-2.5">
            {sections.map((s) => (
              <li key={s.key}>
                <Link href={s.href} className="hover:text-white">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
          <h2 className="mt-8 text-white text-base font-semibold font-sans tracking-normal">Popular online courses</h2>
          <ul className="mt-4 space-y-2.5">
            {["acca", "excel-with-ai", "power-bi", "ielts", "digital-marketing"].map((s) => courses.find((c) => c.slug === s)!).map((c) => (
              <li key={c.slug}>
                <Link href={`/online-programs/${c.slug}`} className="hover:text-white">
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company" className="md:col-span-2">
          <h2 className="text-white text-base font-semibold font-sans tracking-normal">MHEC</h2>
          <ul className="mt-4 space-y-2.5">
            <li><Link href="/about" className="hover:text-white">About us</Link></li>
            <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
          </ul>
        </nav>

        <address className="md:col-span-3 not-italic">
          <h2 className="text-white text-base font-semibold font-sans tracking-normal">Visit or contact us</h2>
          <p className="mt-4">
            <a href={site.contact.mapUrl} className="hover:text-white" target="_blank" rel="noopener">
              {a.line1}, {a.area}, {a.city} {a.postalCode}, {a.country}
            </a>
          </p>
          <p className="mt-3">
            <a href={site.contact.phoneHref} className="hover:text-white">{site.contact.phoneDisplay}</a>
          </p>
          <p className="mt-1">
            <a href={`mailto:${site.contact.email}`} className="hover:text-white">{site.contact.email}</a>
          </p>
          {site.contact.hours && <p className="mt-3 text-white/60">{site.contact.hours}</p>}
        </address>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x py-6 text-sm text-white/55 flex flex-col sm:flex-row gap-2 justify-between">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>Muscat, Sultanate of Oman</p>
        </div>
      </div>
    </footer>
  );
}
