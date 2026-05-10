<script setup lang="ts">
import L, { type LatLngBoundsExpression, type VideoOverlayOptions } from 'leaflet';
import { type PropType, useAttrs, watch } from 'vue';
import { useLeafletLayer } from '../composables/useLeafletLayer';
import { toLatLngBounds } from '../utils/bounds';
import { layerEvents } from '../utils/events';

const attrs = useAttrs();

const props = defineProps({
  url: {
    type: [String, Array] as PropType<string | string[]>,
    required: true,
  },
  bounds: {
    type: Object as PropType<LatLngBoundsExpression>,
    required: true,
  },
  options: {
    type: Object as PropType<VideoOverlayOptions>,
    required: false,
  },
});

const videoOverlayRef = useLeafletLayer(() => L.videoOverlay(props.url, props.bounds, props.options), {
  attrs,
  events: layerEvents,
});

watch(
  () => props.bounds,
  (bounds) => {
    videoOverlayRef.value?.setBounds(toLatLngBounds(bounds));
  },
  { deep: true }
);
</script>

<template></template>
