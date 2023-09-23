<script setup lang="ts">
import L, { LatLngExpression, PopupOptions } from 'leaflet'
import { PropType, inject, nextTick } from 'vue';
import { MarkerProvide } from '../core/Marker';
import { MapProvide } from '../core/Map';

const mapProvide = inject<MapProvide>('mapProvide');
const markerProvide = inject<MarkerProvide>('markerProvide');


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
    mapProvide?.getMap()?.addLayer(popup);
  } else {
    markerProvide?.getMarker()?.bindPopup(popup);
  }

});

</script>  
<template>
</template>