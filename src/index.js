import module from './store';
import LMap from './components/Map';
import LTilelayer from './components/TileLayer';
import LMarker from './components/Marker';
import LPopup from './components/Popup';
import LTooltip from './components/Tooltip';

const plugin = {};

plugin.install = function (Vue, store, moduleName = 'VL') {
  // if(this.installed) return

  store.registerModule(moduleName, module);

  if (store.state.hasOwnProperty(moduleName) === false) {
    console.error('vue-leaflet module is not correctly initialized. Please check the module name:', moduleName);
  }

  Vue.component('LMap', LMap);
  Vue.component('LTilelayer', LTilelayer);
  Vue.component('LMarker', LMarker);
  Vue.component('LPopup', LPopup);
  Vue.component('LTooltip', LTooltip);
};

export default {
  module,
  plugin,
  LMap,
  LTilelayer,
  LMarker,
  LPopup,
  LTooltip,
};
