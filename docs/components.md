# Component Reference

## Map

### `LMap`

| Prop      | Type         | Required | Description                            |
| --------- | ------------ | -------- | -------------------------------------- |
| `id`      | `string`     | Yes      | DOM id used to create the Leaflet map. |
| `options` | `MapOptions` | No       | Options passed to `L.map`.             |

Common events: `@click`, `@move`, `@moveend`, `@zoom`, `@zoomend`, `@layeradd`, `@layerremove`.

### `LPane`

| Prop        | Type            | Required | Description                               |
| ----------- | --------------- | -------- | ----------------------------------------- |
| `name`      | `string`        | Yes      | Pane name passed to `map.createPane`.     |
| `zIndex`    | `number`        | No       | Pane z-index.                             |
| `className` | `string`        | No       | Class name applied to the pane element.   |
| `style`     | `CSSProperties` | No       | Inline style applied to the pane element. |

## Layer Containers

### `LLayerGroup`

Wraps `L.layerGroup`. Child layers are added to this group instead of the map.

### `LFeatureGroup`

Wraps `L.featureGroup`. Use it when child layers should share events or bounds behavior.

## Raster Layers

### `LTilelayer` / `LTileLayer`

| Prop          | Type               | Required | Description                                                                |
| ------------- | ------------------ | -------- | -------------------------------------------------------------------------- |
| `urlTemplate` | `string`           | Yes      | Tile URL template.                                                         |
| `options`     | `TileLayerOptions` | No       | Options passed to `L.tileLayer`. `opacity` and `zIndex` update reactively. |

Common events: `@click`, `@add`, `@remove`, `@popupopen`, `@tooltipopen`.

### `LTileLayerWMS`

| Prop      | Type         | Required | Description                                                                   |
| --------- | ------------ | -------- | ----------------------------------------------------------------------------- |
| `baseUrl` | `string`     | Yes      | WMS service endpoint.                                                         |
| `options` | `WMSOptions` | No       | Options passed to `L.tileLayer.wms`; updates are applied through `setParams`. |

## Marker and Overlays

### `LMarker`

| Prop      | Type               | Required | Description                                                                                         |
| --------- | ------------------ | -------- | --------------------------------------------------------------------------------------------------- |
| `id`      | `string`           | Yes      | Marker id used by nested popup and tooltip components.                                              |
| `latlng`  | `LatLngExpression` | Yes      | Marker position.                                                                                    |
| `options` | `MarkerOptions`    | No       | Options passed to `L.marker`; `icon`, `opacity`, `zIndexOffset`, and `draggable` update reactively. |

Common events: `@click`, `@dragstart`, `@drag`, `@dragend`, `@move`, `@popupopen`, `@tooltipopen`.

### `LPopup`

| Prop      | Type               | Required | Description                                                                    |
| --------- | ------------------ | -------- | ------------------------------------------------------------------------------ |
| `latlng`  | `LatLngExpression` | No       | Standalone popup position. When omitted, the popup binds to the parent marker. |
| `options` | `PopupOptions`     | No       | Options passed to `L.popup`.                                                   |

### `LTooltip`

| Prop      | Type               | Required | Description                                                                        |
| --------- | ------------------ | -------- | ---------------------------------------------------------------------------------- |
| `latlng`  | `LatLngExpression` | No       | Standalone tooltip position. When omitted, the tooltip binds to the parent marker. |
| `options` | `TooltipOptions`   | No       | Options passed to `L.tooltip`.                                                     |

### `LImageOverlay`

| Prop      | Type                     | Required | Description                         |
| --------- | ------------------------ | -------- | ----------------------------------- |
| `url`     | `string`                 | Yes      | Image URL.                          |
| `bounds`  | `LatLngBoundsExpression` | Yes      | Image bounds.                       |
| `options` | `ImageOverlayOptions`    | No       | Options passed to `L.imageOverlay`. |

### `LVideoOverlay`

