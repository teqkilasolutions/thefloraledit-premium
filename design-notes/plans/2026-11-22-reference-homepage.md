# Reference Homepage Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement task-by-task. The user supplied the section-by-section visual specification and authorised implementation.

**Goal:** Rebuild the Celebration homepage using the three requested references with The Floral Edit's identity and original photographs.

**Architecture:** Focused navigation, scroll gallery and editorial section components, one scoped stylesheet. Keep existing contexts, dialogs, gallery and enquiry behaviour.

**Tech Stack:** React 19, TypeScript, CSS, Vite, Node tests and Playwright.

**Spec:** ../2026-11-22-reference-homepage.md

## Global Constraints

- Preserve the original high-resolution master logo and current Allura/Lora/Manrope fonts.
- Palette: #FAF7F1, #536336, #29362B, #EEE3D9.
- Real original images only; no competitor content or invented business claims.
- No founder section. No fake subscription or message-delivery confirmation.
- Reuse the canonical checkout, feature branch codex/reference-led-homepage.

## Review Focus

- Sticky image geometry after resize and browser back navigation.
- Touch scrolling and keyboard access to all three story panels.
- Header/logo/menu fit at 320px and at increased text size.
- Reduced-motion preference changed while the page is open.
- Existing enquiry email/draft restoration and bag overlay handoffs.

### Task 1: Scroll geometry

**Files:** src/lib/scrollGallery.ts, tests/scrollGallery.test.mjs, src/components/floral/ScrollGallery.tsx.
**Interfaces:** scrollGalleryFrame(progress:number, width:number, height:number) returns image/rail dimensions and offsets. Gallery consumes PortfolioImage and this frame.
- [ ] Write and run failing tests for clamped progress, viewport coverage and monotonic expansion on phone and desktop.
- [ ] Implement pure frame helper and a requestAnimationFrame-managed sticky gallery with reduced-motion fallback.
- [ ] Run geometry and existing storage tests.

### Task 2: Homepage and brand

**Files:** ReferenceNavigation.tsx, ReferenceHome.tsx, reference-home.css, StudioPage.tsx, StudioApp.tsx, PresentationContext.tsx, StudioForm.tsx, StudioOverlays.tsx.
**Interfaces:** existing openEnquiry(serviceName?:string) extends with optional email; existing consumers remain compatible. New navigation consumes existing inspiration actions; editorial panels consume portfolio galleries.
- [ ] Add a browser check that fails on the missing expanding-image interaction.
- [ ] Implement measured header/hero/footer, original-master logo filter, all requested section equivalents and contact treatment.
- [ ] Wire menu, mobile story carousel, floral categories, studio-notes email prefill and existing optional collection/FAQ disclosures.
- [ ] Build, inspect desktop/mobile screenshots and run browser checks.

### Task 3: Release verification

**Files:** tests/reference-home.browser.cjs, tests/portfolio.browser.cjs, generated docs/, design-notes/plans/2026-11-22-progress.md.
- [ ] Verify viewport sizes, image loading, menu focus, scroll reversal, reduced motion and original logo hash.
- [ ] Adapt existing browser journey to deliberate navigation changes and run it in full.
- [ ] Request one read-only final review, resolve material issues, build Pages, publish under existing authorization and verify the actual live release.
