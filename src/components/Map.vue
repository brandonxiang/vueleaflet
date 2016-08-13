<template>
	<div id="map">
		<slot></slot>
	</div>
</template>

<script>
import Q from 'q';
import Vue from 'vue'
import {DeferredReadyMixin} from '../deferredReady.js'
import {DeferredReady} from '../deferredReady.js'
import Leaflet from 'leaflet';

Vue.use(DeferredReady);

const registerChild = function (child, type) {
  if (!this.mapObject)
    throw new Error("Map not initialized");
  child.$emit('map-ready', this.mapObject);
  // Simpler: child.$map = mapObject but not so
  // modular
}

const eventListeners = {
  'register-component': registerChild,
}

export default{
	mixins:[DeferredReadyMixin],
	props:['center','zoom','minZoom','maxZoom'],
	created(){
		this.mapCreatedDefered = new Q.defer();
		this.mapCreated = this.mapCreatedDefered.promise;	
	},
	ready(){
		this.mapObject = Leaflet.map("map",{
			center:this.center,
			zoom:this.zoom,
			minZoom:this.minZoom,
			maxZoom:this.maxZoom
		})
	},
	events:eventListeners
}
</script>
<style type="text/css">
	#map {
		height: 100%;
		width: 100%;
	}
</style>