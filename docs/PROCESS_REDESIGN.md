# Process Redesign

Date: 2026-07-15

## Previous state

- Five equal cards.
- Title overflow and column collisions.
- Step 05 felt isolated.
- Generic grid pattern.

## Current state

- Full-width editorial list under `src/features/process/`.
- Number, title and body stay aligned per row.
- Hover and focus remain subtle.
- Mobile stacks rows without overflow.

## Files

- `src/features/process/ProcessEditorial.tsx`
- `src/features/process/process-editorial.css`
