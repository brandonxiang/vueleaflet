<script setup lang="ts">
import L, { CircleOptions, LatLngExpression } from 'leaflet'
import { PropType, useAttrs, watch } from 'vue';
import { useLeafletLayer } from '../composables/useLeafletLayer';
import { layerEvents } from '../utils/events';

const attrs = useAttrs();

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
const circleRef = useLeafletLayer(() => L.circle(props.latlng, props.options ?? {}), {
  attrs,
  events: layerEvents,
});

watch(
  () => props.latlng,
  (latlng) => {
    circleRef.value?.setLatLng(latlng);
  },
  { deep: true }
);

</script>  

<template></template>
