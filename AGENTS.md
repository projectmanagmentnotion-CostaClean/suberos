# AGENTS.md — SUBEROS

## Mission
Build SUBEROS as a premium, immersive, conversion-oriented creative studio website. The visual target is an Awwwards-level motion experience, but every implementation must remain accessible, responsive, maintainable, SEO-ready and reliable on real devices.

## Mandatory master standard

Before planning or implementing any sprint, read and follow:

- `docs/EU_WEB_APP_STANDARD.md`

This is the cross-project technical, legal, privacy, accessibility, security, SEO, performance and Awwwards-quality baseline. It is a mandatory release and architecture standard, not optional guidance.

Rules:

- Applicable law and verified user rights take priority over visual concepts, motion, analytics and conversion experiments.
- Every legal or privacy decision must be based on actual project data flows, vendors, business model and jurisdiction.
- Do not invent legal identity, company details, retention periods, processors, licences, lawful bases or compliance claims.
- Mark uncertain legal applicability in documentation and require owner or qualified legal review before launch.
- Every sprint must consider whether it changes personal-data processing, storage, cookies, security, accessibility, consumer obligations, third-party transfers or legal-page content.
- Temporary legal placeholders are never launch-ready.
- Before final release create and complete `docs/LEGAL_APPLICABILITY_MATRIX.md`.
- Specific project documents may strengthen the master standard but may not weaken it.

## Non-negotiable priorities
1. Use the most professional, robust and scalable solution by default.
2. Preserve real content and improve clarity, hierarchy, SEO and conversion without inventing clients, awards, results or testimonials.
3. GSAP is the primary motion engine. Do not introduce another animation library unless it solves a concrete problem GSAP cannot solve cleanly.
4. Motion must never block content, navigation, forms or accessibility.
5. Mobile is a first-class experience, not a reduced desktop copy.
6. Every completed sprint must end with validation, commit and push.

## Required stack
- React
- TypeScript
- Vite
- GSAP + ScrollTrigger + Flip where justified
- @gsap/react
- Lenis for smooth scrolling only when it does not harm native interaction
- Semantic HTML and modern CSS

## Architecture rules
- Keep visual components, data/content and animation logic separated.
- Prefer small reusable components and scene-level composition.
- Register GSAP plugins once.
- Use `gsap.context()` for cleanup.
- Use `gsap.matchMedia()` for breakpoints and `prefers-reduced-motion`.
- Kill ScrollTriggers, observers, RAF loops, video playback and canvas activity when no longer needed.
- Avoid global mutable animation state.
- Avoid monolithic components above roughly 300 lines unless there is a strong reason.
- Keep project content in typed data files when practical.

## Motion rules
- Prioritize `transform` and `opacity`.
- Use pinning only when it adds narrative value.
- Never create scroll traps.
- Avoid excessive scrub duration on mobile.
- Do not animate all elements simultaneously.
- All cinematic scenes need a fallback.
- Frame sequences must have desktop, mobile and static fallback strategies.
- Pause frame rendering outside the active scene.
- No autoplay audio.
- Custom cursor effects are desktop-only and must not replace native focus states.

## Responsive rules
Validate at minimum:
- 390x844
- 768x1024
- 1366x768
- 1440x900

Use responsive composition, not only smaller font sizes. Mobile may use shorter timelines, fewer layers, lower-resolution assets and fewer pinned scenes while preserving the same message and conversion path.

## Accessibility rules
- Target WCAG 2.2 AA.
- One logical H1 per page.
- Correct heading order.
- Full keyboard navigation.
- Visible focus states.
- Skip-to-content link.
- Minimum practical touch target of 44x44 px.
- Meaningful alt text; decorative media uses empty alt.
- All form fields require visible labels and understandable errors.
- Content cannot exist only inside canvas, video or animation.
- Respect `prefers-reduced-motion` and provide an equivalent readable experience.
- Avoid flashes, violent zooms and vestibular motion without a reduced-motion alternative.

## Privacy, legal and consent rules
- Maintain a real inventory of forms, personal data, cookies, local/session storage, analytics, embeds and processors.
- Collect only data required for a documented purpose.
- Do not load non-essential cookies, pixels, embeds or tracking before valid consent where consent is required.
- Rejecting or withdrawing consent must be as easy as accepting it.
- Do not use dark patterns, preselected consent or bundled marketing consent.
- Legal notice, privacy, cookie, accessibility and commercial terms must match actual runtime behaviour and verified owner data.
- Every contact or account flow must define recipient, lawful basis, retention, security and deletion/rights handling.
- Do not send personal data or form contents to analytics.
- Review third-party hosting, CDN, email, database, fonts, maps, video, chat and AI services for processing and international transfers.
- Ecommerce, subscription, account, upload, marketplace or community features require a new legal applicability review before implementation.

