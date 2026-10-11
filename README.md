# MHEC Website — muscateducation.com

The new website for **Muscat Higher Education Centre (MHEC)**, Al Ghubra, Muscat.
Built with Next.js, ready to host on **GitHub + Vercel**.

**Theme:** secure a recognised qualification — and build the skills to use it.

**Sections, in order:** University Admission Services → Pathway Programmes → Corporate Training → Online Programmes, plus About, Blog and Contact. Every page has an inquiry form (name, phone, email, qualification, course of interest) that delivers to **email and WhatsApp**.

**What's on the site (40+ pages):**
- Homepage: photo banner slider (5 slides, autoplay with pause), running student counters, programme ribbon, the "qualification + skills" planner, the four sections with photos, route finder, guides, FAQs and inquiry form
- Dropdown menus for every section, mobile accordion menu
- University Admissions: study options, destinations, levels, process, documents checklist, skills to add
- Pathway Programmes: overview plus a full page for each of the 7 routes (eligibility, how it works, outcomes, skills to add)
- Online Programmes: 69 programmes in 10 subject areas (shown as "50+"), a searchable finder, a page per subject area and a page per programme with syllabus, audience and FAQs
- UK OTHM diplomas (Level 3, 4, 5 and 7) under Pathway Programmes, with units, entry requirements, Ofqual numbers and university progression
- Corporate Training, About, Contact, Blog (with editor), Privacy

---

## 1. Run it on your computer

