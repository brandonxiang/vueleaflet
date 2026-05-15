# Repository Instructions

## Project

`vueleaflet` is a Vue 3 component library for Leaflet. Keep changes focused on the
component library, examples, tests, and documentation that support that goal.

## Tooling

This project uses Vite+ through the `vp` CLI.

- Install dependencies with `vp install`.
- Run tests with `vp test run` or `pnpm test`.
- Run the example app with `vp dev --config vite.example.config.ts`.
- Build the example with `vp build --config vite.example.config.ts`.
- Build the library with `pnpm build`.
- Verify distributable output with `pnpm check:dist`.
- Format with `pnpm format` and check formatting with `pnpm format:check`.

Prefer `vp` commands for Vite/Vitest workflows. Do not add direct Vitest, Oxlint,
Oxfmt, or tsdown dependencies unless the project intentionally changes toolchains.

## Development Notes

- Keep component APIs close to Leaflet's native options and event names.
- Preserve backwards-compatible exports such as `LTilelayer` while also supporting
  clearer aliases like `LTileLayer`.
- Add or update tests when changing component lifecycle, prop updates, event
  wiring, providers, or public exports.
- Keep examples and README snippets aligned with actual component names and props.
- Avoid committing generated `dist/` changes unless the task explicitly asks for
  release artifacts.

## Validation

Before pushing code changes, run the narrowest relevant checks plus the full
validation path when public APIs or build output change:

```bash
pnpm format:check
pnpm test
pnpm build:example
pnpm check:dist
```
