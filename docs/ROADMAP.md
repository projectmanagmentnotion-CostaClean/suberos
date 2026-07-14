# SUBEROS â€” Master Roadmap

## Current delivery status

- Phase 0 complete
- Phase 1 complete
- Phase 2 complete
- Phase 3 complete
- Phase 4 complete
- Cross-project European technical/legal standard added
- Phase 5 complete
- Phase 5.1 complete - Repository isolation and content correction
- Phase 6 complete - SUBEROS visual content system and portfolio readiness
- Phase 7 complete - Frame sequence engine and advanced media foundation
- Phase 8 complete locally - Contact and conversion engine
- Next recommended sprint: Phase 9 - SEO, legal, privacy and compliance architecture
- Mandatory compliance implementation sprint must be completed before public launch

## Mandatory governing documents

Every phase and sprint must follow:

- `AGENTS.md`
- `docs/EU_WEB_APP_STANDARD.md`

These documents apply exclusively to SUBEROS. No external project, website, application, client, route, case study, domain, asset or branding may be mixed into this repository or public experience.

## Product vision

Create a cinematic, high-impact SUBEROS creative studio website with extreme but controlled GSAP motion, monumental editorial typography, charcoal-to-black art direction, immersive scroll storytelling and conversion-focused content.

The experience must remain:

- understandable;
- accessible;
- responsive;
- legally reviewable;
- secure;
- SEO-ready;
- performant on real devices;
- independent from every other project.

---

## Phase 0 â€” Governance and baseline â€” COMPLETE

- Add AGENTS.md and operating rules.
- Confirm stack, scripts, folders and deployment target.
- Audit the existing code and current public SUBEROS website.
- Inventory real content, contacts, services and assets.
- Establish responsive, accessibility, SEO and performance baselines.
- Adopt the European professional standard.

## Phase 1 â€” Legacy asset recovery and brand foundation â€” COMPLETE

- Recover owned SUBEROS logo, favicon and useful brand assets.
- Record source and destination.
- Preserve and audit original fonts.
- Optimize approved assets.
- Define charcoal/black visual tokens.
- Establish brand folders and naming conventions.
- Track ownership and licence status.

## Phase 2 â€” Design system and application shell â€” COMPLETE

- Semantic AppShell, header, menu, footer and skip link.
- Reusable UI and layout primitives.
- Fluid typography.
- Focus, hover, active, loading and disabled states.
- Responsive containers and editorial layout system.

## Phase 3 â€” Motion system â€” COMPLETE

- Central GSAP registration.
- Lenis and ScrollTrigger lifecycle.
- Motion profiles: full, balanced and reduced.
- Reusable scene primitives.
- Refresh manager and cleanup.
- Motion Lab and QA documentation.

## Phase 4 â€” Cinematic preloader and hero â€” COMPLETE

- Real critical-asset preload logic.
- Progress interface and timeout.
- Session persistence.
- FLIP transition into hero.
- Scroll-linked hero foundation.
- Mobile and reduced-motion alternatives.

## Phase 5 â€” Core homepage narrative â€” COMPLETE, SUBJECT TO ISOLATION CLEANUP

- Studio manifesto.
- Confirmed SUBEROS services.
- Services narrative.
- Process/method section.
- Brand statement.
- Conversion-focused contact closure.
- Continuous visual transitions.

The valid architecture and motion work remain. Any content or route referring to another project must be removed or replaced without undoing the design system, motion system, preloader, hero or home narrative.

---

## Phase 5.1 â€” Repository isolation and content correction â€” COMPLETE

Purpose: remove all cross-project contamination while preserving completed SUBEROS engineering and design work.

Required work:

- Search source, public assets, metadata, structured data, sitemap, robots, docs and tests for foreign project names, domains, routes, contact details and assets.
- Remove any external project used as a featured item, case study, demo or route.
- Remove links to unrelated websites except verified third-party legal or social links that genuinely belong to SUBEROS.
- Rebuild the featured-work area as a SUBEROS-owned editorial placeholder system that does not pretend unapproved work is published.
- Keep the section valuable through art direction, process, capabilities and calls to contact.
- Update typed data so unpublished portfolio items cannot leak publicly.
- Remove foreign screenshots and media from production folders; preserve nothing unless its ownership and SUBEROS relevance are confirmed.
- Correct SEO, structured data, canonical, sitemap and internal links.
- Add an automated repository-isolation check.
- Update all affected documentation and sprint reports with an explicit correction note.
- Validate lint, build, responsive, reduced motion, console, links and bundle.
- Commit and push.

Acceptance:

- Zero unintended foreign project references.
- No broken layout or motion regression.
- No invented replacement projects.
- Home remains visually complete and conversion-oriented.

---

## Phase 6 â€” SUBEROS content architecture and visual portfolio foundation â€” COMPLETE

This phase is not a case-study import phase. It creates the architecture for future real SUBEROS content.

- Audit and approve the real SUBEROS content inventory.
- Define typed content models for services, capabilities, media and approved portfolio entries.
- Create a publication status system: draft, approved, published and archived.
- Prevent drafts and unapproved media from appearing publicly.
- Build a visual work index only when at least one real SUBEROS item is approved.
- If no portfolio item is approved, use a capabilities-led editorial experience rather than fake projects.
- Define reusable large-format media blocks.
- Prepare SEO-ready route architecture without publishing thin or empty pages.
- Prepare future FLIP transitions without depending on them for navigation.
- Record media ownership, permission and licence evidence.
- Establish a professional content intake checklist for each future project.
- Keep the public site capabilities-led until a real case is approved.
- Maintain an internal noindex Portfolio Lab for readiness review.

