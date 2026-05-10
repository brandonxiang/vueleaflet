import type { Feature, FeatureCollection, GeoJsonObject } from 'geojson';
import type { GeoJSON as LeafletGeoJSON, Layer } from 'leaflet';

type FeatureLayerMap = Map<string | number, Layer>;

const isFeatureCollection = (
  geojson: GeoJsonObject
): geojson is FeatureCollection => {
  return geojson.type === 'FeatureCollection';
};

const getFeatureId = (feature: Feature, featureIdKey: string) => {
  const propertyId = feature.properties?.[featureIdKey];

  if (typeof feature.id === 'string' || typeof feature.id === 'number') {
    return feature.id;
  }

  if (typeof propertyId === 'string' || typeof propertyId === 'number') {
    return propertyId;
  }

  return null;
};

export const createTrackedGeoJsonOptions = (
  featureLayers: FeatureLayerMap,
  featureIdKey: string,
  onEachFeature?: (feature: Feature, layer: Layer) => void
) => {
  return {
    onEachFeature(feature: Feature, layer: Layer) {
      const featureId = getFeatureId(feature, featureIdKey);
      if (featureId !== null) {
        featureLayers.set(featureId, layer);
      }

      onEachFeature?.(feature, layer);
    },
  };
};

export const syncGeoJsonFeatures = (
  layer: LeafletGeoJSON | null,
  geojson: GeoJsonObject,
  featureLayers: FeatureLayerMap,
  featureIdKey: string
) => {
  if (!layer) return;

  if (!isFeatureCollection(geojson)) {
    featureLayers.clear();
    layer.clearLayers();
    layer.addData(geojson);
    return;
  }

  const nextFeatures = new Map<string | number, Feature>();
  let canSyncById = true;

  geojson.features.forEach((feature) => {
    const featureId = getFeatureId(feature, featureIdKey);
    if (featureId === null) {
      canSyncById = false;
      return;
    }

    nextFeatures.set(featureId, feature);
  });

  if (!canSyncById) {
    featureLayers.clear();
    layer.clearLayers();
    layer.addData(geojson);
    return;
  }

  featureLayers.forEach((featureLayer, featureId) => {
    if (!nextFeatures.has(featureId)) {
      layer.removeLayer(featureLayer);
      featureLayers.delete(featureId);
    }
  });

  nextFeatures.forEach((feature, featureId) => {
    const currentLayer = featureLayers.get(featureId);
    if (currentLayer) {
      layer.removeLayer(currentLayer);
      featureLayers.delete(featureId);
    }

    layer.addData(feature);
  });
};
