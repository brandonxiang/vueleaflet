<script setup lang="ts">
import L, { CircleMarkerOptions, LatLngExpression } from 'leaflet'
import { PropType, watch } from 'vue';
import { useLeafletLayer } from '../composables/useLeafletLayer';

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
const circleMarkerRef = useLeafletLayer(() => L.circleMarker(props.latlng, props.options));

watch(
  () => props.latlng,
  (latlng) => {
    circleMarkerRef.value?.setLatLng(latlng);
  },
  { deep: true }
);

</script>  

<template></template>
