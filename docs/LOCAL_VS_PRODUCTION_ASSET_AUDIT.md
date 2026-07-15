# Local Vs Production Asset Audit

Date: 2026-07-15

## Local preview

- URL: `http://127.0.0.1:4173/`
- HTTP status by direct request: `200`
- Title: `SUBEROS - Estudio creativo de fotografia, diseno, produccion y web`

## Public production observed today

- URL: `https://suberos.com/`
- Direct shell request from PowerShell returned `403` HTML from hosting/WAF, so raw header comparison from CLI was not reliable.
- Browser/web inspection still exposed the public HTML and showed the old WordPress-era experience, not the current local build.

## Production content observed in the live HTML

- Title still resolves to the old `Subero Shoot` wording.
- H1 still resolves to `Subeero Shoot | Soluciones Creativas y Personalizadas para Impulsar Tu Marca Visualmente`.
- The public page still contains old duplicated copy, third-party food imagery and the previous contact block.
- `robots.txt` is publicly reachable and still points to `https://suberos.com/sitemap.xml`.

## Conclusion

- Production does not currently match the local editorial build.
- Sprint 14.2 cannot be marked closed until SiteGround is updated again and the public domain is reverified against the new build.
