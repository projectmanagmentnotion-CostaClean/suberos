# SUBEROS — European Web & App Standard

## Purpose

This document is the mandatory cross-project standard for SUBEROS and the reference model for future websites and web applications created under the same workflow. It combines:

1. European and Spanish legal requirements that may apply.
2. Professional engineering, UX, accessibility, security, SEO and performance practices.
3. Awwwards-level creative and technical quality criteria.

It is not a substitute for advice from a qualified lawyer, data-protection officer or accessibility specialist. Legal applicability depends on the business model, data flows, target market, sector, users and third-party services actually used.

## Source hierarchy

When rules conflict, use this order:

1. Applicable EU law.
2. Applicable Spanish law and regulator guidance.
3. Contractual obligations and third-party platform rules.
4. Accessibility and security standards.
5. Search-engine and browser technical guidance.
6. Awwwards and creative-industry criteria.
7. Internal project preferences.

A visual concept, animation or conversion experiment must never override legal compliance, accessibility, security, user control or factual truth.

---

# 1. Mandatory discovery before development

Every project must begin with a documented discovery covering:

- Legal owner and trading identity.
- Country of establishment and target countries.
- Business model: portfolio, lead generation, ecommerce, booking, SaaS, marketplace, membership or internal app.
- Whether users can create accounts, upload files, buy, subscribe, book, comment or publish content.
- Personal data collected directly and indirectly.
- Contact forms, CRM, analytics, pixels, maps, chat, video embeds, social embeds and external fonts.
- Cookies, local storage, session storage, IndexedDB, fingerprinting or comparable terminal access.
- Payment providers and recurring billing.
- Hosting, CDN, database, email and subprocessors.
- International data transfers outside the EEA.
- Children or vulnerable-user exposure.
- Accessibility scope under sector and service rules.
- Content ownership, image licences, fonts, music, video and user-generated content.
- Existing URLs requiring redirects.
- Real business details required for legal notices and structured data.

No legal page may be published with invented controller details, company numbers, postal addresses, retention periods, subprocessors or rights-contact information.

---

# 2. Core European and Spanish legal framework

## 2.1 GDPR / RGPD

GDPR applies when an organisation established in the EEA processes personal data, and may also apply to organisations outside the EEA that offer goods or services to people in the EEA or monitor their behaviour.

Required engineering consequences:

- Data minimisation: collect only fields needed for a defined purpose.
- Purpose limitation: do not silently reuse lead data for unrelated marketing.
- Lawful basis recorded per processing activity.
- Transparency at or before data collection.
- Consent must be freely given, specific, informed, unambiguous and withdrawable when consent is the chosen basis.
- Privacy by design and by default.
- Secure transmission and storage.
- Retention rules and deletion workflow.
- Rights workflow for access, rectification, deletion, objection, restriction and portability where applicable.
- Processor agreements with services handling personal data.
- International-transfer assessment and safeguards where applicable.
- Breach-response procedure.
- Records of processing when required.
- DPIA before high-risk processing when applicable.

A checkbox is not automatically required for every form. The correct lawful basis must be established. Marketing consent must not be bundled with a necessary contact or contract request.

## 2.2 Spanish LOPDGDD

Projects operated from Spain must consider Organic Law 3/2018 alongside GDPR, including Spanish rules concerning digital rights and the age threshold applicable to minors' consent in relevant information-society services.

## 2.3 LSSI-CE

For Spanish information-society services, the website must provide permanent, easy and direct access to the legally required provider information where applicable.

A complete legal notice commonly requires verified information such as:

- Owner or company name.
- Tax identification number.
- Registered or business address.
- Direct contact details.
- Company-registry details where applicable.
- Professional-regulation details where applicable.
- Clear commercial-communication identification.
- Pricing and tax information where services or products are sold online.

The exact content must be confirmed against the real legal entity and activity.

## 2.4 Cookies and terminal storage

Under Spanish LSSI guidance and EU data-protection rules:

