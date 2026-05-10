# vue-leaflet

<p align="center">
    <a href="https://github.com/brandonxiang/vueleaflet/blob/master/LICENSE">
      <img src="https://img.shields.io/github/license/brandonxiang/vueleaflet" alt="license">
    </a>
    <a href="https://npmjs.org/package/vueleaflet" alt="npm version">
        <img src="https://img.shields.io/npm/v/vueleaflet.svg" />
    </a>
        <a href="https://npmjs.org/package/vueleaflet" alt="npm version">
        <img src="https://img.shields.io/npm/dw/vueleaflet" />
    </a>
    <a href="https://twitter.com/intent/follow?screen_name=xwpisme">
        <img src="https://img.shields.io/twitter/follow/xwpisme?style=social&logo=twitter"
            alt="follow on Twitter">
    </a>
</p>

Here is Vue components for Leaflet maps, which is inspired by [react-leaflet](https://github.com/PaulLeCam/react-leaflet) and [vue-google-maps](https://github.com/GuillaumeLeclerc/vue-google-maps).

> A vue component for leaflet.js

This library is compatible with vue 3.0, and leaflet 1.9.x.

## Components

| Category | Components |
| --- | --- |
| Map | `LMap`, `LPane` |
| Layer containers | `LLayerGroup`, `LFeatureGroup` |
| Raster layers | `LTilelayer`, `LTileLayer`, `LTileLayerWMS` |
| Marker and overlays | `LMarker`, `LPopup`, `LTooltip`, `LImageOverlay`, `LVideoOverlay`, `LSVGOverlay` |
| Vector layers | `LCircle`, `LCircleMarker`, `LPolygon`, `LPolyline`, `LRectangle`, `LGeojson` |
| Controls | `LControl`, `LControlAttribution`, `LControlLayers`, `LControlScale`, `LControlZoom` |

See [docs/components.md](docs/components.md) for props and events.

## Installation

```bash
npm install vueleaflet vue leaflet -save
```

## Startup

You can input some Vue-styled components in a .vue file in order to use leaflet.js, like [Layout.vue](src/Layout.vue).

```html
<l-map
  id="map1"
  :options="{
    zoom: 13,
    center: { lat: 51.505, lng: -0.09 },
    minZoom: 8,
    maxZoom: 15,
    attributionControl: true,
    zoomControl: true
  }"
>
  <l-tilelayer
    urlTemplate="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
    :options="{
        attribution: 'vue-leaflet',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoieHdwaXNtZSIsImEiOiJ5cTlCQTlRIn0.QdV-wNUKbgs7jAlbVE747Q'
      }"
  />
  <l-marker
    :latlng="{ lat: 51.505, lng: -0.09 }"
    :options="{
      title: 'marker1',
      opacity: 1,
      draggable: true
    }"
  >
    <l-tooltip :options="{ content: 'tooltip with marker1' }" />
  </l-marker>
  <l-marker
    :latlng="{ lat: 51.505, lng: -0.11 }"
    :options="{
      title: 'marker2'
    }"
  >
    <l-popup :options="{ content: 'popup with marker2' }" />
  </l-marker>
  <l-tooltip
    :options="{ content: 'tooltip standalone' }"
    :latlng="{ lat: 51.505, lng: 0 }"
  />
  <l-popup
    :options="{ content: 'popup standalone' }"
    :latlng="{ lat: 51.505, lng: 0 }"
  />
  <l-circle
    :latlng="[51.508, -0.11]"
    :options="{
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 500
    }"
  />
  <l-polygon
    :latlng="[
      [51.509, -0.08],
      [51.503, -0.06],
      [51.51, -0.047]
    ]"
  />
</l-map>
```

### Layer group and overlays

```html
<l-map id="map2" :options="mapOptions">
  <l-tile-layer urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

  <l-layer-group>
    <l-marker id="group-marker" :latlng="[51.505, -0.09]" />
    <l-circle :latlng="[51.508, -0.11]" :options="{ radius: 500 }" />
  </l-layer-group>

  <l-image-overlay
    url="https://leafletjs.com/examples/overlays/uqm_map_full.png"
    :bounds="[
      [51.49, -0.13],
      [51.52, -0.06]
    ]"
  />
</l-map>
```

### Custom control

```html
<l-map id="map3" :options="mapOptions">
  <l-tile-layer urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

  <l-control position="topright">
    <button type="button">Reset view</button>
  </l-control>
</l-map>
```

## Build Setup

```bash
# serve the example
npm run dev

# run unit tests
npm run test

# build the library
npm run build

# build the example
npm run build: example

```

## Contribute

PR Welcome

## License

[MIT](LICENSE)
