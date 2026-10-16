# ARC cinematic intro - production handoff

Created 16 October 2026. Dedicated brand film, isolated in `video/arc-intro/`. The Home and About experiences are not used as footage and were not redesigned for this task.

## Deliverables

In `video/arc-intro/deliverables/`:

- `ARC_CINEMATIC_INTRO_MASTER.mov`: 1920x1080, 16:9, 30fps, 60 seconds, ProRes 422 HQ / 10-bit YUV, PCM stereo. High-quality intermediate, rendered from PNG frames.
- `ARC_CINEMATIC_INTRO_MASTER.mp4`: 1920x1080, 30fps, H.264 CRF 15 / slow preset, AAC 320kbps, fast-start. Encoded from the ProRes master.
- `ARC_CINEMATIC_INTRO_PREVIEW.mp4`: 1280x720, 30fps, H.264 CRF 23 / slow preset, AAC 192kbps, fast-start. Sharing copy encoded from the same master.
- `ARC_CINEMATIC_INTRO_POSTER.png`: full-resolution ARC product hero frame.
- `ARC_CINEMATIC_SOURCE.zip`: editable project, captured assets, font/license, audio stems and production notes. Dependencies and render caches are excluded.
- `audio/`: restrained sound-design stem with transition air passes removed, unchanged licensed music edit and mastered final mix, 48kHz / stereo / 24-bit WAV.
- `media-report.json` and `SHA256SUMS.txt`: technical validation and delivery checksums.

The draft MP4 and contact sheets are review artifacts, not the final delivery copies.

## Concept and direction

**Life moves. The system should move with it.** A near-black opening and a partial ARC curve establish the identity, then moving circumstances collide with a motionless plan. ARC arrives as a physical product object. A tighter adaptation montage proves the proposition. The film slows for day 200, opens outward into the wellness network, then resolves into ARC.

The established graphite / black / steel palette, near-white Geist type, ARC blue **#5B8BEF**, thin line geometry and restrained focus/travel language are preserved. The film uses directed cuts, readable holds, time compression and subtle changes in camera framing. It contains no website navigation, browser chrome, cursor, stock people, generated footage, cards, removed 3D body or founder identities.

## Edit / timing

| Time | Picture | Sonic intent |
| --- | --- | --- |
| 00:00-00:06 | Darkness; partial ARC line; EVERY BODY HAS AN ARC emerging word by word; brief ARC glimpse | Almost-silence, low atmospheric texture, sparse drawn-line tone, cut accent |
| 00:06-00:14 | Static-plan proposition; WORK / TRAVEL / TIME / INJURY / EQUIPMENT / GOALS pass physically through frame; life-change statements | Low pressure accents; no movement or air-pass cues |
| 00:14-00:20 | First ARC phone hero and BUILT AROUND CHANGE | Warm tonal swell and slow low pulse |
| 00:20-00:36 | 60 MIN / GYM; meeting / 10 MIN; travel / HOTEL-HOME; shoulder / pressing paused; muscle-building goal becomes a 10K weekly plan | UI confirmations and understated transitions synchronized with the app responses |
| 00:36-00:43 | PERSONALIZATION ISN'T KNOWING YOU ON DAY ONE; IT'S STILL KNOWING YOU ON DAY 200 | Density drops; quiet sustained space; day-200 accent |
| 00:43-00:47 | TRAIN / NOURISH / RECOVER / PROGRESS, one second each | Measured pulse and four distinct confirmations |
| 00:47-00:51 | Seven separated wellness nodes converge on ARC; THE APP IS THE INTERFACE / ARC IS THE SYSTEM | Convergence accents and restrained rise |
| 00:51-01:00 | Dark reset; final traveling ARC line; FIND YOUR ARC; change copy; ARC lockup; fade to black | Clean final low impact, long decay and silence |

Picture edits and sound cues are also recorded in `music-timing-map.json` and `public/audio/sound-cues.json`.

## Source assets and provenance

The project was inspected before composition. `public/assets/provenance.json` records reference paths, SHA-256 hashes and exported assets.

- Logo: the existing ARC typographic wordmark and blue period, rendered with the repository's Geist variable font.
- Typography: `public/fonts/Geist-Variable.ttf`; its OFL license is copied into the video assets.
- ARC curves: the exact rise/wave cubic geometry from `components/ui/ArcLine.tsx`, recomposed and drawn deterministically for film.
- Phone and app UI: `DeviceFrame`, `PhoneShell`, `WalkthroughScreen` and the existing rigid-plan `PhoneScreen` concept. `scripts/prepare-assets.mjs` renders the components alone and captures the frame and isolated content at 2x. It does not visit or record the website.
- A consistent physical phone/chrome sits outside the changing app viewport. App content exits completely before incoming content becomes visible; the intentional clear gap prevents stale layered screens. Film navigation gets a blue module indicator.
- Body: the exact existing `BodyAvatar` 72x120 SVG and shoulder mapping. No duplicate tiny avatar is added inside the recovery phone screen.
- Network: the same seven categories and radial connection language from `VisionScene`, reblocked into the 16:9 film composition.
- Background: the website's dark surface, restrained blue energy and subtle grain treatment. No image-generation service or external stock asset was needed.

