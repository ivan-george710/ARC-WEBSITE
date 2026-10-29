# ARC brand system

Verified 29 October 2026. Website branch: `brand/flutter-identity-sync`.

## Authority and active implementation

Source repository: https://github.com/DarkKnight27x/Arc

Source revision: `f5b493292e0c4bb0440c20a72f8923127ea6c2f9`.
`git ls-remote ... HEAD` matched the clean local checkout at
`C:/Users/ivang/ARC VSCODE/Arc`. This checkout was inspected read-only.
The GitHub connector returned 404 for contents and the initial full clone stalled;
neither prevented source verification against the matching local commit.

`lib/main.dart` mounts `arcUiTheme(arcDarkTheme())` and
`arcUiTheme(arcCreamTheme())`, driven by `themeCtrl` (dark by default).
`lib/theme_ctrl.dart` is the active `ArcColors` implementation.
`lib/widgets/arc_glass.dart` supplies the active Material color scheme, glass
surfaces, orange/teal colors and selected-state gradients.

`lib/arc_theme.dart` contains an older `ArcPalette`, a blue secondary `#5B8DEF`
and different cream/graphite colors. It is not the theme mounted by main.dart.
The website's former `#5B8BEF` is also superseded. Do not use either as the
primary brand palette. Authentication still has some local cool neutrals;
those are screen-specific, not the active consumer-shell authority.

## Exact dark palette and website mapping

All entries below originate in `lib/theme_ctrl.dart`, `ArcColors.dark`.

| App role | Exact RGB | Website token / use |
| --- | --- | --- |
| page | `#050506` | `--bg`, opening and ending |
| shell | `#12110E` | `--shell`, warm graphite atmosphere |
| surface | `#101012` | `--surface`, phone and panels |
| raised | `#1A1A1E` | `--surface-raised`, raised panel stops |
| chip | `#16181D` | `--chip`, unselected chips |
| ink | `#F4F1EA` | `--text`, high contrast headlines/logo |
| muted | `#A39E93` | `--muted`, supporting copy |
| faint | `#5C636C` | `--faint`, decorative/disabled only |
| line | `#2A2824` | `--line`, separators and chart grid |
| cta / brand | `#FF8A1F` | `--accent`, active links and progress |
| ctaInk | `#1A0C02` | `--on-accent`, text on light gradient |
| ice | `#B7C0CA` | `--ice`, neutral hardware highlights |
| ok | `#19D6C8` | `--secondary`, limited secondary data accents |

`arcUiTheme` also explicitly sets primary `#FF8A1F`, secondary `#19D6C8`,
surface `#101012`, onPrimary `#1A0C02`, and white onSurface in dark mode.
Website editorial text uses the warmer ArcColors ink.

For context, the supported app cream mode uses page `#FFF8F0`, shell `#FFF4E8`,
surface `#FFFFFF`, raised `#FFF0E0`, chip `#FFEBD8`, line ARGB `0xB3B7A98F`,
ink `#1A1814`, muted `#6F675C`, faint `#9A9184`, ice `#E8C1B5`, ok `#2F8F64`.
Brand/CTA and on-CTA are identical to dark mode. The cinematic website retains
its dark-only presentation.

## Gradients, borders, shadows and states

Source: `lib/theme_ctrl.dart`, `metalPanel`, `metalWell`, `metalPrimary`,
`PressScale`; `lib/widgets/arc_glass.dart`, `arcAccentGradient`,
`_glassGradient`, `ArcGlass`; `lib/widgets/arc_bottom_nav.dart`.

* Primary gradient: top-left to bottom-right, `#FFE3C4` at 0,
  `#FFB23A` at .45, `#FF8A1F` at 1. Website `--button-gradient`.
* Glass gradient: `#1A1A1E` at 0, `#0C0C0E` at .5, `#08080A` at 1.
  Website `--glass-gradient`.
* Panel gradient: raised to surface, implicit stops 0 and 1.
* Glass border: white .10 alpha; selected border orange .65 alpha.
  Glass glow orange .08, selected glow .16, shadow black .22;
  blur 16, offset (0,8). Metal panel shadow black .34 (glow .5),
  blur 20 (glow 30), offset (0,10), spread -4.
* Floating navigation: black .55 fill, white .10 border, black .45 shadow;
  inactive white .62, active gradient with `#1A0C02` icons/text.
  Accent shadow orange .30, blur 16, offset (0,6).
* App press response: opacity .88, scale .965. No separate official hover
  swatch exists. Website hover mixes orange 88% with peach; pressed mixes
  orange 88% with on-accent. These are documented adaptations, not app constants.

Website tokens are centralized in `app/brand.css`; `APP_ACCENT` in
`lib/constants/brand.ts` matches the inline root accent. Keep them synchronized.
`--chart` and `--progress` resolve to orange; teal is secondary, not a replacement
brand color. The chart in `lib/widgets/bklit_area_chart.dart` takes its colors
from callers rather than defining a universal chart palette. Website chart
and recovery illustrations are presentation mappings, not copied app data.

