
<script setup lang="ts">
import L from 'leaflet';
import { inject,nextTick } from 'vue'
import type { MapProvide } from '../core/Map';

interface Props {
    url: string;
    attribution: string;
    accessToken: string;
}

const props = defineProps<Props>();
const mapProvide = inject<MapProvide>('mapid');


nextTick(() => {
    const { url, attribution, accessToken } = props;
    const tilelayer = L.tileLayer(url, {
        attribution,
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken,
    })

    mapProvide?.addLayer(tilelayer);
})

</script>
