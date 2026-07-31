# SUBEROS — Stitch to Production Master Plan

**Status:** READY_FOR_IMPLEMENTATION_PLANNING  
**Source design:** `stitch_suberos_creative_studio_redesign.zip`  
**Approved visual direction:** `SUBEROS — Hybrid System — Final Polish`  
**Repository:** `projectmanagmentnotion-CostaClean/suberos`  
**Production:** `https://suberos.com`  
**Base commit reviewed:** `517efd6b0f36fbfa4f8f1a45e02a53728647d118`

---

## 1. Purpose

Transform the approved Stitch Hybrid System into production-grade SUBEROS code while preserving the strongest existing implementation decisions:

- React, TypeScript and Vite architecture;
- GSAP, ScrollTrigger, `@gsap/react` and Lenis integration;
- current accessibility foundations;
- production contact endpoint and verified mail delivery;
- legal pages, metadata, canonical handling, robots, sitemap and 404 behavior;
- existing QA scripts and project-isolation gates;
- current asset, licensing, security and deployment discipline.

The redesign must **not** become a single landing page controlled by anchor links. SUBEROS must evolve into a real multi-page website with navigable URLs, route-level metadata, proper browser history and page-specific content.

The Stitch HTML and Tailwind output are visual references only. They must not be copied into production unchanged.

---

## 2. Non-negotiable constraints

1. Work exclusively on SUBEROS.
2. Do not introduce assets, code, content, domains, routes or identity from any other project.
3. Do not replace the production contact endpoint unless the replacement is independently verified.
4. Do not invent clients, awards, testimonials, results, locations or metrics.
5. Do not hotlink Google-hosted Stitch images.
6. Do not load Google Fonts in production. Any approved font must be self-hosted and properly licensed.
7. Do not publish Stitch's CDN Tailwind script, Material Symbols CDN or generated remote image URLs.
8. Do not convert every section into an independent route when the content is too thin.
9. Do not preserve anchor navigation as the primary information architecture.
10. Do not deploy before the multipage routing, metadata, accessibility, performance and fallback behavior pass QA.

---

## 3. What is retained from the current SUBEROS implementation

### 3.1 Architecture and runtime

Retain and extend:

- `src/app/App.tsx` as the application composition point;
- `src/app/AppShell.tsx` for shared header, main and footer structure;
- feature-based folders under `src/features/`;
- typed content under `src/data/`;
- centralized motion under `src/motion/`;
- reusable primitives under `src/components/`;
- metadata handling through `getRouteMetadata()` and `useDocumentMetadata()`;
- route-specific 404 and legal rendering;
- QA and production verification scripts.

### 3.2 Existing strengths to preserve

- accessible mobile menu with focus management, Escape support, overlay close and body scroll lock;
- `prefers-reduced-motion` handling;
- GSAP cleanup and refresh lifecycle;
- responsive frame-sequence approach;
- functional production contact form;
- verified `Reply-To` behavior;
- canonical apex domain;
- SPA fallback and real asset 404 handling;
- legal owner and contact data already confirmed;
- project isolation enforced by `qa:isolation`.

### 3.3 Existing elements that must be replaced or refactored

- `homeAnchors` as the main navigation model;
- `siteNavigation` entries pointing to `/#section`;
- service-to-work behavior based primarily on hashes;
- the assumption that all commercial content lives inside `HomeExperience`;
- route metadata that only distinguishes home, legal, labs and not-found;
- homepage sections that duplicate the role of future full pages.

---

## 4. Approved visual system extracted from Stitch

### 4.1 Direction

The final Hybrid System combines:

- cinematic impact in hero and immersive moments;
- editorial clarity and generous spacing;
- modular technical structure in services, work and process;
- alternating dark and off-white sections;
- restrained technical labels, numbering and metadata;
- Hanken Grotesk-style hierarchy as a visual reference;
- sharp shapes, thin borders and tonal depth instead of decorative shadows.

