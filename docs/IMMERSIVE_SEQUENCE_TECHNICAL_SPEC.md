# Immersive Sequence Technical Spec

Date: 2026-07-16

## Runtime status

- Public component: `src/features/home/SequenceNarrativeSection.tsx`
- Engine: `src/motion/sequences/`
- Scene wrapper: `src/features/frame-sequence/FrameSequenceScene.tsx`
- Manifest: `src/motion/sequences/manifests/suberos-sequence-lab.manifest.json`

## Current public behavior

- Scroll-linked scrub: enabled
- Reverse scrub when scrolling back: enabled
- Loop: disabled
- Pinning: not requested in the public home scene
- Reduced motion: forced fallback
- Mobile/tablet: lighter frame profiles with the same editorial meaning

## Manifest facts

- Manifest id: `suberos-sequence-lab`
- Poster: `/motion/lab/suberos-sequence-lab/poster.webp`
- Fallback image: `/motion/lab/suberos-sequence-lab/fallback.webp`
- Aspect ratio: `16:9`
- `preloadRadius`: `4`
- Priority frames: `1, 2, 3, 4`
- `publicationApproved`: `false`
- `ownershipConfirmed`: `true`

## Frame sets

- Desktop:
  - `1600x900`
  - `36` frames
  - estimated bytes `737674`
- Tablet:
  - `1280x720`
  - `28` frames
  - estimated bytes `440064`
- Mobile:
  - `960x540`
  - `24` frames
  - estimated bytes `286724`

## QA instrumentation added in Sprint 14.5

`FrameSequenceScene` now exposes:

- `data-sequence-frame`
- `data-sequence-phase`
- `data-sequence-profile`
- `data-sequence-total`

These attributes are consumed by `tests/immersive/immersive.spec.ts` to verify forward motion, reverse motion and reduced-motion fallback.
