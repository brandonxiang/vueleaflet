<script setup lang="ts">
    import LMap from './components/LMap.vue';
    import LTilelayer from './components/LTilelayer.vue';
    import LMarker from './components/LMarker.vue';
    import LTooltip from './components/LTooltip.vue';
    import '../node_modules/leaflet/dist/leaflet.css';



</script>



<template>
    <l-map 
        :zoom="13" 
        :center="{lat: 51.505, lng: -0.09}" 
        :min-zoom="8" 
        :max-zoom="15" 
        :attribution-control="true"
        :zoom-control="true"
    >
        <l-tilelayer 
          url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
          accessToken="pk.eyJ1IjoieHdwaXNtZSIsImEiOiJ5cTlCQTlRIn0.QdV-wNUKbgs7jAlbVE747Q"
          attribution="vue-leaflet" 
        />
        <l-marker 
          :position="{lat: 51.505, lng: -0.09}" 
          title="vueleaflet" 
          :opacity="1" 
          :draggable="true">
          <l-tooltip content="a tooltip"></l-tooltip>
        </l-marker> 
    </l-map>
</template>




<style lang="css">
#app {
  width: 100%;
  height: 100%;
}
#mapid {
  height: 100%;
}
body {
  padding: 0;
  margin: 0;
}
html,
body {
  height: 100%;
}
</style>