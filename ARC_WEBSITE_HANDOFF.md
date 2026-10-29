# ARC website handoff

## Orange atmosphere refinement and publication - 29 October 2026

The final refinement increases only background illumination, plus approved
production metadata configuration. `app/brand.css` retains the single Home
background canvas and original base gradient stops, with five broad overlapping
orange light fields for the opening, developing problem, phone, network and
final reveal. The gap between product and network remains darker. Field alpha
ranges from 10% to 19%; large elliptical falloffs avoid bounded circles and
section seams. The hero's existing halo is warmer. `app/about/about.css` uses
calmer 9% and 5% orange fields on its existing fixed background.

Copy, typography, logo, page structure, phone UI, mobile layout, GSAP animation,
22-second sequencing and interactions are unchanged by this refinement.

`app/layout.tsx` now fixes metadataBase to `https://www.arclife.co.in`, sets the
Home canonical/OG URL, and resolves social image URLs there.
`app/about/page.tsx` supplies the `/about` canonical and social URL.
No DNS changes or manual deployment are part of this publication.

The completed brand sync was recorded separately as `3aca3bf` on
`brand/flutter-identity-sync`. The final refinement also updates this handoff
and `ARC_BRAND_SYSTEM.md`; the latter's original local-origin limitation is
superseded by the approved production origin above.

Validation: lint, typecheck, logic tests and production build pass. Browser
checks cover 320/360/375/390/430 mobile widths, tablet and desktop; all ten
walkthrough screens, no competing states, pause/replay, reduced motion,
About loops, route/reset/history behavior and overflow. Visual review covers
hero, product, network, final and calmer About at desktop/tablet/mobile sizes.
Before/after refinement screenshots are saved locally in `qa/atmosphere/`.
Production HTML inspection confirms canonical, OG URL and social image origins
for both routes.

Integration record:
- Brand synchronization: `3aca3bf4ba2e177c582397d53db1e54925427e27`.
- Final refinement: `bdd9d45ce28a0e14bdc734854079c0c2e393d1cd`.
- Fetched remote main: `11155823a455174432a8aa392fffc370bc825bc4`.
- Integration merge on main: `cdbb0b933a17862a555c891197e4ef9d39b0a58e`.
- Integration was conflict-free; source matches the verified feature branch.
- Lint, typecheck, logic tests and production build were rerun successfully
  after the merge. The responsive brand browser suite was rerun against that
  production export. No force-push or branch-protection bypass was used.
- This documentation commit follows the integration merge so its exact SHA
  can be recorded without a self-referential commit hash. The final push and
  deployment results are reported in the task completion message; no manual
  Vercel deployment is triggered.

Unrelated `.gitignore`, video project directories, film handoffs and generated
local agent guidance are excluded from the website commits. The Flutter app
repository and cinematic video projects are untouched.

## Brand synchronization ? 29 October 2026

Implemented locally on `brand/flutter-identity-sync`. No push or deployment.
The sections below the historical divider preserve the earlier handoff; their
blue/steel palette descriptions are superseded by this update and
[ARC_BRAND_SYSTEM.md](ARC_BRAND_SYSTEM.md).

### Source verification

Read the official app at `f5b493292e0c4bb0440c20a72f8923127ea6c2f9` using
its clean local checkout, whose HEAD matches the GitHub remote HEAD.
Active wiring is `main.dart` -> `arcUiTheme(arcDarkTheme())` -> `ArcColors.dark`.
The legacy `arc_theme.dart` palette is not the mounted main theme. Full values,
file references, asset hashes and adaptation boundaries are in the brand spec.
The Flutter repository was not modified.

### Before / after