### 4.2 Production adaptation rules

Stitch defines intent, not implementation.

Translate the design into the existing SUBEROS system as follows:

- convert Stitch colors into semantic CSS custom properties;
- adapt typography to a legally verified self-hosted font strategy;
- build grids with CSS Grid and existing layout primitives;
- implement buttons, links, cards and fields using existing reusable components;
- replace Material Symbols with local SVG or existing icon primitives;
- replace remote imagery with approved SUBEROS assets;
- use GSAP only where motion supports hierarchy or narrative;
- preserve readable static content when JavaScript, animation or canvas is unavailable.

### 4.3 Proposed semantic tokens

The final values must be validated against the current brand and contrast requirements.

```css
--color-bg-dark: #111318;
--color-bg-dark-elevated: #191c21;
--color-bg-light: #f7f3f2;
--color-surface-light: #ffffff;
--color-text-on-dark: #e1e2e9;
--color-text-on-light: #17191d;
--color-text-muted-dark: #c2c6d3;
--color-text-muted-light: #5f636d;
--color-border-dark: #424751;
--color-border-light: #d9dce3;
--color-accent: #2d5bff;
--color-success: #188458;
--color-warning: #b87500;
--color-error: #c43d3d;
```

### 4.4 Typography decision gate

Stitch references Hanken Grotesk, while the current public system uses self-hosted Syncopate for display typography.

Before implementation, choose one of these verified options:

1. retain Syncopate for display and introduce a licensed self-hosted body family;
2. self-host Hanken Grotesk after confirming its license and source files;
3. create a hybrid pairing that preserves current brand recognition.

No remote font requests are allowed.

---

## 5. Final information architecture: real screens and URLs

The website must use real path navigation. Hashes may be used only for optional in-page state, not as the main navigation.

### 5.1 Public routes

| Route | Screen | Purpose | Indexing |
| --- | --- | --- | --- |
| `/` | Home | Brand overview, selected work, core services, trust and conversion | index |
| `/trabajo` | Work index | All approved projects and disciplines | index |
| `/trabajo/:slug` | Project detail | Real case study for one approved project | index only when complete |
| `/servicios` | Services index | Overview of all confirmed services | index |
| `/servicios/fotografia` | Photography | Dedicated photography capability and relevant work | index |
| `/servicios/branding` | Branding | Dedicated identity and brand-system capability | index |
| `/servicios/produccion` | Production | Audiovisual/creative production capability | index |
| `/servicios/web` | Web | Web design and development capability | index |
| `/proceso` | Process | Discover, define, design, produce and deliver | index |
| `/estudio` | Studio | Positioning, approach, founder/studio and capabilities | index |
| `/contacto` | Contact | Production contact form and direct details | index |
| `/legal/aviso-legal` | Legal notice | Existing legal content | index or noindex per policy |
| `/legal/privacidad` | Privacy | Existing privacy content | index or noindex per policy |
| `/legal/cookies` | Cookies | Existing cookie information | index or noindex per policy |
| `/legal/accesibilidad` | Accessibility | Existing accessibility statement | index or noindex per policy |
| `*` | 404 | Real not-found screen | noindex |

### 5.2 Route creation rule

A project route may only exist when it has:

- approved title and slug;
- real client/project status or clearly approved self-initiated status;
- cover media;
- summary;
- challenge or context;
- work performed;
- result or deliverables described truthfully;
- rights to all published media;
- metadata and social image;
- accessible alt text;
- mobile layout.

Incomplete projects remain unpublished and are not included in sitemap or navigation.

### 5.3 Navigation model

Primary desktop and mobile navigation:

- Trabajo → `/trabajo`
- Servicios → `/servicios`
- Proceso → `/proceso`
- Estudio → `/estudio`
- Contacto / Iniciar un proyecto → `/contacto`

Secondary links may point directly to service or project routes.

