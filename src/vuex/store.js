const state = {
  map: null,
};

const mutations = {
  mapReady(stat, map) {
    stat.map = map;
  },
  addLayer(stat, layer){
    stat.map.addLayer(layer)
  },
  openPopup(stat, popup){
    stat.map.openPopup(popup)
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
