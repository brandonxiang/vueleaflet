<script setup lang="ts">
import L from 'leaflet';
import { PropType } from 'vue';
import { useLeafletControl } from '../composables/useLeafletControl';

const props = defineProps({
  options: {
    type: Object as PropType<L.Control.AttributionOptions>,
    required: false,
  },
});

useLeafletControl(() => L.control.attribution(props.options));
</script>

<template></template>
