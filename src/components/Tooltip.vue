<template>
</template>

<script>
import { mapGetters } from 'vuex';
import L from 'leaflet';

const props = {
  content: {
    type: String,
    custom: true,
    default: '',
  },
};

export default {
  props,
  mounted(){
    this.$nextTick(function(){
        this.$parent.$marker.bindTooltip(this.content).openTooltip();
    })
  }


}
</script>
