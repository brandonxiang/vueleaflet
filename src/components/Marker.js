import MapComponent from './mapComponent'
import { Icon, marker } from 'leaflet'

export default MapComponent.extend({
    props: ['position'],
    deferredReady() {
        Icon.Default.imagePath = "../../node_modules/leaflet/dist/images";
        this.$marker = marker(this.position).addTo(this.$map);
    },
    events: {
        'bindPopup': function(popupContent) {
            this.$marker.bindPopup(popupContent)
        }
    }
});