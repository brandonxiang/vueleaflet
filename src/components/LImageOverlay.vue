<script setup lang="ts">
import L, { type ImageOverlayOptions, type LatLngBoundsExpression } from 'leaflet';
import { type PropType, watch } from 'vue';
import { useLeafletLayer } from '../composables/useLeafletLayer';
import { toLatLngBounds } from '../utils/bounds';

const props = defineProps({
  url: {
    type: String,
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

const imageOverlayRef = useLeafletLayer(() => L.imageOverlay(props.url, props.bounds, props.options));

watch(
  () => props.url,
  (url) => {
    imageOverlayRef.value?.setUrl(url);
  }
);

watch(
  () => props.bounds,
  (bounds) => {
    imageOverlayRef.value?.setBounds(toLatLngBounds(bounds));
  },
  { deep: true }
);
</script>

<template></template>
