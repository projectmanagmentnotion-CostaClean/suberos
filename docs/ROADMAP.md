# SUBEROS — Master Roadmap

## Current delivery status

- Phase 0 complete
- Phase 1 complete
- Phase 2 complete
- Phase 3 complete
- Phase 4 complete
- Next recommended sprint: Phase 5 - Core homepage narrative

## Product vision
Create a cinematic, high-impact creative studio website with extreme GSAP motion, large editorial typography, charcoal-to-black art direction, immersive scroll storytelling and conversion-focused content. The experience must remain usable, accessible and performant across desktop, tablet and mobile.

## Phase 0 — Governance and baseline
- Add AGENTS.md and project operating rules.
- Confirm stack, scripts, folder structure and deployment target.
- Audit existing code and current public website.
- Create an inventory of real content, contacts, services and assets.
- Establish responsive, accessibility, SEO and performance baselines.

## Phase 1 — Legacy asset recovery and brand foundation
- Download owned logo, favicon and useful visual assets from the current site.
- Record every source and destination.
- Clean SVGs and optimize raster files.
- Create brand folders and naming conventions.
- Define charcoal/black color tokens, spacing, typography, borders, shadows, grain and gradients.
- Build a basic brand sheet inside documentation.

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

## Phase 6 — Project system and case studies
- Typed project data model.
- Projects index with filters only if useful.
- Individual SEO-ready project routes.
- FLIP transitions between listing and detail.
- Narrative case-study blocks: context, challenge, solution, media, outcome and related projects.
- Add Luxury Shisha as the first fully developed case.

## Phase 7 — Frame sequences and advanced media
- Canvas sequence player with preload window.
- Desktop, tablet/mobile and static fallback packages.
- Pause rendering outside viewport.
- Memory-safe handling for Safari iOS.
- Optional video and WebGL only when justified.
- Define asset production specifications for Anderson.

## Phase 8 — Contact and conversion engine
- Multi-step or concise contact flow based on conversion testing.
- Real endpoint using a serverless function, Resend or Supabase.
- Validation, spam protection and success/error states.
- WhatsApp and email contact paths.
- Analytics events for CTA, form start, completion and project views.
- Privacy and legal consent implementation.

## Phase 9 — SEO architecture
- Confirm sitemap and information architecture.
- Optimize titles, descriptions, headings, canonicals and structured data.
- Build service-to-project and project-to-service relationships.
- Contextual internal links and related work.
- Image alt strategy and media metadata.
- Robots, sitemap, redirects and 404.
- Local SEO only with verified business details.

## Phase 10 — Accessibility and inclusive motion
- WCAG 2.2 AA audit.
- Keyboard and screen-reader flow.
- Reduced-motion experience.
- Contrast and focus review.
- Touch target and form error review.
- Ensure all canvas/video content has semantic equivalents.

## Phase 11 — Performance and device hardening
- Route and scene code splitting.
- Responsive media and lazy loading.
- Font optimization.
- Frame sequence budgets.
- Lighthouse and Web Vitals review.
- Real-device testing on iPhone Safari, Android Chrome and tablet.
- Slow network and low-memory testing.

## Phase 12 — Visual QA automation
- Establish screenshot baselines at 390x844, 768x1024, 1366x768 and 1440x900.
- Verify headers, menu, hero, pinned scenes, project pages, form and footer.
- Test normal and reduced-motion modes.
- Add stable `data-qa` hooks where needed.
- Document known browser differences.

## Phase 13 — Content polish and launch readiness
- Final copy audit for factual accuracy, emotional impact and conversion.
- Proofread Spanish copy.
- Verify all links, contact details, legal pages and social profiles.
- Remove placeholders and unused assets.
- Final build and deployment package.

## Phase 14 — Deployment and monitoring
- Back up the current site.
- Deploy to staging first.
- Validate domain, HTTPS, forms, analytics and Search Console.
- Configure redirects from old URLs.
- Run post-deploy smoke tests.
- Monitor errors, conversion and performance after launch.

## Phase 15 — Continuous improvement
- Add new case studies through the project data system.
- Review conversion paths and user behavior.
- Optimize heavy scenes based on real device data.
- Keep dependencies and browser compatibility current.
- Run periodic SEO, accessibility and performance audits.

## Definition of project success
- Immediate emotional impact.
- Clear understanding of SUBEROS services.
- Smooth, controlled motion across devices.
- No content or conversion path blocked by animation.
- Strong project discovery and internal linking.
- Real contact generation.
- Maintainable code and documented content/asset workflows.
