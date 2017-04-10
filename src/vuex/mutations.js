export default {
  mapReady(state, { name, options }) {
    state.mapid = name
    state.maps[name] = L.map(name, options)
  },
  addControl(state, control) {
    state.maps[state.mapid].addControl(control)
  },
  removeControl(state, control) {
    state.maps[state.mapid].removeControl(control)
  },
  addLayer(state, layer) {
    state.maps[state.mapid].addLayer(layer)
  },
  hasLayer(state, layer) {
    return state.maps[state.mapid].hasLayer(layer)
  },
  removeLayer(state, layer) {
    state.maps[state.mapid].removeLayer(layer)
  },
  openPopup(state, popup) {
    state.maps[state.mapid].openPopup(popup)
  },
  closePopup(state, popup) {
    state.maps[state.mapid].closePopup(popup)
  },
  openTooltip(state, tooltip) {
    state.maps[state.mapid].openTooltip(tooltip)
  },
  closeTooltip(state, tooltip) {
    state.maps[state.mapid].closeTooltip(tooltip)
  },
  addEvent(state, { event, func }) {
    state.maps[state.mapid].on(event, func)
  },
  locate(state, options) {
    state.maps[state.mapid].locate(options);
  },
  switchMap(state, id) {
    state.mapid = id
  }
};