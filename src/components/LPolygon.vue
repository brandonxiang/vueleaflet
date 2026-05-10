<script setup lang="ts">
import L, { PolylineOptions, LatLngExpression } from 'leaflet'
import { PropType, watch } from 'vue';
import { useLeafletLayer } from '../composables/useLeafletLayer';

const props = defineProps({
  latlngs: {
    type: Object as PropType<LatLngExpression[] | LatLngExpression[][] | LatLngExpression[][][]>,
    required: true
  },
  options: {
    type: Object as PropType<PolylineOptions>,
    required: false
  }
})

const polygonRef = useLeafletLayer(() => L.polygon(props.latlngs, props.options));

watch(
  () => props.latlngs,
  (latlngs) => {
    polygonRef.value?.setLatLngs(latlngs);
  },
  { deep: true }
);

</script>  

<template></template>