No named project may be added by Codex unless the user explicitly confirms it for SUBEROS.

## Phase 7 â€” Frame sequences and advanced media â€” COMPLETE

- Define asset-production specifications for SUBEROS scenes.
- Canvas sequence player with preload window.
- Desktop, tablet/mobile and static fallback packages.
- Pause rendering outside viewport.
- Memory-safe handling for Safari iOS.
- Optional video or WebGL only when justified.
- Semantic and reduced-motion alternatives.
- Strict media and bundle budgets.
- Internal sequence lab and QA coverage in place.

## Phase 8 â€” Contact and conversion engine

- Choose concise or multi-step contact flow based on actual needs.
- Real endpoint using an approved provider or serverless function.
- Server-side validation.
- Spam and abuse protection.
- Accessible success and error states.
- Confirmed phone, email and WhatsApp paths only.
- Define purpose, fields, lawful basis, destination, processors, retention and deletion.
- First-layer privacy information.
- Separate optional marketing consent when applicable.
- Analytics events only after privacy assessment and without personal data.

## Phase 9 â€” SEO, legal, privacy and compliance architecture

- Confirm final information architecture.
- Optimize titles, descriptions, headings, canonicals and verified structured data.
- Build internal links between studio, services, process and contact.
- Add portfolio relationships only when approved content exists.
- Image alt and media metadata strategy.
- Robots, sitemap, redirects and 404.
- Local SEO only with verified details.
- Create `docs/LEGAL_APPLICABILITY_MATRIX.md`.
- Create data/vendor and cookie/storage inventories.
- Replace temporary legal placeholders.
- Assess European accessibility applicability.
- Verify legal owner and contact data.
- Version legal text and consent evidence where applicable.
- Obtain qualified legal review where warranted.

## Phase 10 â€” Accessibility and inclusive motion

- Full WCAG 2.2 AA audit.
- Keyboard and screen-reader flows.
- Reduced-motion equivalence.
- Contrast, focus, zoom and reflow.
- Touch targets and form errors.
- Semantic alternatives for canvas and video.
- Remediation record and accessibility statement inputs.

## Phase 11 â€” Performance, security and device hardening

- Route and scene code splitting.
- Responsive media and lazy loading.
- Font optimization.
- Frame sequence budgets.
- Lighthouse and Core Web Vitals review.
- Real-device review on iPhone Safari, Android Chrome and tablet where available.
- Slow network and low-memory testing.
- HTTPS, CSP, HSTS and security-header readiness.
- Dependency, secret, endpoint and rate-limit review.
- Backup and rollback process.

## Phase 12 â€” Visual and functional QA automation

- Screenshot baselines at 390x844, 768x1024, 1366x768 and 1440x900.
- Header, menu, preloader, hero, narrative, contact, legal pages and footer.
- Normal and reduced-motion modes.
- Stable `data-qa` hooks.
- Console, link, anchor and overflow assertions.
- Repository-isolation assertion.
- Cookie gating, form and consent checks when applicable.
- Browser-difference documentation.

## Phase 13 â€” Content, legal and launch-readiness polish

- Final factual copy audit.
- Spanish proofreading.
- Verify links, contacts and approved social profiles.
- Remove placeholders, temporary routes and unused assets.
- Confirm all asset and font rights.
- Complete legal applicability evidence.
- Confirm privacy and cookie documents match runtime.
- Final production build and deployment package.

## Phase 14 â€” Deployment and monitoring

- Back up the existing SUBEROS site.
- Deploy to staging.
- Validate domain, HTTPS, forms, Search Console and approved analytics.
- Configure redirects from old URLs.
- Run production smoke tests.
- Verify cookies, storage, legal links and security headers.
- Monitor errors, conversion and performance.
- Define privacy-request and incident-response ownership.

## Phase 15 â€” Continuous improvement

- Add only approved SUBEROS work through the content system.
- Review conversion paths and user behaviour.
- Optimize heavy scenes using real-device data.
- Keep dependencies and browser support current.
- Run periodic SEO, accessibility, privacy, cookie, security and performance audits.
- Reassess legal applicability whenever vendors, countries, features or data flows change.

---

## Mandatory pre-launch compliance sprint

Cannot be skipped or deferred until after launch.

Deliverables:

- `docs/LEGAL_APPLICABILITY_MATRIX.md`
- verified legal-owner checklist;
- data-processing inventory;
- vendor and transfer inventory;
- runtime cookie/storage audit;
- consent architecture when required;
- final legal notice;
- final privacy policy;
- final cookie policy when applicable;
- accessibility applicability assessment;
- asset and font licence register;
- security-header and endpoint review;
- release-gate report against `docs/EU_WEB_APP_STANDARD.md`.

Unknown legal identity, placeholder legal content or unresolved cross-project contamination blocks launch approval.

## Definition of project success

- Immediate emotional impact.
- Clear understanding of SUBEROS.
- Smooth, controlled motion across devices.
- No content or conversion path blocked by animation.
- No mixing with other projects.
- Strong internal navigation based on real content.
- Real contact generation.
- Maintainable code and documented workflows.
- Legal, privacy, accessibility, security and performance requirements assessed against the real production scope.
- Awwwards-level creativity delivered as progressive enhancement.
