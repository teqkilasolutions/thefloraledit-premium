# Premium floral presentation refinement

Approved scope: implement all findings from the design review and elevate all three concepts. Keep React, TypeScript and the three-concept presentation. No deployment or real payment/submission service is configured.

Design: botanical editorial art direction, ivory #F8F6EF, forest #243B2C, olive #536336, sage #AAB39A, muted gold #B8A276, blush #D9B4A4. Cormorant display typography with DM Sans for readable supporting text. Garden uses an asymmetric image-led spread; Atelier uses a dark gallery composition; Celebration uses an immersive event photograph. Use spacious sections, restrained borders, purposeful imagery, minimal shadows and 44px controls. Text and primary actions come first on small screens.

## Implementation plan

- [x] Replace mismatched photography with coordinated local assets and accurate captions. Preserve vessel products and their dimensions/prices.
- [x] Rebuild the active presentation with focused shared page, navigation and shopping components. Keep all three distinct concepts, comparison and design notes.
- [x] Put the mobile preview in a real iframe viewport; preserve concept and share shopping state with its parent. Use one correctly anchored mobile menu, closed on navigation.
- [x] Implement native accessible dialogs, named controls, semantic clickable cards, associated labels, Escape/focus handling, reduced motion and readable text.
- [x] Persist a genuinely empty initial bag, support quantities/removal, and replace fake checkout with an honest order-request draft flow. Save enquiry drafts locally with download/recovery. Remove the disconnected newsletter invitation.
- [x] Verify build/lint and browser regressions: menus visible, phone responsive, cart persistence/counts, malformed saved data, labelled fields, Escape/focus, no false submission claims, narrow viewport overflow and correct imagery.

## Evidence and decisions

Baseline: reproduced Garden's covered first mobile menu link in browser at 390px; link top 80px behind the header. Earlier review reproduced desktop navigation overflow inside the phone frame (685px content in 360px screen), incorrect dumpling imagery, and missing dialog semantics/field labels.

Implementation decision: use focused replacement components for the active three concepts, rather than extending duplicate patterns in 30 prototype sections. Keep older components as inactive reference material. Existing workspace has no Git repository, so perform work here without branch operations.

No backend credentials are available: save and export drafts with explicit status instead of displaying fictitious receipt/payment confirmations. This is a working local presentation, not a claim that live commerce is connected.

## Verification — 25 October 2026

- `npm run build`: passed. Production build regenerated in `dist/`.
- `npx oxlint src/components/floral src/data/studio.ts src/lib/floralStorage.ts`: passed without warnings. Repository-wide lint also completes with no errors, but reports pre-existing warnings in old components and compiled files under scratch/deploy-repo.
- `tests/studio.browser.js`: 28 browser checks passed. Covers all three concepts at 320, 390, 768, 1024 and 1440px; unobscured mobile menus; Escape/link closing; image decoding; keyboard-activated products; forward focus containment; focus restoration; bag quantity/subtotal/reload; real enquiry download; explicit draft recovery including full order details; true 390px iframe; cross-frame cart persistence; comparison; malformed storage; unknown/duplicate products; quantity cap/removal; reduced motion.
- Production preview at port 5175: all three mobile concepts loaded, all images decoded, iframe mobile menu visible, zero captured runtime exceptions.
- Independent code review found one important draft-service recovery issue. Fixed with an explicit Restore saved enquiry control that recovers the complete original request, while new service entry points retain their intended context. Added assertions for order service and notes recovery; 28-check suite passed afterward.
- Visual inspection: desktop hero screens for all concepts, full Garden layout, 768px tablet, 390px mobile, and production mobile preview.

## Deliverables

- Active app: `src/components/floral/`, with cart context changes in `src/context/PresentationContext.tsx`.
- New generated/local photography: `public/assets/floral/`; prompts and provenance in `docs/floral-imagery.md`.
- Desktop/mobile screenshots: `scratch/premium-*-desktop.png`, `scratch/premium-*-mobile.png`, `scratch/premium-*-full.png`, and `scratch/premium-phone-preview.png`.
- Live payment and server-side enquiry delivery still require a real service integration. Draft saving/export works without it.
