import Vue from "vue";
const mixin = {
  computed: {
    adminsSearchText() {
      return this.$store.getters["admins/getSearchText"];
    },
    adminsSelectedCityId() {
      return this.$store.getters["admins/getActiveCityId"];
    },
    adminsSelectedAreaId() {
      return this.$store.getters["admins/getActiveAreaId"];
    },
    adminsTotalPages() {
      return this.$store.getters["admins/getTotalPages"];
    },
    adminsCurrentPage() { 
      return this.$store.getters["admins/getCurrentPage"];
    },

    adminsData() {
      return this.$store.getters["admins/getAdminsData"];
    },
  },
};

Vue.mixin(mixin);
