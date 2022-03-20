<script setup lang="ts">
import { onMounted} from 'vue'
import { LatLngExpression } from 'leaflet';
import { provide } from 'vue'
import L from 'leaflet';
import { mapProvide, addMap, map } from '../core/Map';

// not support. reference to https://github.com/vuejs/core/issues/4294
// interface Props extends MapOptions {}

interface Props {
   center?: LatLngExpression | undefined;
   zoom?: number | undefined;
   minZoom?: number;
   maxZoom?: number;
   attributionControl?: boolean;
   zoomControl?: boolean; 
}

const props = defineProps< Props >();

provide('mapid', mapProvide)

onMounted(() => {
  const content  = L.map('mapid', props);
  addMap(content);
  console.log('1111111', content);
  console.log('222222', map.value);
})

</script>

<template>
  <div id="mapid">
    <slot></slot>
  </div>
</template>

<style scoped>

</style>
