/**
 * MHEC — site-wide settings.
 * Change names, contacts, stats and social links here; every page reads from this file.
 */

export const site = {
  name: "Muscat Higher Education Centre",
  shortName: "MHEC",
  tagline: "Secure a recognised qualification. Build the skills to use it.",
  description:
    "Muscat Higher Education Centre (MHEC) helps students in Oman and the GCC secure recognised qualifications and build job-ready skills: university admission services, pathway programmes, corporate training and live online professional and skill programmes.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://muscateducation.com").replace(/\/$/, ""),
  locale: "en_OM",

  contact: {
    phoneDisplay: "+968 9577 5701",
    phoneHref: "tel:+96895775701",
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "96895775701",
    email: "info@muscateducation.com",
    address: {
      line1: "Al Rahma Building, Building No. 851, Room 17, 1st Floor",
      area: "Al Ghubra",
      city: "Muscat",
      postalCode: "133",
      country: "Sultanate of Oman",
      countryCode: "OM",
    },
    // Replace with your Google Maps share link
    mapUrl: "https://maps.google.com/?q=Al+Rahma+Building+Al+Ghubra+Muscat",
    // Opening hours — shown in the footer and contact page when filled in, e.g. "Saturday to Thursday, 9:00 am – 8:00 pm"
    hours: "",
  },

  // Achievements shown on the homepage and About page
  stats: {
    years: 25,
    students: 10000, // counts up on the homepage
    studentsLabel: "10,000+",
  },

  social: {
    facebook: "",
    instagram: "",
    linkedin: "",
    youtube: "",
  },
} as const;

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.contact.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function absoluteUrl(path = "/") {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export const mainNav = [
  { href: "/university-admissions", label: "Admissions", long: "University Admissions" },
  { href: "/pathway-programs", label: "Pathways", long: "Pathway Programmes" },
  { href: "/corporate-training", label: "Corporate", long: "Corporate Training" },
  { href: "/online-programs", label: "Online Courses", long: "Online Programmes" },
  { href: "/about", label: "About", long: "About" },
  { href: "/blog", label: "Blog", long: "Blog" },
] as const;
