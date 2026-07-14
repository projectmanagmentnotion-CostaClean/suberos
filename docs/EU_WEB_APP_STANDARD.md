# SUBEROS — European Professional Website Standard

## Purpose

This document is the mandatory technical, legal, privacy, accessibility, security, SEO, performance and creative-quality standard for the SUBEROS website only.

It consolidates professional practices that may also exist in mature web projects, but it must never import, mention, link to, depend on or expose content, assets, routes, clients, case studies, branding or code from any other website or application.

The target is an Awwwards-level immersive website for SUBEROS, delivered as progressive enhancement on top of a fast, accessible, legally reviewable and conversion-oriented foundation.

This document is not legal advice. Final legal text and applicability must be confirmed against the real SUBEROS owner, activity, vendors, data flows and production configuration.

## Source hierarchy

When requirements conflict, use this order:

1. Applicable European Union law.
2. Applicable Spanish law and regulator guidance.
3. Verified contractual, licensing and platform obligations.
4. Accessibility, privacy and security requirements.
5. Search-engine, browser and performance guidance.
6. Awwwards-level design and development criteria.
7. Internal visual preferences.

Motion, visual impact and conversion experiments may never override legal compliance, accessibility, security, user control or factual truth.

---

# 1. Strict project isolation

SUBEROS must remain an independent project.

Mandatory rules:

- Do not mention other websites, applications or internal projects in public copy, metadata, structured data, routes or documentation intended to describe SUBEROS.
- Do not reuse another project's name, logo, images, screenshots, mockups, source code, analytics identifiers, contact data, legal text or case-study copy.
- Do not create a public case study until the work is explicitly approved as a SUBEROS portfolio item and its publication rights are confirmed.
- Technical patterns may be reused only as abstract engineering practices: architecture, QA, SEO, accessibility, motion lifecycle, responsive strategy, security and documentation procedures.
- Any imported reusable utility must be reviewed, renamed where necessary, decoupled from its origin and validated against the SUBEROS stack.
- Repository searches must be performed before release for foreign project names, domains, email addresses, analytics IDs and asset paths.

A project reference found in SUBEROS must be classified as one of:

- approved SUBEROS content;
- internal technical note that must not ship;
- accidental cross-project contamination that must be removed.

---

# 2. SUBEROS discovery and factual baseline

Before final implementation or launch, maintain verified records for:

- Legal owner or trading identity.
- Tax identifier and legal address when required.
- Public contact details.
- Confirmed location and service area.
- Real services offered by SUBEROS.
- Approved portfolio content and publication permissions.
- Forms and personal data collected.
- Hosting, email, analytics, CDN and other vendors.
- Cookies, localStorage, sessionStorage and third-party embeds.
- Fonts, images, videos, audio, code and licence status.
- Existing public URLs requiring preservation or redirects.

Do not invent legal identity, clients, awards, metrics, testimonials, locations, publication permissions, licences, processors, retention periods or business results.

---

# 3. European and Spanish legal baseline

## 3.1 GDPR / RGPD and LOPDGDD

For SUBEROS, any contact form, email request, phone interaction, analytics event, uploaded file or identifiable technical record may involve personal data.

Required implementation principles:

- Collect only data needed for a documented purpose.
- Define a lawful basis for each processing activity.
- Provide privacy information at or before collection.
- Separate optional marketing consent from contact or quotation requests.
- Do not use preselected consent.
- Do not send form content or contact data to analytics.
- Secure transmission, storage and access.
- Define recipients, processors, retention and deletion.
- Provide a route for access, rectification, deletion, objection, restriction and portability where applicable.
- Review international transfers when vendors process data outside the EEA.
- Maintain a breach-response procedure.

A privacy checkbox is not automatically required for every contact form. The implementation must reflect the real lawful basis and provide transparent first-layer information.

## 3.2 LSSI-CE and legal notice

Before launch, SUBEROS must provide permanent, direct and accessible legal information where applicable, using verified data only.

The legal notice may require:

- Owner or company name.
- Tax identification number.
- Legal or business address.
- Direct contact details.
- Registry or professional information where applicable.
- Intellectual-property and responsibility clauses adapted to the real service.

Temporary legal placeholders are not launch-ready.

## 3.3 Cookies and browser storage

Perform a runtime audit before deciding whether a cookie banner is required.

Rules:

- Strictly necessary storage may operate without consent only when genuinely exempt.
- Non-essential analytics, advertising, profiling and third-party embeds must remain blocked until valid consent when required.
- Rejecting must be as easy as accepting.
- Consent must be granular, informed and withdrawable.
- No dark patterns or preselected categories.
- Provide a persistent preferences control when non-essential categories exist.
- The cookie policy must match actual runtime technologies, purposes, parties and durations.
- Include cookies, localStorage, sessionStorage, SDKs, pixels, beacons and fingerprinting in the audit.

