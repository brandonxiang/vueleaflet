import L from 'leaflet';
import getters from './getters'
import mutations from './mutations'

const state = {
  mapid: null,
  maps: {},
};

export default {
  state,
  mutations,
  getters,
};
