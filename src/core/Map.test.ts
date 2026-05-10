import { describe, expect, it } from 'vitest';
import type { Map } from 'leaflet';
import { mapProvide } from './Map';

describe('mapProvide', () => {
  it('returns null when a map has not been registered', () => {
    expect(mapProvide.getMap('map-missing')).toBeNull();
  });

  it('stores and returns maps by key', () => {
    const map = { id: 'leaflet-map' } as unknown as Map;

    mapProvide.setMap('map-main', map);

    expect(mapProvide.getMap('map-main')).toEqual(map);
    expect(mapProvide.map.value['map-main']).toEqual(map);
  });
});
