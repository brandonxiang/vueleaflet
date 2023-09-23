<script setup lang="ts">
import L from 'leaflet'
import { PropType, inject, nextTick } from 'vue';
import { MapProvide } from '../core/Map';
import { MAP_PROVIDE, getMapInjectKey } from '../utils/injectKey';


const mapProvide = inject<MapProvide>(MAP_PROVIDE);

const key = getMapInjectKey();

const props = defineProps({
  options: {
    type: Object as PropType<L.Control.ZoomOptions>,
    required: false
  }
})

nextTick(() => {
  const zoom = L.control.zoom(props.options);
  mapProvide?.getMap(key)?.addControl(zoom);
})

</script>  

<template></template>