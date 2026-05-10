<script setup lang="ts">
import L, { CircleMarkerOptions, LatLngExpression } from 'leaflet'
import { PropType, useAttrs, watch } from 'vue';
import { useLeafletLayer } from '../composables/useLeafletLayer';
import { layerEvents } from '../utils/events';
import { updateCircleOptions } from '../utils/layerOptions';

const attrs = useAttrs();

const props = defineProps({
  latlng: {
    type: Object as PropType<LatLngExpression>,
    required: true
  },
  options: {
    type: Object as PropType<CircleMarkerOptions>,
    required: false
  }
})
const circleMarkerRef = useLeafletLayer(() => L.circleMarker(props.latlng, props.options), {
  attrs,
  events: layerEvents,
});

watch(
  () => props.latlng,
  (latlng) => {
    circleMarkerRef.value?.setLatLng(latlng);
  },
  { deep: true }
);

watch(
  () => props.options,
  (options) => {
    updateCircleOptions(circleMarkerRef.value, options);
  },
  { deep: true }
);

</script>  

<template></template>
