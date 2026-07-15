# Accessibility Remediation Log

## 2026-07-15

- Estado `done`: `src/features/preloader/Preloader.tsx`
  - Se convirtio el preloader en overlay modal con foco retenido y aislamiento del resto del contenido.
- Estado `done`: `src/features/navigation/Header.tsx`
  - Se corrigio el menu movil para abrir como dialogo, mover el foco al close button, atrapar tab, restaurar foco y no exponer `aria-controls` roto en estado cerrado.
- Estado `done`: `src/components/ui/SkipLink.tsx` y `src/app/AppShell.tsx`
  - El skip link ahora enfoca `main#main-content` de forma real.
- Estado `done`: `src/features/contact/ContactFormFields.tsx`
  - El select de servicio ya enlaza su hint por `aria-describedby`.
- Estado `done`: `src/features/legal/LegalPage.tsx`, `src/features/not-found/NotFoundPage.tsx`, `src/features/motion-lab/MotionLabPage.tsx`, `src/features/portfolio-lab/PortfolioLabPage.tsx`, `src/features/sequence-lab/SequenceLabPage.tsx`
  - Cada vista monta foco en su `h1`.
- Estado `done`: `src/features/home/ServicesSection.tsx`
  - Se retiraron roles ARIA invalidos detectados por axe.
- Estado `done`: `tests/accessibility.spec.ts`, `scripts/check-aria-integrity.mjs`, `scripts/check-accessibility.mjs`
  - Se anadio baseline automatizada de accesibilidad.

## Pendiente

- Pruebas con lector de pantalla real.
- Reauditoria cuando entre el hero cinematografico definitivo.
