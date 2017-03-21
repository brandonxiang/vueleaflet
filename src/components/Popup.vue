<template>
</template>

<script>

import { mapGetters } from 'vuex';
import L from 'leaflet';

const props = {
  content: {
    type: String,
    custom: true,
    default: '',
  },
  latlng:{
    type: Array,
  },
};

export default {
  props,
  computed: {
    ...mapGetters([
      'getMap',
    ]),
  },
  mounted(){
    if(this.latlng){
      var popup = L.popup()
        .setLatLng(this.latlng)
        .setContent(this.content);

      const map = this.getMap();

      this.$nextTick(function () {
        popup.openOn(map);
      });
    }else{
      this.$nextTick(function(){
          this.$parent.$marker.bindPopup(this.content).openPopup();
      })
    }
  }
}
</script>
