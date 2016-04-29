import Vue from 'vue';
import Q from 'q';
import {DeferredReadyMixin} from '../deferredReady'
import {DeferredReady} from '../deferredReady'

Vue.use(DeferredReady);

export default Vue.extend({
    mixins: [DeferredReadyMixin],
    created() {
        this.$map = null;
    },
    deferredReady() {
        this.$dispatch('register-component', this);
    },
    events: {
        'map-ready'(map) {
            this.$map = map;
        },
    },
})