- Strictly necessary storage may be used without consent when it is genuinely required for transmission or an explicitly requested service.
- Analytics, advertising, profiling and other non-exempt technologies must not load before valid consent where consent is required.
- Rejecting must be as easy as accepting.
- The interface must avoid dark patterns.
- Consent must be granular by meaningful purpose.
- Pre-ticked options are not acceptable.
- Users need a persistent method to change or withdraw choices.
- The cookie policy must identify purposes, parties, durations and management methods accurately.
- Consent records and versioning should be retained where needed to demonstrate compliance.
- Embeds, tags and SDKs must be blocked until the relevant category is allowed.
- Fingerprinting and similar technologies are included in the compliance analysis, not only traditional cookies.

Do not add a cookie banner when the site uses only exempt technical storage. First perform a real cookie and storage audit.

## 2.5 European Accessibility Act and Spanish implementation

The European Accessibility Act has applied to covered products and services since 28 June 2025, subject to scope, exclusions and transitional rules. Spanish Law 11/2023 transposes relevant accessibility obligations.

Potentially covered private-sector services include ecommerce and certain consumer-facing digital services. Applicability must be assessed per project; a simple portfolio site and an ecommerce checkout may not have the same legal position.

Regardless of formal scope, SUBEROS adopts WCAG 2.2 AA as the default delivery target.

Where legally required, projects must also prepare:

- Accessibility information describing how the service meets requirements.
- Accessible support and communication channels.
- Monitoring and remediation workflow.
- Documentation retained for the legally required period.

Public-sector projects have additional obligations under Directive (EU) 2016/2102 and national implementation, including an accessibility statement and feedback mechanism.

## 2.6 Consumer and ecommerce rules

When users can purchase, subscribe or book, confirm and implement as applicable:

- Trader identity before purchase.
- Total price including taxes and unavoidable charges.
- Main characteristics of the product or service.
- Payment, delivery and performance conditions.
- Contract duration, renewal and termination rules.
- Right of withdrawal and legally valid exceptions.
- Model withdrawal form where required.
- Complaint handling.
- Order confirmation on a durable medium.
- Button wording that clearly indicates an obligation to pay.
- No preselected paid extras.
- Clear subscription and recurring-charge consent.
- Terms and conditions accepted through a provable flow.
- Versioned legal text and evidence of acceptance.

## 2.7 Digital Services Act

The Digital Services Act becomes relevant when a product acts as an intermediary, hosting service, platform, marketplace or handles user-generated content. A standard portfolio or lead-generation website normally does not need platform-specific DSA features.

If applicable, assess:

- Notice-and-action mechanisms.
- Reasons for content moderation decisions.
- Internal complaint handling.
- Trader traceability for marketplaces.
- Advertising transparency.
- Terms describing moderation and restrictions.
- Contact points and reporting duties.

## 2.8 Intellectual property and media rights

Before publication, verify:

- Ownership or licence for every photo, video, illustration, icon, font, audio file, 3D model, code package and case-study asset.
- Client permission to publish work and brand identifiers.
- Model/property releases where needed.
- Licence compatibility for commercial use, modification, embedding and self-hosting.
- Attribution requirements.
- Open-source dependency licences.

Recovered legacy assets must retain source and ownership notes. Do not treat an asset as reusable merely because it was publicly reachable.

---

# 3. Required legal pages and interfaces

The final set depends on project scope. The release checklist must explicitly mark each item as required, not applicable or pending legal confirmation.

## 3.1 Common baseline pages

- Legal notice / Aviso legal.
- Privacy policy / Política de privacidad.
- Cookie policy / Política de cookies, only reflecting actual technologies.
- Cookie preferences interface when non-exempt storage exists.
- Accessibility page or statement where required or adopted as a transparency commitment.

## 3.2 Additional pages by business model

Ecommerce or paid services:

- Terms and conditions of sale/service.
- Shipping or service-delivery conditions.
- Returns, cancellation and withdrawal policy.
- Payment and subscription terms.
- Warranty and after-sales information.

Accounts or SaaS:

- Terms of use.
- Account deletion and data export information.
- Acceptable-use policy where relevant.
- Processor/subprocessor information where contractually needed.

User uploads or communities:

- Content rules.
- Intellectual-property licence terms.
- Reporting and moderation process.
- Prohibited-content and takedown flow.

Apps:

- App privacy disclosures matching runtime behaviour.
- Platform-specific privacy labels and permissions explanations.
- In-app account deletion when platform or law requires it.

