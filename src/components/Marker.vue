<script>
import MapComponent from './mapComponent';
import L from 'leaflet';


export default MapComponent.extend({
    props:["position", "opacity", "title"],
    deferredReady(){
        L.Icon.Default.imagePath = "../../node_modules/leaflet/dist/images";
        var options ={
            opacity:this.opacity,
            title:this.title
        }
        L.marker(this.position, options).addTo(this.$map);
        
    }
});

</script>