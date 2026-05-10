<script setup lang="ts">
import L, { GeoJSONOptions } from 'leaflet';
import type { GeoJsonObject } from 'geojson';
import { PropType, useAttrs, watch } from 'vue';
import { useLeafletLayer } from '../composables/useLeafletLayer';
import { layerEvents } from '../utils/events';
import {
  createTrackedGeoJsonOptions,
  syncGeoJsonFeatures,
} from '../utils/geojson';

const attrs = useAttrs();
const featureLayers = new Map();

const props = defineProps({
  geojson: {
    type: Object as PropType<GeoJsonObject>,
    required: true,
  },
  options: {
    type: Object as PropType<GeoJSONOptions>,
    required: false,
  },
  featureIdKey: {
    type: String,
    required: false,
    default: 'id',
  },
});

const geojsonRef = useLeafletLayer(
  () => {
    const geojsonLayer = L.geoJSON(undefined, {
      ...props.options,
      ...createTrackedGeoJsonOptions(
        featureLayers,
        props.featureIdKey,
        props.options?.onEachFeature
      ),
    });
    syncGeoJsonFeatures(
      geojsonLayer,
      props.geojson,
      featureLayers,
      props.featureIdKey
    );
    return geojsonLayer;
  },
  {
    attrs,
    events: layerEvents,
  }
);

watch(
  () => props.geojson,
  (geojson) => {
    syncGeoJsonFeatures(
      geojsonRef.value,
      geojson,
      featureLayers,
      props.featureIdKey
    );
  },
  { deep: true }
);
</script>

<template></template>
