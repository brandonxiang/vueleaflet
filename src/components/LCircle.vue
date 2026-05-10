<script setup lang="ts">
import L, { CircleOptions, LatLngExpression } from 'leaflet'
import { PropType, watch } from 'vue';
import { useLeafletLayer } from '../composables/useLeafletLayer';

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
const circleRef = useLeafletLayer(() => L.circle(props.latlng, props.options ?? {}));

watch(
  () => props.latlng,
  (latlng) => {
    circleRef.value?.setLatLng(latlng);
  },
  { deep: true }
);

</script>  

<template></template>
