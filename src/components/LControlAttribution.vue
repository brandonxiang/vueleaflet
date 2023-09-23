<script setup lang="ts">
import L from 'leaflet'
import { PropType, inject, nextTick } from 'vue';
import { MapProvide } from '../core/Map';
import { MAP_PROVIDE, getMapInjectKey } from '../utils/injectKey';


const mapProvide = inject<MapProvide>(MAP_PROVIDE);

const key = getMapInjectKey();

const props = defineProps({
  options: {
    type: Object as PropType<L.Control.AttributionOptions>,
    required: false
  }
})

nextTick(() => {
  const attribution = L.control.attribution(props.options);
  mapProvide?.getMap(key)?.addControl(attribution);
})

</script>

<template></template>