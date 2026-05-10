<script setup lang="ts">
import L, { type WMSOptions, type WMSParams } from 'leaflet';
import { type PropType, useAttrs, watch } from 'vue';
import { useLeafletLayer } from '../composables/useLeafletLayer';
import { layerEvents } from '../utils/events';

const attrs = useAttrs();

const props = defineProps({
  baseUrl: {
    type: String,
    required: true,
  },
  options: {
    type: Object as PropType<WMSOptions>,
    required: false,
  },
});

const wmsLayerRef = useLeafletLayer(
  () => L.tileLayer.wms(props.baseUrl, props.options),
  {
    attrs,
    events: layerEvents,
  }
);

watch(
  () => props.baseUrl,
  (baseUrl) => {
    wmsLayerRef.value?.setUrl(baseUrl);
  }
);

watch(
  () => props.options,
  (options) => {
    if (options) {
      wmsLayerRef.value?.setParams(options as WMSParams, false);
    }
  },
  { deep: true }
);
</script>

<template></template>
