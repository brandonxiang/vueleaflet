<script setup lang="ts">
import { PropType, onMounted } from 'vue'
import { MapOptions } from 'leaflet';
import { provide } from 'vue'
import L from 'leaflet';
import { mapProvide } from '../core/Map';


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

provide('mapProvide', mapProvide)

onMounted(() => {
  const content  = L.map(props.id, props.options);
  mapProvide.setMap(content);
})

</script>

<template>
  <div :id="props.id">
    <slot></slot>
  </div>
</template>
