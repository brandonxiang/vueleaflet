const state = {
  map: null,
};

const mutations = {
  mapReady(stat, map) {
    stat.map = map;
  },
};

const getters = {
  getMap: stat => stat.map,
};

export default({
  state,
  mutations,
  getters,
});
