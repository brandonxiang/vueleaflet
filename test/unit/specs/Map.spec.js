import Vue from 'vue'
import Vuex from 'vuex'
import VueLeaflet from '@/index'
import LMap from '@/components/Map'
import L from 'leaflet'


describe('Map.vue', () => {
    const store = new Vuex.Store({
        modules: {
            VL:VueLeaflet.store,
        }
    })
    Vue.use(VueLeaflet.plugin, store)

    it('should set map into vuex', () => {
        const Constructor = Vue.extend(LMap);
        const vm = new Constructor().$mount();
        expect(vm.$el.querySelector())
    })
}) 