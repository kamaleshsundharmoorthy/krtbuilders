# Residential Construction Website

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion · GSAP ScrollTrigger · Lenis

## Run it

```bash
npm install
copy .env.example .env      # (Windows)  — then fill in the values
npm run dev                 # site: http://localhost:3000   admin: http://localhost:3000/admin
npm run seed                # first time only: loads the demo content into the database
```

**Windows shortcut:** double-click `setup.bat` once, then `start.bat` whenever you want to run the site.

`npm run build` connects to the database to pre-render pages, so MongoDB must be reachable
when building (Vercel builds use your Atlas database).

Without `DATABASE_URI` the site still runs using the demo content in `/data` (admin disabled).

## Content management (Payload CMS)

The admin panel lives at **/admin** inside the same project.

**First login:** open `/admin` — the first account you create becomes an **Admin**. Admins can
add more users (Settings → Users) as **Editor** (content + enquiries) or **Admin** (also users).

| Admin section | What it controls |
|---|---|
| Website → Home & page content | Hero, About intro, positioning text, pricing disclaimer, Quality section, inner-page hero images, show/hide home sections |
| Website → Services / Construction process / Why choose us / Testimonials / FAQs | Those sections everywhere on the site |
| Projects → Projects | Project cards + full case-study pages (overview, story, stages, materials, gallery). Tick “Feature on home page” for the cinematic section |
| Packages & Materials → Packages | The four packages, starting rates, highlights |
| Packages & Materials → Material specifications | Every tab and row of the comparison table and the full-spec drawer |
| Packages & Materials → Package customiser | Steps and options in “Customise your package” |
| Leads → Enquiries | Every “Start a Project” submission, with status and internal notes |
| Settings → Company details | Name, logos, phone, WhatsApp, email, address, map, socials, statistics |
| Settings → Media library | All photos (alt text required) |

Saving in the admin refreshes the public site automatically (on-demand revalidation) — no
redeploy needed. Every entry has a **Placeholder / demo content** tick box; untick it once real
content is in place. Use “Sort order” to reorder items.

Commands:

```bash
npm run seed                 # fill empty collections with demo content
npm run seed -- --reset      # replace all website content with the demo (keeps users & enquiries)
npm run generate:types       # after changing any collection in /cms
npm run generate:importmap   # after adding custom admin components
```

## Deploying to Vercel

1. **MongoDB Atlas** → create a free cluster → Database Access (user) → Network Access: allow
   `0.0.0.0/0` (Vercel has no fixed IP) → Connect → Drivers → copy the connection string.
2. Push this folder to GitHub and import it in **Vercel**.
3. Vercel → project → **Storage → Create → Blob** and connect it to the project (this adds
   `BLOB_READ_WRITE_TOKEN` automatically).
4. Vercel → Settings → **Environment Variables**: `DATABASE_URI`, `PAYLOAD_SECRET` (long random
   string), `NEXT_PUBLIC_SERVER_URL` (e.g. `https://www.yourdomain.com`).
5. Deploy. Then, once, run `npm run seed` locally with the **production** `DATABASE_URI` and
   `BLOB_READ_WRITE_TOKEN` in your `.env` to load the demo content and photos, or skip it and enter
   real content directly in `/admin`.

## Brand / design tokens

The palette is taken from the logo colours (**red · black · white**) and defined once in
`app/globals.css` under `@theme`:

| Token | Value | Used for |
|---|---|---|
| `primary` | `#C8102E` | CTAs, accents, active states, progress bars, highlights |
| `primary-dark` | `#8E0B1F` | Hover / pressed |
| `primary-light` | `#E8455B` | Red accents on dark backgrounds |
| `secondary` | `#0B0B0C` | Nav, footer, dark sections |
| `accent` | `#D9D3CA` | Warm stone, used sparingly |
| `background` | `#FFFFFF` | Page |
| `surface` | `#F5F3F0` | Alternate sections |
| `ink` | `#0B0B0C` | Text |
| `muted` | `#66635F` | Secondary text |
| `border` | `#E4E0DA` | Dividers |

**Once the official logo file is supplied**, sample its exact red and black and update
`--color-primary`, `--color-primary-dark`, `--color-primary-light` and `--color-secondary`.
Everything else follows.

Type: Archivo (display, condensed via `font-stretch`), Inter (body), Instrument Serif italic
(editorial accents). Fonts are self-hosted via `@fontsource`, so no Google Fonts request.