The SUBEROS logo always links to `/`.

The browser Back and Forward buttons must restore the correct page and scroll behavior.

---

## 6. Home page role after the redesign

The home page remains cinematic, but it is no longer the entire website.

### 6.1 Home composition

1. **Hero — dark**
   - positioning statement;
   - cinematic visual;
   - CTA to `/trabajo`;
   - CTA to `/contacto`;
   - minimal technical metadata.

2. **Positioning — light**
   - what SUBEROS is;
   - what it combines;
   - why the approach is different;
   - link to `/estudio`.

3. **Selected services — light**
   - four service summaries;
   - each links to its real service route;
   - no anchor activation behavior.

4. **Immersive narrative — dark**
   - Idea → System → Production → Experience;
   - existing frame-sequence implementation may be adapted;
   - static equivalent for reduced motion.

5. **Selected work — dark or mixed**
   - only approved projects;
   - links to `/trabajo/:slug`;
   - link to `/trabajo`.

6. **Process preview — light**
   - concise five-stage overview;
   - link to `/proceso`.

7. **Studio preview — dark**
   - human image and concise philosophy;
   - link to `/estudio`.

8. **Contact CTA — light**
   - strong close;
   - link to `/contacto`;
   - the full form lives on the Contact screen unless conversion testing justifies a compact duplicate.

9. **Footer — dark**
   - real route links;
   - contact;
   - legal pages.

### 6.2 What the home must not do

- duplicate every paragraph from service pages;
- contain a full case study for every project;
- use menu anchors as primary navigation;
- hide core information inside animation;
- force the user through pinned scenes to reach contact;
- download every project asset or full sequence on initial load.

---

## 7. Screen specifications

## 7.1 `/trabajo`

Purpose: provide the strongest evidence of capability.

Required blocks:

- editorial route hero;
- featured project;
- project grid/list;
- discipline filters reflected in URL search parameters, for example `/trabajo?disciplina=branding`;
- no-indexing of arbitrary filter combinations unless explicitly approved;
- clear project metadata;
- accessible filter controls;
- contact CTA.

Motion:

- restrained project reveals;
- FLIP only when filter transitions benefit from it;
- no scroll trap;
- reduced-motion instant state changes.

## 7.2 `/trabajo/:slug`

Required blocks:

- project hero;
- project facts;
- context/challenge;
- visual system or production process;
- gallery/video;
- deliverables;
- next project;
- contact CTA.

Each project page gets unique title, description, canonical, Open Graph and structured data only when supported by facts.

## 7.3 `/servicios`

Purpose: explain the service ecosystem and route visitors to the appropriate detail screen.

Required blocks:

- positioning;
- four modular capabilities;
- service comparison or selection guidance;
- related work;
- process preview;
- contact CTA.

## 7.4 Service detail routes

Each service screen must include:

- clear service definition;
- who it is for;
- confirmed deliverables;
- working approach;
- related approved projects;
- frequently needed information only when factual;
- CTA with the service preselected in the contact flow.

Do not create thin near-duplicate pages. Each route must have meaningful, service-specific content.

## 7.5 `/proceso`

Use the technical modular logic from Stitch without becoming an infographic-only page.

Stages:

1. Descubrir.
2. Definir.
3. Diseñar.
4. Producir.
5. Entregar.

Each stage needs readable content, outputs and responsibilities. GSAP node activation is an enhancement, not the only representation.

## 7.6 `/estudio`

Purpose: add human trust and explain the operating model.

Required blocks:

- studio/founder positioning;
- professional portrait or real workspace;
- philosophy;
- combined creative and technical capability;
- operating principles;
- relevant tools only when useful to a client;
- contact CTA.

Do not publish invented team size, offices or international locations.

## 7.7 `/contacto`

Preserve the real production endpoint and current privacy behavior.

Required states:

- idle;
- validation error;
- submitting;
- success with request ID;
- server error;
- rate limit;
- offline.

