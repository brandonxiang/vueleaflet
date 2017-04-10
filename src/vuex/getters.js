export default {
  getMap: (state) => state.maps[state.mapid],
  getMapById: (state, id) => state.maps[id],
};