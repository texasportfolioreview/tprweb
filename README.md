# Texas Portfolio Review — Website

Portfolio mentorship for Texas students applying to art and architecture programs. This repo holds the marketing site: plain HTML, CSS, and JS — no build step, no framework.

## Structure

- `index.html` — home page (hero, school logo carousel, problem/solution, pathways preview, counselor credentials, student work preview, closing CTA)
- `mentorship.html` — the two mentorship pathways in full: Early Start and Review & Refine
- `about.html` — studio intro and counselor bios
- `student-work.html` — student work gallery, filterable by category
- `css/styles.css` — shared stylesheet (design tokens, components, responsive rules)
- `js/main.js` — shared behavior: mobile nav toggle, the "book a free consultation" modal, and the student-work filter
- `images/schools/` — school logo assets used in the homepage carousel
- `design/` — the original Broadsheet design-system export and reference material the site's visual direction was built from
- `DESIGN-CONTEXT.md` — a summary of the brand, design tokens, and content structure for anyone (human or AI) picking this project back up

## Running locally

No build step required. From the repo root:

```
python3 -m http.server 8000
```

Then open `http://localhost:8000/index.html`.

## Notes

- The consultation form in the modal is not yet wired to a backend — see the comment in `js/main.js` for where to plug in a real submission endpoint (Formspree, Netlify Forms, or a custom one).
- Counselor bios, student work, and pricing are still placeholders pending real content.
