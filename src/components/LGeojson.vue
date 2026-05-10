<script setup lang="ts">
import L, { GeoJSONOptions } from 'leaflet';
import type { GeoJsonObject } from 'geojson';
import { PropType, useAttrs, watch } from 'vue';
import { useLeafletLayer } from '../composables/useLeafletLayer';
import { layerEvents } from '../utils/events';

const attrs = useAttrs();

const props = defineProps({
  geojson: {
    type: Object as PropType<GeoJsonObject>,
    required: true,
  },
  options: {
    type: Object as PropType<GeoJSONOptions>,
    required: false,
  },
});

const geojsonRef = useLeafletLayer(
  () => L.geoJSON(props.geojson, props.options),
  {
    attrs,
    events: layerEvents,
  }
);

watch(
  () => props.geojson,
  (geojson) => {
    geojsonRef.value?.clearLayers();
    geojsonRef.value?.addData(geojson);
  },
  { deep: true }
);
</script>

<template></template>
