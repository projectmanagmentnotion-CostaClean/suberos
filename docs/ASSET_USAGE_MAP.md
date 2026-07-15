# Asset Usage Map

Date: 2026-07-15

## Source

- `artifacts/reports/assets/asset-inventory.json`

## Critical assets

| Asset | Component | Use | Criticality | Load | License | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `/branding/suberos-logo-symbol.webp` | branding / work media | Main brand mark and abstract media anchor | high | eager | SUBEROS-owned-or-verified | Used in the runtime and social identity |
| `/branding/suberos-icon-32.png` | favicon | Browser favicon | high | eager | SUBEROS-owned-or-verified | Referenced in `index.html` |
| `/branding/suberos-social-card.png` | metadata | Open Graph social card | high | eager | SUBEROS-owned-or-verified | Used by canonical metadata |
| `/branding/fonts/syncopate/Syncopate-Regular.woff2` | global typography | Display font 400 | high | eager | Apache-2.0 | Self-hosted |
| `/branding/fonts/syncopate/Syncopate-Bold.woff2` | global typography | Display font 700 | high | eager | Apache-2.0 | Self-hosted |

## Warnings still open

- `public/branding/fonts/syncopate/LICENSE.txt` has no runtime reference, which is expected because it is a legal file.
- `public/branding/suberos-icon-512.png` is kept for manifest/app-icon usage but is not directly referenced in the home UI.
- `public/branding/suberos-social-card.svg` exists as a source-format companion and is not currently served in metadata.
- `public/robots.txt` is referenced by the web root rather than by an application import.

## Legacy and duplicate notes

- Legacy originals remain in `public/legacy-source/`.
- Dist/public duplicates are expected because build output republishes approved public assets.
