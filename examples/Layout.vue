<script setup lang="ts">
import {
  LMap,
  LTilelayer,
  LMarker,
  LTooltip,
  LPopup,
  LCircle,
  LPolygon
} from '../src';
import '../node_modules/leaflet/dist/leaflet.css';

</script>

<template>
  <l-map id="map1" :options="{
    zoom: 13,
    center: { lat: 51.505, lng: -0.09 },
    minZoom: 8,
    maxZoom: 15,
    attributionControl: true,
    zoomControl: true
  }">
    <l-tilelayer urlTemplate="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
      :options="{
        attribution: 'vue-leaflet',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoieHdwaXNtZSIsImEiOiJ5cTlCQTlRIn0.QdV-wNUKbgs7jAlbVE747Q'
      }" />
    <l-marker :latlng="{ lat: 51.505, lng: -0.09 }" :options="{
      title: 'marker1',
      opacity: 1,
      draggable: true
    }">
      <l-tooltip :options="{ content: 'tooltip with marker1' }" />
    </l-marker>
    <l-marker :latlng="{ lat: 51.505, lng: -0.11 }" :options="{
      title: 'marker2'
    }">
      <l-popup :options="{ content: 'popup with marker2' }" />
    </l-marker>
    <l-tooltip :options="{ content: 'tooltip standalone' }" :latlng="{ lat: 51.505, lng: 0 }" />
    <l-popup :options="{ content: 'popup standalone' }" :latlng="{ lat: 51.505, lng: 0 }" />
    <l-circle :latlng="[51.508, -0.11]" :options="{
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 500
    }" />
    <l-polygon :latlng="[
      [51.509, -0.08],
      [51.503, -0.06],
      [51.51, -0.047]
    ]" />

  </l-map>
</template>




<style lang="css">
#app {
  width: 100%;
  height: 100%;
}

#map1 {
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