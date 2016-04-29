<template>
  <div id="app">
    <h1>{{ title }}</h1>
    <map :zoom="zoom" :center="center">
      <tilelayer :url="url" :attribution="attribution"></tilelayer>
      <marker :position="center" ></marker>
    </map>
  </div>
</template>

<script>
import map from "./components/Map.vue"
import tilelayer from "./components/TileLayer"
import marker from "./components/Marker"

export default {
  data () {
    return {
      title: 'Vue Leaflet Demo',
      zoom:13,
      center:[51.505, -0.09],
      url:"http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      attribution:"mymap"
    }
  },
  components: {map ,tilelayer,marker}
}
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
}
</style>
