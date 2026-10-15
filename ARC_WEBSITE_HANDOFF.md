# ARC website handoff

## What was built

A complete eight-scene ARC brand website. Black, graphite, steel and restrained copper form the palette. Locally hosted Geist variable type, huge editorial statements, a reusable metallic SVG arc and a single procedural human study carry the visual narrative. All demos run entirely in the browser. There are no accounts, API calls, authentication, pricing, database or backend.

This is a local repository build; it has not been published to an external host.

## Architecture

- `app/page.tsx`: scene composition only.
- `app/layout.tsx`: metadata, locally loaded font, global motion provider and skip link.
- `app/globals.css`: visual tokens, scene styles, breakpoints and reduced-motion overrides.
- `components/layout/`: fixed minimal navigation, keyboard-trapped overlay menu and footer.
- `components/scenes/`: eight independently owned scene components.
- `components/motion/Experience.tsx`: Lenis, GSAP ticker integration, reusable reveal and SVG draw behavior, desktop cursor and cleanup.
- `components/ui/`: chapter labels, reusable arc paths, and five device interface concepts.
- `components/three/HumanExperience.tsx`: the only R3F canvas, isolated model architecture and WebGL error fallback.
- `lib/gsap/`: central GSAP / ScrollTrigger registration.
- `lib/constants/system.ts`: system demo scenarios and copy.
- `public/fonts/`: Geist variable font and OFL license. Loaded through Next local font; no Google Fonts runtime dependency.

## Dependencies

Runtime: Next.js, React, React DOM, GSAP / ScrollTrigger, Lenis, Motion, Three.js, React Three Fiber and Drei. Tailwind CSS 4 is integrated through PostCSS; custom CSS handles the scene-specific editorial layout. Development: strict TypeScript, ESLint, Next ESLint configurations, Tailwind PostCSS integration and relevant type definitions. Exact resolved versions are recorded in `package-lock.json`.

SplitText and MorphSVG were not needed: individual SAME letters and SVG stroke drawing keep these particular effects simple.

## Scenes

1. **Hero / The ARC:** near-black opening, “EVERY BODY HAS AN ARC.”, a scroll-drawn metallic line, large ARC reveal and “Built around change.” A sticky viewport gives the opening room to breathe.
2. **The problem:** “FITNESS PLANS ASSUME YOUR LIFE STAYS THE SAME.” SAME letters dislocate as life pressures gather around a rigid PUSH / PULL / LEGS / REST plan. The plan fragments before the resolution: “Your life changes. Your fitness should too.”
3. **The human:** a neutral, abstract metallic human sculpture. Scroll moves through strength, mobility, recovery and goals; buttons allow direct exploration. Body regions change material and light. The scene ends with “ARC ADAPTS WITH YOU.”
4. **The system:** an accessible four-tab story for Train, Nourish, Recover and Evolve. Each has three interactive circumstances. Training switches equipment, nutrition switches context, recovery shifts toward adapted movement and professional support, and progress brings context together. Demo values are illustrative.
5. **Life changes:** a six-chapter journey from Monday through six months. Desktop scrolling advances a sticky full-screen narrative. A circular time / context indicator changes from 60 minutes to 10, travel, recovery, progress and a 10K goal. Direct chapter controls are available. A separate spacious day-200 typography moment follows.
6. **The product:** a DOM / CSS perspective phone with Home, Workout, Nutrition, Recovery and Progress concept screens. Scroll cycles screens and moves the phone. Controls allow direct selection. A chart expands outside the device; the phone fades before “THE APP IS JUST THE INTERFACE. THE SYSTEM IS ARC.”
7. **The vision:** seven separated wellness nodes move toward a shared ARC center; connections appear as the visitor scrolls. The restrained network illustrates the long-term company vision, not currently available professional services.
8. **The ending:** the opening arc returns behind “FIND YOUR ARC.” A clean final statement, expandable Follow Our ARC control, and minimal Chennai footer complete the journey.

## Assets and placeholders

