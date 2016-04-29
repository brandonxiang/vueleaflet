<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <map :zoom="13" :center="[51.505, -0.09]">
      <tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></tilelayer>
    </map>
  </div>

</template>

<script>
import map from "./components/Map.vue"
import tilelayer from "./components/TileLayer"
export default {
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Leaflet Demo',

    }
  },
  components: {map ,tilelayer}
}
</script>


<style>
body {
  font-family: Helvetica, sans-serif;
}
</style>
