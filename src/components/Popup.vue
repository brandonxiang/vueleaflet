<template>
  
</template>

<script>

import { mapMutations } from 'vuex';
import L from 'leaflet';

const props = {
  content: {
    type: String,
    custom: true,
    default: '',
  },
  latlng: {
    type: Array,
  },
};

export default {
  props,
  methods: {
    ...mapMutations([
      'openPopup',
    ]),
  },
  mounted() {
    if (this.latlng) {
      var popup = L.popup()
        .setLatLng(this.latlng)
        .setContent(this.content);

      this.$nextTick(function () {
        this.openPopup(popup)
      });
    } else {
      this.$nextTick(function () {
        this.$parent.$marker.bindPopup(this.content).openPopup();
      })
    }
  }
}
</script>
