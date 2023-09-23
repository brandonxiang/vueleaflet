<script setup lang="ts">
import L, { LatLngExpression, PopupOptions } from 'leaflet'
import { PropType, inject, nextTick } from 'vue';
import { MarkerProvide } from '../core/Marker';
import { MapProvide } from '../core/Map';
import { MAP_PROVIDE, MARK_PROVIDE, getMapInjectKey, getMarkerInjectKey } from '../utils/injectKey';



const mapProvide = inject<MapProvide>(MAP_PROVIDE);
const markerProvide = inject<MarkerProvide>(MARK_PROVIDE);

const mapKey = getMapInjectKey();
const markerKey = getMarkerInjectKey()


const props = defineProps({
  latlng: {
    type: Object as PropType<LatLngExpression>,
    required: false
  },
  options: {
        type: Object as PropType<PopupOptions>,
        required: false
    }
})

nextTick(() => {
  const popup = L.popup(props.options);
  if(props.latlng) {
    popup.setLatLng(props.latlng);
    mapProvide?.getMap(mapKey)?.addLayer(popup);
  } else {
    markerProvide?.getMarker(markerKey)?.bindPopup(popup);
  }

});

</script>  
<template>
</template>