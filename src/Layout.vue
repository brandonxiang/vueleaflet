<template lang="html">
  <l-map :zoom="zoom" :center="center" :min-zoom="minZoom" :max-zoom="maxZoom">
    <l-tilelayer :url="url" :attribution="attribution"></l-tilelayer>
    <l-marker :position="center" :title="title" :opacity="opacity" :draggable="draggable">
      <l-tooltip content="a tooltip"></l-tooltip>
    </l-marker>
    <l-marker :position="marker" :title="title" :opacity="opacity" :draggable="false">
      <l-popup content="a popup"></l-popup>
    </l-marker>
  </l-map>
</template>

<script>
import '../node_modules/leaflet/dist/leaflet.css';

export default {
  data() {
    return {
      zoom: 13,
      center: [51.505, -0.09],
      marker: [51.500,0.00],
      minZoom: 8,
      maxZoom: 15,
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution: 'mymap',
      title: 'test-marker',
      opacity: 1,
      draggable:true
    };
  },
};
</script>

<style lang="css">

body {
    padding: 0;
    margin: 0;
}

html,
body {
    height: 100%;
}
</style>