| Before | After |
| --- | --- |
| Blue `#5B8BEF`, cool steel copy/surfaces | Verified orange `#FF8A1F`, warm ink `#F4F1EA`, graphite `#101012` / `#1A1A1E` |
| Text ARC plus decorative dot, curve favicon | Exact official app logo, reusable BrandLogo, source-derived PNG favicon and Apple icon |
| Cool blue illumination | Continuous warm graphite field with restrained orange illumination |
| Mostly square blue-tinted phone panels | Rounded glass/metal cards, actual Space Grotesk, peach/orange badges and pill navigation |
| Four simplified phone tabs | Actual Home / Train / Eat / Recover / You labels and corresponding icon concepts; four storytelling module controls retained |
| No branded social preview | 1200 x 630 OG image using the official mark, shared by OG and Twitter metadata |

### Changed and removed

- Added `app/brand.css` for palette roles, surfaces, action gradients, hover/
  pressed adaptations, borders, glows, navigation, chart and progress roles.
- Migrated literal old cool colors in shared CSS, About, SVG chart/line art and
  network lines to the shared roles. No blue brand values remain in app,
  components or lib. Old curve favicon removed; replaced by `app/icon.png`.
- Copied both official PNG variants without changing bytes. `BrandLogo` uses
  the exact image alpha mask and app ink tint. ARC lettering is a typographic
  companion; no separate official wordmark exists in the source.
- Applied BrandLogo to navigation (also mobile), hero, phone header/reflection,
  walkthrough closing, network center, About origin/closing, final and footer.
- Added licensed local Space Grotesk fonts for phone UI and logo lettering.
  Large cinematic display copy remains Geist.
- Scaled the camera island and shell radii to the device at small widths;
  constrained the closing logo to its narrative column after visual review.
- Added `scripts/build-brand-assets.mjs`, `scripts/verify-brand-browser.mjs`
  and focused chrome/logo-bound assertions to the existing walkthrough suite.

### Preserved

All six Home story sections, approved copy and anonymous four-person founding
story, separate `/about`, navigation structure and scroll-reset/history
behavior, GSAP timelines/eases, cinematic ArcLine geometry, network layout and
animation, fixed looping About artwork, continuous gradient architecture,
10 distinct phone screens and the original 22-second playback timing.
Pause, resume, replay, scroll-away pause, reduced-motion manual controls and
keyboard menu behavior remain. No backend/authentication or sections added.
Existing unrelated `.gitignore` and video/film work remains untouched.

### Validation and review artifacts

- `npm.cmd run lint`, `npm.cmd run typecheck`, `npm.cmd test`, and
  `npm.cmd run build` pass. Static production export contains Home, About,
  favicon and Apple icon routes.
- Logic suite: 3 replays / 3,963 sampled frames, exclusive screens/headlines,
  settled interruption behavior, reduced motion and baseline reset.
- Production browser suites: `verify-walkthrough-browser.mjs`,
  `verify-about-browser.mjs`, `verify-about-navigation.mjs`,
  `verify-brand-browser.mjs` against `http://localhost:3006`.
- Walkthrough autoplay: desktop 1440x900 and mobile 390x844; all 10 captures,
  replay/pause/resume and scroll-away behavior. Manual small-screen fixtures:
  320x568, 360x800, 375x667, 375x812, 390x844, 430x932.
- Home/brand layouts: 320, 360, 375, 390, 430, 768, 1024, 1440, 1920 widths.
  About also tested at those widths, including 375x812. Checked no document
  overflow, readable content, mark bounds, animation loops, active route links,
  menus, reduced motion, cross-route anchors and zero-offset About paint frames.
- Before/after PNGs and viewport report: `qa/brand/` (local QA artifacts,
  ignored by Git). Before views were captured from the pre-overhaul `out/`
  export before rebuilding it. After views are from the new production export.
- Main review pairs: `before-1440-hero.png` / `after-1440-hero.png`,
  `before-390-product.png` / `after-390-product.png`. Additional network,
  final, About and 320/tablet captures are in the same folder.
  All ten animated moments are captured in `qa/walkthrough/`; About captures
  are in `qa/about/`. Screenshots were visually inspected, not just generated.

### Repeat checks / local review

