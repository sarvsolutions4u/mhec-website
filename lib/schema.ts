import { site, absoluteUrl } from "./site";
import type { Course } from "./programs";

/** Structured data (schema.org JSON-LD) — helps Google, Bing and AI search engines understand the site. */

const orgId = `${site.url}/#organization`;

export function organizationSchema() {
  const sameAs = Object.values(site.social).filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "LocalBusiness"],
    "@id": orgId,
    name: site.name,
    alternateName: site.shortName,
    url: site.url,
    logo: absoluteUrl("/brand/mhec-logo.svg"),
    image: absoluteUrl("/brand/mhec-logo.svg"),
    description: site.description,
    email: site.contact.email,
    telephone: site.contact.phoneDisplay.replace(/\s/g, ""),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.contact.address.line1,
      addressLocality: `${site.contact.address.area}, ${site.contact.address.city}`,
      postalCode: site.contact.address.postalCode,
      addressCountry: site.contact.address.countryCode,
    },
    areaServed: ["Oman", "United Arab Emirates", "Saudi Arabia", "Qatar", "Bahrain", "Kuwait"],
    knowsAbout: [
      "University admissions",
      "Study abroad",
      "Skill development",
      "Pathway programmes",
      "Open schooling",
      "Corporate training",
      "ACCA",
      "IELTS",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "admissions",
        telephone: site.contact.phoneDisplay.replace(/\s/g, ""),
        email: site.contact.email,
        availableLanguage: ["English", "Arabic"],
      },
    ],
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    publisher: { "@id": orgId },
    inLanguage: "en",
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function courseSchema(c: Course) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: c.title,
    description: c.summary,
    url: absoluteUrl(`/online-programs/${c.slug}`),
    provider: { "@id": orgId, "@type": "EducationalOrganization", name: site.name },
    educationalLevel: c.level,
    teaches: (c.outcomes.length ? c.outcomes : c.modules).slice(0, 8),
    ...(c.kind === "UK diploma"
      ? { educationalCredentialAwarded: c.title, coursePrerequisites: c.entry?.join("; ") }
      : {}),
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: c.duration,
      inLanguage: "en",
    },
  };
}

export function courseListSchema(items: { name: string; path: string; description: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: absoluteUrl(it.path),
      name: it.name,
      description: it.description,
    })),
  };
}

export function articleSchema(p: {
  title: string;
  description: string;
  slug: string;
  date: string;
  updated?: string;
  author: string;
  coverImage?: string | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: p.title,
    description: p.description,
    url: absoluteUrl(`/blog/${p.slug}`),
    mainEntityOfPage: absoluteUrl(`/blog/${p.slug}`),
    datePublished: p.date,
    dateModified: p.updated || p.date,
    author: { "@type": "Organization", name: p.author || site.name },
    publisher: { "@id": orgId, "@type": "Organization", name: site.name, logo: absoluteUrl("/brand/mhec-logo.svg") },
    image: absoluteUrl(p.coverImage || "/opengraph-image"),
    inLanguage: "en",
  };
}
