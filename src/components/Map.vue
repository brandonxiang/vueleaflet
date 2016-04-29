<template>
	<div id="map">
	<slot></slot>
	</div>
</template>

<script>
import Leaflet from 'leaflet'
export default{
	props:['center','zoom'],
	ready(){
		this.map = Leaflet.map("map",{center:this.center,zoom:this.zoom})
	},
	events:{
        'addToMap'(layer){
				this.map.addLayer(layer)

        }
    }
}
</script>
<style type="text/css">
	#map{height: 800px;width: 800px;}
</style>