PowerShell: use `npm.cmd` if npm.ps1 execution is blocked. Run a production
build, then `$env:PORT='3006'; node scripts/serve.mjs`. Point `ARC_QA_URL` to
that server. If Playwright isn't locally installed, set `PLAYWRIGHT_MODULE`
to an available Playwright `index.mjs`; browser scripts default to installed
Microsoft Edge. Set `ARC_QA_BEFORE_URL` only to a retained old build when
recapturing before images. Do not use the new export as the before reference.

### Remaining boundaries

Phone content remains the approved illustrative walkthrough, not a pixel-for-
pixel recording of live app state. Current app Eat is a catalogue with a
My Nutrition view; Recover is a discomfort/care workflow. The approved website
story and sample progress metrics were retained while matching visual language.
Teal secondary-data usage and the continuous atmospheric interpolation are
explicit website mappings; they are not invented app constants. The app has
no separate official wordmark asset or newly branded native splash in the
inspected platform launch files. The shared component uses the official symbol
with text lettering. OG text is rasterized by the host SVG font renderer.

Historical limitation, now resolved: the approved canonical origin is configured
as `https://www.arclife.co.in`; no production-origin environment variable is required.
Browser QA used desktop Edge viewport emulation, not physical iOS/Android
hardware or a GPU performance benchmark. No production change was made.

---

## Historical handoff ? 16 October 2026 (palette superseded)

Updated 16 October 2026. Local repository implementation; no deployment performed.

## Current experience

The site preserves the premium black / graphite / steel identity, local Geist font, ARC blue, minimal navigation, metallic line motif and cinematic GSAP motion. The narrative is now six parts:

1. **Hero:** “EVERY BODY HAS AN ARC.”, large ARC reveal, “Built around change.” and a faint phone reflection. Opening type is larger; chapter numbering is removed.
2. **Problem:** a rigid phone plan surrounded by exactly six life variables: Work, Travel, Time, Injury, Equipment and Goals. The resolution is two oversized statements: “YOUR LIFE CHANGES.” and “YOUR FITNESS SHOULD TOO.” It leads directly into the app.
3. **Product walkthrough:** one physical phone, one time-driven sequence, with training as the main example. Time, location, shoulder discomfort and a new running goal change the same plan. A brief module overview establishes Nourish, Recover and Progress without new sections. The sequence resolves into ARC.
4. **Personalization:** one quieter day-one / day-200 statement with a subtle Day 1 → Day 30 → Day 100 → Day 200 context trace. No repeated weekly timeline or feature explanation.
5. **Vision:** the original seven-node graph/network is preserved. Fragmented wellness categories connect around ARC. Large “FITNESS IS FRAGMENTED.” and “THE SYSTEM IS ARC.” statements establish the company’s wider ambition.
6. **Final:** the ARC line returns around “FIND YOUR ARC.”, the original supporting change statement, Follow Our ARC control and minimal footer. No feature recap.

## What was consolidated and removed

- The old Human, System, Life changes and Product sections were consolidated into `ProductWalkthrough` plus a short `PersonalizationScene`.
- Removed `HumanScene.tsx`, `HumanExperience.tsx`, `SystemScene.tsx`, `LifeScene.tsx` and the previous `ProductScene.tsx`.
- Removed the old 400svh journey, standalone system demos, repeated human/adaptation explanations and the separate phone beauty-shot section.
- Removed chapter / navigation / edition numbering and obsolete chapter components, styles, body fallback, scene animations, old scenario datasets and imperative scroll driver.
- Removed **@react-three/fiber, @react-three/drei, three and @types/three** from both manifest and lockfile. No model, texture or loader asset existed in `public/`. No canvas or 3D renderer remains in application source.
- Also removed the unused Motion package and its provider after the last Motion components were consolidated. GSAP, CSS and SVG now handle motion. The uninstall operations removed 60 packages in total; no bundle-size percentage is claimed.

## Architecture

