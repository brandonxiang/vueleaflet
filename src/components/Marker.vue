<template>
</template>

<script>
import L from 'leaflet';

export default {
  props: ['position', 'opacity', 'title'],
  mounted() {
    L.Icon.Default.imagePath = '../../node_modules/leaflet/dist/images/';
    const options = {
      opacity: this.opacity,
      title: this.title,
    };

    const marker = L.marker(this.position, options);

    this.$nextTick(function () {
      this.$store.state.map.addLayer(marker);
    });
  },

};

</script>