- The human is an intentionally procedural abstract sculpture made of ellipsoids. Replace the `parts` assembly inside `HumanExperience.tsx` with a licensed, compressed neutral anatomical GLB when a final art-directed model exists. Keep its current lazy loading, fallbacks and isolated ownership.
- Phone screens, charts, nutrition values and the life journey are product concepts, explicitly identified as illustrative. They are not production screenshots, measured results or live product claims.
- The follow control opens an honest launch-status message. Official social handles, contact address and follow destination were not provided; no addresses or links were invented. Wire this to ARC’s confirmed destination before public launch.
- No stock photography, external model files, texture downloads or video are required. Arc artwork and favicon are original SVG; font licensing is included.

## Performance decisions

- Only one WebGL canvas; its component is dynamically imported and mounted near the human scene using IntersectionObserver.
- R3F renders on demand, pixel ratio is capped at 1.5, lighting is simple, and no heavy environment maps, postprocessing, shadow pipelines or continuous 3D animation loops are used.
- Canvas unmounts outside its scene. CSS silhouette is available during loading, for mobile, reduced motion and WebGL failure.
- Lenis updates ScrollTrigger through one GSAP ticker callback; ticker and listeners are removed on cleanup.
- GSAP matchMedia contexts revert their animations and ScrollTriggers on unmount or media-query changes.
- Reusable reveal effects use opacity and transforms. The network uses SVG and the phone uses DOM / CSS.
- Fonts are self-hosted; there are no external runtime data or image requests.
- Next static export supports simple static hosting. Application interactivity has no server dependencies.

## Mobile, accessibility and reduced motion

Below 768px, sticky long-scroll scenes become compact narrative layouts, the body uses its static silhouette, the phone faces forward, custom cursor is absent and the journey uses direct chapter controls. System tabs support arrow keys, Home and End; all story controls expose their selected state. The navigation traps focus, closes on Escape and restores focus. A skip link, semantic headings, visible focus outlines and native controls are provided.

Reduced-motion preference disables Lenis, scroll choreography, transitions, entry effects, cursor and WebGL. It removes long sticky journey spacing and keeps all narrative content accessible with direct controls.

## Commands

Requires Node.js 20.9 or later; this workspace uses Node 22.

```sh
npm install
npm run dev
npm run lint
npm run typecheck
npm run build
npm run start
```

`dev` serves http://localhost:3000. Build emits `out/` for static hosting in addition to Next’s build. `start` serves the exported `out/` directory through a small localhost-only static file server. Use `npm.cmd` under PowerShell if execution policy blocks npm.ps1. No secrets or environment variables are needed.

## Verification

- Dependency installation: PASS. Interrupted large registry downloads were recovered with range downloads, verified against the registry SHA-512 integrity values, then installed successfully from npm cache. No temporary archive paths are used as project dependencies.
- `npm run lint`: PASS, no errors or warnings.
- `npm run typecheck`: PASS under strict TypeScript.
- `npm run build`: PASS on Next.js 16.4.1. All pages prerendered; static `out/` export generated successfully.
- `npm start`: PASS; the localhost static server starts correctly.
- HTTP smoke checks: PASS. Home returns 200; all five navigation targets and eight narrative scenes are present; all 12 referenced script, stylesheet, font and icon assets return 200; SVG MIME type is correct; missing routes return 404.
- Browser visual QA: NOT RUN. The session exposed no browser surfaces; attempting to open the in-app browser returned “Browser is not available: iab.” Desktop/mobile layout, horizontal overflow, live scrolling, focus interaction, hydration console and GPU appearance remain unverified in an actual browser. Responsive and reduced-motion code paths were implemented and inspected, but are not claimed as visually tested.
- No Lighthouse score or real-device performance measurement is claimed.

## Known limitations and next improvements

1. Confirm official company contact / follow URLs and replace the launch-status disclosure before public release.
2. Commission the final sculptural human asset. The current procedural model is a visual placeholder, with an isolated replacement point.
3. Review all concept screens, sample nutrition values and recovery language against ARC’s actual product and brand requirements. No diagnosis is provided by the demo.
4. Perform real-device visual QA on iOS Safari and Android Chrome, including browser chrome resizing, reduced motion, WebGL unavailable, and keyboard navigation.
5. Capture Lighthouse / Web Vitals on the eventual host and tune animation lengths after user testing. No numeric performance score is claimed.
6. Add a confirmed canonical URL and branded Open Graph image after the production domain and final artwork are supplied.
7. Browser-based verification depends on the session’s preview capabilities; see Verification above for what was actually exercised.
