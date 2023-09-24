<script setup lang="ts">
import L, { GeoJSONOptions } from 'leaflet'

import { PropType, inject, nextTick } from 'vue';
import { MapProvide } from '../core/Map';
import { MAP_PROVIDE, getMapInjectKey } from '../utils/injectKey';


const mapProvide = inject<MapProvide>(MAP_PROVIDE);

const key = getMapInjectKey();

const props = defineProps({
  geojson: {
    // GeojsonObject type error
    type: Object as PropType<any>,
    required: true
  },
  options: {
    type: Object as PropType<GeoJSONOptions>,
    required: false
  }
})

nextTick(() => {
  const geojson = L.geoJSON(props.geojson, props.options);
  mapProvide?.getMap(key)?.addLayer(geojson);
})

</script>  

<template></template>