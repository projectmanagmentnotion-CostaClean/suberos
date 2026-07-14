# AGENTS.md — SUBEROS

## Mission
Build SUBEROS as a premium, immersive, conversion-oriented creative studio website. The visual target is an Awwwards-level motion experience, but every implementation must remain accessible, responsive, maintainable, SEO-ready, legally reviewable and reliable on real devices.

## Mandatory governing standard

Before planning or implementing any sprint, read and follow:

- `docs/EU_WEB_APP_STANDARD.md`
- `docs/ROADMAP.md`

These documents apply only to SUBEROS. Technical practices may be inspired by mature web engineering, but no content, assets, routes, brands, clients, code identifiers, screenshots or case studies from another project may enter SUBEROS.

## Strict project isolation

- Work only on SUBEROS.
- Never mention or import another website or application into public copy, metadata, structured data, routes, assets or portfolio content.
- Never create a case study or project page without explicit approval that it belongs in the SUBEROS portfolio.
- Reusable technical patterns are allowed only as abstract practices: architecture, QA, responsive design, SEO, accessibility, security, motion lifecycle and documentation.
- Search the repository before every release for foreign project names, domains, email addresses, analytics IDs, route names and asset paths.
- Any accidental cross-project reference is a release blocker and must be removed without damaging valid SUBEROS work.

## Non-negotiable priorities
1. Use the most professional, robust and scalable solution by default.
2. Preserve real SUBEROS content and improve clarity, hierarchy, SEO and conversion without inventing clients, awards, results or testimonials.
3. GSAP is the primary motion engine. Do not introduce another animation library unless it solves a concrete problem GSAP cannot solve cleanly.
4. Motion must never block content, navigation, forms or accessibility.
5. Mobile is a first-class experience, not a reduced desktop copy.
6. Every completed sprint must end with validation, commit and push.

## Required stack
- React
- TypeScript
- Vite
- GSAP + ScrollTrigger + Flip where justified
- `@gsap/react`
- Lenis only when it does not harm native interaction
- Semantic HTML and modern CSS

## Architecture rules
- Keep visual components, content/data and animation logic separated.
- Prefer small reusable components and scene-level composition.
- Register GSAP plugins once.
- Use `gsap.context()` for cleanup.
- Use `gsap.matchMedia()` for breakpoints and reduced motion.
- Kill ScrollTriggers, observers, RAF loops, video playback and canvas activity when no longer needed.
- Avoid global mutable animation state.
- Avoid monolithic components above roughly 300 lines unless strongly justified.
- Keep content in typed data files when practical.
- Do not create routes or data models for content that is not yet real and approved.

## Motion rules
- Prioritize `transform` and `opacity`.
- Use pinning only when it adds narrative value.
- Never create scroll traps or compulsory scroll hijacking.
- Avoid excessive scrub duration on mobile.
- Do not animate all elements simultaneously.
- Every cinematic scene requires full, balanced and reduced strategies.
- Frame sequences require desktop, mobile and static fallback packages.
- Pause frame rendering outside the active scene.
- No autoplay audio.
- Custom cursor effects are desktop-only and never replace native focus states.

## Responsive rules
Validate at minimum:
- 390x844
- 768x1024
- 1366x768
- 1440x900
- mobile landscape when relevant

Use responsive art direction, not only smaller typography. Mobile may use shorter timelines, fewer layers, lower-resolution assets and fewer pinned scenes while preserving the same meaning and conversion path.

## Accessibility rules
- Target WCAG 2.2 AA.
- One logical H1 per page.
- Correct heading order.
- Full keyboard navigation.
- Visible focus states.
- Skip-to-content link.
- Practical minimum touch target of 44x44 px.
- Meaningful alt text; decorative media uses empty alt.
- Visible form labels and understandable errors.
- Content cannot exist only inside canvas, video or animation.
- Respect `prefers-reduced-motion` and provide an equivalent readable experience.
- Avoid flashes, violent zooms and vestibular motion without a reduced alternative.
- Preserve logical DOM order regardless of visual animation order.

