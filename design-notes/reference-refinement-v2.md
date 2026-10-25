# Reference-led refinement — 25 October 2026

Scope: improve the three current concepts from the user's four attached floral website references, preserving each concept's existing colour palette and all working cart, enquiry, comparison and mobile-preview behaviour.

## Design calls

- Garden: ivory #F8F6EF, olive #536336, forest #26382C, sage #AAB39A and sand #E9E1D4. Immersive garden entrance, centred editorial headline, botanical line drawings, oval studio portrait, arch-framed seasonal floral cards. Cormorant Garamond and DM Sans.
- Atelier: forest #26382C, olive #536336, ivory #F8F6EF, sage #AAB39A and gold #B8A276. Dramatic full-width floral still life, left-aligned large headline with flowers to the right, open editorial compositions and staggered arrangements. Cormorant Garamond and DM Sans.
- Celebration: ivory #FAF7F1, blush #D9B4A4, olive #536336, sand #E9E1D4, rose #AA8175 and brown #3B302C. Candlelit reception hero, left-aligned invitation, four signature service panels, immersive event invitation and a calm consultation sequence. Playfair Display and DM Sans.

Reference ideas are adapted into original layouts and generated imagery. Do not copy reference logos, Cyrillic copy, creator details, or claim photographed scenes are actual studio projects. Keep current commerce a transparent local draft flow.

## Plan

- [x] Generate four original photographs for garden, atelier, reception and bouquet.
- [x] Build distinct heroes, seasonal floral edits with meaningful filters, botanical studio framing and Celebration signature services.
- [x] Retain matching vessel shop, working dialogs, bag state, labelled enquiry drafts and true iframe preview.
- [x] Update comparison imagery and concept descriptions to match final layouts.
- [x] Run build, source lint and browser regressions plus desktop/mobile visual inspection.
- [ ] Sync source and generated build to the new premium repository and verify its live deployment.

Layout check against brief: using the same split hero in Garden and Atelier would make the concepts too similar. Replace both with distinct immersive scenes: a light garden invitation and a dark asymmetrical still life. Keep the existing semantic controls and commerce behaviour while varying section order and framing.

## Validation

- Production build passed, with no TypeScript errors.
- Changed-source lint passed without warnings.
- Existing browser regression suite: 28 checks passed.
- New reference direction checks passed for all three concepts: palette preservation, distinct imagery/layout, working flower filters and selected enquiry context, service actions, 320/390/768/1440px responsiveness, and visible keyboard focus on Atelier image buttons.
- All three real 390px phone previews verified, with unobscured mobile menus.
- Desktop, mobile and full-page screenshots inspected for each concept, saved under `scratch/reference-*`.
- Independent review found one decorative-outline focus issue. Added a specific focus-visible style and a regression assertion comparing focused and unfocused width/colour. Both browser suites passed after the fix.

All four new images are illustrative, generated with the built-in ImageGen tool. Final files are in `public/assets/floral/`; prompts are in `docs/reference-imagery-v2.md`.
