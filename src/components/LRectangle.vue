<script setup lang="ts">
import L, { PolylineOptions, LatLngExpression, LatLngBoundsExpression } from 'leaflet'
import { PropType, useAttrs, watch } from 'vue';
import { useLeafletLayer } from '../composables/useLeafletLayer';
import { layerEvents } from '../utils/events';

const attrs = useAttrs();

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

const rectangleRef = useLeafletLayer(() => L.rectangle(props.latLngBounds, props.options), {
  attrs,
  events: layerEvents,
});

watch(
  () => props.latLngBounds,
  (latLngBounds) => {
    rectangleRef.value?.setBounds(latLngBounds);
  },
  { deep: true }
);

</script>  

<template></template>
