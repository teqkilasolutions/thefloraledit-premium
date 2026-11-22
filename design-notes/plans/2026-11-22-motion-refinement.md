# Botanical Motion Refinement Implementation Plan

> Use superpowers:executing-plans inline. User supplied the detailed visual direction and requested implementation.

**Goal:** Match the requested botanical artwork and interactions while preserving the approved brand header.

**Architecture:** Focused HeroCarousel and BotanicalSections components; shared motion preference/progress hooks; scoped refinement CSS. Keep native scrolling and existing gallery/form contexts.

**Tech Stack:** React, TypeScript, CSS animations, IntersectionObserver, requestAnimationFrame, Playwright, Node tests.

**Spec:** ../2026-11-22-motion-refinement.md

## Global constraints

Preserve original logo, header/footer dimensions, Allura/Lora/Manrope, and existing palette. Use exact requested decorative artwork with provenance; distinguish it from authentic portfolio photography. No founder or invented business claims. No new dependency. Reuse the canonical checkout on codex/foglia-motion-refinement.

## Review focus

- Seamless rightward loop, responsive image selection and no text movement.
- Resizing and reversed scrolling during the fan spread.
- Hover, keyboard and touch access to floral categories.
- Reduced-motion changes while animations are running.
- Existing gallery, enquiry and bag handoffs after moving the real portfolio.

### Task 1: Carousel and shared motion

**Files:** HeroCarousel.tsx, useStudioMotion.ts, motion-refinement.css, tests/motion-sections.browser.cjs.
- [ ] Write/run a browser assertion failing on the absent running multi-photo hero.
- [ ] Implement rightward loop, pause and preference handling; preserve hero geometry.
- [ ] Improve the expansion's initial arrangement.

### Task 2: Botanical sequence

**Files:** BotanicalSections.tsx, ReferenceHome.tsx, StudioPage.tsx, PortfolioSections.tsx, motion-refinement.css, public/assets/botanicals/.
- [ ] Implement exact decorative cutout, leaf ornaments, fan spread, category pop-ins, roses/sketch approach and four-photo section.
- [ ] Keep real celebration projects accessible below the decorative sequence.
- [ ] Verify on desktop and phone, including keyboard and reduced motion.

### Task 3: Release

**Files:** updated browser tests, docs/, progress ledger and external release record.
- [ ] Adapt existing browser journeys to intentional portfolio placement changes.
- [ ] Run unit tests, appropriate browser checks and production build; inspect captures.
- [ ] Request one read-only review, address material findings, publish and verify the public release.
