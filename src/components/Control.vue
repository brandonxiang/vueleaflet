<template>
    
</template>

<script>

import {mapMutations} from 'vuex'
import L from 'leaflet'

export default{
    methods:{
        ...mapMutations([
            'addControl',
        ]),
    },
    mounted(){
        L.Control.Temp = L.Control.extend({
            options: options
        })

        const temp = new L.Control.Temp
        this.addControl(temp)
    }
}




</script>  