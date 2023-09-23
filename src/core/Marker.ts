

import type { Marker, Layer, Popup, Tooltip, Control } from 'leaflet';
import { ref } from 'vue';


const marker = ref<Record<string, Marker>>({});

const getMarker = (key: string) => {
  if(marker.value[key]) {
    return marker.value[key];
  }
  return null;
}

const setMarker = (key: string, content: Marker) => {
  marker.value[key] = content
}


export const markerProvide = {
  marker, 
  getMarker,
  setMarker  
}

export type MarkerProvide = typeof markerProvide
