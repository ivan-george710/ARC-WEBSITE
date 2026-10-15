# ARC — Built around change

A cinematic, static Next.js brand experience for ARC. See [ARC_WEBSITE_HANDOFF.md](./ARC_WEBSITE_HANDOFF.md) for architecture, scene descriptions, accessibility, assets, and outstanding launch details.

## Local development

```sh
npm install
npm run dev
```

Open http://localhost:3000. On Windows PowerShell systems that block npm.ps1, use `npm.cmd` in place of `npm`.

```sh
npm run lint
npm run typecheck
npm run build
```

The production build also creates a static export in `out/`. No backend, environment variables, or account setup is required.
