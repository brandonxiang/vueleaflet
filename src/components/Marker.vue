<script>
import MapComponent from './mapComponent';
import Leaflet from 'leaflet';


export default MapComponent.extend({
    props:["position", "opacity", "title"],
    deferredReady(){
        Leaflet.Icon.Default.imagePath = "../../node_modules/leaflet/dist/images";
        var options ={
            opacity:this.opacity,
            title:this.title
        }
        Leaflet.marker(this.position, options).addTo(this.$map);
        
    }
});

</script>