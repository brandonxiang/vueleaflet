import { describe, expect, it, vi } from 'vitest';
import type { GeoJSON as LeafletGeoJSON, Layer } from 'leaflet';
import { createTrackedGeoJsonOptions, syncGeoJsonFeatures } from './geojson';

const createFeature = (id: string) => ({
  type: 'Feature' as const,
  id,
  properties: {},
  geometry: {
    type: 'Point' as const,
    coordinates: [0, 0],
  },
});

describe('geojson feature sync', () => {
  it('tracks feature layers through onEachFeature', () => {
    const featureLayers = new Map<string | number, Layer>();
    const layer = {} as Layer;
    const onEachFeature = vi.fn();
    const options = createTrackedGeoJsonOptions(
      featureLayers,
      'id',
      onEachFeature
    );
    const feature = createFeature('a');

    options.onEachFeature(feature, layer);

    expect(featureLayers.get('a')).toBe(layer);
    expect(onEachFeature).toHaveBeenCalledWith(feature, layer);
  });

  it('adds and removes FeatureCollection members by id', () => {
    const oldLayer = {} as Layer;
    const featureLayers = new Map<string | number, Layer>([['old', oldLayer]]);
    const layer = {
      clearLayers: vi.fn(),
      addData: vi.fn(),
      removeLayer: vi.fn(),
    } as unknown as LeafletGeoJSON;
    const geojson = {
      type: 'FeatureCollection' as const,
      features: [createFeature('next')],
    };

    syncGeoJsonFeatures(layer, geojson, featureLayers, 'id');

    expect(layer.removeLayer).toHaveBeenCalledWith(oldLayer);
    expect(layer.addData).toHaveBeenCalledWith(geojson.features[0]);
    expect(layer.clearLayers).not.toHaveBeenCalled();
  });

  it('falls back to full refresh when feature ids are missing', () => {
    const featureLayers = new Map<string | number, Layer>();
    const layer = {
      clearLayers: vi.fn(),
      addData: vi.fn(),
      removeLayer: vi.fn(),
    } as unknown as LeafletGeoJSON;
    const geojson = {
      type: 'FeatureCollection' as const,
      features: [
        {
          type: 'Feature' as const,
          properties: {},
          geometry: {
            type: 'Point' as const,
            coordinates: [0, 0],
          },
        },
      ],
    };

    syncGeoJsonFeatures(layer, geojson, featureLayers, 'id');

    expect(layer.clearLayers).toHaveBeenCalled();
    expect(layer.addData).toHaveBeenCalledWith(geojson);
  });
});