## Security rules
- HTTPS is mandatory in production.
- Never expose secrets in the repository or client bundle.
- Validate all external input server-side.
- Apply least privilege to APIs, databases and storage.
- Protect forms and endpoints against abuse without introducing unnecessary tracking.
- File uploads require type, size, filename, access and malware-risk controls.
- Define security headers, CSP and deployment hardening before launch.
- Do not claim security, encryption or compliance unless the implementation was verified.

## SEO rules
- Preserve one canonical URL per page.
- Maintain correct title, meta description, Open Graph and structured data.
- Internal links are normal follow links by default.
- Never add `nofollow` to internal navigation.
- Use `nofollow`, `sponsored` or `ugc` only when semantically required for external links.
- Build meaningful service and project relationships through contextual internal linking.
- Avoid thin pages, duplicated copy, keyword stuffing and invented local coverage.
- Add sitemap and robots validation.
- Use descriptive anchor text.

## Conversion rules
Every major page or scene must answer:
- What does SUBEROS do?
- Why should the visitor trust it?
- What is the next action?

Use clear CTAs such as:
- Ver proyectos
- Cuéntanos tu proyecto
- Solicitar presupuesto
- Hablar por WhatsApp

Do not overload every viewport with competing CTAs. One dominant action per scene is preferred.

## Asset rules
- Reuse logo, favicon and real brand materials from the current SUBEROS site only after verifying ownership and visual quality.
- Keep original downloaded assets in `public/legacy-source/` temporarily.
- Put approved production assets in `public/branding/`, `public/projects/`, `public/backgrounds/` or `public/motion/`.
- Never hotlink production assets from the old website.
- Convert raster assets to optimized AVIF/WebP where appropriate.
- Preserve SVG when clean and safe.
- Record source URL, original filename, dimensions, format, license/ownership note and final destination in `docs/LEGACY_ASSET_INVENTORY.md`.
- Remove unused assets before release.
- Verify commercial rights for fonts, photography, video, audio, icons, 3D and client case-study materials.

## Performance budgets
Initial targets:
- Initial JS compressed: keep as low as practical; investigate if above 250 KB.
- Hero critical media: ideally below 1.5 MB on mobile.
- No single decorative image above 500 KB without justification.
- Avoid loading full frame sequences before they are near the viewport.
- Prevent layout shifts by declaring media dimensions.
- Prefer local optimized fonts and preload only the critical font files.
- Target field Core Web Vitals at the 75th percentile: LCP <= 2.5 s, INP <= 200 ms and CLS <= 0.1.

## Quality gates before every sprint closure
Run and report:
- `npm install` or `npm ci`
- `npm run lint`
- `npm run build`
- available unit/component tests
- visual review at required viewport sizes
- keyboard navigation review
- reduced-motion review
- console error review
- broken-link review
- privacy/storage impact review for changed functionality
- bundle/performance comparison

If a check cannot run, document the exact blocker. Do not claim validation that did not occur.

## Final release gates
Before production launch, additionally verify:

- Completed legal applicability matrix.
- Verified legal owner and contact data.
- Privacy policy matches actual processing.
- Cookie/storage audit matches runtime behaviour.
- Consent gating and withdrawal work when required.
- Required terms, consumer information and accessibility information exist.
- Security headers, HTTPS, forms, backups and rollback are verified.
- Asset and font licences are confirmed.
- Lighthouse/Web Vitals and real-device checks are documented.
- Temporary legal pages, placeholders, test routes and unapproved assets are removed or blocked appropriately.

## Git workflow
- Inspect `git status` before editing.
- Do not overwrite unrelated user work.
- Use focused commits.
- Commit and push at the end of every completed sprint.
- Commit messages should describe the delivered result.
- Never commit secrets, `.env`, build output or downloaded temporary files that are not approved.

## Content integrity
- Use only confirmed real services, projects, contact details and locations.
- Mark missing information as TODO in documentation rather than inventing it.
- Improve copy for clarity, emotional impact and search intent while preserving factual truth.

## Definition of done
A sprint is complete only when the requested result is implemented, responsive, accessible, tested, documented, committed and pushed. A release is complete only when the technical, legal, privacy, security, accessibility, content and operational gates in `docs/EU_WEB_APP_STANDARD.md` are also satisfied.