Do not add a generic cookie banner when the production website uses only exempt technical storage.

## 3.4 Accessibility in Europe

SUBEROS targets WCAG 2.2 AA regardless of whether every requirement is legally mandatory for the final business classification.

Assess before launch:

- European Accessibility Act applicability.
- Spanish Law 11/2023 applicability.
- Whether an accessibility statement or public accessibility information is required or voluntarily adopted.

The cinematic experience must have an equivalent non-cinematic experience.

## 3.5 Consumer scope changes

The current SUBEROS roadmap is a portfolio and lead-generation website. If the scope later adds direct payments, ecommerce, subscriptions, accounts, bookings or user uploads, stop and perform a new legal applicability review before implementation.

Do not add ecommerce or platform legal text to the current site unless those features actually exist.

## 3.6 Intellectual property

Before publication verify:

- Ownership or commercial licence for every font, image, video, audio file, icon, 3D asset and code dependency.
- Permission to publish client names, logos and project media.
- Attribution requirements.
- Model or property releases when necessary.
- Open-source licence compatibility.

Public availability is not proof of reuse rights.

---

# 4. Required SUBEROS legal and transparency pages

Final launch baseline:

- Aviso legal.
- Política de privacidad.
- Política de cookies reflecting the real audit, when applicable.
- Cookie preferences interface only when non-essential storage exists.
- Accessibility information or statement when required or adopted.

Implementation requirements:

- Stable routes.
- Reachable from every public page.
- Visible without animation or consent.
- Effective date and version.
- Verified owner and contact information.
- Content matching production code and vendors.
- No copied legal text from unrelated businesses.

Before launch create and complete:

- `docs/LEGAL_APPLICABILITY_MATRIX.md`
- `docs/DATA_AND_VENDOR_INVENTORY.md`
- `docs/COOKIE_STORAGE_AUDIT.md`
- `docs/ASSET_LICENCE_REGISTER.md`

---

# 5. Privacy and contact architecture

Any SUBEROS contact flow must define:

- Purpose.
- Required and optional fields.
- Lawful basis.
- Recipient mailbox or backend.
- Hosting and processors.
- Retention period.
- Deletion and rights workflow.
- Spam and abuse protection.
- Accessible success and error states.

Forms must:

- Use visible labels.
- Explain required fields.
- Minimise data.
- Provide first-layer privacy information.
- Link to the full privacy policy.
- Validate client-side and server-side.
- Apply rate limiting without unnecessary tracking.
- Avoid personal data in URLs, logs and analytics.

Third-party maps, video embeds, chat widgets, social feeds and CAPTCHA products require a privacy and cookie review before integration.

---

# 6. Security baseline

Production requirements or documented deployment controls:

- HTTPS only.
- HSTS after deployment validation.
- Content Security Policy adapted to actual assets and vendors.
- Referrer-Policy.
- Permissions-Policy.
- X-Content-Type-Options.
- Frame protection through CSP `frame-ancestors`.
- No secrets in the repository or browser bundle.
- Server-side validation for external input.
- Rate limiting and abuse protection for form endpoints.
- Least-privilege access.
- Dependency review.
- Backup and rollback procedure.
- Error monitoring without leaking personal data.
- Security-header verification in staging and production.

Do not claim that SUBEROS is secure, compliant or encrypted beyond the controls actually tested.

---

# 7. Accessibility and inclusive motion

Default target: WCAG 2.2 AA.

Mandatory requirements:

- Semantic landmarks.
- One logical H1 per page.
- Correct heading hierarchy.
- Full keyboard operation.
- Visible focus.
- Skip link.
- Practical 44x44 px touch targets.
- Sufficient contrast.
- Reflow and 200% zoom support.
- Meaningful alt text; decorative media uses empty alt.
- Accessible form labels, instructions and errors.
- No critical content exclusively in canvas, video, audio or animation.
- Logical DOM order independent of visual animation order.
- `prefers-reduced-motion` support.
- Full, balanced and reduced motion profiles.
- No flashes, scroll traps or compulsory vestibular motion.

GSAP is progressive enhancement. Navigation, content and conversion must work if motion is disabled or fails.

---

# 8. Awwwards-level SUBEROS quality standard

Awwwards-level means a distinct, memorable and technically disciplined experience. It is not permission to sacrifice usability or performance.

## 8.1 Design

- Unique charcoal-to-black art direction.
- StretchPro used intentionally as the approved display voice.
- Monumental typography with responsive art direction.
- Real, high-quality SUBEROS media.
- Strong composition, rhythm, contrast and whitespace.
- No template-like card systems where editorial presentation is more appropriate.
- Consistent visual language across loader, hero, sections, contact and legal pages.

## 8.2 Creativity and motion