## Privacy, legal and consent rules
- Maintain a real inventory of forms, personal data, cookies, local/session storage, analytics, embeds and processors.
- Collect only data required for a documented purpose.
- Do not load non-essential cookies, pixels, embeds or tracking before valid consent when required.
- Rejecting or withdrawing consent must be as easy as accepting it.
- Do not use dark patterns, preselected consent or bundled marketing consent.
- Legal notice, privacy, cookie and accessibility information must match actual SUBEROS runtime behaviour and verified owner data.
- Every contact flow must define recipient, lawful basis, retention, security and deletion/rights handling.
- Do not send personal data or form contents to analytics.
- Any new ecommerce, subscription, account, upload, booking or marketplace feature requires a new applicability review before implementation.
- Temporary legal placeholders are never launch-ready.

## Security rules
- HTTPS is mandatory in production.
- Never expose secrets in the repository or client bundle.
- Validate all external input server-side.
- Apply least privilege to APIs, databases and storage.
- Protect forms and endpoints against abuse without unnecessary tracking.
- Define security headers, CSP and deployment hardening before launch.
- Do not claim security, encryption or compliance unless verified.

## SEO rules
- Preserve one canonical URL per page.
- Maintain correct title, description, Open Graph and verified structured data.
- Internal links are normal follow links by default.
- Never add `nofollow` to internal navigation.
- Use `nofollow`, `sponsored` or `ugc` only when semantically required for external links.
- Build meaningful relationships between studio, services, process and contact.
- Do not create portfolio routes until approved real SUBEROS content exists.
- Avoid thin pages, duplicated copy, keyword stuffing and invented local coverage.
- Validate sitemap, robots, redirects and 404.
- Use descriptive anchor text.

## Conversion rules
Every major page or scene must answer:
- What is SUBEROS?
- What does SUBEROS offer?
- Why should the visitor trust it?
- What is the next action?

Prefer one dominant CTA per scene. Do not overload viewports with competing actions.

## Asset rules
- Reuse only verified SUBEROS brand materials.
- Keep original recovered assets in `public/legacy-source/` while they are being audited.
- Put approved production assets in the correct SUBEROS folders.
- Never hotlink production assets from the old site.
- Convert raster assets to optimized AVIF/WebP where appropriate.
- Preserve clean SVG when appropriate.
- Record source, original filename, dimensions, format, rights note and destination.
- Remove unused and foreign assets before release.
- Verify commercial rights for fonts, photography, video, audio, icons, 3D and portfolio media.

## Performance budgets
Initial targets:
- Investigate initial compressed JS above 250 KB.
- Hero critical media ideally below 1.5 MB on mobile.
- No decorative image above 500 KB without justification.
- Do not load full frame sequences before they are near the viewport.
- Declare media dimensions to prevent layout shifts.
- Preload only genuinely critical fonts and media.
- Target field Core Web Vitals at the 75th percentile: LCP <= 2.5 s, INP <= 200 ms and CLS <= 0.1.

## Quality gates before every sprint closure
Run and report:
- `npm install` or `npm ci`
- `npm run lint`
- `npm run build`
- available tests
- visual review at required viewports
- keyboard navigation review
- reduced-motion review
- console error review
- broken-link and anchor review
- repository isolation search
- privacy/storage/legal impact review
- asset/licence impact review
- bundle comparison

If a check cannot run, document the exact blocker. Never claim validation that did not occur.

## Final release gates
Before production launch verify:
- `docs/LEGAL_APPLICABILITY_MATRIX.md` completed.
- Verified legal owner and contact data.
- Privacy policy matches actual processing.
- Cookie/storage audit matches runtime behaviour.
- Consent gating and withdrawal work when required.
- Required legal and accessibility information exists.
- HTTPS, security headers, forms, backups and rollback are verified.
- Asset and font licences are confirmed.
- Lighthouse/Core Web Vitals and real-device checks are documented.
- Temporary pages, placeholders, QA routes and foreign project references are removed or blocked.

## Git workflow
- Inspect `git status` before editing.
- Do not overwrite unrelated valid SUBEROS work.
- Use focused commits.
- Commit and push at the end of every completed sprint.
- Commit messages must describe the delivered result.
- Never commit secrets, `.env`, build output or unapproved temporary assets.

## Content integrity
- Use only confirmed SUBEROS services, contact details, locations and approved portfolio content.
- Mark missing information as TODO in documentation rather than inventing it.
- Improve copy for clarity, emotional impact and search intent while preserving factual truth.

## Definition of done
A sprint is complete only when the requested SUBEROS result is implemented, isolated from other projects, responsive, accessible, tested, documented, committed and pushed. A release is complete only when the technical, legal, privacy, security, accessibility, content and operational gates in `docs/EU_WEB_APP_STANDARD.md` are also satisfied.