- `app/page.tsx`: the existing six Home narrative components; shared navigation/footer now live in the root layout.
- `app/layout.tsx`: metadata, local Geist font, global experience provider, shared accent variable, persistent navigation/footer and a route-safe skip link to `#main`.
- `app/globals.css`: retained global visual system, navigation, shared foundations and responsive rules. Dead scene selectors were removed.
- `app/product.css`: shared physical device, coherent app UI and rigid-plan / reflection variants.
- `app/walkthrough.css`: consolidated composition, large narrative type, walkthrough stage, functional body interaction, personalization and responsive behavior.
- `components/scenes/ProductWalkthrough.tsx`: one persistent device, environmental text, module rail, progress line and playback controls.
- `components/motion/useWalkthrough.ts`: visibility / reduced-motion / tab-lifecycle integration; attaches all presentation tracks to the controller’s central timeline; settles interruptions on scroll-away, resize, window blur, tab hiding and menu opening.
- `lib/animations/presentation.ts`: sequential headline and screen exits/entrances, goal reveal, body and restrained phone movement on the controller timeline.
- `lib/animations/language.ts`: shared reveal, exit, morph, device and microinteraction easing plus phase timings.
- `lib/animations/walkthrough.ts`: GSAP clock and playback controller. Activation, pause, explicit resume, replay, manual selection, reduced motion and cleanup are owned here.
- `lib/constants/walkthrough.ts`: sequence start times, duration, visibility thresholds, story copy and typed phone scenarios. This is the single pacing source.
- `components/ui/WalkthroughScreens.tsx`: persistent `PhoneShell` chrome plus dedicated `BaselineTrainingScreen`, `TimeAdaptationScreen`, `TravelAdaptationScreen`, `BodyAdaptationScreen`, `GoalAdaptationScreen`, four module layouts and the final ARC resolve. Every screen owns its content; no training object is spread into recovery.
- `components/ui/DeviceFrame.tsx`: one physical device shell; no duplicate phone trees.
- `components/ui/PhoneScreen.tsx`: shared app typography, navigation icons, metrics, exercise lists, nutrition, recovery and progress graphics. Gradient IDs use React useId.
- `components/ui/BodyAvatar.tsx`: existing 2D body asset; exactly one external avatar in the walkthrough body scene, with no duplicate inside the phone.
- `lib/constants/product.ts`: shared screen types and base app modules.
- `lib/constants/brand.ts`: official app accent **#5B8BEF**, derived from supplied opaque ARGB `FF5B8BEF`. The root CSS variable drives DOM/SVG colors. The static favicon also carries this hex.
- `scripts/verify-product.mjs`: isolated-screen content checks, persistent chrome counts and tests of the actual GSAP controller/presentation.
- `scripts/verify-walkthrough-browser.mjs`: full desktop/mobile autoplay, replay, pause, scroll-away/re-entry, six mobile viewport fixtures, app-content bounds, navigation state and screenshots. Uses an externally available Playwright installation; set `PLAYWRIGHT_MODULE` to its `index.mjs` if it is not locally installed. `ARC_QA_URL` defaults to localhost:3000 and `BROWSER_CHANNEL` defaults to msedge.
- `scripts/verify-typography.mjs`: actual local Geist glyph metrics at 12 desktop, tablet, phone and landscape fixtures. This is a fit calculation, not browser geometry verification.
- `scripts/serve.mjs`: localhost-only static export preview server.

## Automatic walkthrough behavior

The stage starts when approximately 60% of its viewable extent is visible. For a mobile stage taller than the viewport, visibility is normalized against the viewport height so activation remains possible. There is no pin, scroll lock, snap, wheel interception or extra scroll-height requirement in the walkthrough. Users can watch in place or keep scrolling at any time.

