# Changelog

All notable changes to this project will be documented in this file.

## Unreleased

### Added

- Added Leaflet layer container support with `LLayerGroup` and `LFeatureGroup`.
- Added `LPane`, `LImageOverlay`, `LVideoOverlay`, `LSVGOverlay`, `LTileLayerWMS`, and `LControl`.
- Added the `LTileLayer` alias while keeping the existing `LTilelayer` export.
- Added Vue listener support for common Leaflet map, marker, layer, vector, and overlay events.
- Added component documentation in `docs/components.md` and optimization tracking in `docs/todo.md`.
- Added CI, Prettier formatting, and expanded unit coverage.

### Changed

- Existing layer components now use a shared add/remove lifecycle.
- Vector layer style, marker options, and tile layer display options now update reactively.
- `LGeojson` now accepts `GeoJsonObject` and refreshes data when props change.

### Fixed

- Map instances are removed when `LMap` unmounts.
- Child layers wait for their nearest layer container before being attached.
