# Reference Design Analysis

Date: 2026-07-15

## Sources reviewed

- Cipher Awwwards entry: `https://www.awwwards.com/sites/cipher`
- Share Bien live site: `https://www.sharebien.com/`
- Cipher live domain was not reliably reachable from the in-app browser during this audit, so the analysis for Cipher is based on the Awwwards entry and the visible patterns documented there.

## Pattern review

| Reference | What it does | Value for SUBEROS | Adaptation for SUBEROS | Must not copy | Performance risk | Accessibility risk |
| --- | --- | --- | --- | --- | --- | --- |
| Cipher | Presents one dominant media state, a compact index and short editorial copy around a single active discipline. | Gives hierarchy, focus and a portfolio feeling instead of a generic services grid. | `src/features/work/` now keeps one active discipline on desktop and a vertical list on mobile. | No client stories, no media, no exact transitions, no layout cloning. | High if all media variants load at once or transitions depend on heavy masking. | Hover-only switching and clipped headings would break keyboard and touch use. |
| Cipher | Uses large typography only when the composition can hold it. | Keeps the screen premium without making copy unreadable. | Work/process/contact headings were reduced and width-limited with `clamp()`, `minmax(0, 1fr)` and `min-width: 0`. | No oversized type without editorial control. | Medium if large text forces reflow or overflow fixes rely on transforms. | Large display type can break zoom 200% and narrow widths if uncontrolled. |
| Share Bien | Uses negative space, wide columns and restrained framing instead of boxed cards. | Makes the studio feel premium and reduces dashboard-like UI. | Contact and process now open into editorial columns and rows rather than repeating card panels. | No direct imitation of French agency copy, art direction or section order. | Low to medium. Mostly layout work, little runtime cost. | Large empty areas can hide critical context if DOM order and focus order do not match the visual order. |
| Share Bien | Keeps contact as a natural editorial close, not as an app sidebar. | Better end-of-page conversion and less internal-scroll feeling. | `src/features/contact/` now uses a top headline plus two-column closing layout. | No fake working form or false success states. | Low. | Disabled forms must remain honest and keyboard readable. |

## Applied decisions

- Replace the old portfolio panel stack with one active discipline plus a smaller index.
- Replace the five-card process grid with a full-width editorial list.
- Replace the sidebar contact composition with a top-led editorial close.
- Reduce ornamental borders and repeated boxed surfaces.

## Discarded decisions

- Copying exact Cipher motion patterns.
- Publishing fake portfolio case studies.
- Depending on hover as the only portfolio interaction.
- Solving overflow only with global `overflow-x: hidden`.
