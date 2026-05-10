# LGridLayer Evaluation

## Decision

Do not add `LGridLayer` in the current implementation batch.

## Why

`LGridLayer` is useful for custom tile rendering, but its main value comes from overriding `createTile`. A Vue component wrapper would need to expose either:

- a render callback that creates tile DOM nodes, or
- a subclass factory that users pass into the component.

Both APIs are more complex than current `vueleaflet` components, and they need browser-level examples to prove tile lifecycle behavior.

## Recommended path

1. Finish standard layer/event/update behavior first.
2. Add one documented plugin wrapper using `docs/plugin-extension.md`.
3. Design `LGridLayer` as a separate feature with:
   - `tileSize`, `opacity`, `zIndex`, and pane options;
   - a `createTile` prop or slot-driven tile renderer;
   - tests for tile creation and cleanup;
   - a real example that renders custom tile content.

## Acceptance criteria for future implementation

- [ ] Users can provide custom tile rendering logic.
- [ ] Tile creation and cleanup are tested.
- [ ] Example demonstrates custom tile content.
- [ ] API does not require users to subclass Leaflet manually.