Requires [Node.js 20+](https://nodejs.org).

```bash
npm install
cp .env.example .env.local     # then fill in the values (see section 4)
npm run dev
```

Open http://localhost:3000 — the site. Open http://localhost:3000/keystatic — the blog editor.

## 2. Put it on GitHub

1. Create a new **private** repository on GitHub, e.g. `mhec-website`.
2. In this folder:

```bash
git init
git add .
git commit -m "MHEC website"
git branch -M main
git remote add origin https://github.com/YOUR-ACCOUNT/mhec-website.git
git push -u origin main
```

## 3. Deploy on Vercel

1. Sign in at [vercel.com](https://vercel.com) with GitHub → **Add New → Project** → import `mhec-website`.
2. Framework is detected as Next.js. Add the environment variables from section 4 under **Settings → Environment Variables**.
3. Click **Deploy**. Every push to `main` redeploys automatically.
4. **Domain:** Vercel → Project → **Settings → Domains** → add `muscateducation.com` and `www.muscateducation.com`, then change the DNS records at your domain registrar to the values Vercel shows. (The old host currently shows "Account Suspended", so pointing DNS to Vercel replaces it.)

## 4. Environment variables

| Variable | What it does | Needed? |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://muscateducation.com` — used for SEO links and sitemap | Yes |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number that receives inquiries, digits only: `96895775701` | Yes |
| `RESEND_API_KEY` | Sends inquiry emails. Free at [resend.com](https://resend.com) (3,000 emails/month) | Yes, for email |
| `INQUIRY_TO_EMAIL` | Inbox that receives inquiries — `info@muscateducation.com` | Yes |
| `INQUIRY_FROM_EMAIL` | Sender, e.g. `MHEC Website <website@muscateducation.com>` (verify the domain in Resend first) | Yes |
| `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` | Keeps a log of every inquiry in a database | Optional (recommended) |
| `NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO` + Keystatic keys | Lets your team write blogs on the live site | Optional |

## 5. How inquiries reach you

Every form offers two buttons:

- **Send inquiry** → emailed to `INQUIRY_TO_EMAIL` with a one-click "Reply on WhatsApp" button inside the email.
- **Send on WhatsApp** → opens WhatsApp on the visitor's phone with all their details pre-filled, addressed to your number. Works even before email is set up.

Until `RESEND_API_KEY` is added, the "Send inquiry" button tells visitors to use WhatsApp instead — so set it up before launch.

**Setting up Resend (10 minutes):** create an account → **Domains → Add domain** → `muscateducation.com` → add the DNS records it shows → create an API key → paste into Vercel as `RESEND_API_KEY`.

## 6. Database — recommendation

You need two kinds of data: **blog posts** and **inquiries**. They're handled separately, which keeps things free and simple:

**Blog posts → no database (Keystatic, already built in).**
Posts are saved as files in the GitHub repo. This is the best option for SEO (pages are pre-built and load instantly), costs nothing, and every change is versioned in GitHub.

- *Write locally:* `npm run dev` → open `/keystatic` → write → commit and push. Vercel publishes in about a minute.
- *Write on the live site (no coding):* set `NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO=your-account/mhec-website`, deploy, open `https://muscateducation.com/keystatic` and follow the prompt to create the GitHub app. Keystatic gives you the remaining keys to add in Vercel. Your team then signs in with GitHub and writes posts in a visual editor.

**Inquiries → Supabase (recommended, free tier).**
Email alone works, but a database means no inquiry is ever lost in an inbox and your sales team can track status.

1. Create a project at [supabase.com](https://supabase.com) (choose a region close to Oman, e.g. Mumbai).
2. **SQL Editor** → paste and run `supabase/inquiries.sql`.
3. **Settings → API** → copy the Project URL and `service_role` key into Vercel as `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`.
4. View inquiries in **Table Editor → inquiries**; update the `status` column (new / contacted / enrolled / closed) as your team follows up. You can export to CSV any time.

*Alternatives:* if your team prefers a WordPress-style editor with image galleries and roles, swap Keystatic for **Sanity** (free tier). If you want inquiries in your CRM instead, the form endpoint (`app/api/inquiry/route.ts`) can post to any CRM webhook.

## 7. SEO and GEO (AI search) — what's built in

- Unique title, description and canonical URL on every page; Open Graph share images generated automatically.
- `sitemap.xml` and `robots.txt` generated from the content. Submit `https://muscateducation.com/sitemap.xml` in [Google Search Console](https://search.google.com/search-console) and [Bing Webmaster Tools](https://www.bing.com/webmasters) after launch.
- **Structured data (JSON-LD):** EducationalOrganization + LocalBusiness (address, phone), Course for each online programme, FAQPage on every section, BlogPosting and BreadcrumbList.
- **GEO for ChatGPT, Gemini, Perplexity and Google AI Overviews:** `/llms.txt` gives AI engines a clean summary of MHEC; AI crawlers are allowed in robots.txt; pages open with direct answers; blog posts have "Key takeaways" and FAQ fields that AI answers can quote.
- Redirects from the old site's addresses (`/about-mhec`, `/open-school`, `/contact-us`) so old Google links keep working. Add more in `next.config.ts`.
- Fast by default: static pages, self-hosted fonts, no heavy scripts.

**After launch:** create and verify a **Google Business Profile** for the Al Ghubra centre (this matters most for "near me" searches in Muscat), and publish at least two blog posts a month.

## 8. Editing content

| To change | Edit |
|---|---|
| Name, phone, email, address, opening hours, social links, 25 years / 10,000+ stats | `lib/site.ts` |
| Pathway routes, admissions, corporate, planner, FAQs, headline counts ("50+", "5+") | `lib/programs.ts` |
| The 69 online programmes (titles, summaries, syllabus, FAQs) | `lib/data/online-programs.json` |
| OTHM UK diplomas (units, entry, progression) | `lib/data/othm-diplomas.json` |
| Colours and fonts | `app/globals.css` (top of file) |
| Logo | `public/brand/` |
| Banner and section photos | `lib/media.ts` (see below) |
| Homepage banner slides | `slides` at the top of `app/(site)/page.tsx` |
| Blog posts | `/keystatic` editor, or files in `content/blog/` |

**Photos:** the site uses free Unsplash photos (free for commercial use) loaded from Unsplash's image CDN. To use your own MHEC photos — recommended — put them in `public/images/` (landscape, at least 1920px wide) and change the `src` lines in `lib/media.ts`, e.g. `src: "/images/graduation-2025.jpg"`.

**Brand colours (from the MHEC logo):** ink `#231F20`, sky blue `#50ACE4`. A deeper blue `#1B6FA6` is used for text links because the logo blue is too light to read on white.

## 9. Please confirm before launch

These details were not available from the old site (it is suspended) and should be checked:

- [ ] **University partners** — add current partners to `partnerUniversities` in `lib/programs.ts` (the section stays hidden while the list is empty).
- [ ] **OTHM delivery status** — the site says OTHM diplomas are "studied online with MHEC support". If MHEC is (or partners with) an OTHM approved centre, add that wording; OTHM only allows approved centres to deliver its qualifications.
- [ ] **Online programme durations and syllabi** — imported from the Al Mihad programme list; adjust any that differ for online delivery.
- [ ] **Your own photos** — swap the stock photos for real MHEC photos (`lib/media.ts`).
- [ ] **Pathway programmes and online course list** — adjust to what MHEC currently offers.
- [ ] **Course durations** — taken from typical Al Mihad durations; confirm for MHEC.
- [ ] **Opening hours** and **Google Maps link** — `lib/site.ts`.
- [ ] **History wording** on the About page (founding story) and the "25 years / 10,000+" figures.
- [ ] **Social media links** — `lib/site.ts`.
- [ ] **Privacy notice** — review with your adviser.
