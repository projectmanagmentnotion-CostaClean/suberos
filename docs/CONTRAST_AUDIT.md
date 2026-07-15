# Contrast Audit

Fecha: 2026-07-15
Fuente de datos: tokens en `src/styles/tokens.css`

## Ratios verificados sobre fondo negro absoluto `#040404`

- `--color-primary-text` `#f2f2ee` sobre `#040404`: 18.27:1
- `--color-warm-white` `#f5f3ed` sobre `#040404`: 18.48:1
- `--color-focus` `#d4b57a` sobre `#040404`: 10.44:1
- `--color-muted-text` equivalente sobre `#040404`: 8.91:1

## Conclusion

- Los tokens base superan AA para texto normal y grande en el fondo principal auditado.
- El foco visible mantiene margen suficiente sobre la base charcoal/black actual.

## Limites de esta auditoria

- No se han calculado ratios para cada gradiente intermedio o asset editorial futuro.
- Cualquier nueva fotografia, video o canvas con texto superpuesto requerira verificacion especifica antes de publicarse.
