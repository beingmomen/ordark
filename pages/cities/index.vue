<template>
  <div class="">
    <div>
      <!-- table -->
      <CitiesTable
        ref="citiesTable"
        :headers="columns"
        :rowKeys="keys"
        @loadPage="getData"
        @filtersChanged="reloadData"
        
      />
    </div>
  </div>
</template>

<script>

import CitiesTable from '~/components/Tables/CitiesTable.vue';
export default {
  components: { CitiesTable },
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
        "سعر الشحن",
        "إجراء",
      ],
      keys: [
        "name",
        "shipping_cost",
      ],
    };
  },

  methods: {
    reloadData() {
      this.getData(this.citiesCurrentPage)
    },
    getData(page = 1) {
      this.$store.dispatch("cities/loadCitiesData", page);
    },
  },
};
</script>