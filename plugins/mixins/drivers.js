import Vue from "vue";
const mixin = {
  computed: {
    driversSearchText() {
      return this.$store.getters["drivers/getSearchText"];
    },
    driversSelectedCityId() {
      return this.$store.getters["drivers/getActiveCityId"];
    },
    driversSelectedAreaId() {
      return this.$store.getters["drivers/getActiveAreaId"];
    },
    driversTotalPages() {
      return this.$store.getters["drivers/getTotalPages"];
    },
    driversCurrentPage() {
      return this.$store.getters["drivers/getCurrentPage"];
    },

    driversData() {
      return this.$store.getters["drivers/getDriversData"];
    },
    driverLoadedOrders() {
      return this.$store.getters["drivers/getLoadedOrders"];
    },

  },
};

Vue.mixin(mixin);
