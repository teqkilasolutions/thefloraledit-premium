# The Floral Edit reference-led homepage

The user's 22 November brief is the approved visual direction: Floraison header/hero/footer, Plantica's expanding image immediately after the hero and its final contact treatment, and Foglia d'Oro's homepage sequence with the founder section excluded. Implement directly in the existing React/Vite website. No social changes.

## Reference observations

- Floraison, inspected at 1440 × 1000: header 101px, hero 692px; centred horizontal identity, four links on the left and supporting links on the right. The footer has a centred identity with flanking link columns, approximately 302px main area plus 88px lower strip. At 390 × 844 the header is 137.1px and hero 594.14px. Footer main is 713.66px, lower strip 411.33px. Match these measured sizes at these widths and interpolate sensibly elsewhere.
- Plantica: large introductory type above a staggered group of photographs; one photograph grows to fill the viewport during a pinned scroll interval. The final contact area is an inset full-width photograph with brand lettering and a moving text link below. Mobile retains the photo and contact link with smaller side gutters.
- Foglia: left photographic/floral visual and right introductory copy; three overlapping tilted botanical panels, changing flower categories, photographic approach panel, four staggered photographs, a large scale-of-work statement, three studio principles, newsletter-shaped invitation, final conversation panel. Exclude founder quote and portrait. Replace the final conversation panel with Plantica's contact composition.

## Design and content

Use the current palette: ivory #FAF7F1, olive #536336, deep green #29362B and blush/beige #EEE3D9. Allura remains the spacious main-heading script, Lora the formal subheading font, Manrope the body and controls. The header uses the original TFE/calla-lily artwork as an inline SVG image with a luminance-to-alpha filter, so the original artwork reads directly against the header without a green rectangle. The untouched original master remains available in the footer.

Sequence: header → centred photographic opening → scroll gallery → house introduction → three real celebration stories in tilted panels → floral categories → approach → staggered photo composition and scale statement → three studio principles → studio-notes invitation → quiet optional collection/FAQ disclosures → Plantica contact photo and moving link → Floraison footer.

Use original portfolio files, captions and galleries. No competitor photographs, copy, contact details, awards, founder claims, service areas or sourcing claims. The studio-notes field prepares an enquiry with its email prefilled; it cannot promise an active newsletter subscription. Existing enquiries remain private downloadable drafts; no backend is invented. Retain vessel/bag functionality inside a disclosure. Every visible navigation target and action must work.

## Implementation approach

Use native sticky positioning and a passive scroll listener scheduled through requestAnimationFrame. Avoid introducing a scroll-jacking library, WebGL or another dependency. Isolate layout in reference-home.css, preserving overlay styling. Reuse PortfolioContext, PortfolioImage and StudioForm. Work in the clean existing canonical checkout on a feature branch; the app instructions prefer reusing a suitable checkout over creating a new worktree.

## Acceptance

At 320, 390, 768, 1024 and 1440px there is no horizontal page overflow, overlap or clipped main copy. At measured reference widths the opening/footer sizes match. Scroll image expands smoothly to viewport edges and reverses when scrolling back; reduced motion displays a normal static composition without a long pinned interval. Mobile menu has keyboard focus control and Escape dismissal. Existing viewer/save/draft/download/bag workflows continue. Original master hash remains unchanged. Build, storage and browser checks pass before publication.
