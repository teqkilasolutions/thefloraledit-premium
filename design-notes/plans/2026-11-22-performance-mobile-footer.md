# Performance and mobile footer

Accepted request: improve loading and scrolling, achieve a measured performance score of at least 85, and reduce the mobile footer while preserving the approved desktop layout, identity, palette and three font families.

## Diagnosis

The live mobile Lighthouse baseline scored 33 (standard simulated mobile conditions): LCP 13.6 s, total blocking time 10,320 ms, CLS 0, initial transfer 5,176 KiB. The 3,601 px master logo accounts for 3,614 KiB and is processed through an SVG filter at runtime. All hero slides load eagerly. The mobile footer is fixed at 1,125 px. The expanding gallery changes layout dimensions on each scroll frame, and offscreen animation work remains active.

## Implementation sequence

1. Keep the original logo and photographs intact. Generate a transparent, correctly coloured web logo, responsive compressed photographs, and WOFF2 subsets of the exact existing fonts. Record asset budgets and provenance in a reproducible preparation script.
2. Make the first hero photograph discoverable in HTML; prioritise the logo and opening image, buffer the remaining slideshow images after the opening image, and pause animation offscreen or when the page is hidden. Preserve the rightward loop and pause control.
3. Use compositor transforms for the expanding image without changing its proportions, keep scroll work inside visible sections, and retain reduced motion behaviour.
4. Replace the phone footer's fixed heights with a compact natural layout; keep readable links, the logo, original-logo download, and enquiry action. Preserve the desktop's 390 px footer.
5. Check asset budgets, responsive selection, logo integrity, mobile footer bounds, slideshow readiness, scroll reversal, navigation, gallery, enquiry, keyboard and reduced motion. Audit the compiled website under its deployment prefix with Lighthouse, then publish and measure the live release. Report the actual scores.

## Verification ledger

- Baseline: live mobile Lighthouse 33, report in workspace output/website-performance-2026-11-22.
- Implemented: 10,476-byte transparent identity derived from the approved master; original SHA-256 unchanged. 100 responsive portfolio/hero files and six WOFF2 fonts, with first photo/identity/font preloads. Hero buffers and decodes one frame at a time, waits before moving, and pauses offscreen/when hidden.
- Implemented: compositor gallery transforms with uniform photo proportions, measured mobile viewport height, independent resize dimensions, visibility-gated scroll handlers, and native below-fold rendering containment.
- Implemented: complete static homepage HTML with hydration and per-section boundaries, deferred dialogs with local download-failure recovery, storage-safe initial restoration and smaller production styles. Stylesheet reduced from 184 KB to 81 KB uncompressed (about 34 KB to 16 KB gzip).
- Mobile footer measured 509.6 px at 390 px width; desktop remains 390 px. Mobile navigation text is larger than before while excess whitespace is removed.
- Both normal and Pages production builds pass. Ten unit tests pass. Six current browser suites pass: performance/loading, reference homepage, motion sections, reference regression, mixed category input, and portfolio/enquiry. Tests cover 320/390/768/1024/1440, exact expansion/reversal, browser-control height mismatch, resize at unchanged full expansion, saved edits/drafts/reload, gallery framing, native dialog focus, menu handoff, reduced motion and failed dialog-download recovery.
- Source lint has zero errors and ten pre-existing warnings in legacy files/context export rules. Git whitespace check passes. Peer review findings addressed.
- Measurement caveat: the local host reported only 14 MB available RAM out of 7,846 MB; local mobile audit scores are affected by memory pressure. Baseline 33; intermediate candidates 62–76. Google PageSpeed API returned HTTP 429. Public-release performance verification and the 85+ target are still pending; do not present an unmeasured passing score.
