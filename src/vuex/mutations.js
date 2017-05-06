export const mapReady = (state, { name, options }) => {
  state.mapid = name
  state.maps[name] = L.map(name, options)
}

export const addControl = (state, control) => state.maps[state.mapid].addControl(control)

export const removeControl = (state, control) => state.maps[state.mapid].removeControl(control)

export const addLayer = (state, layer) => state.maps[state.mapid].addLayer(layer)

export const hasLayer = (state, layer) => state.maps[state.mapid].hasLayer(layer)

export const removeLayer = (state, layer) => state.maps[state.mapid].removeLayer(layer)

export const openPopup = (state, popup) => state.maps[state.mapid].openPopup(popup)

export const closePopup = (state, popup) => state.maps[state.mapid].closePopup(popup)

export const openTooltip = (state, tooltip) => state.maps[state.mapid].openTooltip(tooltip)

export const closeTooltip = (state, tooltip) => state.maps[state.mapid].closeTooltip(tooltip)

export const addEvent = (state, { event, func }) => state.maps[state.mapid].on(event, func)

export const removeEvent = (state, { event, func }) => state.maps[state.mapid].off(event, func)

export const locate = (state, options) => state.maps[state.mapid].locate(options)

export const switchMap = (state, id) => state.mapid = id
