<script setup lang="ts">
import L, { type ImageOverlayOptions, type LatLngBoundsExpression } from 'leaflet';
import { type PropType, watch } from 'vue';
import { useLeafletLayer } from '../composables/useLeafletLayer';
import { toLatLngBounds } from '../utils/bounds';

const props = defineProps({
  svg: {
    type: [String, Object] as PropType<string | SVGElement>,
    required: true,
  },
  bounds: {
    type: Object as PropType<LatLngBoundsExpression>,
    required: true,
  },
  options: {
    type: Object as PropType<ImageOverlayOptions>,
    required: false,
  },
});

const svgOverlayRef = useLeafletLayer(() => L.svgOverlay(props.svg, props.bounds, props.options));

watch(
  () => props.bounds,
  (bounds) => {
    svgOverlayRef.value?.setBounds(toLatLngBounds(bounds));
  },
  { deep: true }
);
</script>

<template></template>