Support service preselection from URLs such as:

- `/contacto?servicio=fotografia`
- `/contacto?servicio=branding`
- `/contacto?servicio=produccion`
- `/contacto?servicio=web`

The query value must be validated against an allowlist before populating the form.

---

## 8. Routing architecture

### 8.1 Recommended approach

Migrate from the current custom pathname switch to a declarative client router while preserving existing metadata and QA behavior.

Preferred production architecture:

```tsx
createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/trabajo', element: <WorkIndexPage /> },
  { path: '/trabajo/:slug', element: <ProjectPage /> },
  { path: '/servicios', element: <ServicesPage /> },
  { path: '/servicios/fotografia', element: <PhotographyServicePage /> },
  { path: '/servicios/branding', element: <BrandingServicePage /> },
  { path: '/servicios/produccion', element: <ProductionServicePage /> },
  { path: '/servicios/web', element: <WebServicePage /> },
  { path: '/proceso', element: <ProcessPage /> },
  { path: '/estudio', element: <StudioPage /> },
  { path: '/contacto', element: <ContactPage /> },
  { path: '/legal/:slug', element: <LegalPage /> },
  { path: '*', element: <NotFoundPage /> },
])
```

Before adding a routing dependency, document the decision and compare it with extending the existing route parser. The chosen solution must support:

- real URLs;
- route-level lazy loading;
- browser history;
- route error boundaries;
- page metadata;
- scroll restoration;
- testability;
- future project routes;
- SiteGround SPA fallback.

### 8.2 Page transitions

Navigation must remain real navigation even when visually animated.

Page transition lifecycle:

1. user activates a real link;
2. current page exit enhancement runs briefly when motion is allowed;
3. route changes;
4. new page renders immediately with semantic content;
5. scroll restores to top or saved history position;
6. route metadata updates;
7. entrance enhancement runs;
8. focus moves to the new page heading or main region when appropriate.

Never delay navigation long enough to harm usability.

### 8.3 Scroll behavior

- new route navigation starts at the top;
- Back/Forward restores history position where practical;
- route changes trigger ScrollTrigger cleanup and refresh;
- no inherited pin spacing from the previous page;
- Lenis must stop and destroy cleanly when required;
- reduced motion uses native scrolling without transition choreography.

---

## 9. Proposed production folder structure

```text
src/
├── app/
│   ├── App.tsx
│   ├── AppProviders.tsx
│   ├── AppShell.tsx
│   ├── router.tsx
│   ├── routeConfig.ts
│   └── RouteErrorBoundary.tsx
├── pages/
│   ├── home/
│   ├── work/
│   ├── project/
│   ├── services/
│   ├── service-detail/
│   ├── process/
│   ├── studio/
│   ├── contact/
│   ├── legal/
│   └── not-found/
├── features/
│   ├── hero/
│   ├── services/
│   ├── immersive/
│   ├── work/
│   ├── process/
│   ├── studio/
│   ├── contact/
│   └── navigation/
├── components/
│   ├── layout/
│   ├── media/
│   ├── motion/
│   └── ui/
├── data/
│   ├── navigation.ts
│   ├── services.ts
│   ├── projects.ts
│   ├── pages.ts
│   └── seoPageMetadata.ts
├── motion/
├── styles/
└── lib/
```

Do not move stable code only to satisfy this diagram. Refactor incrementally and preserve useful current feature boundaries.

---

## 10. Component mapping from Stitch to production

| Stitch concept | Production component | Rule |
| --- | --- | --- |
| Sticky top navigation | `Header` / route-aware navigation | Real route links, active state, accessible drawer |
| Cinematic hero | `PageHero` + home-specific scene | Semantic H1 and non-blocking motion |
| Technical label | `SectionLabel` | Limited and meaningful use |
| Service panels | `ServiceCard` / `ServicePanel` | Links to service routes |
| Selected work modules | `ProjectCard` / `FeaturedProject` | Links to project routes |
| Narrative sequence | existing sequence feature adapted | Responsive assets and reduced fallback |
| Process nodes | `ProcessStep` / `ProcessTimeline` | Readable without animation |
| Contact status | current `ContactForm` states | Preserve real endpoint and request ID |
| Editorial footer | `Footer` | Real routes and legal links |

