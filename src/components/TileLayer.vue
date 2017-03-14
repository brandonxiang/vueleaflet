<template>
</template>

<script>
import { mapGetters } from 'vuex';
import L from 'leaflet';

export default {
  props: ['url', 'attribution'],
  computed: {
    ...mapGetters([
      'getMap',
    ]),
  },
  mounted() {
    const tilelayer = L.tileLayer(this.url, { attribution: this.attribution });

    this.$nextTick(function () {
      this.getMap.addLayer(tilelayer);
    });
  },

};

</script>
