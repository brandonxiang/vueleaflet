<template>
</template>

<script>
import { mapGetters } from 'vuex';
import L from 'leaflet';

const props = {
  position: {
    type: Array,
  },
  icon: {
    custom: false,
    default:require('leaflet/dist/images/marker-icon.png')
  },
  iconShadow: {
    custom: false,
    default:require('leaflet/dist/images/marker-shadow.png')
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
  computed: {
    ...mapGetters([
      'getMap',
    ]),
  },
  mounted() {
    const DefaultIcon = L.icon({
      iconUrl: this.icon,
      shadowUrl: this.iconShadow,
    });

    L.Marker.prototype.options.icon = DefaultIcon;

    const options = {
      draggable: this.draggable,
      opacity: this.opacity,
      title: this.title,
    };

    const marker = L.marker(this.position, options);

    this.$nextTick(function () {
      this.getMap.addLayer(marker);
    });
  },

};

</script>
