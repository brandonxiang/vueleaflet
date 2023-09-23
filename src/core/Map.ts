import type { Map, Layer, Popup, Tooltip, Control } from 'leaflet';
import { ref } from 'vue';


const map = ref<Map | null>(null);

const getMap = () => {
  return map.value;
}

const setMap = ( content: Map ) => {
  map.value = content
} 

// export const removeMap = () =>  map.value = null

// export const addControl = (control: Control) => map.value?.addControl(control);

// export const removeControl = (control: Control) => map.value?.removeControl(control);

// export const addLayer = (layer: Layer) => map.value?.addLayer(layer)

// export const hasLayer = (layer: Layer) => map.value?.hasLayer(layer);

// export const removeLayer = (layer: Layer) => map.value?.removeLayer(layer);

// export const openPopup = (popup: Popup) => map.value?.openPopup(popup);

// export const closePopup = (popup: Popup) => map.value?.closePopup(popup);

// export const openTooltip = (tooltip: Tooltip) => map.value?.openTooltip(tooltip);

// export const closeTooltip = (tooltip: Tooltip) => map.value?.closeTooltip(tooltip);

// export const addEvent = (p:{ event: string, func: any }) => map.value?.on(p.event, p.func);

// export const removeEvent = (p:{ event: string, func: any }) => map.value?.off(p.event, p.func);

// export const locate = (options?: L.LocateOptions | undefined) => map.value?.locate(options);

export const mapProvide = {
    map,
    getMap,
    setMap,
    // removeMap,
    // addControl,
    // removeControl,
    // addLayer,
    // hasLayer,
    // removeLayer,
    // openPopup,
    // closePopup,
    // openTooltip,
    // closeTooltip,
    // addEvent,
    // removeEvent,
    // locate,
  }


export type MapProvide = typeof mapProvide