---

## 11. GSAP architecture

### 11.1 Motion tiers

**Essential:** none. All content and navigation must work without GSAP.

**Enhancement:**

- hero reveal;
- image mask reveals;
- service panel activation;
- selected-work transitions;
- process node progression;
- route transitions.

**Immersive:**

- home narrative sequence between services and selected work.

**Decorative:**

- subtle technical lines or metadata shifts, desktop only.

### 11.2 Rules

- use `gsap.context()` and current motion hooks;
- use `gsap.matchMedia()` for desktop, tablet, mobile and reduced motion;
- kill timelines and ScrollTriggers on route unmount;
- no global animation state shared across pages;
- avoid animating layout-heavy properties;
- never pin full mobile pages for long distances;
- lazy-load immersive assets near their route/viewport;
- ensure page transitions and the frame sequence do not compete for scroll control.

---

## 12. Assets and fonts

### 12.1 Stitch export handling

The uploaded ZIP contains:

- A, B and C direction screenshots and HTML;
- Hybrid System desktop and mobile;
- final-polish desktop and mobile;
- several `DESIGN.md` files;
- logo reference.

Store the ZIP or extracted reference package outside public production folders. Recommended repository location only if file size and rights permit:

```text
resources/stitch-reference/suberos-hybrid-system/
```

The generated HTML must be labelled reference-only.

### 12.2 Prohibited production dependencies from Stitch output

Remove or replace:

- `https://cdn.tailwindcss.com`;
- `fonts.googleapis.com`;
- `fonts.gstatic.com`;
- Google Material Symbols CDN;
- `lh3.googleusercontent.com/aida-public/...` images;
- invented copy such as unconfirmed international locations or unsupported technical claims.

### 12.3 Required asset workflow

Every production media item needs:

- exact filename;
- visual description;
- source;
- rights status;
- dimensions;
- responsive variants;
- weight target;
- alt strategy;
- destination component;
- approval status.

Use the existing asset inventory and QA pipeline as the source of truth.

---

## 13. Content integrity corrections required from Stitch

The Stitch reference includes language that must not automatically enter production, including examples such as:

- unsupported international locations;
- exaggerated engineering claims;
- vague high-performance or aerospace language;
- capabilities not yet confirmed;
- generic agency copy.

All public copy must be rewritten using verified SUBEROS facts. Visual composition may be retained while content is replaced.

---

## 14. SEO and metadata architecture

Every indexable route must define:

- unique title;
- unique description;
- canonical URL;
- Open Graph title, description, URL and image;
- one logical H1;
- meaningful internal links;
- sitemap eligibility;
- robots directive;
- structured data only when factual and appropriate.

Update `getRouteMetadata()` or its replacement to consume route configuration rather than only broad route kinds.

Project and service metadata should be typed and sourced from approved data files.

The sitemap must include only published routes. Draft projects remain absent.

---

## 15. Accessibility requirements

- WCAG 2.2 AA target;
- visible route-aware focus states;
- current menu focus trap and restoration preserved;
- active navigation identified without relying only on color;
- focus moved meaningfully after route transitions;
- minimum practical 44×44 px touch targets;
- skip link works on every screen;
- headings remain sequential per route;
- form labels remain visible;
- errors use programmatic associations and live regions;
- technical labels never become illegibly small;
- canvas/frame content has a semantic equivalent;
- reduced motion removes page-transition choreography, scrubbing and non-essential parallax.

---

## 16. Performance and loading strategy

