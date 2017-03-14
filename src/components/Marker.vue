<template>
</template>

<script>
import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

export default {
  props: ['position', 'opacity', 'title'],
  mounted() {
    const DefaultIcon = L.icon({
      iconUrl: icon,
      shadowUrl: iconShadow,
    });

    L.Marker.prototype.options.icon = DefaultIcon;

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
