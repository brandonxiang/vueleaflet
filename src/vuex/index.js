import L from 'leaflet';
import * as getters from './getters'
import * as mutations from './mutations'

const state = {
  mapid: null,
  maps: {},
};

export default {
  state,
  mutations,
  getters,
};
