
<script setup lang="ts">
import L, { type TileLayerOptions } from 'leaflet';
import { type PropType, useAttrs, watch } from 'vue'
import { useLeafletLayer } from '../composables/useLeafletLayer';
import { layerEvents } from '../utils/events';

const attrs = useAttrs();


const props = defineProps({
    urlTemplate: {
        type: String,
        required: true,
    },
    options: {
        type: Object as PropType<TileLayerOptions>,
        required: false
    }
});

const tileLayerRef = useLeafletLayer(() => L.tileLayer(props.urlTemplate, props.options), {
    attrs,
    events: layerEvents,
});

watch(
    () => props.urlTemplate,
    (urlTemplate) => {
        tileLayerRef.value?.setUrl(urlTemplate);
    }
);


</script>

<template></template>
