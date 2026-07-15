# Portfolio Redesign

Date: 2026-07-15

## Previous state

- Mixed giant headings, cards and index-like fragments in one composition.
- Text collisions and unclear hierarchy.
- More technical-lab feeling than portfolio feeling.

## Current state

- New architecture under `src/features/work/`.
- Desktop uses one active discipline, dominant media area and a compact discipline index.
- Tablet collapses the composition cleanly.
- Mobile uses a vertical list with one block per discipline and no hover dependency.

## Files

- `src/features/work/WorkShowcase.tsx`
- `src/features/work/WorkProject.tsx`
- `src/features/work/WorkProjectDetails.tsx`
- `src/features/work/WorkProjectIndex.tsx`
- `src/features/work/WorkProjectMedia.tsx`
- `src/features/work/work-showcase.css`
- `src/data/workShowcase.ts`

## Honest content rules

- No client projects were invented.
- No third-party images were added.
- The system is presented as SUBEROS capabilities and integrated creative direction.
