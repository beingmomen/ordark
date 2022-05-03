import Vue from "vue";
const mixin = {
  computed: {
    sellersSearchText() {
      return this.$store.getters["sellers/getSearchText"];
    },
    sellersSelectedCityId() {
      return this.$store.getters["sellers/getActiveCityId"];
    },
    sellersSelectedAreaId() {
      return this.$store.getters["sellers/getActiveAreaId"];
    },
    sellersTotalPages() {
      return this.$store.getters["sellers/getTotalPages"];
    },
    sellersCurrentPage() {
      return this.$store.getters["sellers/getCurrentPage"];
    },

    sellersData() {
      return this.$store.getters["sellers/getSellersData"];
    },
    sellerLoadedOrders() {
      return this.$store.getters["sellers/getLoadedOrders"];
    },

  },
};

Vue.mixin(mixin);
