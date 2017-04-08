import L from 'leaflet';
import getters from './getters'
import mutations from './mutations'

const state = {
  map: null,
  maps: [],
};

export default {
  state,
  mutations,
  getters,
};
