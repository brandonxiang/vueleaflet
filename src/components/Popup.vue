<template>
  
</template>

<script>

import bus from '../bus'
import { mapMutations } from 'vuex';
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
    latlng: {
      type: Array,
    },
  },

  mounted() {
    if (this.latlng) {
      var popup = L.popup()
        .setLatLng(this.latlng)
        .setContent(this.content);

      bus.$on('loaded', () => {
        this.openPopup(popup)
        events.forEach((event) => {
          popup.on({ event, func: (ev) => { this.$emit(event, ev) } })
        })
      });
    } else {
      this.$nextTick(function () {
        this.$parent.$marker.bindPopup(this.content).openPopup();
        //TODO: popup
      })
    }
  },

  methods: {
    ...mapMutations([
      'openPopup',
    ]),
  },
}
</script>
