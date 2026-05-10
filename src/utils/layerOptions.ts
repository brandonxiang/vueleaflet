import type {
  Circle,
  CircleMarker,
  CircleOptions,
  Marker,
  MarkerOptions,
  Path,
  PathOptions,
  TileLayer,
  TileLayerOptions,
} from 'leaflet';

export const updatePathOptions = <TLayer extends Path>(
  layer: TLayer | null,
  options?: PathOptions
) => {
  if (layer && options) {
    layer.setStyle(options);
  }
};

export const updateCircleOptions = (
  layer: Circle | CircleMarker | null,
  options?: CircleOptions
) => {
  updatePathOptions(layer, options);

  if (layer && options?.radius !== undefined && 'setRadius' in layer) {
    layer.setRadius(options.radius);
  }
};

export const updateMarkerOptions = (
  marker: Marker | null,
  options?: MarkerOptions
) => {
  if (!marker || !options) return;

  if (options.icon) {
    marker.setIcon(options.icon);
  }

  if (options.opacity !== undefined) {
    marker.setOpacity(options.opacity);
  }

  if (options.zIndexOffset !== undefined) {
    marker.setZIndexOffset(options.zIndexOffset);
  }

  if (options.draggable !== undefined && marker.dragging) {
    if (options.draggable) {
      marker.dragging.enable();
    } else {
      marker.dragging.disable();
    }
  }
};

export const updateTileLayerOptions = (
  tileLayer: TileLayer | null,
  options?: TileLayerOptions
) => {
  if (!tileLayer || !options) return;

  if (options.opacity !== undefined) {
    tileLayer.setOpacity(options.opacity);
  }

  if (options.zIndex !== undefined) {
    tileLayer.setZIndex(options.zIndex);
  }
};
