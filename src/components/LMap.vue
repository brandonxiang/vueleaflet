<script setup lang="ts">
import { PropType, onBeforeUnmount, onMounted, provide, shallowRef, useAttrs } from 'vue'
import { MapOptions } from 'leaflet';
import L from 'leaflet';
import { mapProvide } from '../core/Map';
import { MAP_PROVIDE, getMapInjectKey } from '../utils/injectKey';
import { createLeafletLayerProvider, LEAFLET_LAYER_PROVIDER } from '../core/Layer';
import { bindLeafletEventsFromAttrs } from '../composables/useLeafletEvents';
import { mapEvents } from '../utils/events';


const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  options: {
    type: Object as PropType<MapOptions>,
    required: false
  }
});

const key = getMapInjectKey(props.id);
const mapRef = shallowRef<L.Map | null>(null);
const layerProvider = createLeafletLayerProvider();
const attrs = useAttrs();
let unbindEvents: (() => void) | undefined;

provide(MAP_PROVIDE, mapProvide);
provide(LEAFLET_LAYER_PROVIDER, layerProvider);

onMounted(() => {
  const content  = L.map(props.id, props.options);
  mapRef.value = content;
  mapProvide.setMap(key, content);
  unbindEvents = bindLeafletEventsFromAttrs(content, attrs, mapEvents);
  layerProvider.setTarget(content);
})

onBeforeUnmount(() => {
  unbindEvents?.();
  mapRef.value?.remove();
  mapRef.value = null;
  layerProvider.clearTarget();
})

defineExpose({
  id: props.id,
  category: 'map'
})

</script>

<template>
  <div :id="props.id">
    <slot></slot>
  </div>
</template>
