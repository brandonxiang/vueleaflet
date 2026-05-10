
<script setup lang="ts">
import L, { type TileLayerOptions } from 'leaflet';
import { type PropType, watch } from 'vue'
import { useLeafletLayer } from '../composables/useLeafletLayer';



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

const tileLayerRef = useLeafletLayer(() => L.tileLayer(props.urlTemplate, props.options));

watch(
    () => props.urlTemplate,
    (urlTemplate) => {
        tileLayerRef.value?.setUrl(urlTemplate);
    }
);


</script>

<template></template>
