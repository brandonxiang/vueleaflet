<template>
  
</template>

<script>
import { mapMutations } from 'vuex';
import L from 'leaflet';

export default {

  props: {
    url: {
      type: String,
    },
    attribution: {
      type: String,
    }
  },

  mounted() {
    const tilelayer = L.tileLayer(this.url, { attribution: this.attribution });

    this.$nextTick(function () {
      this.addLayer(tilelayer);
    });
  },

  methods: {
    ...mapMutations([
      'addLayer',
    ]),
  },

};

</script>