One central GSAP timeline owns the **22-second** clock, scene selection, progress and every walkthrough visual track. Its named states are `baseline`, `time`, `travel`, `body`, `goal`, `system`, `nourish`, `recover`, `progress`, `complete`. React controls accessibility and playback controls; the timeline controls all visibility/transforms and the active phone navigation. The physical phone, status bar, ARC header, bottom navigation and home indicator each exist exactly once. Ten isolated content buffers contain distinct screen components; inactive buffers are inert and hidden from accessibility. No full app chrome is duplicated in the buffers.

Circumstance headlines enter before the phone responds (300ms lead; 500ms for travel and goal). Travel and goal text also have a short secondary-line reveal. The outgoing app content moves up 18px, blurs to 8px, scales to .985 and fully exits before the incoming screen starts below at scale 1.015. Major screen transitions take approximately 740ms with a 40ms clear gap. Module transitions are shorter (420ms) within one-second tabs. Headline exits complete before the next entrance. All tracks use the shared premium easing; there are no independent timeout chains or CSS app-screen animations.

| Clock | Story / phone response |
| --- | --- |
| 0-2.3s | YOUR PLAN. Stable Chest + Triceps / 60 MIN / GYM, four exercises |
| 2.3-5.7s | Meeting ran late; dedicated 10 MIN express session, three exercises |
| 5.7-9.1s | Travelling / No gym; HOTEL / HOME, dumbbell and bodyweight exercises; no inherited 10 MIN label |
| 9.1-12.6s | Shoulder check-in; external body enters only after travel has left; pressing paused / movement available / guidance; no location or old exercise list |
| 12.6-16.5s | Body fully exits; six months later / goal changed; BUILD MUSCLE reveals RUN A 10K; weekly run + strength architecture |
| 16.5-17.7s | TRAIN weekly summary |
| 17.7-18.7s | NOURISH calorie ring and meal context |
| 18.7-19.7s | RECOVER recovery rhythm and mobility |
| 19.7-20.9s | PROGRESS chart, consistency and strength |
| 20.9-22s | ARC / BUILT AROUND YOU; completion exposes Replay |

The breadth sequence retains one ONE CONTEXT / ONE SYSTEM headline while the app tabs change. The body never appears inside a phone screen in this walkthrough. Desktop phone movement is limited to 10% of the phone width during body adaptation; compact layouts keep it fixed.

The activation latch persists for the mounted experience. Crossing the visibility threshold repeatedly cannot replay the sequence. Scrolling below 20% visibility pauses; returning leaves it paused with a Resume control. Hiding the browser tab also pauses; returning does not resume an already-started sequence. Replay is explicit. Module selection pauses the clock and seeks to that module; Resume continues from there. Pause is available throughout playback. Every interruption seeks into a readable hold within the current moment, including the complete screen and goal reveal, rather than freezing an in-between transition. Resize uses CSS reflow and this same settling behavior; no new timeline is constructed. Mobile browser address-bar height changes are ignored on coarse pointers unless width changes.

Visibility observers, media-query listeners, document listeners and the timeline are disconnected/killed on cleanup. No independent timeout chain, continuous body animation or background canvas is used.

## 2D body asset provenance and replacement

There is **no actual standalone ARC app body asset or app source component in this repository**. The available reference was the existing inline SVG inside `PhoneScreen`’s recovery concept. Its 72×120 geometry and shoulder/knee/back selection mapping were extracted unchanged into `BodyAvatar.tsx`. Both the walkthrough’s functional shoulder graphic and the phone recovery view reuse that component.

This is an honest isolated placeholder based on the website’s existing product graphic, not a claim that the production app asset has been supplied. Replace the SVG / coordinate mapping in this single component with ARC’s real 2D avatar when available, retaining its `area` interface. No new 3D substitute was created.

## Typography and composition

Primary statements use responsive clamp sizing. Desktop ranges include:

- Hero opening statement: 25–62px, with the oversized ARC wordmark retained.
- Problem headline: 58–112px; life-change resolutions: 70–190px.
- Walkthrough environmental type: 52–112px; completed ARC moment: 150–320px.
- Personalization opening: 32–94px; day-200 statement: 68–190px.
- Fragmentation headline: 68–188px; system statement: 80–210px.
- Final brand moment: 90–260px.

