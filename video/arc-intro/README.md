# ARC cinematic intro

Editable, deterministic Remotion brand film, isolated from the website. See the repository-root `ARC_VIDEO_HANDOFF.md` for full production notes.

```powershell
npm.cmd ci
npm.cmd run audio
npm.cmd run typecheck
npm.cmd run stills
npm.cmd run draft
npm.cmd run render
```

`npm.cmd run render` produces the ProRes HQ MOV, full-HD H.264 master and 720p sharing preview. Rendering uses the installed Edge browser by default; override `ARC_RENDER_BROWSER` for another Chromium executable. FFmpeg must be on PATH. Asset recapture additionally needs an available Playwright installation (`PLAYWRIGHT_MODULE` if not locally resolvable); captured assets are already included.

`npm.cmd run studio` opens the editable seven-chapter timeline. All motion is frame-based. `src/index.tsx` owns the edit, copy, app transitions, physical phone, graph and ARC line. `src/style.css` owns the look. Existing app screens are captured at 2x by `scripts/prepare-assets.mjs`; they are never a recording of the live website.

Current soundtrack: Scott Buckley's **Machina**, licensed under CC BY 4.0, edited and mixed with ARC's restrained sound design (20 transition air/movement cues removed). Read `music/MUSIC_CREDITS.txt` and include its public attribution when publishing. Source audio and license evidence are in `music/`.

For audio-only updates of the approved movie (no visual render):

```powershell
node scripts/mix-audio.mjs
node scripts/score-approved-film.mjs apply qa/audio-cleanup/cleanup-reference.json
```

`public/audio` contains the cleaned SFX, real licensed music stem and final 24-bit mix. The historical silent fallback is unused. Full details, measured validation, and the subjective-listening limitation are in `ARC_VIDEO_HANDOFF.md`.

The master is designed at 1920x1080 / 30fps / 60 seconds. `FORMATS.portrait` records the 1080x1920 target; reframe the independent chapter components into a new portrait composition rather than cropping the master. A finished vertical export is not included.