- Scroll-linked narrative with a clear purpose.
- Continuity between scenes rather than isolated effect demos.
- Preloader based on real critical assets.
- GSAP lifecycle, cleanup and responsive matchMedia.
- Frame sequences only when the supplied assets justify them.
- Full mobile adaptation and static/reduced fallbacks.
- No autoplay audio.
- No motion that delays access to essential information.

## 8.3 Usability and conversion

Every major scene must answer:

- What is SUBEROS?
- What does it offer?
- Why is it credible?
- What should the visitor do next?

Use one dominant CTA per scene. Avoid CTA competition and decorative interactions that hide navigation.

## 8.4 Content

- Real SUBEROS services and contact data only.
- Emotional but factual copy.
- No invented clients, awards, metrics or testimonials.
- No portfolio item without explicit approval and media rights.
- Correct Spanish writing and terminology.

## 8.5 Developer quality

- Modular React and TypeScript.
- Central GSAP registration.
- Scene lifecycle and cleanup.
- Responsive assets.
- Route and feature code splitting when justified.
- Stable direct routes and 404 handling.
- No console errors.
- No broken links.
- Documented architecture and QA.

---

# 9. SEO and information architecture

SUBEROS SEO must be based on real search intent and real services.

Requirements:

- One canonical URL per indexable page.
- Unique title and meta description.
- One logical H1.
- Meaningful H2/H3 structure.
- Open Graph and social image.
- Structured data using verified values only.
- Sitemap containing public canonical routes only.
- Robots rules excluding QA, development and temporary routes.
- Descriptive internal anchors.
- Internal links remain follow links by default.
- No `nofollow` on internal navigation.
- `sponsored`, `ugc` and `nofollow` only when semantically required for external links.
- No keyword stuffing, doorway pages, copied copy or invented local coverage.
- Service, studio, process and contact relationships should guide users naturally.

Portfolio or case-study routes must not be generated until real SUBEROS content is approved. Empty or invented project pages are prohibited.

---

# 10. Performance and Core Web Vitals

Field targets at the 75th percentile:

- LCP <= 2.5 s.
- INP <= 200 ms.
- CLS <= 0.1.

Project budgets:

- Investigate initial compressed JS above 250 KB.
- Keep mobile hero critical media ideally below 1.5 MB.
- No decorative image above 500 KB without documented justification.
- Declare media dimensions.
- Preload only genuinely critical fonts and media.
- Lazy-load below-the-fold media.
- Load frame sequences near their scene, not at startup.
- Pause video, canvas and loops outside active scenes.
- Avoid continuous expensive blur, filter and layout animation on mobile.
- Measure bundle growth at every sprint.

A high visual score does not compensate for poor real-device performance.

---

# 11. Responsive and browser quality

Required review viewports:

- 390x844.
- 768x1024.
- 1366x768.
- 1440x900.
- Mobile landscape when relevant.

Also review:

- Pointer coarse and fine.
- Keyboard-only navigation.
- Reduced motion.
- 200% zoom.
- Resize and orientation changes.
- Direct anchor entry.
- Back and forward navigation.
- Slow network and cached repeat visit.
- iPhone Safari, Android Chrome and tablet on real devices before launch when available.

Do not claim physical-device validation unless it was executed.

---

# 12. Quality gates per sprint

Every completed sprint must report:

- Initial repository status and commit.
- Files created and modified.
- Real findings.
- `npm install` or `npm ci`.
- `npm run lint`.
- `npm run build`.
- Available tests.
- Console review.
- Responsive review.
- Keyboard review.
- Reduced-motion review.
- Broken-link and anchor review.
- Bundle comparison.
- Privacy, storage, third-party and legal impact.
- Asset and licence impact.
- Commit SHA and push confirmation.

If a check cannot run, report the exact limitation. Never claim a test that was not executed.

---

# 13. Mandatory pre-launch gate

SUBEROS cannot be approved for production until all applicable items are closed:

- Verified legal owner and contact data.
- Final legal notice.
- Final privacy policy.
- Runtime cookie and storage audit.
- Final cookie policy and consent controls when required.
- Accessibility applicability assessment.
- WCAG 2.2 AA audit and remediation record.
- Asset and font licence register.
- Contact endpoint security and retention definition.
- HTTPS and security headers.
- Sitemap, robots, canonical, redirects and 404.
- Lighthouse and Core Web Vitals review.
- Real-device review where available.
- Removal of placeholders, QA routes from indexing and foreign project references.
- Staging smoke test, backup and rollback plan.

Unknown legal identity or placeholder legal content blocks launch approval.

---

# 14. Change-control rule

Whenever SUBEROS adds a new vendor, tracker, embed, form field, upload, account, payment, subscription, booking, public portfolio item or new target country, update the applicability matrix and reassess privacy, legal, accessibility, security, SEO and performance impact before release.