Small supporting text remains restrained. There are no visible chapter numbers or new feature grids. The problem uses a denser side-by-side composition on desktop. Removing entire repeated sections, particularly the 400svh timeline, supplies most of the page-length reduction.

## Mobile and reduced motion

Mobile keeps the headline above a centered phone and supporting line. The stage uses `100dvh`, with a short-height variant below 680px. Phone width is constrained by both 80vw / 290px and available viewport height (minus 310px, or 260px on short devices), so its entire screen and navigation remain visible. App spacing and type scale together using the physical device container width. The one external body graphic sits behind the lower phone edge during body adaptation; its desktop label is omitted on mobile to prevent collisions. No app content is removed on short screens.

The Problem labels share a wrapping rail rather than absolute offsets, so GOALS and EQUIPMENT cannot be orphaned. The phone has no Z rotation and only the bounded desktop body-scene shift described above. Global main/hero content clipping has been removed; only decorative SVG artwork and the physical device screen use local clipping. The graph has a separate vertical mobile branch layout with all seven nodes. Safe-area gutters, 44px controls, compact menu, touch cursor removal and natural landscape vertical flow apply across the site. All four module controls remain available.

With `prefers-reduced-motion`, autoplay cannot start. Previous / Next and module controls expose every moment manually. The clock remains paused, perspective/copy transitions are removed, and the global provider disables Lenis and scroll choreography. A live preference change pauses an active sequence; re-enabling motion leaves previously started playback paused until resumed.

Native buttons, visible keyboard focus, pressed-state module controls, a concise playback live region, pause/resume and the existing keyboard-trapped navigation support accessibility. The six-scene narrative remains readable in the server-rendered page; the default app plan is present before hydration.

## Dependencies and commands

Runtime dependencies: Next.js, React, React DOM, GSAP and Lenis. Tailwind CSS 4 / PostCSS, strict TypeScript and ESLint remain configured. Self-hosted Geist and its OFL license are in `public/fonts/`. No backend, accounts, API, database or environment variables are required.

```sh
npm install
npm run dev
npm run lint
npm run typecheck
npm test
npm run build
npm start
```

Use `npm.cmd` under PowerShell if npm.ps1 is blocked. Development serves http://localhost:3000. The static preview server resolves extensionless `/about` to `out/about.html`, including when Next emits an adjacent RSC-data directory named `about`. The production build emits `out/`; `npm start` serves it locally. Requires Node 20.9 or later; this workspace uses Node 22.

## Validation

- `npm.cmd run lint`, `npm.cmd run typecheck`, `npm.cmd test`, `npm.cmd run build`: PASS.
- Controller/presentation tests sample 3,963 frames across three complete replays, requiring at most one visible screen and one visible headline (opacity threshold .001). They also check body isolation, clean replay reset, interruption settling, visibility lifecycle and reduced motion.
- Real browser QA: headless Microsoft Edge, complete 22-second autoplay at 1440x900 and 390x844, all ten states captured and reviewed, no competing screens or headlines, replay/pause and scroll-away/re-entry checked.
- Every state checked at 320x568, 360x800, 375x667, 375x812, 390x844 and 430x932 with reduced-motion manual navigation. Full phone bounds, app content bounds, bottom navigation visibility and correct selected navigation tab are asserted. Screenshots are saved under ignored `qa/walkthrough/`.
- These are browser viewport tests, not physical-device or iOS Safari testing. No Lighthouse score or measured bundle reduction is claimed. No deployment was performed.

## Remaining placeholders and recommended work

- Supply the actual ARC app 2D body SVG/component and replace the isolated existing website reference.
- App UI, workout/nutrition values and charts remain illustrative product concepts, not production screenshots or promised outcomes. Review them against the real product before launch.
- Recovery language describes adaptation and qualified support; the demo does not diagnose discomfort or injuries.
- Official contact/social destinations were not supplied. Follow Our ARC still opens the existing launch-status disclosure rather than an invented URL.
- Physical-device / iOS Safari testing and measured Web Vitals remain follow-up work; desktop/mobile Edge viewport QA is complete.
- Add a confirmed canonical URL and final Open Graph artwork when the production domain and approved assets are supplied.

