<template>
	<div id="map">
		<slot></slot>
	</div>
</template>

<script>
import L from 'leaflet';
import { mapMutations } from 'vuex';

export default{
  props: ['center', 'zoom', 'minZoom', 'maxZoom'],
  methods: {
    ...mapMutations([
      'mapReady',
    ]),
  },
  mounted() {
    this.mapObject = L.map('map', {
      center: this.center,
      zoom: this.zoom,
      minZoom: this.minZoom,
      maxZoom: this.maxZoom,
    });
    this.mapReady(this.mapObject);
  },
};


</script>

<style>
#map {
    height: 100%;
}
</style>
