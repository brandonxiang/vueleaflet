import store from './vuex/store';
import LMap from './components/Map';
import LTilelayer from './components/TileLayer';
import LMarker from './components/Marker';
import LPopup from './components/Popup';
import LTooltip from './components/Tooltip';

let plugin = {};

const components=[
  LMap,
  LTilelayer,
  LMarker,
  LPopup,
  LTooltip,
]

plugin.install = function install(Vue, store, moduleName = 'VL'){
  if(store.state.hasOwnProperty(moduleName)===false){
    console.error('vue-leaflet module is not correctly initialized. Please check the module name:', moduleName);
  }

  components.map(component =>{
    Vue.component(component.name,component);
  })
}

module.exports = {
  store,
  plugin,
  LMap,
  LTilelayer,
  LMarker,
  LPopup,
  LTooltip,
}
