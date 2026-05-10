<script setup lang="ts">
import L, { type LayerGroup, type LayerOptions } from 'leaflet';
import {
  type PropType,
  inject,
  nextTick,
  onBeforeUnmount,
  provide,
  shallowRef,
} from 'vue';
import {
  createLeafletLayerProvider,
  LEAFLET_LAYER_PROVIDER,
  type LeafletLayerProvider,
} from '../core/Layer';

const props = defineProps({
  options: {
    type: Object as PropType<LayerOptions>,
    required: false,
  },
});

const parentProvider = inject<LeafletLayerProvider | null>(
  LEAFLET_LAYER_PROVIDER,
  null
);
const groupProvider = createLeafletLayerProvider(parentProvider);
const layerGroupRef = shallowRef<LayerGroup | null>(null);

provide(LEAFLET_LAYER_PROVIDER, groupProvider);

nextTick(() => {
  const layerGroup = L.layerGroup(undefined, props.options);
  layerGroupRef.value = layerGroup;
  groupProvider.setTarget(layerGroup);
  parentProvider?.addLayer(layerGroup);
});

onBeforeUnmount(() => {
  if (layerGroupRef.value) {
    parentProvider?.removeLayer(layerGroupRef.value);
  }
  groupProvider.clearTarget();
});
</script>

<template>
  <slot></slot>
</template>
