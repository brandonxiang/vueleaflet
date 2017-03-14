import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

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

export default new Vuex.Store({
  state,
  mutations,
  getters,
});
