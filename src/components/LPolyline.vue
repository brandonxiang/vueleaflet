<script setup lang="ts">
import L, { PolylineOptions, LatLngExpression } from 'leaflet'
import { PropType, useAttrs, watch } from 'vue';
import { useLeafletLayer } from '../composables/useLeafletLayer';
import { layerEvents } from '../utils/events';

const attrs = useAttrs();

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

const polylineRef = useLeafletLayer(() => L.polyline(props.latlngs, props.options), {
  attrs,
  events: layerEvents,
});

watch(
  () => props.latlngs,
  (latlngs) => {
    polylineRef.value?.setLatLngs(latlngs);
  },
  { deep: true }
);

</script>  

<template>
</template>