- lazy-load route modules;
- lazy-load project galleries and videos;
- only preload the active route's critical font/media;
- avoid loading the home frame sequence on non-home routes;
- preserve explicit image dimensions;
- generate AVIF/WebP variants;
- use responsive `srcset`/`sizes`;
- keep initial JS budget under investigation threshold;
- measure route-level Lighthouse rather than only the home page;
- verify no route returns HTML for missing asset URLs;
- verify no old route bundle remains cached after deployment.

---

## 17. Implementation roadmap

### Sprint 0 — Baseline and protected branch

- create redesign branch;
- snapshot current production and route behavior;
- add the Stitch reference package outside runtime;
- document font decision;
- inventory unsupported Stitch copy and remote dependencies;
- run complete current QA.

**Gate:** no runtime change.

### Sprint 1 — Router and real navigation foundation

- implement declarative route architecture or formally approved equivalent;
- create route config;
- migrate header/footer links from anchors to paths;
- add scroll restoration and route focus behavior;
- preserve legal routes and labs;
- add route-level metadata skeleton;
- add navigation tests for direct URL, reload, Back/Forward and 404.

**Gate:** all new routes may initially use truthful scaffold content, but no thin route is indexable.

### Sprint 2 — Design tokens and shared shell

- translate Hybrid System tokens into current CSS architecture;
- resolve font strategy;
- redesign shared header, menu, page shell and footer;
- preserve existing accessible menu behavior;
- create page hero, section label and route transition primitives.

### Sprint 3 — Home V2

- implement approved Hybrid home composition;
- reuse/adapt immersive sequence;
- connect all CTAs to real routes;
- remove primary anchor navigation;
- validate mobile-first and reduced motion.

### Sprint 4 — Services system

- implement `/servicios` and four service routes;
- add service-specific content and related work;
- add contact preselection;
- unique metadata and internal links.

### Sprint 5 — Work and project architecture

- implement `/trabajo`;
- typed project model;
- accessible URL-based filtering;
- implement project route template;
- publish only complete approved projects.

### Sprint 6 — Process and Studio

- implement `/proceso` and `/estudio`;
- technical modular presentation with readable static content;
- add real photography when approved.

### Sprint 7 — Contact route

- move/adapt full contact experience to `/contacto`;
- preserve endpoint and all states;
- add validated service query preselection;
- run real production-safe delivery tests at the appropriate release stage.

### Sprint 8 — Motion and route transitions

- add page transitions;
- refine GSAP across routes;
- verify cleanup and history behavior;
- performance profiling;
- reduced-motion parity.

### Sprint 9 — SEO, sitemap and structured data

- finalize metadata for every published route;
- update sitemap;
- validate canonicals;
- route-specific OG images;
- content audit and internal linking.

### Sprint 10 — Full QA and release

- cross-browser;
- visual regression;
- physical mobile QA;
- accessibility;
- performance;
- production artifact;
- backup and rollback;
- deployment and public verification.

---

## 18. First implementation sprint specification

### Sprint 1 — Router and Real Navigation Foundation

**Objective:** replace the anchor-led architecture with production-ready real routes without redesigning all screens at once.

#### In scope

- install or implement the approved routing solution;
- create route configuration for all planned screens;
- convert primary navigation to real paths;
- preserve legal paths, 404, QA labs and metadata behavior;
- implement route-level lazy loading;
- add page scaffold components with truthful temporary copy and `noindex` where incomplete;
- implement scroll restoration;
- implement route focus management;
- add active navigation state;
- ensure direct URL reload works under the SiteGround fallback;
- add automated route/navigation tests.

#### Out of scope

- final visual redesign of every page;
- final photography or portfolio media;
- final copy for incomplete service/project pages;
- production deployment;
- new backend;
- changing the contact endpoint;
- deleting the current home experience before replacement is validated.

#### Required files or equivalent

