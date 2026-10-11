import { pathways, courses, courseCategories, corporateAreas, categorySlug } from "./programs";

export type NavLink = { href: string; label: string; note?: string };
export type NavGroup = { heading?: string; links: NavLink[] };
export type NavItem = {
  label: string;
  href: string;
  intro?: string;
  groups?: NavGroup[];
  cta?: NavLink;
};

export const nav: NavItem[] = [
  {
    label: "University Admissions",
    href: "/university-admissions",
    intro: "Get into the right university in Oman, the GCC or abroad.",
    groups: [
      {
        heading: "Admission services",
        links: [
          { href: "/university-admissions", label: "Overview" },
          { href: "/university-admissions#routes", label: "Study in Oman and the GCC" },
          { href: "/university-admissions#routes", label: "Study abroad" },
          { href: "/university-admissions#destinations", label: "Study destinations" },
        ],
      },
      {
        heading: "Plan your application",
        links: [
          { href: "/university-admissions#levels", label: "Levels we help with" },
          { href: "/university-admissions#process", label: "How admission works" },
          { href: "/university-admissions#documents", label: "Documents checklist" },
        ],
      },
    ],
    cta: { href: "/university-admissions#inquiry", label: "Book a free profile review" },
  },
  {
    label: "Pathway Programmes",
    href: "/pathway-programs",
    intro: "From finishing school to entering a master's degree.",
    groups: [
      {
        heading: "Finish school and get ready",
        links: pathways.slice(0, 3).map((p) => ({ href: `/pathway-programs/${p.slug}`, label: p.title })),
      },
      {
        heading: "Bridge into a degree and beyond",
        links: pathways.slice(3).map((p) => ({ href: `/pathway-programs/${p.slug}`, label: p.title })),
      },
    ],
    cta: { href: "/pathway-programs#inquiry", label: "Check my eligibility" },
  },
  {
    label: "Corporate Training",
    href: "/corporate-training",
    intro: "Practical skills training for teams across Oman.",
    groups: [
      {
        heading: "Training areas",
        links: corporateAreas.slice(0, 4).map((a) => ({ href: "/corporate-training#areas", label: a.title })),
      },
      {
        heading: " ",
        links: corporateAreas.slice(4).map((a) => ({ href: "/corporate-training#areas", label: a.title })),
      },
    ],
    cta: { href: "/corporate-training#inquiry", label: "Request a proposal" },
  },
  {
    label: "Online Programmes",
    href: "/online-programs",
    intro: "50+ skill and professional programmes, studied live online.",
    groups: [
      { heading: "Subject areas", links: courseCategories.slice(0, 4) },
      { heading: " ", links: courseCategories.slice(4, 8) },
      { heading: " ", links: courseCategories.slice(8) },
    ].map((g) => ({
      heading: g.heading,
      links: g.links.map((cat) => ({
        href: `/online-programs/category/${categorySlug(cat)}`,
        label: `${cat} (${courses.filter((c) => c.category === cat).length})`,
      })),
    })),
    cta: { href: "/online-programs", label: "Browse all online programmes" },
  },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
];
