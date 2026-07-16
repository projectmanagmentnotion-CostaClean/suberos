# Immersive Sequence Placement Decision

Date: 2026-07-16

## Decision

The public frame-sequence scene stays after `Servicios` and before `Trabajo`.

Current order in `src/features/home/HomePage.tsx`:

1. `HeroSection`
2. `StudioSection`
3. `ServicesSection`
4. `SequenceNarrativeSection`
5. `WorkShowcase`
6. `ProcessEditorial`
7. `BrandStatementSection`
8. `ContactSection`

## Why this placement was accepted

- Putting the immersive block directly after the hero made the home feel effect-first instead of meaning-first.
- `Servicios` explains what SUBEROS actually does before motion asks for attention.
- `Trabajo` benefits from arriving after the sequence because the sequence acts as a bridge between capability explanation and discipline proof.
- The current public sequence is abstract and editorial. It supports the studio narrative, but it does not contain approved portfolio material, so it should not be treated as the opening proof block.

## Evidence reviewed

- Local visual QA at `390x844`, `768x1024` and `1366x768`
- `tests/immersive/immersive.spec.ts`
- `tests/visual/visual-regression.spec.ts`
- `artifacts/reports/sprint-14-5-local/`

## Rejected placement

- Immediately after hero:
  - too early in the reading flow;
  - risks looking decorative before the user understands the offer;
  - weakens the service-to-work transition.

## Constraints that remain

- This is still an abstract SUBEROS-owned sequence, not a client case study.
- Reduced motion must remain fallback-only.
- Mobile and tablet must keep the same meaning without depending on pinned canvas behavior.
