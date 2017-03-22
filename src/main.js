import Vue from 'vue';
import Vuex from 'vuex';
import module from './vuex/store';
import App from './Layout';

Vue.use(Vuex);
const store = new Vuex.Store(module)

new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App },
});
