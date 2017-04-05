import L from 'leaflet';

const state = {
  map: null,
};

const mutations = {
  mapReady(stat, {name,options}) {
    stat.map = L.map(name,options);
  },
  addControl(stat,control){
    stat.map.addControl(control)
  },
  removeControl(stat,control){
    stat.map.removeControl(control)
  },
  addLayer(stat, layer){
    stat.map.addLayer(layer)
  },
  hasLayer(stat,layer){
    return stat.map.hasLayer(layer)
  },
  removeLayer(stat,layer){
    stat.map.removeLayer(layer)
  },
  openPopup(stat, popup){
    stat.map.openPopup(popup)
  },
  closePopup(stat, popup){
    stat.map.closePopup(popup)
  },
  openTooltip(stat,tooltip){
    stat.map.openTooltip(tooltip)
  },
  closeTooltip(stat,tooltip){
    stat.map.closeTooltip(tooltip)
  },
  addEvent(stat,{event,func}){
    stat.map.on(event, func)
  },
  locate(stat,options){
    stat.map.locate(options);
  }
};

const getters = {
  getMap: stat => stat.map,
};

export default({
  state,
  mutations,
  getters,
});