## 3.3 Legal-page implementation rules

- Legal text must be reachable from every page.
- Links must not be hidden behind animation or consent.
- Pages require stable URLs and must be crawlable unless a justified legal/security reason says otherwise.
- Effective date and version should be visible.
- Legal content must match real code and vendors.
- Contact details must be functional.
- Consent records should reference the legal-text version accepted.
- Temporary placeholder legal pages cannot be treated as launch-ready.

---

# 4. Privacy and consent architecture

## 4.1 Data inventory

Maintain a living register containing:

- Data category.
- Source.
- Purpose.
- Lawful basis.
- Required/optional status.
- Recipient or processor.
- Hosting region.
- International transfer mechanism.
- Retention period.
- Deletion method.
- Security controls.
- User-rights handling.

## 4.2 Forms

All forms must:

- Use visible labels.
- Explain required fields.
- Collect the minimum data.
- Provide a first-layer privacy notice near submission.
- Link to the full privacy policy.
- Separate optional marketing consent.
- Avoid making privacy-policy acceptance a false contractual requirement.
- Validate client-side and server-side.
- Rate-limit and protect against spam without excessive tracking.
- Provide accessible success and error states.
- Avoid exposing submissions in URLs, logs or analytics.
- Define retention and destination before launch.

## 4.3 Analytics and tracking

Preferred order:

1. No analytics when unnecessary.
2. Privacy-preserving, first-party or consent-exempt analytics only after legal assessment.
3. Consent-gated analytics.
4. Advertising and profiling only with explicit project approval and valid consent.

Every event must have a documented purpose. Never send form text, email addresses, phone numbers, uploaded filenames or other personal data to analytics by default.

## 4.4 Third-party embeds

Maps, YouTube/Vimeo, social feeds, chat widgets, reCAPTCHA, external booking widgets and marketing pixels require a privacy and cookie assessment.

Use privacy-enhanced or click-to-load placeholders where appropriate. Do not allow an embed to contact third parties before consent when consent is required.

---

# 5. Security baseline

Every production project must include or document:

- HTTPS only.
- HSTS after deployment validation.
- Secure, HttpOnly and SameSite cookies where applicable.
- Content Security Policy designed for the actual app.
- Referrer-Policy.
- Permissions-Policy.
- X-Content-Type-Options.
- Frame protection through CSP `frame-ancestors`.
- Dependency auditing and controlled updates.
- No secrets in client bundles or repository.
- Server-side validation and output encoding.
- CSRF protection where cookie-authenticated state changes exist.
- Rate limiting and abuse protection.
- Secure file-upload validation: type, size, filename, malware workflow and private storage.
- Authentication hardening, password-reset safety and session revocation where accounts exist.
- Least-privilege database and storage rules.
- Backups and restore testing.
- Error monitoring without leaking personal data.
- Incident-response and vulnerability-reporting path.

Avoid claiming “secure” without defining and testing the controls.

---

# 6. Accessibility and inclusive motion

Default target: WCAG 2.2 AA, including:

- Semantic landmarks and heading hierarchy.
- Keyboard operation without traps.
- Visible focus.
- Sufficient contrast.
- Text resizing and 200% zoom support.
- Reflow without horizontal scrolling for ordinary content.
- Accessible names and descriptions.
- Form labels, instructions and error identification.
- Status messages exposed appropriately.
- 44x44 px practical touch targets.
- Alternatives for time-based media.
- Captions/transcripts where required.
- No critical information only in colour, motion, canvas or audio.
- `prefers-reduced-motion` and a complete non-cinematic equivalent.
- Avoidance of flashing content and excessive vestibular motion.
- Logical DOM order even when visual order changes.
- Accessible authentication without unnecessary cognitive tests.

Awwwards-level motion must be progressive enhancement. The usable site exists before animation.

---

# 7. Awwwards-level quality standard

Awwwards is an editorial award platform, not a regulator. Its commonly evaluated dimensions include design, usability, creativity and content, while developer recognition rewards technical execution across platforms.

SUBEROS interprets Awwwards-level delivery as:

## Design

