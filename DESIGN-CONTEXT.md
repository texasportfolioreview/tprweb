# Texas Portfolio Review — design context

Saved from `Texas portfolio review website.zip` on 2026-08-23. This is the design reference for the TPR site: read this file first for anything HTML/design in this project, and use `design/` for the full source (design system + the two site drafts + reference images).

## What TPR is

Texas Portfolio Review offers portfolio mentorship to Texas students applying to art and architecture programs. Counselors are alumni/admits of top art & architecture schools who coach students through building, refining, and presenting an admissions portfolio.

## Site structure (from the v2 draft — the current direction)

One-page landing site with a fixed nav rail of six numbered sections:

1. **Hero** — headline "Portfolio mentorship for Texas students applying to *art* and *architecture*," subhead, primary CTA "Book a free intro consultation," a right-rail index linking to the six sections, a list of schools counselors were accepted into (Cornell Architecture, RISD, USC Architecture, UT Austin Architecture, Pratt · Parsons · SCAD), and two stat call-outs: **$600K** in scholarships awarded to counselors, **7** of the country's top art/architecture programs.
2. **The problem** — traditional college counselors lack nuanced understanding of art/architecture admissions; the portfolio is "the foundation of your narrative," not just a work sample.
3. **Our solution** — TPR's guidance comes from real studio experience, research, and attendance at top programs.
4. **Two pathways**:
   - *Early Start* — middle school / HS freshmen–juniors starting a portfolio. Sub-steps: Build → Iterate → Prepare.
   - *Review & Refine* — HS seniors with existing work compiling/finalizing a portfolio. Sub-steps: Review → Refine → Present.
5. **Our counselors** — a table of school acceptances/scholarships/recognition/leadership, plus placeholder counselor bio cards (name, school/program, studio background — **content still needs real counselor info**).
6. **Student work** — placeholder gallery grid (4 tiles) for accepted students' pieces (captions seen: "Graphite study," "Chipboard model," "Mixed media," "Ink on trace") — **needs real images**.
7. **Pricing** — placeholder table, three tiers, **prices still TBD ($000)**:
   - Single review — one 90-min session + written notes + one follow-up round.
   - Review & Refine — six sessions across a semester, work selection, narrative, submission-ready presentation.
   - Early Start — ongoing monthly mentorship.
8. **Book / contact form** — closing headline "Real experience. Real advice. Real results.", a lead form (student name, email, grade level, pathway of interest, free-text about their work), submit button "Request my free consultation."
9. **Footer** — brand name, Instagram/TikTok/email links (placeholders), © 2026.

An earlier, less-refined draft (`Texas Portfolio Review - Site.dc.html`, the "v1") exists in the same export using the design system's *default* cyan/magenta Broadsheet palette rather than TPR's own colors — treat v2 as the current direction and v1 as a superseded exploration, useful mainly for alternate hero copy ("Texas Portfolio Review" as a big standalone h1).

## Design system: Broadsheet, with a Texas palette override

The site is built on a Claude-Design system called **Broadsheet** ("newsprint set for the web"), then re-themed with TPR's own red/blue palette in place of Broadsheet's default cyan/magenta. Full source is in `design/_ds/broadsheet-.../`.

**Voice:** near-black serif text on a warm off-white ground, left-aligned/asymmetric layouts, flush-left headings, hierarchy from type scale and whitespace — **no boxes, no dividers between sections** (the one exception: a single thick rule under the hero headline, and thin 1px rules used sparingly as "furniture," e.g. under the nav index and above the footer).

**Type:** everything in Source Serif 4 (heading and body both) — headings at 600 weight, italics for emphasis/pull-quote voice (e.g. "art" and "architecture" italicized in the hero). No sans-serif.

**Color tokens (TPR override, layered on top of Broadsheet's token system):**
- `--color-bg: #ece4d8` (warm paper), `--color-surface: #e2d8c8`, `--color-text: #221d19`
- `--color-accent: #a3120b` (Texas red) with a 100–900 ramp from `#f7e7e4` to `#380705`; `--color-accent-700: #700c07` is used for most heading/emphasis color
- `--color-accent-2: #1b62c9` (blue) with ramp `#e7eefb` → `#113468`; used for primary CTAs/links and interactive accents
- `--color-divider: color-mix(in srgb, #221d19 18%, transparent)`
- Everything else (spacing scale, radius, shadows, component classes) inherits from Broadsheet's tokens — see `design/_ds/.../styles.css` and `readme.md` for the full variable list and component classes (`.btn`/`.btn-primary`/`.btn-secondary`, `.tag`, `.field`/`.input`, `.card`, `.nav`, `.table`, `.dialog`, `.cmyk`/`.halftone` image treatments).

**Do:** separate sections with whitespace not dividers; set everything in the serif; use the red as the primary ink/heading color and blue as the interactive/CTA color (this is TPR's own split — Broadsheet's own rule is cyan-for-interactive/magenta-as-rare-second-spot, adapted here as red-for-ink/blue-for-action); keep photos to the system's print treatments (`.cmyk` process-plate separation for showcase images, `.halftone` newsprint dot-screen for interface imagery) when real photography goes in.

**Don't:** add boxes/borders/cards as layout structure (reserve `.card` for genuinely discrete listing items only); mix both accents in one small component; tighten the spacing scale; introduce a sans-serif.

## Open items / placeholders still in the draft

- Real counselor names, schools, and bios (currently `[Counselor name]` / `[School, program]` placeholders, 3 slots shown)
- Real pricing (`$000` placeholders in all three tiers)
- Real student work images (currently empty gray placeholder tiles)
- Real social links and contact email (currently `hello@[domain]`, Instagram/TikTok link to `#book`)

## Files in `design/`

- `Texas Portfolio Review - Site v2.dc.html` — current landing page draft (Claude Design canvas file)
- `Texas Portfolio Review - Site.dc.html` — earlier draft, default Broadsheet coloring
- `support.js` — canvas runtime support script the `.dc.html` files load
- `_ds/broadsheet-.../` — the full Broadsheet design system (styles.css with all tokens, readme.md with full usage guidance, compiled bundle, lint rules)
- `uploads/1.png`–`8.png` — a matching set of Instagram-carousel-style announcement graphics in the TPR brand: cream/paper background, red display headlines in a bold condensed slab/woodtype face (distinct from the site's Source Serif — a separate display face used only in these social graphics), blue hand-drawn western/art line illustrations (a roping rider on horseback, a paint palette with brushes, stars), covering the same beats as the site (intro, the two pathways, etc.). Useful reference for the brand's illustration style and social-content tone even though the live site itself uses Source Serif throughout.
