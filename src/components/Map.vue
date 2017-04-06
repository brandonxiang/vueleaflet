<template>
  <div :id="id">
    <slot></slot>
  </div>
</template>

<script>

import { mapMutations } from 'vuex';

const props = {
  id:{
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
};

export default {
  props,
  methods: {
    ...mapMutations([
      'mapReady',
      'addEvent',
      'locate',
    ]),
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
    // this.addEvent({ event: 'zoomend', func: () => console.log(1) })
    // this.addEvent({ event: 'click', func: () => { this.locate() } })
  },
};

</script>
