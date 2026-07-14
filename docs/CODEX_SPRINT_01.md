# CODEX SPRINT 01 — Audit, legacy assets and production baseline

## Objective
Turn the current repository into a verified, documented and production-ready baseline before adding the extreme cinematic scenes. Recover only useful owned assets from the current SUBEROS website, establish the design/motion foundations and remove technical uncertainty.

## Mandatory instructions
Read `AGENTS.md` and `docs/ROADMAP.md` before editing. Follow them as repository law. Do not invent content, contact details, clients, locations, awards, metrics or testimonials.

## Scope

### 1. Inspect and validate the repository
- Inspect all current files and `git status`.
- Install dependencies.
- Run the current lint and build scripts.
- Identify broken imports, incomplete configuration, TypeScript errors, runtime errors and missing files.
- Fix the baseline so the app starts and builds cleanly.
- Do not redesign sections yet beyond what is necessary to produce a coherent baseline.

### 2. Audit the old public website
Audit `https://suberos.com/` only as a source of owned brand materials and factual content.

Create `docs/LEGACY_SITE_AUDIT.md` with:
- current page URLs discovered;
- title, meta description and heading structure;
- confirmed services and contact data;
- logo and favicon URLs;
- useful owned images and their source URLs;
- duplicated, low-quality or obsolete content;
- old URLs that may require redirects later;
- assets that should not be reused and why.

Do not copy third-party stock imagery unless ownership is confirmed. Do not hotlink any production asset.

### 3. Download and organize approved assets
Codex may download the logo, favicon and other clearly owned brand assets from the old site.

Use a safe workflow such as:

```bash
mkdir -p public/legacy-source public/branding
curl -L "VERIFIED_ASSET_URL" -o "public/legacy-source/original-filename.ext"
file "public/legacy-source/original-filename.ext"
```

Requirements:
- Verify HTTP status and actual MIME/file type.
- Reject HTML error pages saved as images.
- Keep original files temporarily in `public/legacy-source/`.
- Copy only approved optimized versions into `public/branding/`.
- Sanitize SVG files before use.
- Generate a proper favicon set if the source quality permits.
- Never download the entire site blindly.
- Never commit cookies, credentials, tracking exports or personal data.

Create `docs/LEGACY_ASSET_INVENTORY.md` with a table containing:
- asset;
- source URL;
- original format and dimensions;
- ownership confidence;
- quality assessment;
- production destination;
- optimization performed;
- status: approved, pending or rejected.

### 4. Establish the folder architecture
Create or normalize this structure where appropriate:

```text
src/
  app/
  components/
    layout/
    ui/
    motion/
  features/
    home/
    projects/
    contact/
  hooks/
  lib/
    gsap/
    seo/
  data/
  styles/
public/
  branding/
  backgrounds/
  projects/
  motion/
  legacy-source/
docs/
```

Do not move files without updating imports and validating the build.

### 5. Create the design-token foundation
Define centralized CSS tokens for:
- black, charcoal, graphite, silver-gray and warm white;
- typography scale;
- spacing;
- container widths;
- borders and radii;
- shadows and glow;
- gradients;
- motion durations/easings;
- z-index layers.

Use fluid typography with `clamp()`. Maintain sufficient contrast.

### 6. Create the motion foundation
- Centralize GSAP plugin registration.
- Create a reusable reduced-motion preference utility.
- Add a safe `gsap.matchMedia()` pattern.
- Ensure Lenis and ScrollTrigger synchronize correctly if Lenis remains enabled.
- Ensure all RAF loops and GSAP contexts clean up.
- Add one small representative scroll-linked animation to prove the system, not the final hero.
- The app must remain fully usable with JavaScript motion disabled or reduced.

### 7. Establish semantic shell and SEO baseline
Verify or implement:
- skip link;
- semantic header, main and footer;
- accessible navigation;
- one logical H1;
- canonical;
- title and description based on real SUBEROS services;
- Open Graph metadata;
- valid favicon references;
- robots.txt;
- sitemap.xml;
- ProfessionalService or Organization structured data only with confirmed information;
- internal section links without `nofollow`.

Do not create fake service-area locations or review ratings.

### 8. Documentation
Create or update:
- `README.md` with setup, scripts, structure and deployment notes;
- `docs/LEGACY_SITE_AUDIT.md`;
- `docs/LEGACY_ASSET_INVENTORY.md`;
- `docs/MOTION_SYSTEM.md` describing the established lifecycle and reduced-motion behavior;
- `docs/SPRINT_01_REPORT.md` with findings, files changed and validation results.

## Required validation
Run:

```bash
npm ci || npm install
npm run lint
npm run build
```

Also verify:
- no console errors on load;
- keyboard navigation;
- reduced-motion mode;
- 390x844, 768x1024 and 1366x768 layouts;
- no broken local assets;
- no production hotlinks to the old website;
- no committed secrets.

## Acceptance criteria
- The repository installs, lints and builds successfully.
- The old site has been audited and its useful assets inventoried.
- Logo/favicon are reused only if verified and technically suitable.
- Folder architecture is clear and scalable.
- Design tokens and motion lifecycle are centralized.
- Accessibility and SEO baseline are intact.
- No fake content has been introduced.
- All work is documented.
- Changes are committed and pushed.

## Commit and push
Use a focused final commit similar to:

```text
Establish SUBEROS production baseline and legacy asset audit
```

Push the completed sprint to the current branch. In the final report, include the commit SHA, commands run, results, unresolved risks and the exact assets approved or rejected.