import Vue from 'vue';
import Vuex from 'vuex';
import VueLeaflet from './index'
import App from './Layout';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules:{
    VL: VueLeaflet.store,
  }
});

Vue.use(VueLeaflet.plugin,store);

new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App },
});
