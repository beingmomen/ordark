import Vue from "vue";
const mixin = {
  computed: {
    citiesSearchText() {
      return this.$store.getters["cities/getSearchText"];
    },
    citiesTotalPages() {
      return this.$store.getters["cities/getTotalPages"];
    },
    citiesCurrentPage() {
      return this.$store.getters["cities/getCurrentPage"];
    },

    citiesData() {
      return this.$store.getters["cities/getCitiesData"];
    },
  },
};

Vue.mixin(mixin);
