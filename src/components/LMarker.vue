<script setup lang="ts">

import L, { LatLngExpression } from 'leaflet';
import { inject, nextTick, onMounted, ref, useAttrs, useSlots } from 'vue';
import { MapProvide } from '../core/Map';
import defaultIcon from 'leaflet/dist/images/marker-icon.png'
import defaultIconShadow from 'leaflet/dist/images/marker-shadow.png';
import defaultIconRetina from 'leaflet/dist/images/marker-icon-2x.png';

const events = [
  'click',
  'dblclick',
  'mousedown',
  'mouseover',
  'mouseout',
  'contextmenu',
  'dragstart',
  'drag',
  'dragend',
  'move',
  'add',
  'remove',
  'popupopen',
  'popupclose',
  'tooltipopen',
  'tooltipclose'
];

interface Props {
    position: LatLngExpression;
    icon?: string;
    iconShadow?: string;
    iconRetina?: string;
    draggable: boolean;
    visible?: boolean;
    opacity: number;
    title: string;
}

const props = defineProps< Props >();
const mapProvide = inject<MapProvide>('mapid');

const options = {
    draggable: props.draggable,
    opacity: props.opacity,
    title: props.title,
};


const overlayer = ref('hello tooltip');

nextTick(() => {
    console.log(props);
    fixImageUrl();
    const marker = L.marker(props.position, options);
    console.log(33333, marker);
    mapProvide?.addLayer(marker);
    // overlayer.value = marker;
})

function fixImageUrl() {
      //https://github.com/PaulLeCam/react-leaflet/issues/255#issuecomment-261904061
      //@ts-ignore
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: props.iconRetina || defaultIconRetina,
        iconUrl: props.icon || defaultIcon,
        shadowUrl: props.iconShadow || defaultIconShadow,
      });
}
</script>

<template>
    <slot overlayer="hello slot"></slot>
</template>