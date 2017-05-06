<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import L from 'leaflet';

const events = [
  'click',
  'dblclick',
  'mousedown',
  'mouseover',
  'mouseout',
  'contextmenu',
  'dragstart',
  'drag',
  'dragend',
  'move',
  'add',
  'remove',
  'popupopen',
  'popupclose',
  'tooltipopen',
  'tooltipclose'
];

export default {
  props: {
    position: {
      type: Array,
    },
    icon: {
      custom: false,
      default: require('leaflet/dist/images/marker-icon.png')
    },
    iconShadow: {
      custom: false,
      default: require('leaflet/dist/images/marker-shadow.png')
    },
    iconRetina: {
      custom: false,
      default: require('leaflet/dist/images/marker-icon-2x.png')
    },
    draggable: {
      type: Boolean,
      custom: true,
      default: false,
    },
    visible: {
      type: Boolean,
      custom: true,
      default: true,
    },
    opacity: {
      type: Number,
      default: 1,
    },
    title: {
      type: String,
    },
  },

  mounted() {
    this.fixImageUrl();

    const options = {
      draggable: this.draggable,
      opacity: this.opacity,
      title: this.title,
    };

    const marker = this.$marker = L.marker(this.position, options);

    this.$nextTick(function () {
      this.addLayer(marker);
      events.forEach((event) => {
        marker.on({ event, func: (ev) => { this.$emit(event, ev) } })
      })
    });
  },

  methods: {
    ...mapMutations([
      "addLayer"
    ]),
    fixImageUrl() {
      //https://github.com/PaulLeCam/react-leaflet/issues/255#issuecomment-261904061
      delete L.Icon.Default.prototype._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: this.iconRetina,
        iconUrl: this.icon,
        shadowUrl: this.iconShadow,
      });
    }
  },

};

</script>
