<template>
  <div id="map">
    <slot></slot>
  </div>
</template>

<script>
import L from 'leaflet';
import { mapMutations } from 'vuex';

const props = {
  center: {
    custom: true,
    default: undefined,
  },
  maxBounds: {
    custom: true,
    default: null,
  },
  zoom: {
    type: Number,
    default: undefined,
  },
  minZoom: {
    type: Number,
    default: undefined,
  },
  maxZoom: {
    type: Number,
    default: undefined,
  },
  attributionControl:{
    type: Boolean,
    default: true,
  },
  zoomControl:{
    type: Boolean,
    default: true,
  },
};

export default {
  props,
  methods: {
    ...mapMutations([
      'mapReady',
    ]),
  },
  mounted() {
    const options = {
      center: this.center,
      zoom: this.zoom,
      minZoom: this.minZoom,
      maxZoom: this.maxZoom,
      maxBounds: this.maxBounds,
      attributionControl:this.attributionControl,
      zoomControl:this.zoomControl,
    };

    const mapObject = L.map('map', options);
    this.mapReady(mapObject);
  },
};

</script>
