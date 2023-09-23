<script setup lang="ts">

import L, { type LatLngExpression, type MarkerOptions } from 'leaflet';
import { type PropType, inject, nextTick, onMounted, provide, ref, useAttrs, useSlots } from 'vue';
import { type MapProvide } from '../core/Map';
import defaultIcon from 'leaflet/dist/images/marker-icon.png'
import defaultIconShadow from 'leaflet/dist/images/marker-shadow.png';
import defaultIconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import { markerProvide } from '../core/Marker';
import { MAP_PROVIDE, MARK_PROVIDE, getMapInjectKey, getMarkerInjectKey } from '../utils/injectKey';

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
  id: {
    type: String,
    required: true,
  },
  latlng: {
    type: Object as PropType<LatLngExpression>,
    required: true,
  },
  options: {
    type: Object as PropType<MarkerOptions>,
    required: false
  }
});


const mapProvide = inject<MapProvide>(MAP_PROVIDE);
provide(MARK_PROVIDE, markerProvide);

const markerKey = getMarkerInjectKey(props.id);
const mapKey = getMapInjectKey();


nextTick(() => {
  fixImageUrl();
  const marker = L.marker(props.latlng, props.options);

  markerProvide.setMarker(markerKey, marker);


  mapProvide?.getMap(mapKey)?.addLayer(marker);

})

defineExpose({
  id: props.id,
  category: 'marker'
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