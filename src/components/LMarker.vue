<script setup lang="ts">

import L, { type LatLngExpression, type MarkerOptions } from 'leaflet';
import { type PropType, inject, nextTick, onMounted, provide, ref, useAttrs, useSlots } from 'vue';
import { type MapProvide } from '../core/Map';
import defaultIcon from 'leaflet/dist/images/marker-icon.png'
import defaultIconShadow from 'leaflet/dist/images/marker-shadow.png';
import defaultIconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import { markerProvide } from '../core/Marker';

const events = [
  'click',
  'dblclick',
  'mousedown',
  'mouseover',
  'mouseout',
  'contextmenu',
  'dragstart',
  'drag',
  'dragend',
  'move',
  'add',
  'remove',
  'popupopen',
  'popupclose',
  'tooltipopen',
  'tooltipclose'
];


const props = defineProps({
  latlng: {
    type: Object as PropType<LatLngExpression>,
    required: true,
  },
  options: {
    type: Object as PropType<MarkerOptions>,
    required: false
  }
});
const mapProvide = inject<MapProvide>('mapProvide');

provide('markerProvide', markerProvide)


nextTick(() => {
  fixImageUrl();
  const marker = L.marker(props.latlng, props.options);
  markerProvide.setMarker(marker);
  mapProvide?.getMap()?.addLayer(marker);

})

function fixImageUrl() {
  //https://github.com/PaulLeCam/react-leaflet/issues/255#issuecomment-261904061
  // TODO: L.Icon
  //@ts-ignore
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: defaultIconRetina,
    iconUrl: defaultIcon,
    shadowUrl: defaultIconShadow,
  });
}
</script>

<template>
    <slot></slot>
</template>