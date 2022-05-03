import Vue from "vue";
const mixin = {
  computed: {
    areasSearchText() {
      return this.$store.getters["areas/getSearchText"];
    },
    areasTotalPages() {
      return this.$store.getters["areas/getTotalPages"];
    },
    areasCurrentPage() {
      return this.$store.getters["areas/getCurrentPage"];
    },
    areasSelectedCityId(){
      return this.$store.getters["areas/getActiveCity"];
    },
    areasData() {
      return this.$store.getters["areas/getAreasData"];
    },
  },
};

Vue.mixin(mixin);
