
<script setup lang="ts">
import L, { type TileLayerOptions } from 'leaflet';
import { type PropType, inject, nextTick } from 'vue'
import type { MapProvide } from '../core/Map';



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
const mapProvide = inject<MapProvide>('mapProvide');


nextTick(() => {
    const tilelayer = L.tileLayer(props.urlTemplate, props.options)
    mapProvide?.getMap()?.addLayer(tilelayer);
})

</script>

<template>
</template>