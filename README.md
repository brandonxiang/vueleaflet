# 🗺️ vueleaflet

<p align="center">
  <a href="https://github.com/brandonxiang/vueleaflet/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/brandonxiang/vueleaflet" alt="license">
  </a>
  <a href="https://npmjs.org/package/vueleaflet">
    <img src="https://img.shields.io/npm/v/vueleaflet.svg" alt="npm version">
  </a>
  <a href="https://npmjs.org/package/vueleaflet">
    <img src="https://img.shields.io/npm/dw/vueleaflet" alt="weekly downloads">
  </a>
  <a href="https://twitter.com/intent/follow?screen_name=xwpisme">
    <img src="https://img.shields.io/twitter/follow/xwpisme?style=social&logo=twitter" alt="follow on Twitter">
  </a>
</p>

**Vue 3 components for building Leaflet maps with a declarative component API.**

`vueleaflet` wraps common Leaflet map primitives as Vue components, so maps can be composed with familiar templates, props, slots, and events. It is inspired by [react-leaflet](https://github.com/PaulLeCam/react-leaflet) and [vue-google-maps](https://github.com/GuillaumeLeclerc/vue-google-maps).

## ✨ Highlights

- 🧩 **Declarative map composition** with Vue components.
- 🗂️ **Layer containers** via `LLayerGroup` and `LFeatureGroup`.
- 🛰️ **Raster and overlay support** for tile layers, WMS, image, video, and SVG overlays.
- 📍 **Marker, popup, tooltip, vector, and GeoJSON components** for common map workflows.
- 🎛️ **Built-in and custom controls** with Vue slot content.
- ⚡ **Vite Plus powered toolchain** with `vp` scripts for dev, build, and test.
- ✅ **Typed builds and unit tests** for safer library changes.

## 📦 Installation

```bash
npm install vueleaflet vue leaflet
```

Leaflet CSS is required in your app entry:

```ts
import 'leaflet/dist/leaflet.css';
```

## 🚀 Quick Start

```vue
<script setup lang="ts">
import { LMap, LTileLayer, LMarker, LPopup } from 'vueleaflet';
import 'leaflet/dist/leaflet.css';

const mapOptions = {
  center: [51.505, -0.09],
  zoom: 13,
};
</script>

<template>
  <LMap id="main-map" :options="mapOptions" style="height: 400px">
    <LTileLayer
      url-template="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      :options="{ attribution: '© OpenStreetMap contributors' }"
    />

    <LMarker id="london-marker" :latlng="[51.505, -0.09]">
      <LPopup :options="{ content: 'Hello from vueleaflet' }" />
    </LMarker>
  </LMap>
</template>
```

## 🧱 Component Coverage

| Category            | Components                                                                           |
| ------------------- | ------------------------------------------------------------------------------------ |
| 🗺️ Map              | `LMap`, `LPane`                                                                      |
| 🗂️ Layer containers | `LLayerGroup`, `LFeatureGroup`                                                       |
| 🧱 Raster layers    | `LTilelayer`, `LTileLayer`, `LTileLayerWMS`                                          |
| 📍 Marker/overlays  | `LMarker`, `LPopup`, `LTooltip`, `LImageOverlay`, `LVideoOverlay`, `LSVGOverlay`     |
| 📐 Vector layers    | `LCircle`, `LCircleMarker`, `LPolygon`, `LPolyline`, `LRectangle`, `LGeojson`        |
| 🎛️ Controls         | `LControl`, `LControlAttribution`, `LControlLayers`, `LControlScale`, `LControlZoom` |

See [docs/components.md](docs/components.md) for the full props and events reference.

## 🗂️ Layer Groups and Overlays

```vue
<template>
  <LMap id="overlay-map" :options="mapOptions" style="height: 400px">
    <LTileLayer
      url-template="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />

    <LLayerGroup>
      <LMarker id="group-marker" :latlng="[51.505, -0.09]" />
      <LCircle :latlng="[51.508, -0.11]" :options="{ radius: 500 }" />
    </LLayerGroup>

    <LImageOverlay
      url="https://leafletjs.com/examples/overlays/uqm_map_full.png"
      :bounds="[
        [51.49, -0.13],
        [51.52, -0.06],
      ]"
      :options="{ opacity: 0.35 }"
    />
  </LMap>
</template>
```

## 🎛️ Custom Controls

```vue
<template>
  <LMap id="control-map" :options="mapOptions" style="height: 400px">
    <LTileLayer
      url-template="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />

    <LControl position="topright">
      <button type="button">Reset view</button>
    </LControl>
  </LMap>
</template>
```

## 📚 Documentation

- 📘 [Component reference](docs/components.md)
- 🧭 [Leaflet component roadmap](docs/leaflet-component-roadmap.md)
- ✅ [Optimization todo](docs/todo.md)
- 🔌 [Plugin extension template](docs/plugin-extension.md)
- 🚢 [Release workflow](docs/release.md)

## 🛠️ Development

```bash
# install dependencies
pnpm install

# run the example app
pnpm dev

# run unit tests
pnpm test

# build the library
pnpm build

# build the example app
pnpm build:example

# verify distribution artifacts
pnpm check:dist
```

## 🤝 Contributing

Pull requests are welcome. For component changes, please include focused tests and update the relevant docs or examples.

## 📄 License

[MIT](LICENSE)
