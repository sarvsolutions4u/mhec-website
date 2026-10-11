import { config, fields, collection } from "@keystatic/core";

const githubRepo = process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO as `${string}/${string}` | undefined;

export default config({
  storage: githubRepo ? { kind: "github", repo: githubRepo } : { kind: "local" },
  ui: {
    brand: { name: "MHEC Blog" },
  },
  collections: {
    posts: collection({
      label: "Blog posts",
      slugField: "title",
      path: "content/blog/*",
      format: { contentField: "content" },
      entryLayout: "content",
      columns: ["title", "date"],
      schema: {
        title: fields.slug({
          name: { label: "Title", validation: { isRequired: true } },
          slug: { label: "Web address (slug)", description: "Short, lowercase words joined by hyphens" },
        }),
        description: fields.text({
          label: "Summary for Google and social media",
          description: "One or two sentences (about 150 characters). Appears in search results.",
          multiline: true,
          validation: { length: { min: 50, max: 200 } },
        }),
        date: fields.date({ label: "Publish date", defaultValue: { kind: "today" }, validation: { isRequired: true } }),
        updated: fields.date({ label: "Last updated (optional)" }),
        author: fields.text({ label: "Author", defaultValue: "MHEC Admissions Team" }),
        category: fields.select({
          label: "Category",
          options: [
            { label: "University admissions", value: "University admissions" },
            { label: "Pathway programmes", value: "Pathway programmes" },
            { label: "Online learning", value: "Online learning" },
            { label: "Careers and skills", value: "Careers and skills" },
            { label: "Corporate training", value: "Corporate training" },
            { label: "News", value: "News" },
          ],
          defaultValue: "University admissions",
        }),
        coverImage: fields.image({
          label: "Cover image (optional)",
          directory: "public/images/blog",
          publicPath: "/images/blog/",
        }),
        coverAlt: fields.text({ label: "Cover image description (for accessibility and SEO)" }),
        keyTakeaways: fields.array(fields.text({ label: "Takeaway" }), {
          label: "Key takeaways (shown at the top — helps AI search engines quote you)",
          itemLabel: (p) => p.value,
        }),
        faqs: fields.array(
          fields.object({
            q: fields.text({ label: "Question" }),
            a: fields.text({ label: "Answer", multiline: true }),
          }),
          { label: "FAQs for this post (optional)", itemLabel: (p) => p.fields.q.value }
        ),
        content: fields.markdoc({ label: "Article", extension: "mdoc" }),
      },
    }),
  },
});
