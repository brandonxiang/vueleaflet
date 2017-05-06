<template>
  
</template>

<script>
import { mapGetters } from 'vuex';
import L from 'leaflet';

const events = [
  'add',
  'remove',
  'popupopen',
  'popupclose',
  'tooltipopen',
  'tooltipclose'
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
    this.$nextTick(function () {
      this.$parent.$marker.bindTooltip(this.content).openTooltip();
      // events.forEach((event) => {
      //   popup.on({ event, func: (ev) => { this.$emit(event, ev) } })
      // })
    })
  }
}
</script>