## Replacing placeholder content

With the CMS connected, do all of this in `/admin` instead. The files below are the fallback demo
content and the source for `npm run seed`.

Everything marked `placeholder: true` or `[Editable]` / `[placeholder]` is demo content and must be
replaced before launch. Nothing in the demo should be presented as a real claim.

| What | Where |
|---|---|
| Logo | `public/images/brand/logo-dark.svg` (on light) and `logo-light.svg` (on dark) — keep the file names or update `data/company.ts → logo` |
| Favicon | `app/icon.svg` |
| Company name, contact, address, map, socials, stats | `data/company.ts` |
| Hero / about / positioning text | `data/company.ts` |
| Services | `data/services.ts` |
| Projects (+ gallery, stages, materials) | `data/projects.ts` |
| Packages, starting rates, customiser options | `data/packages.ts` |
| Material specifications (16 categories × 4 tiers) | `data/materials.ts` |
| Construction process | `data/process.ts` |
| Why us / quality | `data/why.ts` |
| Testimonials (**sample only — replace with real, consented quotes**) | `data/testimonials.ts` |
| FAQ (review warranty / approvals / duration answers) | `data/faq.ts` |
| **All images** | `data/images.ts` — one registry. Drop files into `public/images/<group>/` and change `src` to `/images/<group>/file.jpg`. Update `alt`. |
| Site URL (SEO, sitemap, OG) | `data/company.ts → siteUrl` |

Placeholder photography is loaded from Unsplash. When all images are local, remove the
`remotePatterns` entry in `next.config.ts`.

## Enquiry form

`app/api/enquiry/route.ts` validates each submission (with a hidden spam trap) and saves it to
**Admin → Leads → Enquiries**. Email/WhatsApp notifications can be added later with a Payload
email adapter. The package customiser passes
the visitor's selections to the form through the URL, pre-filling *Preferred package* and
*Requirements*.

## Architecture

```
payload.config.ts       CMS configuration
cms/                    collections, globals, access rules, admin components
scripts/seed.ts         loads /data into the CMS
app/(frontend)/         the public website
app/(payload)/          admin panel + CMS API (generated by Payload)
app/api/enquiry         form endpoint
app/(frontend)/
  page.tsx              home
  about, services, projects/[slug], packages/[slug], process,
  why-us, testimonials, faq, contact
  api/enquiry           form endpoint
  sitemap.ts, robots.ts, icon.svg
components/
  layout/               Navbar, Footer, PageHero, SmoothScroll (Lenis), MobileCta, Preloader
  sections/             Hero, AboutIntro, Services, Projects, FeaturedProject, PackagesOverview,
                        ProcessTimeline (GSAP), WhyChooseUs, QualitySection, Testimonials,
                        FAQ, CTASection, ProjectEnquiry, ProjectsGrid
  packages/             PackageCard, PackageComparison, SpecDrawer, PackageCustomizer
  ui/                   Motion (reveal/stagger/text/image reveals), Button, Icons, Photo,
                        Parallax, Counter, SectionHeading
data/                   ALL content (TypeScript)
lib/content.ts          the only place pages read content from (CMS or /data fallback)
lib/cms.ts              maps CMS documents to the site's content types
lib/seo.tsx             metadata helper + LocalBusiness JSON-LD
types/content.ts        content types
```

### How content flows

Pages never read the database directly — they call async getters in `lib/content.ts`
(`getProjects()`, `getMaterialCategories()`, …), which query Payload and map the documents
(`lib/cms.ts`) into the shapes in `types/content.ts`. Components only ever see those shapes.

## Motion & accessibility

- `prefers-reduced-motion` is respected everywhere (Framer `MotionConfig reducedMotion="user"`,
  Lenis and GSAP scrubbing disabled, CSS animations neutralised).
- Parallax is reduced on mobile.
- Semantic landmarks, skip link, labelled dialogs/tabs/accordions, keyboard support (Esc closes
  the menu and specification drawer), visible focus states.

## SEO

Per-page metadata with Open Graph and Twitter cards, canonical URLs, `sitemap.xml`,
`robots.txt`, `HomeAndConstructionBusiness` (LocalBusiness) JSON-LD site-wide, `FAQPage`
JSON-LD on `/faq`, `Service` list JSON-LD on `/services`. All project and package pages are
statically generated.