## About page (16 October 2026)

- Added a separate `/about` route in `app/about/page.tsx`, with its own metadata. The Home narrative remains at `/`; the founding story is not part of its scroll experience.
- The About page is a single editorial article: oversized two-part opening, the supplied founding story, an anonymous FOUR PEOPLE / ONE QUESTION / ONE IDEA brand moment, the meaning of ARC and day-two-hundred statement, a concise philosophy, then WE'RE JUST GETTING STARTED / Find your ARC and an EXPLORE ARC link back to `/`. No invented biographies, titles, portraits, feature cards or numbered steps.
- `app/about/about.css` scopes all page-specific layout. Body copy is 18-24px and capped at 720px. Mobile has 24px gutters and responsive editorial statements. Existing graphite surfaces, Geist typography and ARC blue remain in use.
- The background reuses `ArcLine` rise/wave SVG geometry, with two low-opacity blue paths. CSS draw/fade cycles (28/34 seconds) and subtle translation cycles (32/38 seconds) loop indefinitely without scrolling, particles, WebGL, JavaScript frame loops or animated blur filters. Reduced motion removes all looping animation and shows static paths.
- `components/motion/Experience.tsx` explicitly excludes `.about-arc` from Home's scroll-driven path animation. Its motion setup is now keyed to `usePathname`, cleaning up Lenis/ScrollTrigger on route changes and initializing Home reveals again on return.
- `components/layout/Navigation.tsx` is shared in the root layout. Visible Home/About links use Next Link and `aria-current="page"`, with a blue accent and short underline. The existing Explore menu is preserved, includes both pages, and resolves Home section links correctly from About. Menu focus trapping/Escape behavior and scroll-lock cleanup remain in place; header page links are inert while the dialog is open. Mobile retains the labeled menu glyph and direct Home/About links.
- `app/template.tsx` provides a restrained 450ms route-entry fade. Shared navigation stays persistent. Reduced motion disables the fade; all story content is server-rendered and readable without animation or JavaScript.
- `scripts/verify-about-browser.mjs` checks production `/` and `/about`, active links, cross-route menu anchors, the closing CTA, keyboard Escape/focus, remounted Home autoplay, non-scroll infinite background animation and static reduced motion. Layout fixtures: 320x568, 360x800, 375x667, 375x812, 390x844, 430x932, 768x1024, 1024x768, 1440x900 and 1920x1080. Screenshots are in ignored `qa/about/`; opening, anonymous origin moment, philosophy and closing were visually reviewed on desktop and mobile. These are browser viewport tests, not physical-device tests.
- Validation: lint, strict typecheck, existing walkthrough tests and production static build pass. No deployment performed.

