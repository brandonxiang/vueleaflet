<template>
  
</template>

<script>
import { mapMutations } from 'vuex';
import L from 'leaflet';

export default {
  props: ['url', 'attribution'],
  methods: {
    ...mapMutations([
      'addLayer',
    ]),
  },
  mounted() {
    const tilelayer = L.tileLayer(this.url, { attribution: this.attribution });

    this.$nextTick(function () {
      this.addLayer(tilelayer);
    });
  }

};

</script>
