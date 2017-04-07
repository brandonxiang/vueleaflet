export default{
  mapReady(state, {name,options}) {
    state.map = L.map(name,options)
    state.maps.push({id: name, map:state.map})
  },
  addControl(state,control){
    state.map.addControl(control)
  },
  removeControl(state,control){
    state.map.removeControl(control)
  },
  addLayer(state, layer){
    state.map.addLayer(layer)
  },
  hasLayer(state,layer){
    return state.map.hasLayer(layer)
  },
  removeLayer(state,layer){
    state.map.removeLayer(layer)
  },
  openPopup(state, popup){
    state.map.openPopup(popup)
  },
  closePopup(state, popup){
    state.map.closePopup(popup)
  },
  openTooltip(state,tooltip){
    state.map.openTooltip(tooltip)
  },
  closeTooltip(state,tooltip){
    state.map.closeTooltip(tooltip)
  },
  addEvent(state,{event,func}){
    state.map.on(event, func)
  },
  locate(state,options){
    state.map.locate(options);
  },
  switchMap(state, id){
    state.map = this.getters.getMap[id]
  }
};