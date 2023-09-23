<script setup lang="ts">
import L, { CircleOptions, LatLngExpression } from 'leaflet'
import { PropType, inject, nextTick, useAttrs, useSlots } from 'vue';
import { MapProvide } from '../core/Map';
import { MAP_PROVIDE, getMapInjectKey } from '../utils/injectKey';


const mapProvide = inject<MapProvide>(MAP_PROVIDE);

const key = getMapInjectKey();

const props = defineProps({
  latlng: {
    type: Object as PropType<LatLngExpression>,
    required: true
  },
  options: {
    type: Object as PropType<CircleOptions>,
    required: false
  }
})



nextTick(() => {
  const circle = L.circle(props.latlng, props.options);
  mapProvide?.getMap(key)?.addLayer(circle);
})

</script>  

<template></template>