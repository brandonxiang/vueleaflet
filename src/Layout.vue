<template lang="html">
  <mapctrl :zoom="zoom" :center="center" :min-zoom="minZoom" :max-zoom="maxZoom">
    <tilelayer :url="url" :attribution="attribution"></tilelayer>
  </mapctrl>
</template>

<script>
import Mapctrl from './components/map';
import Tilelayer from './components/Tilelayer'
import '../node_modules/leaflet/dist/leaflet.css'

export default {
  components:{
    Mapctrl,
    Tilelayer,
  },
  data(){
      return{
          zoom:13,
          center: [51.505, -0.09],
            minZoom: 8,
            maxZoom: 15,
            url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
            attribution: "mymap",
            title: "test-marker",
            opacity: 0.6
      }
  }
}
</script>

<style lang="css">
</style>
