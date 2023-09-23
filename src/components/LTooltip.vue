<script setup lang="ts">
import L, { LatLng, LatLngExpression, type TooltipOptions } from 'leaflet';

import { type PropType, onMounted, nextTick, useAttrs, useSlots, inject } from "vue";
import { type MarkerProvide } from '../core/Marker';
import { type MapProvide } from '../core/Map';

const events = [
  'add',
  'remove',
  'popupopen',
  'popupclose',
  'tooltipopen',
  'tooltipclose',
];

const mapProvide = inject<MapProvide>('mapProvide');
const markerProvide = inject<MarkerProvide>('markerProvide');


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
    mapProvide?.getMap()?.addLayer(tooltip);
  } else {
    markerProvide?.getMarker()?.bindTooltip(tooltip);
  }

})

</script>

<template>
</template>