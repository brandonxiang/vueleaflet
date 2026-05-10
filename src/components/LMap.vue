<script setup lang="ts">
import { PropType, onBeforeUnmount, onMounted, provide, shallowRef } from 'vue'
import { MapOptions } from 'leaflet';
import L from 'leaflet';
import { mapProvide } from '../core/Map';
import { MAP_PROVIDE, getMapInjectKey } from '../utils/injectKey';
import { createLeafletLayerProvider, LEAFLET_LAYER_PROVIDER } from '../core/Layer';


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

provide(MAP_PROVIDE, mapProvide);
provide(LEAFLET_LAYER_PROVIDER, layerProvider);

onMounted(() => {
  const content  = L.map(props.id, props.options);
  mapRef.value = content;
  mapProvide.setMap(key, content);
  layerProvider.setTarget(content);
})

onBeforeUnmount(() => {
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
