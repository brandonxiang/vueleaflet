<script setup lang="ts">

import L, { type LatLngExpression, type MarkerOptions } from 'leaflet';
import { type PropType, nextTick, onBeforeUnmount, provide, watch, inject } from 'vue';
import defaultIcon from 'leaflet/dist/images/marker-icon.png'
import defaultIconShadow from 'leaflet/dist/images/marker-shadow.png';
import defaultIconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import { markerProvide } from '../core/Marker';
import { MARK_PROVIDE, getMarkerInjectKey } from '../utils/injectKey';
import { LEAFLET_LAYER_PROVIDER, type LeafletLayerProvider } from '../core/Layer';

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


provide(MARK_PROVIDE, markerProvide);

const markerKey = getMarkerInjectKey(props.id);
const layerProvider = inject<LeafletLayerProvider | null>(LEAFLET_LAYER_PROVIDER, null);
let marker: L.Marker | null = null;


nextTick(() => {
  fixImageUrl();
  marker = L.marker(props.latlng, props.options);

  markerProvide.setMarker(markerKey, marker);
  layerProvider?.addLayer(marker);
})

watch(
  () => props.latlng,
  (latlng) => {
    marker?.setLatLng(latlng);
  },
  { deep: true }
);

onBeforeUnmount(() => {
  if (marker) {
    layerProvider?.removeLayer(marker);
  }
});

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
