<script>
    import MapComponent from './mapComponent'
    import {
        popup
    } from 'leaflet'

    export default MapComponent.extend({
        props: [''],
        deferredReady() {
            console.log(this.$el.nextElementSibling)
            this.$dispatch('bindPopup', this.$el.nextElementSibling)
        }
    })
</script>