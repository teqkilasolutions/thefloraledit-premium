# Real Event Portfolio Implementation Plan

> Execute inline using superpowers:executing-plans. Steps use checkboxes for tracking.

**Goal:** Turn the selected Celebration design into a real event portfolio with useful inspiration collection and honest enquiry drafts.

**Architecture:** A small typed project/photo catalogue supplies a portfolio context, project dialog, saved-edit drawer, homepage compositions and selected-photo form content. Pure storage helpers validate persisted IDs; the existing presentation context and native dialog retain enquiry/cart behaviour.

**Tech Stack:** Existing React 19, TypeScript, Vite, CSS, local font files; Node built-in tests and Playwright for validation. No new package dependency.

**Spec:** `design-notes/2026-11-05-portfolio-design.md`

## Global Constraints

- One Celebration homepage; original master logo and Allura/Lora/Manrope roles.
- Ivory, blush and olive interface; preserve original photograph colours and detail.
- At most eight saved valid photo IDs, no duplicate or retired IDs.
- Enquiries save locally and download; do not claim message delivery.
- Do not invent contact information, reviews, event identities or service guarantees.
- Keep keyboard, touch, reduced-motion and narrow-screen behaviour usable.

## Review Focus

- Malformed/oversized stored IDs must not crash or create arbitrary image references.
- At the eight-image limit, removing an existing save must still work.
- Viewer-to-enquiry transitions must leave one dialog and a working focus trap.
- Restoring a legacy draft must not lose its text or break without saved-image fields.
- Downloaded briefs must retain the selected images after navigation or reload.

## Task 1: Photo catalogue and validated storage

Files: `src/data/portfolio.ts`, `src/data/portfolioAssets.ts`, `src/lib/inspiration.ts`, `tests/inspiration.test.mjs`, `public/assets/portfolio/`.

Interfaces: `readInspiration(raw, knownIds): string[]`; `toggleInspiration(ids, id, knownIds): string[]`; `INSPIRATION_LIMIT = 8`; project/photo records with stable IDs and captions.

- [ ] Write and run failing storage tests for malformed values, retired IDs, deduplication, limits and removal at capacity.
- [ ] Prepare proportional web derivatives from the 17 original photos, retaining provenance.
- [ ] Implement the minimal storage helpers and catalogue; run tests green.

## Task 2: Portfolio interaction

Files: `src/context/PortfolioContext.tsx`, `src/components/floral/PortfolioSections.tsx`, `src/components/floral/PortfolioOverlays.tsx`, `StudioApp.tsx`.

Interfaces: `usePortfolio()` exposes current project/photo, saved IDs, open/close methods, validated replacement and save/remove methods. Existing `StudioDialog` provides the modal boundary.

- [ ] Write a browser journey expecting a project gallery, keyboard navigation/focus return and persisted inspiration. Run against the baseline to confirm the missing feature.
- [ ] Implement three project leads, the closer-look composition, viewer and saved-edit drawer.
- [ ] Verify the interaction and storage-denied fallback.

## Task 3: Homepage and enquiry integration

Files: `StudioPage.tsx`, `StudioArtDirection.tsx`, `StudioForm.tsx`, `StudioOverlays.tsx`, `portfolio.css`.

Interfaces: selected photo IDs resolve through the shared catalogue; restored drafts replace saved IDs only on explicit restore; saved snapshots drive downloaded briefs.

- [ ] Extend the browser journey to cover selected thumbnails, draft save/restore/download and legacy draft compatibility.
- [ ] Replace illustrative event imagery with real sources; order the approved homepage sections; add concise FAQs.
- [ ] Integrate saved inspiration into forms and brief downloads; preserve explicit draft status and existing vessel enquiry controls.
- [ ] Run the full journey, production build and changed-source lint.

## Task 4: Visual review and release

- [ ] Check desktop/mobile screenshots and layout at 320/390/768/1024/1440.
- [ ] Obtain a fresh whole-change review and address material findings.
- [ ] Build the GitHub Pages output, commit the checked change, integrate into the original checkout and publish through its existing remote.
- [ ] Verify the published page and report its live link and remaining delivery limitation.

## Execution decisions

The user already approved execution; no second plan approval is required. Plans live in `design-notes/` because `docs/` is generated GitHub Pages output. Native worktree creation cannot target the nested checkout; an ordinary Git worktree was created beside it, inside the authorised workspace. The baseline production build passes. Dependencies already resolve locally; no install or junction is required.
