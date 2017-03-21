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
    default: undefined,
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
  paddingBottomRight: {
    custom: true,
    default: null,
  },
  paddingTopLeft: {
    custom: true,
    default: null,
  },
  padding: {
    custom: true,
    default: null,
  },
  worldCopyJump: {
    type: Boolean,
    default: false,
  },
};

export default{
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
			maxBounds:this.maxBounds,
    };

    this.mapObject = L.map('map', options);
    this.mapReady(this.mapObject);
  },
};


</script>

<style>
#map {
    height: 100%;
}
</style>
