import MapComponent from './mapComponent';
import Leaflet from 'leaflet';

export default MapComponent.extend({
    props:['url','attribution'],
    deferredReady(){
        Leaflet.tileLayer(this.url,{attribution:this.attribution}).addTo(this.$map);
    }
});

