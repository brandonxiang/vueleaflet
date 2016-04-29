<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <map :zoom="13" :center="[51.505, -0.09]">
      <tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></tilelayer>
      <marker :position="[51.5, -0.09]"></marker>
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
      msg: 'Leaflet Demo',
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
