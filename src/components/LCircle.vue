<script setup lang="ts">
import L, { CircleOptions, LatLngExpression } from 'leaflet'
import { PropType, inject, nextTick } from 'vue';
import { MapProvide } from '../core/Map';

const mapProvide = inject<MapProvide>('mapProvide');


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
  mapProvide?.getMap()?.addLayer(circle);
})

</script>  

<template>
</template>