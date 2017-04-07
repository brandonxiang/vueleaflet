export default {
  getMap: (state) => state.map,
  getMapById: (state, id) => state.maps.filter((item) => item.id === id),
};