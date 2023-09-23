<script setup lang="ts">
import L, { PolylineOptions, LatLngExpression, LatLngBoundsExpression } from 'leaflet'
import { PropType, inject, nextTick } from 'vue';
import { MapProvide } from '../core/Map';
import { MAP_PROVIDE, getMapInjectKey } from '../utils/injectKey';


const mapProvide = inject<MapProvide>(MAP_PROVIDE);

const key = getMapInjectKey();

const props = defineProps({
  latLngBounds: {
    type: Object as PropType<LatLngBoundsExpression>,
    required: true
  },
  options: {
    type: Object as PropType<PolylineOptions>,
    required: false
  }
})

nextTick(() => {
  const polygon = L.rectangle(props.latLngBounds, props.options);

  mapProvide?.getMap(key)?.addLayer(polygon);
})

</script>  

<template></template>