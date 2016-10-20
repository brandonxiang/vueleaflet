<template>
  <div id="app">
    <map :zoom="zoom" :center="center" :min-zoom="minZoom" :max-zoom="maxZoom">
      <tilelayer :url="url" :attribution="attribution"></tilelayer>
      <marker :position="center" >
         <popup>
           <span>Hello world</span>
          </popup>
      </marker>
    </map>
  </div>
</template>

<script>
    import map from "./components/Map.vue"
    import tilelayer from "./components/TileLayer"
    import marker from "./components/Marker"
    import popup from "./components/Popup"

    export default {
        data() {
                return {
                    zoom: 13,
                    center: [51.505, -0.09],
                    minZoom: 8,
                    maxZoom: 15,
                    url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
                    attribution: "mymap"
                }
            },
            components: {
                map,
                tilelayer,
                marker,
                popup
            }
    }
</script>

<style>
    body {
        font-family: Helvetica, sans-serif;
    }
    
    #app {
        height: 100%;
    }
</style>