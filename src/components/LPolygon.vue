<script setup lang="ts">
import L, { PolylineOptions, LatLngExpression } from 'leaflet'
import { PropType, inject, nextTick } from 'vue';
import { MapProvide } from '../core/Map';

const mapProvide = inject<MapProvide>('mapProvide');


const props = defineProps({
  latlng: {
    type: Object as PropType<LatLngExpression[] | LatLngExpression[][] | LatLngExpression[][][]>,
    required: true
  },
  options: {
        type: Object as PropType<PolylineOptions>,
        required: false
    }
})

nextTick(() => {
  const polygon = L.polygon(props.latlng, props.options);
  mapProvide?.getMap()?.addLayer(polygon);
})

</script>  

<template>
</template>