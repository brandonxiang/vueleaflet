#Leaflet 笔记四：Vue-leaflet

------------------------------

> github源码在此，希望大家一起开发，记得点星:
https://github.com/brandonxiang/vue-leaflet

在以下插件的启发下，我想开发一个新的插件，即是将leaflet进行vue的组件化。

- [Angular Leaflet directive](https://github.com/tombatossals/angular-leaflet-directive)
- [Tiny Leaflet Directive](https://github.com/CleverMaps/tiny-leaflet-directive)
- [Leaflet Popup Angular](https://github.com/grantHarris/leaflet-popup-angular)
- [Leaflet Control Angular](https://github.com/grantHarris/leaflet-control-angular)
- [react-leaflet](https://github.com/PaulLeCam/react-leaflet)

为了将leaflet组件化，我希望通过Vue的组件工具将leaflet各个图层分隔开。Vue的优点在于它比Angular和React都要轻便简洁多，以至于整个开发过程非常简单。

```
<map :zoom="13" :center="[51.505, -0.09]">
      <tilelayer :url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></tilelayer>
      <marker :position="[51.505, -0.09]"></marker>
</map>
```

也可以直接使用双向绑定，实现数据的灵活变动。

```
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

##英文文档

[English Version](README.md)

转载，请表明出处。[总目录Awesome GIS](http://www.jianshu.com/p/3b3efa92dd6d)
