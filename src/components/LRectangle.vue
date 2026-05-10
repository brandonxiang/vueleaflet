<script setup lang="ts">
import L, { PolylineOptions, LatLngExpression, LatLngBoundsExpression } from 'leaflet'
import { PropType, watch } from 'vue';
import { useLeafletLayer } from '../composables/useLeafletLayer';

const props = defineProps({
  latLngBounds: {
    type: Object as PropType<LatLngBoundsExpression>,
    required: true
  },
  options: {
    type: Object as PropType<PolylineOptions>,
    required: false
  }
})

const rectangleRef = useLeafletLayer(() => L.rectangle(props.latLngBounds, props.options));

watch(
  () => props.latLngBounds,
  (latLngBounds) => {
    rectangleRef.value?.setBounds(latLngBounds);
  },
  { deep: true }
);

</script>  

<template></template>
