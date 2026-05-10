export const mapEvents = [
  'click',
  'dblclick',
  'mousedown',
  'mouseup',
  'mouseover',
  'mouseout',
  'mousemove',
  'contextmenu',
  'move',
  'moveend',
  'zoom',
  'zoomend',
  'layeradd',
  'layerremove',
  'load',
  'unload',
];

export const layerEvents = [
  'click',
  'dblclick',
  'mousedown',
  'mouseup',
  'mouseover',
  'mouseout',
  'mousemove',
  'contextmenu',
  'add',
  'remove',
  'popupopen',
  'popupclose',
  'tooltipopen',
  'tooltipclose',
];

export const markerEvents = [
  ...layerEvents,
  'dragstart',
  'drag',
  'dragend',
  'move',
];
