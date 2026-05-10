<script setup lang="ts">
import L from 'leaflet';
import { PropType } from 'vue';
import { useLeafletControl } from '../composables/useLeafletControl';

const props = defineProps({
  baseLayers: {
    type: Object as PropType<L.Control.LayersObject>,
    required: false,
  },
  overlays: {
    type: Object as PropType<L.Control.LayersObject>,
    required: false,
  },
  options: {
    type: Object as PropType<L.Control.LayersOptions>,
    required: false,
  },
});

useLeafletControl(() =>
  L.control.layers(props.baseLayers, props.overlays, props.options)
);
</script>

<template></template>