The continuous home field retains the original percentage stops
0/13/29/42/56/62/74/83/92/100. Its graphite and warm-black interpolation
colors and low-opacity orange light fields are website atmospheric adaptations.
They are painted once across Home, not separately on each scene. The final
29 October refinement increases the five broad orange fields to alpha
0x24 / 0x1A / 0x30 / 0x24 / 0x30, centered at 18% 5%, 32% 27%,
80% 43%, 42% 75%, and 72% 98%, respectively. About uses calmer 9% and 5%
orange fields. These changes affect atmosphere only, not product glow tokens.
About has one continuous dark page gradient and fixed looping orange line art.

## Typography and spacing

`lib/theme_ctrl.dart`: `arcDisplay`, `arcDarkTheme`, `arcCreamTheme` use
Space Grotesk, display weight 500, line height 1.05.
`lib/widgets/arc_experience.dart`: intro weight 600 / height 1.15,
eyebrow 12 / weight 700 / tracking 1.4, page inset 20, section spacing 28,
gap 12 and radius 24. Glass cards commonly use radii 22–24.
`lib/auth/onboarding_page.dart` uses Instrument Serif for editorial onboarding
moments; this is not the app's default UI face.

`pubspec.yaml` includes `assets/fonts/`; `assets/fonts/provenance.json`
records exact bundled Google Fonts binaries and SHA256 hashes.
The website copies the Space Grotesk files plus their SIL OFL license into
`public/fonts/` and serves them through next/font/local. Phone UI and logo
lettering use Space Grotesk. Existing large cinematic Geist typography remains.
Phone spacing and radii scale with device container units to preserve fit.

## Official logo

`lib/theme_ctrl.dart`, `ArcLogo`: dark mode selects
`assets/images/logo_white.png`, light selects `assets/images/logo.png`,
then applies ink with Flutter's srcIn blend. Both images are 483 × 517 RGBA.
`lib/home_page.dart` and `lib/you_page.dart` use this component.
Both variants are declared in `pubspec.yaml`.

Website copies (byte-identical):

| Website asset | App asset | SHA256 |
| --- | --- | --- |
| `public/brand/logo-white.png` | `assets/images/logo_white.png` | `5d002cf2f1df20b471bb79d667b8917826c5230e87a129a381732a4824dc1e9f` |
| `public/brand/logo-dark.png` | `assets/images/logo.png` | `2de44ee79e97cb32fb0d98ea1682bf1d82083c9c0730b6f49324dd5022a61552` |

`components/ui/BrandLogo.tsx` masks with the exact white PNG and fills with
ink, equivalent to the app tinting. Its ARC lettering is a Space Grotesk
typographic companion: the repository supplies no separate wordmark asset.
Use markOnly for decorative phone reflections. Use the full component in
navigation, hero, network, final reveal, walkthrough ending, About and footer.
Preserve its aspect ratio and clear space; do not draw a replacement symbol.

`app/icon.png` and `app/apple-icon.png` are resized source-asset derivatives.
`public/brand/og.png` uses the same source symbol on a warm dark field.
Rebuild these with `node scripts/build-brand-assets.mjs` (uses Next's installed
Sharp dependency). OG lettering is rasterized by the host SVG font renderer.
Canonical and social metadata use the approved origin `https://www.arclife.co.in`
from `app/layout.tsx`, with `/about` canonical metadata set on that route.

Native launch files were also inspected: Android's drawable launch background
still has the stock white layer/commented bitmap; iOS LaunchScreen references
LaunchImage on white. They do not establish an alternate orange splash asset.
Onboarding defines orange `#FF8A1F` with dark page `#0E0E10`, card `#17171A`,
line `#2A2A2E`, ink `#F5F5F6`, muted `#8B8B93`. Neither overrides the active
shell's official ArcLogo selection. No new website loading sequence was added.

## Product adaptation boundaries

Inspected `lib/home_page.dart`, `lib/train_page.dart`, `lib/eat_page.dart`
and its `lib/features/eat/eat_catalogue_page.dart`, `lib/recover_page.dart`
and `lib/features/recover/recover_foundation_page.dart`, `lib/rehab_sheet.dart`,
`lib/you_page.dart`, `lib/widgets/profile_surface.dart`, and shared visual helpers.
The current Eat route is a food catalogue with My Nutrition; Recover is a
discomfort/care workflow. The website retains its approved illustrative
nutrition/recovery/progress story instead of claiming a literal screen capture.

The phone uses the actual Home / Train / Eat / Recover / You destination labels,
corresponding outline icon concepts, pill selection, real palette, rounded
surfaces and UI font. Its four narrative modules and all ten exclusive screens
remain. Home is unselected while the training story plays; Train/Eat/Recover/You
follow the existing timeline. Sample metrics, plans and chart values remain
illustrative. The cinematic ArcLine geometry is storytelling art, never the logo.
