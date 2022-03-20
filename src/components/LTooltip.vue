<script setup lang="ts">
import L from 'leaflet';

import { getCurrentInstance, nextTick, useAttrs, useSlots } from "vue";

const events = [
  'add',
  'remove',
  'popupopen',
  'popupclose',
  'tooltipopen',
  'tooltipclose',
];


interface Props {
    content: string;
}

// nextTick(()=> {
//     instance?.parent.
// }) 

const slot = useSlots();
const attr = useAttrs();

L.tooltip({pane: 'hello'}, )
console.log(55555, slot, attr);

</script>