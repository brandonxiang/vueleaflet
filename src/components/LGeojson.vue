<script setup lang="ts">
import L, { GeoJSONOptions } from 'leaflet'
import type { GeoJsonObject } from 'geojson';
import { PropType, watch } from 'vue';
import { useLeafletLayer } from '../composables/useLeafletLayer';

const props = defineProps({
  geojson: {
    type: Object as PropType<GeoJsonObject>,
    required: true
  },
  options: {
    type: Object as PropType<GeoJSONOptions>,
    required: false
  }
})

const geojsonRef = useLeafletLayer(() => L.geoJSON(props.geojson, props.options));

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
