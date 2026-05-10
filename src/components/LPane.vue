<script setup lang="ts">
import { type CSSProperties, inject, nextTick, onBeforeUnmount, watch, type PropType } from 'vue';
import { type MapProvide } from '../core/Map';
import { MAP_PROVIDE, getMapInjectKey } from '../utils/injectKey';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  zIndex: {
    type: Number,
    required: false,
  },
  className: {
    type: String,
    required: false,
  },
  style: {
    type: Object as PropType<CSSProperties>,
    required: false,
  },
});

const mapProvide = inject<MapProvide>(MAP_PROVIDE);
const mapKey = getMapInjectKey();
let pane: HTMLElement | undefined;

const syncPane = () => {
  if (!pane) return;

  if (props.zIndex !== undefined) {
    pane.style.zIndex = String(props.zIndex);
  }

  if (props.className) {
    pane.className = props.className;
  }

  if (props.style) {
    Object.assign(pane.style, props.style);
  }
};

nextTick(() => {
  const map = mapProvide?.getMap(mapKey);
  pane = map?.createPane(props.name);
  syncPane();
});

watch(
  () => [props.zIndex, props.className, props.style],
  () => {
    syncPane();
  },
  { deep: true }
);

onBeforeUnmount(() => {
  pane?.remove();
  pane = undefined;
});
</script>

<template></template>
