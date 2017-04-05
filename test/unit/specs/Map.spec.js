import Vue from 'vue'
import LMap from '@/components/Map';

describe('Map.vue', ()=>{
    it('should set map into vuex', ()=>{
        const Constructor = Vue.extend(LMap);
        const vm = new Constructor().$mount();
        expect(vm.$el.querySelector())
    })
}) 