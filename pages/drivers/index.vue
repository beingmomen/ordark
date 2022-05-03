<template>
  <div class="">
    <div>
      <!-- table -->
      <DriversTable
        ref="driversTable"
        :headers="columns"
        :rowKeys="keys"
        @loadPage="getData"
        @filtersChanged="reloadData" 
      />
    </div>
  </div>
</template>

<script>

import DriversTable from '~/components/Tables/DriversTable.vue';
export default {
  components: { DriversTable },
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
      this.getData(this.driversCurrentPage)
    },
    getData(page = 1) {
      this.$store.dispatch("drivers/loadDriversData", page);


    },
  },
};
</script>
