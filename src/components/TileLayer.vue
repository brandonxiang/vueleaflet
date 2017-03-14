<template>
</template>

<script>
import L from 'leaflet';

export default {
  props: ['url', 'attribution'],
  mounted() {
    const tilelayer = L.tileLayer(this.url, { attribution: this.attribution });

    this.$nextTick(function () {
      this.$store.state.map.addLayer(tilelayer);
    });
  },

};

</script>
