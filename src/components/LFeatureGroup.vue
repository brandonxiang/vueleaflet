<script setup lang="ts">
import L, { type FeatureGroup, type LayerOptions } from 'leaflet';
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
const featureGroupProvider = createLeafletLayerProvider(parentProvider);
const featureGroupRef = shallowRef<FeatureGroup | null>(null);

provide(LEAFLET_LAYER_PROVIDER, featureGroupProvider);

nextTick(() => {
  const featureGroup = L.featureGroup(undefined, props.options);
  featureGroupRef.value = featureGroup;
  featureGroupProvider.setTarget(featureGroup);
  parentProvider?.addLayer(featureGroup);
});

onBeforeUnmount(() => {
  if (featureGroupRef.value) {
    parentProvider?.removeLayer(featureGroupRef.value);
  }
  featureGroupProvider.clearTarget();
});
</script>

<template>
  <slot></slot>
</template>
