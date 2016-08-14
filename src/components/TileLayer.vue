<script>
import MapComponent from './mapComponent';
import L from 'leaflet';

export default MapComponent.extend({
    props:['url','attribution'],
    deferredReady(){
        L.tileLayer(this.url,{attribution:this.attribution}).addTo(this.$map);
    }
});

</script>