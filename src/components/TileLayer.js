import MapComponent from './mapComponent';
import Leaflet from 'leaflet'

export default MapComponent.extend({
    props:['url'],
    deferredReady(){
        Leaflet.tileLayer(this.url).addTo(this.$map);
    }
})

