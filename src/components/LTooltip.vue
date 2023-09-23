<script setup lang="ts">
import L, { LatLng, LatLngExpression, type TooltipOptions } from 'leaflet';

import { type PropType, onMounted, nextTick, useAttrs, useSlots, inject } from "vue";
import { type MarkerProvide } from '../core/Marker';
import { type MapProvide } from '../core/Map';
import { MAP_PROVIDE, MARK_PROVIDE, getMapInjectKey, getMarkerInjectKey } from '../utils/injectKey';

const events = [
  'add',
  'remove',
  'popupopen',
  'popupclose',
  'tooltipopen',
  'tooltipclose',
];


const mapProvide = inject<MapProvide>(MAP_PROVIDE);
const markerProvide = inject<MarkerProvide>(MARK_PROVIDE);

const mapKey = getMapInjectKey();
const markerKey = getMarkerInjectKey();

const props = defineProps({
  latlng: {
    type: Object as PropType<LatLngExpression>,
    required: false
  },
  options: {
        type: Object as PropType<TooltipOptions>,
        required: false
    }
})


nextTick(() => {
  const tooltip = L.tooltip(props.options)
  if(props.latlng) {
    tooltip.setLatLng(props.latlng);
    mapProvide?.getMap(mapKey)?.addLayer(tooltip);
  } else {
    markerProvide?.getMarker(markerKey)?.bindTooltip(tooltip);
  }

})

</script>

<template>
</template>