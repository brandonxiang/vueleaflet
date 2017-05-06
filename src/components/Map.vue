<template>
  <div :id="id">
    <slot></slot>
  </div>
</template>

<script>

import { mapMutations } from 'vuex';

const events = [
  'click',
  'dblclick',
  'mousedown',
  'mouseup',
  'mouseover',
  'mouseout',
  'mousemove',
  'contextmenu',
  'focus',
  'blur',
  'preclick',
  'load',
  'unload',
  'viewreset',
  'movestart',
  'move',
  'moveend',
  'dragstart',
  'drag',
  'dragend',
  'zoomstart',
  'zoomend',
  'zoomanim',
  'zoomlevelschange',
  'resize',
  'autopanstart',
  'layeradd',
  'layerremove',
  'baselayerchange',
  'overlayadd',
  'overlayremove',
  'locationfound',
  'locationerror',
  'popupopen',
  'popupclose'
];


export default {
  props: {
    id: {
      type: String,
      default: 'map',
      require: true,
    },
    center: {
      custom: true,
      default: undefined,
      require: true
    },
    zoom: {
      type: Number,
      default: undefined,
      require: true,
    },
    maxBounds: {
      custom: true,
      default: null,
    },
    minZoom: {
      type: Number,
      default: undefined,
    },
    maxZoom: {
      type: Number,
      default: undefined,
    },
    attributionControl: {
      type: Boolean,
      default: true,
    },
    zoomControl: {
      type: Boolean,
      default: true,
    },
  },

  mounted() {
    const options = {
      center: this.center,
      zoom: this.zoom,
      minZoom: this.minZoom,
      maxZoom: this.maxZoom,
      maxBounds: this.maxBounds,
      attributionControl: this.attributionControl,
      zoomControl: this.zoomControl,
    };

    this.mapReady({ name: this.id, options: options });
    events.forEach((event, index) => {
      this.addEvent({ event, func: (ev) => { this.$emit(event, ev) } })
    })
  },

  methods: {
    ...mapMutations([
      'mapReady',
      'addEvent',
      'locate',
    ]),
  },
};

</script>
