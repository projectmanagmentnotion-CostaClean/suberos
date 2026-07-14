# SUBEROS — Master Roadmap

## Current delivery status

- Phase 0 complete
- Phase 1 complete
- Phase 2 complete
- Phase 3 complete
- Phase 4 complete
- Cross-project European technical/legal standard added
- Phase 5 complete
- Next recommended sprint: Phase 6 - Project system and case studies
- Mandatory compliance implementation sprint must be completed before public launch

## Mandatory governing documents

Every phase and sprint must follow:

- `AGENTS.md`
- `docs/EU_WEB_APP_STANDARD.md`

`docs/EU_WEB_APP_STANDARD.md` is the project-wide technical, legal, privacy, cookie, accessibility, security, SEO, performance and Awwwards-quality baseline. Later documents may make requirements stricter but may not weaken it.

Every sprint must include a short impact check for:

- personal data;
- cookies and browser storage;
- third-party services and international transfers;
- accessibility;
- security;
- consumer/ecommerce obligations;
- asset and font licensing;
- legal-page accuracy.

## Product vision
Create a cinematic, high-impact creative studio website with extreme GSAP motion, large editorial typography, charcoal-to-black art direction, immersive scroll storytelling and conversion-focused content. The experience must remain usable, accessible and performant across desktop, tablet and mobile.

## Phase 0 — Governance and baseline
- Add AGENTS.md and project operating rules.
- Confirm stack, scripts, folder structure and deployment target.
- Audit existing code and current public website.
- Create an inventory of real content, contacts, services and assets.
- Establish responsive, accessibility, SEO and performance baselines.
- Adopt `docs/EU_WEB_APP_STANDARD.md` as the mandatory master standard.

## Phase 1 — Legacy asset recovery and brand foundation
- Download owned logo, favicon and useful visual assets from the current site.
- Record every source and destination.
- Clean SVGs and optimize raster files.
- Create brand folders and naming conventions.
- Define charcoal/black color tokens, spacing, typography, borders, shadows, grain and gradients.
- Build a basic brand sheet inside documentation.
- Record ownership and licence status for fonts, images and media.

## Phase 2 — Design system and application shell
- Build semantic AppShell, header, full-screen menu, footer and skip link.
- Create Button, TextLink, SectionHeader, Eyebrow, MediaFrame, ProjectLink and CTA components.
- Define fluid typography with `clamp()`.
- Create focus, hover, active, loading and disabled states.
- Add responsive layout primitives and content containers.

## Phase 3 — Motion system
- Central GSAP registration.
- Lenis/ScrollTrigger synchronization.
- Reusable hooks and scene lifecycle.
- Breakpoint and reduced-motion orchestration with `gsap.matchMedia()`.
- Reveal, split-text, mask, parallax, horizontal movement, velocity and FLIP primitives.
- Debug mode and cleanup checks.
- Document motion rules and performance limits.

## Phase 4 — Cinematic preloader and hero
- Real asset-aware preload logic.
- 000–100 progress UI.
- Logo construction/reveal.
- FLIP transition from loader to hero.
- Hero timeline tied to scroll.
- Large typography, image masks and layered depth.
- Mobile-specific timeline and static fallback.

## Phase 5 — Core homepage narrative
- Manifesto / what SUBEROS is.
- Services with contextual internal linking.
- Featured work with large-format visual scenes.
- Photography section.
- Branding and graphic design section.
- Print and production section.
- Web design and development section.
- Process/method section.
- High-conversion final contact scene.
- Confirm that new embeds, CTAs or storage do not introduce undocumented privacy/cookie impact.

## Phase 6 — Project system and case studies
- Typed project data model.
- Projects index with filters only if useful.
- Individual SEO-ready project routes.
- FLIP transitions between listing and detail.
- Narrative case-study blocks: context, challenge, solution, media, outcome and related projects.
- Add Luxury Shisha as the first fully developed case.
- Record client publication permission and asset ownership for each case.

## Phase 7 — Frame sequences and advanced media
- Canvas sequence player with preload window.
- Desktop, tablet/mobile and static fallback packages.
- Pause rendering outside viewport.
- Memory-safe handling for Safari iOS.
- Optional video and WebGL only when justified.
- Define asset production specifications for Anderson.
- Provide semantic and reduced-motion alternatives for all advanced media.

## Phase 8 — Contact and conversion engine
- Multi-step or concise contact flow based on conversion testing.
- Real endpoint using a serverless function, Resend or Supabase.
- Validation, spam protection and success/error states.
- WhatsApp and email contact paths.
- Analytics events for CTA, form start, completion and project views.
- Privacy and legal consent implementation.
- Define fields, purposes, lawful basis, destination, processors, retention and deletion workflow.
- Prevent personal data from being sent to analytics.
- Add first-layer privacy information and separate optional marketing consent where applicable.

