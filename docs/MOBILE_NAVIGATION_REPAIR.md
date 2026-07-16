# Mobile Navigation Repair

Date: 2026-07-16

## Problem found

Sprint 14.4 improved the drawer visually, but Sprint 14.5 still needed stronger operational guarantees:

- reliable close behavior;
- safer resize transition to desktop;
- explicit QA coverage across real mobile breakpoints;
- meaningful links tied to the actual home structure.

## Fixes applied

- Added resize cleanup in `src/features/navigation/Header.tsx`
  - when viewport reaches desktop, the drawer closes cleanly without trapping state
- Preserved:
  - focus trap
  - Escape close
  - overlay close
  - body scroll lock
  - focus restoration rules

## QA added

New suite: `tests/navigation/mobile-navigation.spec.ts`

Covered sizes:

- `320x568`
- `360x800`
- `375x812`
- `390x844`
- `412x915`
- `844x390`
- `915x412`

## Result

The mobile menu is no longer treated as “looks open” only. It now has dedicated regression coverage for behavior and responsive transitions.
