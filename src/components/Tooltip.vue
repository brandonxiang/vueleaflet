<template>
  
</template>

<script>
import bus from '../bus'
import { mapGetters } from 'vuex';
import L from 'leaflet';

const events = [
  'add',
  'remove',
  'popupopen',
  'popupclose',
  'tooltipopen',
  'tooltipclose',
];


export default {
  
  props: {
    content: {
      type: String,
      custom: true,
      default: '',
    },
  },

  mounted() {
    bus.$on('loaded',  () => {
      this.$parent.$marker.bindTooltip(this.content).openTooltip();
      // events.forEach((event) => {
      //   popup.on({ event, func: (ev) => { this.$emit(event, ev) } })
      // })
    })
  }
}
</script>
