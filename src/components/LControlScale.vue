<script setup lang="ts">
import L from 'leaflet'
import { PropType, inject, nextTick } from 'vue';
import { MapProvide } from '../core/Map';
import { MAP_PROVIDE, getMapInjectKey } from '../utils/injectKey';


const mapProvide = inject<MapProvide>(MAP_PROVIDE);

const key = getMapInjectKey();

const props = defineProps({
  options: {
    type: Object as PropType<L.Control.ScaleOptions>,
    required: false
  }
})

nextTick(() => {
  const scale = L.control.scale(props.options);
  mapProvide?.getMap(key)?.addControl(scale);
})

</script>

<template></template>