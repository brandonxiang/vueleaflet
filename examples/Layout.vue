<script setup lang="ts">
import {
  LMap,
  LPane,
  LLayerGroup,
  LFeatureGroup,
  LTilelayer,
  LTileLayerWMS,
  LImageOverlay,
  LMarker,
  LTooltip,
  LPopup,
  LCircle,
  LCircleMarker,
  LPolygon,
  LPolyline,
  LRectangle,
  LControlAttribution,
  LControlLayers,
  LControlZoom,
  LControlScale,
  LControl,
  LGeojson,
} from '../src';
import '../node_modules/leaflet/dist/leaflet.css';
import L from 'leaflet';
import LCustomPlugin from './LCustomPlugin.vue';

const mapOptions = {
  zoom: 13,
  center: { lat: 51.505, lng: -0.09 },
  minZoom: 8,
  maxZoom: 15,
  attributionControl: false,
  zoomControl: false,
};

const tileLayerOptions = {
  attribution: 'vue-leaflet',
  maxZoom: 18,
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1,
  accessToken:
    'pk.eyJ1IjoieHdwaXNtZSIsImEiOiJ5cTlCQTlRIn0.QdV-wNUKbgs7jAlbVE747Q',
};

const baseLayerOptions = {
  geoqBlue: new L.TileLayer(
    'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}',
    {
      attribution: 'geoq blue',
    }
  ),
  高德影像: new L.TileLayer(
    'http://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
    {
      subdomains: '1234',
      attribution: '高德影像',
    }
  ),
};

const tmpGeojson = {
  type: 'Feature',
  geometry: {
    type: 'Polygon',
    coordinates: [
      [
        [-0.08, 51.509],
        [-0.06, 51.503],
        [-0.047, 51.51],
      ],
    ],
  },
};

const imageBounds = [
  [51.49, -0.13],
  [51.52, -0.06],
];

const wmsOptions = {
  layers: 'nexrad-n0r-900913',
  format: 'image/png',
  transparent: true,
  attribution: 'Weather data © IEM Nexrad',
};
</script>

<template>
  <div>
    <h1>Basic UI Layers</h1>
    <l-map id="map1" :options="mapOptions" ref="map1">
      <l-tilelayer
        urlTemplate="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
        :options="tileLayerOptions"
      />
      <l-marker
        id="marker1"
        :latlng="{ lat: 51.505, lng: -0.09 }"
        :options="{
          title: 'marker1',
          opacity: 1,
          draggable: true,
        }"
      >
        <l-tooltip :options="{ content: 'tooltip with marker1' }" />
      </l-marker>
      <l-marker
        id="marker2"
        :latlng="{ lat: 51.505, lng: -0.11 }"
        :options="{
          title: 'marker2',
        }"
      >
        <l-popup :options="{ content: 'popup with marker2' }" />
      </l-marker>
      <l-tooltip
        :options="{ content: 'tooltip standalone' }"
        :latlng="{ lat: 51.505, lng: 0 }"
      />
      <l-popup
        :options="{ content: 'popup standalone' }"
        :latlng="{ lat: 51.505, lng: 0 }"
      />
    </l-map>
  </div>
  <div>
    <h1>Vector Layers</h1>
    <l-map id="map2" :options="mapOptions">
      <l-tilelayer
        urlTemplate="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
        :options="tileLayerOptions"
      />
      <l-circle
        :latlng="[51.508, -0.11]"
        :options="{
          color: 'red',
          fillColor: '#f03',
          fillOpacity: 0.5,
          radius: 500,
        }"
      />
      <LCircleMarker
        :latlng="[51.512, -0.18]"
        :options="{
          color: 'red',
          fillColor: '#f03',
          fillOpacity: 0.5,
          radius: 100,
        }"
      />
      <l-polygon
        :latlngs="[
          [51.509, -0.08],
          [51.503, -0.06],
          [51.51, -0.047],
        ]"
      />
      <l-polyline
        :latlngs="[
          [51.51, -0.09],
          [51.505, -0.07],
          [51.56, -0.048],
        ]"
      />
      <l-rectangle
        :latLngBounds="[
          [51.51, -0.09],
          [51.505, -0.07],
        ]"
      />
    </l-map>
  </div>
  <div>
    <h1>Control</h1>
    <l-map
      id="map3"
      :options="{
        ...mapOptions,
        zoom: 10,
        center: { lat: 26.33280692289788, lng: 114.78515624999999 },
      }"
    >
      <l-tilelayer
        urlTemplate="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
        :options="tileLayerOptions"
      />
      <LControlScale />
      <LControlZoom :options="{ position: 'topright' }" />
      <LControlAttribution />
      <LControlLayers :base-layers="baseLayerOptions" />
    </l-map>
  </div>
  <div>
    <h1>Layer Containers and Overlays</h1>
    <l-map id="map4" :options="mapOptions">
      <LPane name="labels" :z-index="650" class-name="labels-pane" />
      <l-tilelayer
        urlTemplate="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
        :options="tileLayerOptions"
      />
      <LLayerGroup>
        <l-marker
          id="group-marker"
          :latlng="{ lat: 51.506, lng: -0.095 }"
          :options="{ title: 'group marker' }"
        />
        <l-circle
          :latlng="[51.508, -0.11]"
          :options="{ color: '#2563eb', radius: 300 }"
        />
      </LLayerGroup>
      <LFeatureGroup>
        <LGeojson :geojson="tmpGeojson" />
      </LFeatureGroup>
      <LImageOverlay
        url="https://leafletjs.com/examples/overlays/uqm_map_full.png"
        :bounds="imageBounds"
        :options="{ opacity: 0.35 }"
      />
      <LTileLayerWMS
        base-url="https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi"
        :options="wmsOptions"
      />
      <LControl position="bottomleft">
        <div class="example-control">Custom control</div>
      </LControl>
    </l-map>
  </div>
  <div>
    <h1>Custom Plugin</h1>
    <l-map id="map5" :options="mapOptions">
      <l-tilelayer
        urlTemplate="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
        :options="tileLayerOptions"
      />
      <LCustomPlugin />
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
#map3,
#map4,
#map5 {
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

.example-control {
  padding: 8px 10px;
  background: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 12px;
}
</style>
