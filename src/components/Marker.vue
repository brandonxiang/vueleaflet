<template>
</template>

<script>
import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const props = {
  position: {
    type: Object,
  },
  icon: {
    custom: false,
    default() { return new L.Icon.Default(); },
  },
  draggable: {
    type: Boolean,
    custom: true,
    default: false,
  },
  opacity: {
    type: Number,
    default: 1,
  },
  title: {
    type: String,
  },
};

export default {
  props,
  mounted() {
    const DefaultIcon = L.icon({
      iconUrl: icon,
      shadowUrl: iconShadow,
    });

    L.Marker.prototype.options.icon = DefaultIcon;

    const options = {
      draggable: this.draggable,
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
