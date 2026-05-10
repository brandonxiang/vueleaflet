<script setup lang="ts">
import L, { type ControlPosition } from 'leaflet';
import { h, onBeforeUnmount, render, shallowRef, type PropType } from 'vue';
import { useLeafletControl } from '../composables/useLeafletControl';

const props = defineProps({
  position: {
    type: String as PropType<ControlPosition>,
    required: false,
    default: 'topright',
  },
});

const slots = defineSlots<{
  default?: () => unknown;
}>();

const containerRef = shallowRef<HTMLElement | null>(null);

useLeafletControl(() => {
  const CustomControl = L.Control.extend({
    onAdd() {
      const container = L.DomUtil.create('div', 'vueleaflet-control');
      containerRef.value = container;
      L.DomEvent.disableClickPropagation(container);
      L.DomEvent.disableScrollPropagation(container);

      if (slots.default) {
        render(h('div', undefined, slots.default() as any), container);
      }

      return container;
    },
    onRemove() {
      if (containerRef.value) {
        render(null, containerRef.value);
        containerRef.value = null;
      }
    },
  });

  return new CustomControl({ position: props.position });
});

onBeforeUnmount(() => {
  if (containerRef.value) {
    render(null, containerRef.value);
  }
});
</script>

<template></template>
