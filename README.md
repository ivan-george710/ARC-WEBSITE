# ARC — Built around change

A cinematic, static Next.js brand experience for ARC. The six-part story includes a 16-second automatic app walkthrough, a shared 2D body avatar, and the wellness network. See [ARC_WEBSITE_HANDOFF.md](./ARC_WEBSITE_HANDOFF.md) for architecture, playback behavior, accessibility, assets, and outstanding launch details.

## Local development

```sh
npm install
npm run dev
```

Open http://localhost:3000. On Windows PowerShell systems that block npm.ps1, use `npm.cmd` in place of `npm`.

```sh
npm run lint
npm run typecheck
npm test
npm run build
```

The production build also creates a static export in `out/`. No backend, environment variables, or account setup is required.
