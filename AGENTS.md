# AGENTS.md — SUBEROS

## Mission
Build SUBEROS as a premium, immersive, conversion-oriented creative studio website. The visual target is an Awwwards-level motion experience, but every implementation must remain accessible, responsive, maintainable, SEO-ready and reliable on real devices.

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

## Performance budgets
Initial targets:
- Initial JS compressed: keep as low as practical; investigate if above 250 KB.
- Hero critical media: ideally below 1.5 MB on mobile.
- No single decorative image above 500 KB without justification.
- Avoid loading full frame sequences before they are near the viewport.
- Prevent layout shifts by declaring media dimensions.
- Prefer local optimized fonts and preload only the critical font files.

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

If a check cannot run, document the exact blocker. Do not claim validation that did not occur.

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
A sprint is complete only when the requested result is implemented, responsive, accessible, tested, documented, committed and pushed.