To repeat the About browser checks, run a production preview, then `node scripts/verify-about-browser.mjs`. Set `ARC_QA_URL` to its origin (defaults to http://localhost:3003), and `PLAYWRIGHT_MODULE` to an available Playwright `index.mjs` if Playwright is not installed locally. `BROWSER_CHANNEL` defaults to msedge.

## About refinement: anonymous origin and explicit top reset

Founder identities are intentionally hidden across the public website. The named founder list and its profile-list CSS have been removed. The story still says "four of us" and preserves the original human, collective voice. In the same editorial position, `.about-origin-moment` now reads FOUR PEOPLE / ONE QUESTION, WHY DOES FITNESS STOP WORKING WHEN LIFE STOPS BEING PREDICTABLE?, ONE IDEA, BUILD FITNESS AROUND LIFE / NOT LIFE AROUND FITNESS. The existing background ARC animation remains unchanged.

Both shared navigation About links explicitly open `/about` at scroll position zero, including repeat clicks while already on About. `Navigation` uses Next Link's `onNavigate` (so modified clicks retain normal browser behavior) and `scroll={false}` to give this action one scroll owner. A repeat click prevents redundant routing and resets synchronously. Cross-route navigation resets in `Experience`'s `useLayoutEffect` at the route commit, before paint and the existing entry fade. Home does not jump before routing; no timeout or delayed scroll correction is used.

`lib/animations/navigation-scroll.ts` coordinates the currently mounted Lenis instance and explicit About navigation. It performs an instant native scroll and uses Lenis's public stop/scrollTo(0, { immediate: true, force: true })/start methods to cancel interpolation and synchronize internal state, preserving any pre-existing stopped state. Lenis registration is cleared on cleanup; normal smooth scrolling remains active. Cross-route Home hash links are completed through Lenis after ScrollTrigger measurement, so refresh cannot cancel their smooth navigation; history restoration is excluded from that anchor handling. The browser's prior scroll-restoration policy is saved, temporarily set to manual for the explicit action, then restored after commit. That animation-frame callback only restores the policy; it never scrolls. Popstate navigation is tracked separately so ordinary back/forward restores its history position; a subsequent explicit About click always overrides it with zero.

Validation: lint, strict typecheck, production build and existing walkthrough tests pass. `scripts/verify-about-navigation.mjs` checks Home top/middle/bottom to About, previously visited About, header and Explore menu links, repeat clicks from About middle/bottom, an in-flight wheel scroll, working scrolling after reset, active navigation, no founder identities in rendered Home/About, and back/forward restoration. Tests run at 1440x900, 390x844 and 320x568 (reduced motion). Every sampled animation frame after the About commit has scrollY=0, with no old-position flash. The broader About browser suite verifies the anonymous composition, unchanged background loop, reduced motion and responsive bounds at ten viewport sizes. Screenshots remain under ignored `qa/about/`.

Repeat the focused checks with `node scripts/verify-about-navigation.mjs` against a production preview (`ARC_QA_URL`, `PLAYWRIGHT_MODULE`, `BROWSER_CHANNEL` use the same conventions as the About browser suite).

## Separate cinematic film project

The 60-second ARC intro film lives in `video/arc-intro/`, independently of website routes and runtime dependencies. See `ARC_VIDEO_HANDOFF.md` for final MP4/ProRes delivery, editable source, asset provenance, sound-design stems and the explicitly replaceable music input. Website TypeScript and ESLint exclude this isolated project; the video has its own strict typecheck. No film player, new section or video dependency was added to the website.

## Continuous background refinement

Home now uses one shared `.home-page` background in `app/globals.css`: a long near-black / graphite gradient with broad, faint ARC-blue and steel radial illumination. Hero, Problem, walkthrough, Day 200, Vision and Final are transparent over that same field, so the lighting crosses their boundaries instead of restarting at each section. The final gradient resolves to the body background; the footer's isolated fill and top border were removed. About keeps its looping ARC animation and now uses the same near-black / graphite progression with restrained blue light.

This is CSS-only background polish: no new scroll listeners, animated filters, blur layers or runtime dependencies. Existing grain and ARC motion remain. Section heights, positions, headings, typography, copy, phone walkthrough and navigation behavior are unchanged. Background coordinates scale with the page on mobile, without oversized transformed layers.

Validation: lint, strict typecheck, production build and walkthrough logic checks pass. Desktop (1440x900), mobile (390x844), and reduced-motion small mobile (320x568) production browser checks covered the whole scroll journey and every major boundary, plus the footer and About. Desktop/mobile section geometry and heading content match the before-change snapshots exactly; sections have transparent backgrounds, no horizontal overflow or runtime errors, and the About loop still animates. The existing navigation suite also passes at all three sizes, including explicit About top resets, both menus, Lenis scrolling, and history back/forward. Visual QA captures and reports are under ignored `qa/background/`. No deployment performed.
