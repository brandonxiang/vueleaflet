import L, {
  type LatLngBounds,
  type LatLngBoundsExpression,
  type LatLngExpression,
} from 'leaflet';

export const toLatLngBounds = (
  bounds: LatLngBoundsExpression
): LatLngBounds => {
  if ('extend' in bounds) {
    return bounds;
  }

  return L.latLngBounds(bounds as LatLngExpression[]);
};
