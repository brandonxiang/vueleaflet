<script setup lang="ts">
import L, { type LatLngExpression, type MarkerOptions } from 'leaflet';
import {
  type PropType,
  computed,
  nextTick,
  onBeforeUnmount,
  provide,
  watch,
  inject,
  useAttrs,
} from 'vue';
import defaultIcon from 'leaflet/dist/images/marker-icon.png';
import defaultIconShadow from 'leaflet/dist/images/marker-shadow.png';
import defaultIconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import { markerProvide } from '../core/Marker';
import { MARK_PROVIDE, getMarkerInjectKey } from '../utils/injectKey';
import {
  LEAFLET_LAYER_PROVIDER,
  type LeafletLayerProvider,
} from '../core/Layer';
import { bindLeafletEventsFromAttrs } from '../composables/useLeafletEvents';
import { markerEvents } from '../utils/events';
import { updateMarkerOptions } from '../utils/layerOptions';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  latlng: {
    type: [Object, Array] as PropType<LatLngExpression>,
    required: false,
  },
  position: {
    type: [Object, Array] as PropType<LatLngExpression>,
    required: false,
  },
  options: {
    type: Object as PropType<MarkerOptions>,
    required: false,
  },
});

provide(MARK_PROVIDE, markerProvide);

const markerKey = getMarkerInjectKey(props.id);
const layerProvider = inject<LeafletLayerProvider | null>(
  LEAFLET_LAYER_PROVIDER,
  null
);
const attrs = useAttrs();
let marker: L.Marker | null = null;
let unbindEvents: (() => void) | undefined;

const markerLatLng = computed(() => props.latlng ?? props.position);

const createMarker = (latlng: LatLngExpression) => {
  if (marker) return;

  fixImageUrl();
  marker = L.marker(latlng, props.options);
  unbindEvents = bindLeafletEventsFromAttrs(marker, attrs, markerEvents);

  markerProvide.setMarker(markerKey, marker);
  layerProvider?.addLayer(marker);
};

nextTick(() => {
  const latlng = markerLatLng.value;
  if (latlng) {
    createMarker(latlng);
  }
});

watch(
  markerLatLng,
  (latlng) => {
    if (!latlng) return;

    if (marker) {
      marker.setLatLng(latlng);
      return;
    }

    createMarker(latlng);
  },
  { deep: true }
);

watch(
  () => props.options,
  (options) => {
    updateMarkerOptions(marker, options);
  },
  { deep: true }
);

onBeforeUnmount(() => {
  unbindEvents?.();
  if (marker) {
    layerProvider?.removeLayer(marker);
  }
  markerProvide.removeMarker(markerKey);
});

defineExpose({
  id: props.id,
  category: 'marker',
});

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
