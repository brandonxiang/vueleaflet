
<script setup lang="ts">
import L, { type TileLayerOptions } from 'leaflet';
import { type PropType, inject, nextTick } from 'vue'
import type { MapProvide } from '../core/Map';
import { MAP_PROVIDE, getMapInjectKey } from '../utils/injectKey';



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

const mapProvide = inject<MapProvide>(MAP_PROVIDE);

const key = getMapInjectKey()

nextTick(() => {
    const tilelayer = L.tileLayer(props.urlTemplate, props.options)
    const map = mapProvide?.getMap(key);
    map?.addLayer(tilelayer);
})





</script>

<template></template>