The existing phone UI and 2D body are illustrative website concepts. The repository does not contain a supplied production-app body asset; the film preserves the existing reference rather than claiming otherwise.

## Music and sound design

The approved film now uses **Machina by Scott Buckley**, a dark electronic ambient instrumental. Its restrained synth texture supports the technological identity without vocals or a heroic orchestral treatment. The 60-second audio edit has a sparse opening, a controlled montage build, a quieter 36-43-second passage, and a final rise and fade. No picture was rendered or re-encoded for this update.

### Music license / provenance

- Track: **Machina**; creator: **Scott Buckley**.
- Official source: https://www.scottbuckley.com.au/library/machina/
- Official download: http://www.scottbuckley.com.au/library/wp-content/uploads/2019/12/sb_machina.mp3 (HTTPS equivalent is linked on the source page; HTTP download used because the server returned 406 to HTTPS downloads in this environment).
- Exact license: **Creative Commons Attribution 4.0 International (CC BY 4.0)**, https://creativecommons.org/licenses/by/4.0/ ; legal code: https://creativecommons.org/licenses/by/4.0/legalcode.en
- Commercial use: explicitly permitted by the creator with attribution, including this brand film. Audio adaptation is permitted. This is licensed copyrighted music, not public-domain music or a commissioned original.
- Attribution: **required**. Put the following credit in the public video description or alongside the embedded film. For YouTube, the creator specifically requires the video description. Delivery metadata and the supplied sidecar preserve credits but are not a substitute for public attribution on platforms that strip them.

> 'Machina' by Scott Buckley - released under CC-BY 4.0. www.scottbuckley.com.au
> Source: https://www.scottbuckley.com.au/library/machina/
> License: https://creativecommons.org/licenses/by/4.0/
> Edited, crossfaded, EQ, level automation and mixed with ARC sound design.

- Date accessed: **16 October 2026**.
- Creator terms: https://www.scottbuckley.com.au/library/using-this-music/ . Do not register the music/mix in audio fingerprinting or Content ID services, or distribute it as your own standalone recording. Uses unable to provide attribution need a separate paid license; none was purchased or represented here.
- Evidence: `music/track.html`, `usage.html`, `license.html`, `legalcode.html`, `sources.json`, original `sb_machina.mp3`, and `MUSIC_CREDITS.txt`. Local snapshots and source checksums preserve the reviewed evidence. The source ZIP includes these production inputs with attribution for maintaining the synchronized film.

### Stems and mix

- `ARC_SOUND_DESIGN_STEM.wav`: restrained 60-second procedural stem. Removed **20** cues (14 air transitions and 6 circumstance movement sounds); all **60** retained cue parameters and times are unchanged. Low impacts, UI confirmations, slow/system pulses, atmospheric low texture and ARC line tonal swells remain. The samples outside removed cue windows are exactly unchanged. New SHA-256: `d805a21ba629dc7a3b33abf8d7a6aec8043066e5a52b052f7d118627631375b0`. The pre-cleanup stem/hash are retained only for QA comparison in `qa/audio-cleanup/`; they are not the current delivery.
- `ARC_MUSIC_STEM.wav`: genuine licensed music, 60 seconds / 48kHz / stereo / 24-bit. **Byte-identical through the cleanup pass**, SHA-256: `624ae73e6582737a733fbcbc8c31e7e328fd7a18a6d7872b203d48fe17ebd7b0`. Source intervals, smooth crossfades and level envelopes are reproducible in `scripts/fit-licensed-score.py`, with an edit map in `qa/audio-score/music-edit.json`.
- `ARC_FINAL_MIX.wav`: music plus the cleaned sound design. SFX is raised 5dB in the mix; light sidechain compression ducks music around cues. Music has a 45Hz high-pass and a modest 240Hz cut; opening, Day 200 and ending use level automation. Final fade reaches digital zero without a hard cut.
- Measured final mix: **-15.90 LUFS integrated / -1.80 dBTP**, zero clipped samples. Music alone is -17.95 LUFS / -4.74 dBTP. These measured results supersede the nominal -18 LUFS normalization target.
- The old silent input is retained only as an unused historical fallback; it is not part of the current mix.

For an audio-only update from the approved exports:

```powershell
cd "video/arc-intro"
node scripts/mix-audio.mjs
node scripts/score-approved-film.mjs apply qa/audio-cleanup/cleanup-reference.json
```

The second command checks the approved video-packet hashes, stages all three outputs, copies each existing video stream unchanged, encodes only audio, verifies full decode / 1800 frames / 60-second duration, then replaces the delivery files. It refuses an unexpected picture or SFX hash. Do not run Remotion rendering to replace audio in an already approved picture.

