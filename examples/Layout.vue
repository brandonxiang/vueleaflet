<script setup lang="ts">
import {
  LMap,
  LTilelayer,
  LMarker,
  LTooltip,
  LPopup,
  LCircle,
  LCircleMarker,
  LPolygon,
  LPolyline,
  LRectangle,
} from '../src';
import '../node_modules/leaflet/dist/leaflet.css';

const mapOptions = {
  zoom: 13,
  center: { lat: 51.505, lng: -0.09 },
  minZoom: 8,
  maxZoom: 15,
  attributionControl: true,
  zoomControl: true
}

const tileLayerOptions = {
  attribution: 'vue-leaflet',
  maxZoom: 18,
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: 'pk.eyJ1IjoieHdwaXNtZSIsImEiOiJ5cTlCQTlRIn0.QdV-wNUKbgs7jAlbVE747Q'
}

</script>

<template>
  <div>
    <h1>Marker/Tooltip/Popup</h1>
    <l-map id="map1" :options="mapOptions">
      <l-tilelayer urlTemplate="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
        :options="tileLayerOptions" />
      <l-marker id="marker1" :latlng="{ lat: 51.505, lng: -0.09 }" :options="{
        title: 'marker1',
        opacity: 1,
        draggable: true
      }">
        <l-tooltip :options="{ content: 'tooltip with marker1' }" />
      </l-marker>
      <l-marker id="marker2" :latlng="{ lat: 51.505, lng: -0.11 }" :options="{
        title: 'marker2'
      }">
        <l-popup :options="{ content: 'popup with marker2' }" />
      </l-marker>
      <l-tooltip :options="{ content: 'tooltip standalone' }" :latlng="{ lat: 51.505, lng: 0 }" />
      <l-popup :options="{ content: 'popup standalone' }" :latlng="{ lat: 51.505, lng: 0 }" />
    </l-map>
  </div>
  <div>
    <h1>Vector Layers</h1>
    <l-map id="map2" :options="mapOptions">
      <l-tilelayer urlTemplate="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
        :options="tileLayerOptions"/>
      <l-circle :latlng="[51.508, -0.11]" :options="{
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 500
      }" />
      <LCircleMarker :latlng="[51.512, -0.18]" :options="{
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 100
      }" />
      <l-polygon :latlngs="[
        [51.509, -0.08],
        [51.503, -0.06],
        [51.51, -0.047]
      ]" />
      <l-polyline :latlngs="[
        [51.510, -0.09],
        [51.505, -0.07],
        [51.56, -0.048]
      ]" />
      <l-rectangle :latLngBounds="[
        [51.510, -0.09],
        [51.505, -0.07],
      ]" />
    </l-map>
  </div>
  <div>
    <h1>Control</h1>
    <l-map id="map3" :options="mapOptions">
      <l-tilelayer urlTemplate="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
        :options="tileLayerOptions" />
      <!-- <l-marker id="marker3" :latlng="{ lat: 51.505, lng: -0.2 }" :options="{
        title: 'marker3'
      }">
        <l-popup :options="{ content: 'popup with marker3' }" />
      </l-marker> -->
    </l-map>
  </div>
</template>




<style lang="css">
#app {
  width: 100%;
  height: 100%;
}

#map1,
#map2,
#map3 {
  height: 300px;
}

html,
body {
  padding: 0;
  margin: 0;
  height: 100%;
}

h1 {
  padding: 0 20px;
}
</style>