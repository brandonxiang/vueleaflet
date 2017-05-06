import module from './vuex';
import LMap from './components/Map.vue';
import LTilelayer from './components/TileLayer.vue';
import LMarker from './components/Marker.vue';
import LPopup from './components/Popup.vue';
import LTooltip from './components/Tooltip.vue';

let plugin = {};

plugin.install = function(Vue, store, moduleName = 'VL'){
  // if(this.installed) return
  
  store.registerModule(moduleName, module)

  if(store.state.hasOwnProperty(moduleName)===false){
    console.error('vue-leaflet module is not correctly initialized. Please check the module name:', moduleName);
  }

  Vue.component('LMap', LMap);
  Vue.component('LTilelayer', LTilelayer);
  Vue.component('LMarker', LMarker);
  Vue.component('LPopup', LPopup);
  Vue.component('LTooltip', LTooltip);
}

export default {
  module,
  plugin,
  LMap,
  LTilelayer,
  LMarker,
  LPopup,
  LTooltip,
}