## Editable project and rendering

Runtime dependencies are isolated in `video/arc-intro/package.json` and its lockfile: React/React DOM 19.2.0 and matching Remotion / CLI / bundler / renderer **4.0.535**. No video dependencies were added to the website manifest. The website TypeScript/ESLint configs exclude the separate video project; it has its own strict typecheck. Generated caches, deliverables and audio renders are ignored by Git but present in the workspace/delivery archive.

Requires Node 22 (the version tested in this workspace), Python with NumPy for regenerating sound design, FFmpeg/ffprobe on PATH and a compatible Chromium browser. The renderer defaults to installed Edge on Windows; override `ARC_RENDER_BROWSER` for another executable. Asset recapture additionally uses an available Playwright installation (`PLAYWRIGHT_MODULE` if it is not locally resolvable). Existing exported assets are included, so ordinary renders do not require asset recapture. The source archive also includes a frozen `references/website` snapshot of the UI components, styles and font; standalone asset recapture falls back to that snapshot. Set `ARC_WEBSITE_ROOT` to select a different website checkout.

```powershell
cd "video/arc-intro"
npm.cmd ci
npm.cmd run audio
npm.cmd run typecheck
npm.cmd run stills
npm.cmd run draft
npm.cmd run render
```

`npm.cmd run studio` opens the editable timeline. Seven named `Sequence` chapters use the `EDIT` timing table. All visual motion derives from frame number, with fourth-power reveals, smooth exits and restrained travel/focus. There are no timeouts, scrolling dependencies or nondeterministic animation clocks in the film. Rendering uses an isolated port (3110), so the existing website development server can remain running. PNG render frames feed a ProRes HQ intermediate; FFmpeg encodes both MP4 delivery copies from that intermediate. Renderer/format references: [Remotion compositions](https://www.remotion.dev/docs/composition), [custom browser executable](https://www.remotion.dev/docs/options/browser-executable).

## How to edit

- Copy and shot layout: `src/index.tsx`, grouped into `Opening`, `Problem`, `Arrival`, `Adaptation`, `Core`, `System`, `Network` and `Final` components. Keep major statements readable and sparse.
- Timing: `EDIT` defines chapter boundaries; per-shot relative timings control circumstances, app reactions and body/goal reveals. Update the audio cue map when moving editorial beats.
- Look: `src/style.css` plus the BLUE/WHITE/STEEL constants. Keep ARC blue and Geist.
- Product screens: edit the website component if the actual product UI changes, then run `npm.cmd run assets` with Playwright available. `public/assets/geometry.json` describes the captured phone and content viewport. The physical frame is kept separate from app screens.
- Audio: `node scripts/mix-audio.mjs` rebuilds the mix while preserving the music stem. `npm.cmd run audio` regenerates the restrained SFX and remixes using that same music file. `scripts/fit-licensed-score.py` is historical score-edit reproducibility and intentionally rewrites music; do not run it for a preservation-only polish pass.

## Vertical / social versions

A finished portrait export is not part of this delivery. The project preserves independent text, phone, ARC line, body and network layers. `FORMATS.portrait` defines 1080x1920 / 30fps for a later composition. Duplicate the root composition, reblock each chapter for portrait (headline above phone; body supporting below/behind; narrower network; stacked ending), and preserve the 60-second audio timeline. Do not center-crop the 16:9 master: the master intentionally uses the full cinematic width. Render the portrait composition separately. Short cutdowns can reuse the named sequences and sound-cue sources.

## Quality review and practical limits

The complete draft was decoded, reviewed across its full timeline at half-second intervals, and checked at full-resolution keyframes. App transitions are exclusive, shoulder/travel/goal screens own their content, the body appears only in its intended shot, and no site navigation or browser chrome is present. The final delivery is checked for 1800 CFR frames, full decode, matching audio, end-black and encoding metadata; machine-readable results are in `media-report.json`.

The licensed score is now supplied. The existing website body/UI concepts can be replaced if production app assets later become available. No external contact details, founder identities or stock footage were introduced. No website publishing or deployment was performed.

Audio update validation: all three outputs decode fully, preserve the exact original encoded video-packet hashes, contain 1800 frames at 30fps, last exactly 60 seconds and include 48kHz stereo audio. No picture quality settings or visual assets changed. Current cleanup proof, WAV/encoded audio metrics and playback logs are in `qa/audio-cleanup/`; earlier scoring evidence is in `qa/audio-score/`; `deliverables/media-report.json` contains the updated technical report. The original poster remains unchanged. No replacement transition effects were added. The removed noises no longer drive music ducking; remaining cues use the same existing mix chain.

Listening limitation: real-time full exported MP4 playback was run using FFplay, and signal analysis verifies music, sound-design contribution, non-silence and clipping headroom. The agent cannot perceive the computer's speaker/headphone output. Therefore subjective listening on laptop, phone and headphones is **not signed off**; playback/stream checks must not be represented as a human listening review.
