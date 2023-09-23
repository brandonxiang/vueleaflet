<script setup lang="ts">
import L, { PolylineOptions, LatLngExpression } from 'leaflet'
import { PropType, inject, nextTick } from 'vue';
import { MapProvide } from '../core/Map';
import { MAP_PROVIDE, getMapInjectKey } from '../utils/injectKey';


const mapProvide = inject<MapProvide>(MAP_PROVIDE);

const key = getMapInjectKey();

const props = defineProps({
  latlngs: {
    type: Object as PropType<LatLngExpression[] | LatLngExpression[][]>,
    required: true
  },
  options: {
        type: Object as PropType<PolylineOptions>,
        required: false
    }
})

nextTick(() => {
  const polygon = L.polyline(props.latlngs, props.options);

  mapProvide?.getMap(key)?.addLayer(polygon);
})

</script>  

<template>
</template>