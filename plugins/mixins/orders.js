import Vue from "vue";
const mixin = {
  computed: {
    ordersDateList() {
      return this.$store.getters["orders/getOrdersDateList"];
    },
    ordersSelectedDateKey() {
      return this.$store.getters["orders/getSelectedDateType"];
    },
    ordersSelectedCardId() {
      return this.$store.getters["orders/getActiveCardId"];
    },
    ordersSelectedCityId() {
      return this.$store.getters["orders/getActiveCityId"];
    },
    ordersSelectedAreaId() {
      return this.$store.getters["orders/getActiveAreaId"];
    },
    ordersSelectedStatusId() {
      return this.$store.getters["orders/getActiveStatusId"];
    },
    ordersSearchText() {
      return this.$store.getters["orders/getSearchText"];
    },

    loadedOrders() {
      return this.$store.getters["orders/getLoadedOrders"];
    },
    ordersTotalPages() {
      return this.$store.getters["orders/getTotalPages"];
    },
    ordersCurrentPage() {
      return this.$store.getters["orders/getCurrentPage"];
    },
    
  },
};

Vue.mixin(mixin);
