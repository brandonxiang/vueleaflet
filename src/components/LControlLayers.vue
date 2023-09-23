<script setup lang="ts">
import L from 'leaflet'
import { PropType, inject, nextTick } from 'vue';
import { MapProvide } from '../core/Map';
import { MAP_PROVIDE, getMapInjectKey } from '../utils/injectKey';


const mapProvide = inject<MapProvide>(MAP_PROVIDE);

const key = getMapInjectKey();

const props = defineProps({
  baseLayers: {
    type: Object as PropType<L.Control.LayersObject>,
    required: false
  },
  overlays: {
    type: Object as PropType<L.Control.LayersObject>,
    required: false
  },
  options: {
    type: Object as PropType<L.Control.LayersOptions>,
    required: false
  }
})

nextTick(() => {
  const layers = L.control.layers(props.baseLayers, props.overlays, props.options);
  mapProvide?.getMap(key)?.addControl(layers);
})

</script>

<template></template>