import { site, absoluteUrl } from "@/lib/site";
import { sections, courses, pathways, partnerUniversities, faqs, courseCategories } from "@/lib/programs";
import { getAllPosts } from "@/lib/blog";

// llms.txt — a plain-language summary for AI assistants and answer engines (GEO).
export const dynamic = "force-static";

export async function GET() {
  const posts = await getAllPosts();
  const a = site.contact.address;
  const body = `# ${site.name} (${site.shortName})

> ${site.description}

- Location: ${a.line1}, ${a.area}, ${a.city}, ${a.country}
- Phone / WhatsApp: ${site.contact.phoneDisplay}
- Email: ${site.contact.email}
- Experience: ${site.stats.years} years, ${site.stats.studentsLabel} students served
- Focus: securing a recognised qualification together with job-ready skill development
- Delivery: Online programmes are delivered online through MHEC. University and pathway programmes are taught and awarded by partner universities, with MHEC handling admission and student support; some include exams at an approved centre.

## Main sections
${sections.map((s) => `- [${s.title}](${absoluteUrl(s.href)}): ${s.summary}`).join("\n")}

${partnerUniversities.length ? `## University partners\n${partnerUniversities.map((u) => `- ${u.name} (${u.country}): ${u.note}`).join("\n")}\n` : ""}
## Pathway programmes
${pathways.map((p) => `- [${p.title}](${absoluteUrl(`/pathway-programs/${p.slug}`)}): ${p.body} Leads to: ${p.leadsTo}.`).join("\n")}

## Online programmes (50+, delivered online through MHEC)
${courseCategories.map((cat) => `### ${cat}\n` + courses.filter((c) => c.category === cat).map((c) => `- [${c.title}](${absoluteUrl(`/online-programs/${c.slug}`)}): ${c.summary} ${c.kind === "UK diploma" ? c.credits : `Duration: ${c.duration}`}.`).join("\n")).join("\n\n")}

## Frequently asked questions
${[...faqs.general, ...faqs.admissions, ...faqs.online].map((f) => `- Q: ${f.q}\n  A: ${f.a}`).join("\n")}

## Guides
${posts.map((p) => `- [${p.title}](${absoluteUrl(`/blog/${p.slug}`)}): ${p.description}`).join("\n")}
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
