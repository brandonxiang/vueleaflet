import MapComponent from './mapComponent';
import Leaflet from 'leaflet';

export default MapComponent.extend({
    props:['position'],
    deferredReady(){
        console.log(this.position);
        Leaflet.Icon.Default.imagePath = "http://cdn.leafletjs.com/leaflet/v0.7.7/images";
        Leaflet.marker(this.position).addTo(this.$map);
    }
});