- Distinct art direction.
- Strong typography and composition.
- Visual consistency.
- High-quality real media.
- Responsive art direction, not scaled desktop layouts.
- Intentional rhythm and restraint.

## Usability

- Immediate understanding of purpose.
- Clear navigation and conversion path.
- No scroll hijacking.
- Native input behaviour preserved.
- Motion never blocks interaction.
- Fast recovery from errors.
- Functional on keyboard, touch and pointer.

## Creativity

- Original narrative and transitions.
- Motion tied to brand meaning.
- Avoidance of copied effects or generic demos.
- Technical experimentation only when it improves the experience.

## Content

- Real, well-edited content.
- Strong storytelling.
- Clear service proposition.
- Genuine projects and credits.
- No fabricated metrics, clients, awards or testimonials.

## Developer quality

- Semantic, maintainable code.
- Stable responsive behaviour.
- Progressive enhancement.
- Controlled animation lifecycle.
- Efficient media pipeline.
- Cross-browser testing.
- Accessibility and reduced motion.
- Measured performance.

A visually spectacular site that fails consent, keyboard access, performance or content clarity does not meet the SUBEROS interpretation of professional Awwwards-level work.

---

# 8. SEO and discoverability

Every public site must include as applicable:

- Crawlable semantic content.
- One canonical URL per indexable page.
- Unique title and meta description.
- Correct heading hierarchy.
- Descriptive internal links.
- No `nofollow` on normal internal links.
- Structured data only when factually supported.
- XML sitemap containing canonical indexable URLs.
- Accurate robots rules.
- 404 and redirect strategy.
- Image dimensions, alt strategy and modern formats.
- Open Graph and social images.
- `hreflang` only for real translated equivalents.
- Local SEO only with verified business information.
- Search Console verification and post-launch monitoring.

Do not hide indexable copy inside canvas or client-only animation states.

---

# 9. Performance and Core Web Vitals

Default field targets at the 75th percentile:

- LCP: 2.5 seconds or less.
- INP: 200 milliseconds or less.
- CLS: 0.1 or less.

Project budgets must cover:

- Initial JavaScript and route chunks.
- Critical CSS.
- Font count and weight.
- LCP media.
- Total page weight.
- Third-party scripts.
- Active ScrollTriggers.
- Canvas/frame-sequence memory.
- Video and image decoding.

Rules:

- Load only critical first-view assets eagerly.
- Lazy-load below-fold media.
- Use responsive images and explicit dimensions.
- Self-host fonts when licence permits.
- Preload only assets proven critical.
- Code-split internal labs and heavy routes.
- Avoid long main-thread tasks.
- Pause non-visible canvas/video work.
- Test on mid-range mobile hardware and slow networks.
- Measure production builds, not only development mode.

Lighthouse is a laboratory signal, not the only acceptance criterion. Field data and real-device behaviour take priority once available.

---

# 10. Technical architecture and maintainability

Required principles:

- TypeScript strictness appropriate to the project.
- Separation of content, UI, state, data access and motion.
- Central design tokens.
- Reusable accessible primitives.
- Single ownership of global animation and scroll engines.
- Cleanup for events, observers, RAF, timers, media and ScrollTrigger.
- Error boundaries or equivalent containment where useful.
- Environment validation.
- Typed content models.
- No production dependency on internal QA routes.
- Stable IDs and data hooks for automated QA.
- Documented deployment and rollback.

For apps additionally require:

- Loading, empty, success, offline and error states.
- Optimistic updates only with rollback.
- Authentication and authorisation separated.
- Server enforcement of permissions.
- Auditability for sensitive actions.
- Data migration and backup strategy.

---

# 11. AI-assisted creation rules

AI may assist with architecture, coding, QA, image preparation and copy refinement, but:

- It must not invent legal identity, legal clauses, clients, results or licences.
- Generated legal text remains a draft requiring factual review and, where risk warrants, legal review.
- Generated images must not falsely represent completed client work.
- AI-generated alt text must be manually checked.
- Personal or confidential data must not be sent to unapproved AI services.
- AI-generated dependencies or code require security and licence review.
- Prompts and automation must preserve real content and project constraints.

---

# 12. Mandatory project documents

Every professional web/app repository should contain or link to:

