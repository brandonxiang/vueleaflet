import store from './vuex/store';
import LMap from './components/Map';
import LTilelayer from './components/TileLayer';
import LMarker from './components/Marker';
import LPopup from './components/Popup';
import LTooltip from './components/Tooltip';

let plugin = {};

plugin.install = function install(Vue, store, moduleName = 'VL'){
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
  store,
  plugin,
  LMap,
  LTilelayer,
  LMarker,
  LPopup,
  LTooltip,
}
