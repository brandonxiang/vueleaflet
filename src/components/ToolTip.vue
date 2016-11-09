<script>
    import MapComponent from './mapComponent'
    import {
        tooltip
    } from 'leaflet'

    export default MapComponent.extend({
        props: [''],
        deferredReady() {
            console.log(this.$el.textContent)
            this.$dispatch('bindTooltip', this.$el.nextElementSibling)
        }
    })
</script>