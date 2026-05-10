import { describe, expect, it } from 'vitest';
import type { Marker } from 'leaflet';
import { markerProvide } from './Marker';

describe('markerProvide', () => {
  it('returns null when a marker has not been registered', () => {
    expect(markerProvide.getMarker('marker-missing')).toBeNull();
  });

  it('stores and returns markers by key', () => {
    const marker = { id: 'leaflet-marker' } as unknown as Marker;

    markerProvide.setMarker('marker-main', marker);

    expect(markerProvide.getMarker('marker-main')).toEqual(marker);
    expect(markerProvide.marker.value['marker-main']).toEqual(marker);
  });
});
