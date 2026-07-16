# Services Interaction Audit

Date: 2026-07-16

## Problem found

The service cards described real disciplines, but their CTAs did not activate the corresponding public proof block in `Trabajo`. That made the section look informational rather than useful.

## Fix applied

- `src/app/routes.ts`
  - added centralized `workDisciplineAnchors`
- `src/data/services.ts`
  - each service now points to its matching work discipline
- `src/features/work/WorkShowcase.tsx`
  - URL hash now syncs with the active discipline
  - matching desktop control or mobile card is focused and scrolled into view
- `src/features/work/WorkProjectIndex.tsx`
  - added `data-work-control`
- `src/features/work/WorkProject.tsx`
  - added `data-work-card`
- `src/features/home/ServicesSection.tsx`
  - removed duplicate DOM ids that conflicted with work anchors

## Current service-to-work mapping

- `Fotografia profesional` -> `/#fotografia`
- `Diseno grafico y branding` -> `/#branding`
- `Impresion y produccion` -> `/#produccion`
- `Diseno y desarrollo web` -> `/#web`

## Verification

- `npm run qa:links`
- `npm run qa:release`
- Visual review on mobile and desktop

## Outcome

The services section is now a functional navigation layer into the work discipline model instead of a dead editorial block.
