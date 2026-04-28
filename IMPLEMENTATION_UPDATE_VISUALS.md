# Implementation Plan: Visual & Functional Enhancements (Lumina Solar)

This plan outlines the steps to elevate the Lumina Solar landing page through mobile optimization, visual consistency, and interactive refinements.

## 1. Mobile Experience & Hero Refinements
- [ ] **Header Hamburger Menu**:
    - Update `Header.tsx` to include a mobile menu toggle (Lucide `Menu` and `X` icons).
    - Implement a slide-down or overlay menu for mobile users.
- [ ] **Hero Video Indicators**:
    - Add navigation dots to the bottom of `Hero.tsx` to show which background video is active.
    - Style dots with `bg-solar-amber` for active state.
- [ ] **Hero Mobile Layout**:
    - Ensure zip code input and CTA button are full-width on mobile in `Hero.tsx`.
- [ ] **Video Performance**:
    - Add `preload="none"` to inactive videos in `Hero.tsx` to optimize bandwidth.

## 2. Header & Navigation Polish
- [ ] **Transparent Header State**:
    - Implement a scroll-aware `isOverHero` state in `Header.tsx`.
    - Apply white text/logo styles when transparent over the hero.
    - Transition to dark text/white background when scrolled.
- [ ] **Sticky Transition**:
    - Ensure smooth backdrop-blur and background-color transitions.

## 3. Section Transitions & Content
- [ ] **Gradient Dividers**:
    - Add subtle 2px gradient lines (`bg-gradient-to-r from-transparent via-solar-amber/20 to-transparent`) between main sections in `App.tsx`.
- [ ] **Expanded Feature Grid**:
    - Add 3 additional cards to `FeatureGrid.tsx`: "Battery Storage", "Grid Independence", "Weather Resilient".
- [ ] **Impact Section Enhancements**:
    - Increase bar chart height in `ImpactSection.tsx`.
    - Add numeric value labels above bars.
    - Apply a "glow" effect to the "With Solar" bar.

## 4. Social Proof Bar
- [ ] **Divider Refinement**:
    - Replace pipes `|` with styled dots (`w-1 h-1 rounded-full bg-slate-300`) in `SocialProof.tsx`.
- [ ] **Border Styling**:
    - Add gradient-faded borders (top and bottom) to the bar.
- [ ] **Certification Logos**:
    - Replace generic icons with stylized SVG representations of NABCEP and SEIA logos.

## 5. Savings Calculator Interaction
- [ ] **Savings Meter**:
    - Add an animated progress ring or visual meter in `SavingsCalculator.tsx` that reacts to slider changes.
- [ ] **Results Panel Polish**:
    - Add a subtle inner glow or gradient border on hover to the results container.
- [ ] **Comparison Data**:
    - Add a "Compared to utility costs" line to highlight the delta.

## 6. FAQ & Pricing Guarantee
- [ ] **FAQ Accents**:
    - Add a thin amber accent line under the FAQ heading.
    - Add a left-border amber accent to the active FAQ item.
    - Add a "Still have questions?" CTA at the bottom of the section.
- [ ] **Guarantee Section Connectivity**:
    - Add a subtle connecting visual (line/arrow) between the guarantee box and stat cards.
    - Add `hover:scale-[1.02]` to stat cards.
    - Increase shimmer animation opacity (`via-solar-amber/8`).

## 7. Footer & Lead Capture
- [ ] **Footer CTA Spotlight**:
    - Add a radial gradient glow behind the primary CTA button.
- [ ] **Urgency Badge Pulse**:
    - Implement a gentle opacity pulse for the "Limited Availability" badge.
- [ ] **Lead Modal Refinement**:
    - Increase backdrop opacity to `bg-black/60` and add `backdrop-blur-sm`.
    - Add a `solar-gradient` top border to the modal.
    - Implement "Selected" states for Home Type and Bill buttons.
    - Add a "Back" button for multi-step navigation.

## 8. Meta & Assets
- [ ] **Custom Favicon**:
    - Replace Vite favicon with a custom Lumina Solar sun icon in `index.html`.
- [ ] **Meta Tags**:
    - Add `<meta name="theme-color" content="#f59e0b">`.
    - Add `apple-touch-icon` link.

---

## Progress Checklist
- [ ] 1. Mobile Experience (Header/Hero)
- [ ] 2. Header Transparency Logic
- [ ] 3. Section Transitions & FeatureGrid
- [ ] 4. Impact Section Charts
- [ ] 5. Social Proof Bar Refinement
- [ ] 6. Savings Calculator Meter
- [ ] 7. FAQ Polishing
- [ ] 8. Pricing Guarantee Connectivity
- [ ] 9. Footer CTA & Badge
- [ ] 10. Lead Capture Modal Navigation
- [ ] 11. Favicon & Meta Tags
