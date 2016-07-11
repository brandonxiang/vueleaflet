# vue-leaflet
Here is Vue components for Leaflet maps, which is inspired by [react-leaflet](https://github.com/PaulLeCam/react-leaflet) and [vue-google-maps](https://github.com/GuillaumeLeclerc/vue-google-maps)

## Startup

You can input some Vue-styled components in a `.vue` file in order to use leafletjs.

``` bash
<template>
  <div id="app">
    <h1>{{ title }}</h1>
    <map :zoom="zoom" :center="center">
      <tilelayer :url="url"></tilelayer>
      <marker :position="center"></marker>
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
    }
  },
  components: {map ,tilelayer,marker}
}
</script>
```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Development

On the `develop` branch.

##License

[MIT](LICENSE)

##Chinese Version
[中文文档](README_CN.md)
