<template>
  <div class="">
    <div>
      <!-- table -->
      <SellersTable
        ref="sellersTable"
        :headers="columns"
        :rowKeys="keys"
        @loadPage="getData"
        @filtersChanged="reloadData" 
      />
    </div>
  </div>
</template>

<script>

import SellersTable from '~/components/Tables/SellersTable.vue';
export default {
  components: { SellersTable },
  layout: "admin",
  middleware: ["authentication", "admin"],
  

  mounted() {
    const feather = require("feather-icons");
    feather.replace();
    this.updateTime();
    this.getData();
  },
  data() {
    return {
      columns: [
        "#",
        "الإسم",
        "الهاتف",
        "المحافظة",
        "العنوان",
        "البريد الإلكتروني",
        "إجراء",
      ],
      keys: [
        "name",
        "phone",
        "city",
        "address",
        "email",
      ],
    };
  },

  methods: {
    reloadData() {
      this.getData(this.sellersCurrentPage)
    },
    getData(page = 1) {
      this.$store.dispatch("sellers/loadSellersData", page);


    },
  },
};
</script>
