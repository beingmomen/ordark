import Vue from "vue";
const mixin = {
  computed: {
    statusSearchText() {
      return this.$store.getters["status/getSearchText"];
    },
    statusTotalPages() {
      return this.$store.getters["status/getTotalPages"];
    },
    statusCurrentPage() {
      return this.$store.getters["status/getCurrentPage"];
    },

    statusesData() {
      return this.$store.getters["status/getStatusesData"]; 
    },
  },
};

Vue.mixin(mixin);
