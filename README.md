# vue-leaflet
Here is Vue components for Leaflet maps, which is inspired by [react-leaflet](https://github.com/PaulLeCam/react-leaflet) and [vue-google-maps](https://github.com/GuillaumeLeclerc/vue-google-maps).

> A vue component for leaflet.js

This branch adapts with vue 2.0, vuex 2.0 and leaflet 1.0.3.

## Completion of components

-   [x] Map
-   [x] Marker
-   [x] Popup
-   [x] Tooltip
-   [x] TileLayer

## Installation

```
npm install vueleaflet -save
```

## Startup

You can input some Vue-styled components in a .vue file in order to use leaflet.js, like [Layout.vue](src/Layout.vue).

```
<l-map :zoom="zoom" :center="center" :min-zoom="minZoom" :max-zoom="maxZoom">
  <l-tilelayer :url="url" :attribution="attribution"></l-tilelayer>
  <l-marker :position="center" :title="title" :opacity="opacity" :draggable="draggable">
    <l-tooltip content="a tooltip"></l-tooltip>
  </l-marker>
  <l-marker :position="marker" :title="title" :opacity="opacity" :draggable="false">
    <l-popup content="a popup"></l-popup>
  </l-marker>
</l-map>
```

Before that, you should config the vuex, see [main.js](src/main.js)

```
import Vue from 'vue';
import Vuex from 'vuex';
import VueLeaflet from './index'
import App from './Layout';

Vue.use(Vuex);

const store = new Vuex.Store({});

Vue.use(VueLeaflet.plugin,store);

new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App },
});

```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Contribute

All the developments are on the [develop](https://github.com/brandonxiang/vue-leaflet/tree/develop) branch, while the stable version is on the [master](https://github.com/brandonxiang/vue-leaflet/tree/master) branch.

## License

[MIT](LICENSE)