```text
src/app/router.tsx
src/app/routeConfig.ts
src/app/RouteErrorBoundary.tsx
src/app/ScrollRestoration.tsx
src/app/RouteFocusManager.tsx
src/pages/home/HomePage.tsx
src/pages/work/WorkIndexPage.tsx
src/pages/services/ServicesPage.tsx
src/pages/service-detail/ServiceDetailPage.tsx
src/pages/process/ProcessPage.tsx
src/pages/studio/StudioPage.tsx
src/pages/contact/ContactPage.tsx
src/pages/not-found/NotFoundPage.tsx
src/data/navigation.ts
src/data/seoPageMetadata.ts
tests/routing/
tests/navigation/
```

#### Acceptance criteria

1. Header and mobile menu use real URLs, not `/#...` as primary links.
2. `/trabajo`, `/servicios`, `/proceso`, `/estudio` and `/contacto` render distinct route screens.
3. Service routes resolve directly and survive reload.
4. Legal pages continue working.
5. Unknown paths render the existing 404 and use `noindex`.
6. Browser Back and Forward work.
7. New-route navigation scrolls to top; history restoration is documented and tested.
8. Focus is placed meaningfully after navigation.
9. Mobile menu still supports Escape, overlay close, focus containment and body lock.
10. Incomplete routes are `noindex` and absent from sitemap until content-ready.
11. Existing home, contact endpoint and production behavior are not broken.
12. `qa:isolation`, navigation, links, SEO, legal, accessibility, release, lint and build pass.
13. No Stitch CDN, Google Font, Material Symbol or remote image dependency enters production.
14. No deployment occurs in this sprint.

#### Validation commands

```bash
npm install
npm run qa:isolation
npm run qa:links
npm run qa:navigation
npm run qa:contact
npm run qa:legal
npm run qa:seo
npm run qa:aria
npm run qa:a11y
npm run qa:security
npm run qa:release
npm run lint
npm run build
```

Add a dedicated routing gate, recommended:

```bash
npm run qa:routing
```

It must cover:

- direct visits;
- reloads;
- active navigation;
- mobile menu route close;
- Back/Forward;
- focus;
- scroll;
- unknown routes;
- legal routes;
- service query preselection contract;
- asset 404 behavior.

#### Git workflow

- branch: `redesign/sprint-01-real-routing`
- commit: `feat: establish SUBEROS multipage routing foundation`
- PR: `SUBEROS Redesign — Sprint 01 Real Navigation Foundation`
- no auto-merge;
- final review by `pr-quality-gate`.

#### Sprint status allowed

- `APPROVED — MULTIPAGE FOUNDATION READY`
- `APPROVED_WITH_DOCUMENTED_DEBT`
- `CHANGES_REQUIRED`
- `BLOCKED`

---

## 19. Definition of done for the complete redesign

The Stitch redesign is considered production-ready only when:

- the site has real multi-page navigation;
- every published route has truthful substantial content;
- all route links, direct loads and browser history work;
- the Hybrid System is implemented through reusable tokens and components;
- GSAP is progressive enhancement with clean route lifecycle;
- the contact form remains operational and verified;
- metadata, canonicals, sitemap and 404 are correct per route;
- accessibility and reduced motion are equivalent across screens;
- no unlicensed or remote Stitch dependency remains;
- physical mobile QA is completed;
- production is backed up, deployed and publicly verified;
- repository isolation passes;
- release is reviewed independently.

---

## 20. Final architectural decision

SUBEROS will not be implemented as a landing page with an anchor menu.

The approved target is a **real multipage creative-studio website** where:

- Home creates impact and routes visitors onward;
- Services explain distinct capabilities;
- Work provides evidence;
- Project pages build credibility;
- Process explains execution;
- Studio adds human trust;
- Contact converts;
- GSAP connects the experience without replacing navigation or content.

This document is the single implementation source of truth for translating the approved Stitch Hybrid System into the existing SUBEROS production architecture.