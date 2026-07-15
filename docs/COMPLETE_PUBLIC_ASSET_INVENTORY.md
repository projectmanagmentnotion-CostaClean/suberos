# Complete Public Asset Inventory

Date: 2026-07-15

## Source of truth

- JSON: `artifacts/reports/assets/asset-inventory.json`
- CSV: `artifacts/reports/assets/asset-inventory.csv`
- Generator: `scripts/inspect-all-assets.mjs`

## Current totals

- Total assets detected across `public/`, `src/` and `dist/`: `243`
- Approved assets: `121`
- Production assets in `dist/`: `112`
- Legacy assets kept for traceability: `10`

## Category counts

| Category | Count |
| --- | ---: |
| image | 190 |
| style | 19 |
| branding | 14 |
| other | 6 |
| script | 5 |
| font | 4 |
| metadata | 2 |
| data | 2 |
| document | 1 |

## Heaviest assets currently detected

| Path | Bytes | KB | Category | Status |
| --- | ---: | ---: | --- | --- |
| `dist/assets/index-B2kF1Lq4.js` | 446405 | 435.94 | script | production |
| `public/branding/suberos-social-card.png` | 115483 | 112.78 | branding | approved |
| `public/branding/suberos-logo-symbol.webp` | 77016 | 75.21 | branding | approved |
| `public/legacy-source/cropped-cropped-ikigai-logo.png` | 50927 | 49.73 | image | legacy |

## Notes

- The detailed table requested by the sprint is generated from the JSON/CSV artifacts rather than duplicated manually here.
- `qa:assets` currently passes with warnings only.
