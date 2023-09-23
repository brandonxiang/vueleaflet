<script setup lang="ts">
import { PropType, onMounted } from 'vue'
import { MapOptions } from 'leaflet';
import { provide } from 'vue'
import L from 'leaflet';
import { mapProvide } from '../core/Map';
import { MAP_PROVIDE, getMapInjectKey } from '../utils/injectKey';


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

provide(MAP_PROVIDE, mapProvide)

const key = getMapInjectKey(props.id);

onMounted(() => {
  console.log(props.id);
  const content  = L.map(props.id, props.options);
  mapProvide.setMap(key, content);
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