- `AGENTS.md`.
- Master roadmap.
- Architecture overview.
- Design system.
- Accessibility standard and audit.
- Privacy/data inventory.
- Cookie/storage inventory.
- Security checklist.
- SEO architecture.
- Performance budget.
- Asset and licence inventory.
- QA plan.
- Deployment and rollback plan.
- Legal applicability matrix.
- Sprint reports with real validation results.

For SUBEROS, this standard is the umbrella document. More specific project documents may add stricter requirements but may not weaken it.

---

# 13. Mandatory legal applicability matrix

Before launch create `docs/LEGAL_APPLICABILITY_MATRIX.md` with one row per requirement:

| Requirement | Applicable | Evidence / reason | Implementation | Owner | Status |
|---|---:|---|---|---|---|
| GDPR privacy notice |  |  |  |  |  |
| Cookie consent |  |  |  |  |  |
| LSSI legal notice |  |  |  |  |  |
| Ecommerce terms |  |  |  |  |  |
| Withdrawal rights |  |  |  |  |  |
| Accessibility statement |  |  |  |  |  |
| EAA / Law 11/2023 |  |  |  |  |  |
| DSA platform duties |  |  |  |  |  |
| International transfers |  |  |  |  |  |
| Processor agreements |  |  |  |  |  |
| IP/media permissions |  |  |  |  |  |

“Not applicable” always requires a reason. Unknown items block final launch approval.

---

# 14. Release gates

No public launch is approved until:

## Legal

- Verified owner data is present.
- Privacy text matches actual processing.
- Cookie audit matches runtime behaviour.
- Non-essential scripts are correctly gated.
- Consent can be rejected and withdrawn.
- Required terms and consumer information exist.
- Asset and font rights are confirmed.
- Accessibility applicability is assessed.

## Technical

- Lint and production build pass.
- Tests and smoke checks pass.
- No console errors.
- Broken links and missing assets are resolved.
- Security headers and HTTPS are verified.
- Forms work end to end.
- Backups and rollback are ready.

## Experience

- Required viewports and real devices are reviewed.
- Keyboard and reduced-motion flows work.
- Core content remains usable without animation.
- Performance budgets are measured.
- Conversion events do not leak personal data.

## Operations

- Analytics and Search Console are configured only after consent/legal review.
- Error monitoring is active.
- Responsible owner for privacy requests is defined.
- Post-launch monitoring window is planned.

---

# 15. Official reference baseline

Use current official sources when implementing or updating this document, including:

- Regulation (EU) 2016/679 — GDPR.
- European Commission data-protection framework.
- European Data Protection Board guidance.
- Directive 2002/58/EC and applicable national ePrivacy implementation.
- Spanish Law 34/2002 — LSSI-CE.
- Spanish Organic Law 3/2018 — LOPDGDD.
- AEPD cookie guidance.
- Directive (EU) 2019/882 — European Accessibility Act.
- Spanish Law 11/2023.
- Directive (EU) 2016/2102 for public-sector websites/apps.
- Regulation (EU) 2022/2065 — Digital Services Act when applicable.
- EU consumer law and Spanish implementing rules for ecommerce.
- WCAG 2.2 and EN 301 549 where applicable.
- Google Search Central and web.dev for search and Web Vitals.
- Awwwards public judging/submission criteria as an editorial quality reference.

Because laws, regulator guidance and browser standards evolve, re-verify this baseline before launch and during major maintenance cycles.

---

# 16. SUBEROS implementation decision

For the current SUBEROS portfolio/lead-generation site:

- Legal notice, privacy policy and verified contact/controller data are launch requirements.
- Cookie consent is required only if runtime audit confirms non-exempt cookies or equivalent storage/tracking.
- Temporary legal placeholders are not launch-ready.
- Contact-form implementation must define recipient, lawful basis, retention, security and user-rights route.
- Accessibility remains WCAG 2.2 AA by project policy even if a narrower legal exemption might apply.
- Awwwards-level motion is progressive enhancement and must preserve reduced-motion, keyboard, semantic and mobile experiences.
- Ecommerce, subscription, marketplace and DSA duties are currently conditional and must be reassessed if the product scope expands.
