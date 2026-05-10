<script setup lang="ts">
import L, { CircleOptions, LatLngExpression } from 'leaflet'
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

watch(
  () => props.options,
  (options) => {
    updateCircleOptions(circleRef.value, options);
  },
  { deep: true }
);

</script>  

<template></template>