## Phase 9 — SEO, legal, privacy and compliance architecture
- Confirm sitemap and information architecture.
- Optimize titles, descriptions, headings, canonicals and structured data.
- Build service-to-project and project-to-service relationships.
- Contextual internal links and related work.
- Image alt strategy and media metadata.
- Robots, sitemap, redirects and 404.
- Local SEO only with verified business details.
- Create `docs/LEGAL_APPLICABILITY_MATRIX.md`.
- Create a real data-processing and vendor inventory.
- Create a cookie/storage inventory from runtime behaviour.
- Replace temporary legal placeholders with verified legal notice, privacy policy and cookie policy where applicable.
- Assess European Accessibility Act / Spanish Law 11/2023 applicability.
- Create accessibility information or statement when required or adopted.
- Confirm whether ecommerce, subscriptions, accounts, uploads, marketplace or DSA obligations apply.
- Verify legal owner, tax/company details and contact route.
- Version legal text and consent evidence where applicable.
- Obtain qualified legal review when the risk or business model warrants it.

## Phase 10 — Accessibility and inclusive motion
- WCAG 2.2 AA audit.
- Keyboard and screen-reader flow.
- Reduced-motion experience.
- Contrast and focus review.
- Touch target and form error review.
- Ensure all canvas/video content has semantic equivalents.
- Review zoom, reflow, authentication and status messages.
- Produce remediation record and accessibility statement inputs.

## Phase 11 — Performance, security and device hardening
- Route and scene code splitting.
- Responsive media and lazy loading.
- Font optimization.
- Frame sequence budgets.
- Lighthouse and Web Vitals review.
- Real-device testing on iPhone Safari, Android Chrome and tablet.
- Slow network and low-memory testing.
- Verify HTTPS, CSP, HSTS readiness and security headers.
- Review secrets, dependencies, endpoint validation, rate limits and upload controls.
- Verify backup and rollback process.

## Phase 12 — Visual and functional QA automation
- Establish screenshot baselines at 390x844, 768x1024, 1366x768 and 1440x900.
- Verify headers, menu, hero, pinned scenes, project pages, form and footer.
- Test normal and reduced-motion modes.
- Add stable `data-qa` hooks where needed.
- Document known browser differences.
- Add legal-link, cookie-gating, form, consent-withdrawal and security-header checks where applicable.

## Phase 13 — Content, legal and launch-readiness polish
- Final copy audit for factual accuracy, emotional impact and conversion.
- Proofread Spanish copy.
- Verify all links, contact details, legal pages and social profiles.
- Remove placeholders and unused assets.
- Confirm asset, font, client and media publication rights.
- Complete the legal applicability matrix with evidence.
- Confirm privacy/cookie documents match production runtime.
- Final build and deployment package.

## Phase 14 — Deployment and monitoring
- Back up the current site.
- Deploy to staging first.
- Validate domain, HTTPS, forms, analytics and Search Console.
- Configure redirects from old URLs.
- Run post-deploy smoke tests.
- Verify production cookies/storage before enabling analytics.
- Verify security headers, legal links and consent controls.
- Monitor errors, conversion and performance after launch.
- Define privacy-request and incident-response ownership.

## Phase 15 — Continuous improvement
- Add new case studies through the project data system.
- Review conversion paths and user behavior.
- Optimize heavy scenes based on real device data.
- Keep dependencies and browser compatibility current.
- Run periodic SEO, accessibility, privacy, cookie, security and performance audits.
- Reassess legal applicability whenever the business model, vendors, countries or data flows change.

## Mandatory pre-launch compliance sprint

This sprint may run after the core experience is stable, but it cannot be skipped or left until after public launch.

Deliverables:

- `docs/LEGAL_APPLICABILITY_MATRIX.md`.
- Verified legal-owner information checklist.
- Data-processing inventory.
- Vendor/subprocessor and international-transfer inventory.
- Cookie/localStorage/sessionStorage/third-party runtime audit.
- Consent architecture and withdrawal mechanism if required.
- Final legal notice.
- Final privacy policy.
- Final cookie policy if applicable.
- Accessibility applicability assessment and statement/information where required.
- Terms/consumer documents if the scope adds sales, bookings, subscriptions or accounts.
- Asset and font licence approval.
- Security-header and endpoint review.
- Final release-gate report against `docs/EU_WEB_APP_STANDARD.md`.

Unknown or placeholder legal information blocks launch approval.

## Definition of project success
- Immediate emotional impact.
- Clear understanding of SUBEROS services.
- Smooth, controlled motion across devices.
- No content or conversion path blocked by animation.
- Strong project discovery and internal linking.
- Real contact generation.
- Maintainable code and documented content/asset workflows.
- Legal, privacy, accessibility, security and consumer obligations are assessed and implemented based on real project scope.
- Awwwards-level creativity is delivered as progressive enhancement, never at the expense of user rights or core usability.
