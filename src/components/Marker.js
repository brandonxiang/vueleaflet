import MapComponent from './mapComponent';
import Leaflet from 'leaflet';

export default MapComponent.extend({
    props:['position'],
    deferredReady(){
        Leaflet.Icon.Default.imagePath = "../../node_modules/leaflet/dist/images";
        Leaflet.marker(this.position).addTo(this.$map);
    }
});