| Prop      | Type                     | Required  | Description                         |
| --------- | ------------------------ | --------- | ----------------------------------- | ------------------------------- |
| `url`     | `string                  | string[]` | Yes                                 | Video URL or fallback URL list. |
| `bounds`  | `LatLngBoundsExpression` | Yes       | Video bounds.                       |
| `options` | `VideoOverlayOptions`    | No        | Options passed to `L.videoOverlay`. |

### `LSVGOverlay`

| Prop      | Type                     | Required    | Description                       |
| --------- | ------------------------ | ----------- | --------------------------------- | ----------------------- |
| `svg`     | `string                  | SVGElement` | Yes                               | SVG content or element. |
| `bounds`  | `LatLngBoundsExpression` | Yes         | SVG bounds.                       |
| `options` | `ImageOverlayOptions`    | No          | Options passed to `L.svgOverlay`. |

Overlay events: `@click`, `@add`, `@remove`, `@popupopen`, `@tooltipopen`.

## Vector Layers

### `LCircle`

| Prop      | Type               | Required | Description                                                         |
| --------- | ------------------ | -------- | ------------------------------------------------------------------- |
| `latlng`  | `LatLngExpression` | Yes      | Circle center.                                                      |
| `options` | `CircleOptions`    | No       | Options passed to `L.circle`; style and `radius` update reactively. |

### `LCircleMarker`

| Prop      | Type                  | Required | Description                                                               |
| --------- | --------------------- | -------- | ------------------------------------------------------------------------- |
| `latlng`  | `LatLngExpression`    | Yes      | Circle marker center.                                                     |
| `options` | `CircleMarkerOptions` | No       | Options passed to `L.circleMarker`; style and `radius` update reactively. |

### `LPolygon`

| Prop      | Type                | Required             | Description                                              |
| --------- | ------------------- | -------------------- | -------------------------------------------------------- | --- | -------------------- |
| `latlngs` | `LatLngExpression[] | LatLngExpression[][] | LatLngExpression[][][]`                                  | Yes | Polygon coordinates. |
| `options` | `PolylineOptions`   | No                   | Options passed to `L.polygon`; style updates reactively. |

### `LPolyline`

| Prop      | Type                | Required              | Description                                               |
| --------- | ------------------- | --------------------- | --------------------------------------------------------- | --------------------- |
| `latlngs` | `LatLngExpression[] | LatLngExpression[][]` | Yes                                                       | Polyline coordinates. |
| `options` | `PolylineOptions`   | No                    | Options passed to `L.polyline`; style updates reactively. |

### `LRectangle`

| Prop           | Type                     | Required | Description                                                |
| -------------- | ------------------------ | -------- | ---------------------------------------------------------- |
| `latLngBounds` | `LatLngBoundsExpression` | Yes      | Rectangle bounds.                                          |
| `options`      | `PolylineOptions`        | No       | Options passed to `L.rectangle`; style updates reactively. |

### `LGeojson`

| Prop      | Type             | Required | Description                    |
| --------- | ---------------- | -------- | ------------------------------ |
| `geojson` | `GeoJsonObject`  | Yes      | GeoJSON data.                  |
| `options` | `GeoJSONOptions` | No       | Options passed to `L.geoJSON`. |

Vector events: `@click`, `@add`, `@remove`, `@popupopen`, `@tooltipopen`.

## Controls

### `LControl`

| Prop       | Type              | Required | Description                               |
| ---------- | ----------------- | -------- | ----------------------------------------- |
| `position` | `ControlPosition` | No       | Control position. Defaults to `topright`. |

Use the default slot for custom control content.

### Built-in Controls

| Component             | Leaflet API             | Options prop                 |
| --------------------- | ----------------------- | ---------------------------- |
| `LControlAttribution` | `L.control.attribution` | `Control.AttributionOptions` |
| `LControlLayers`      | `L.control.layers`      | `Control.LayersOptions`      |
| `LControlScale`       | `L.control.scale`       | `Control.ScaleOptions`       |
| `LControlZoom`        | `L.control.zoom`        | `Control.ZoomOptions`        |
