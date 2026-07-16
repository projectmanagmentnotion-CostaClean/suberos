# Immersive Sequence Performance

Date: 2026-07-16

## Current guardrails

- Reduced motion disables frame loading and leaves the scene in fallback mode.
- Profile selection keeps lighter sets on tablet and mobile.
- `preloadRadius` is limited to `4`.
- Priority is restricted to frames `1-4`.
- The scene keeps poster/fallback available from HTML before canvas readiness.

## Validation executed

- `npm run qa:immersive`
- `npm run qa:performance`
- `npm run qa:release`

## Results

- Public immersive sequence works in both scroll directions.
- No runtime dependency on motion for comprehension.
- Current CSS budget still passes after the new home order and navigation changes.
- Main JS remains close to the warning threshold, so future cinematic expansions must be budgeted carefully before adding heavier public scenes.

## Practical rule for next sprint

Do not add a second public immersive scene until:

- the real contact endpoint is live;
- production still matches local;
- JS budget has headroom again or the new scene ships behind an explicit performance budget.
