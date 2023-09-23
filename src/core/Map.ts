import type { Map } from 'leaflet';
import { ref } from 'vue';


const map = ref<Record<string, Map>>({});

const getMap = (key: string) => {
  if(map.value[key]) {
    return map.value[key];
  }
  return null;
}

const setMap = ( key: string, content: Map ) => {
  map.value[key] = content
} 


export const mapProvide = {
    map,
    getMap,
    setMap,
}

export type MapProvide = typeof mapProvide
