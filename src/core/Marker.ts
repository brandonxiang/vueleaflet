

import type { Marker, Layer, Popup, Tooltip, Control } from 'leaflet';
import { ref } from 'vue';


const marker = ref<Marker | null>(null);

const getMarker = () => {
  return marker.value;
}

const setMarker = (content: Marker) => {
  marker.value = content
}


export const markerProvide = {
  marker, 
  getMarker,
  setMarker  
}

export type MarkerProvide = typeof markerProvide
