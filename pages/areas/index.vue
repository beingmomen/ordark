<template>
  <div class="">
    <div>
      <AreasTable
        ref="areasTable"
        :headers="columns"
        :rowKeys="keys"
        @loadPage="getData"
        @filtersChanged="reloadData"
      />
    </div>
  </div>
</template>

<script>

import AreasTable from '~/components/Tables/AreasTable.vue';
export default {
  components: { AreasTable },
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
        "المحافظة",
        "سعر الشحن",
        "إجراء",
      ],
      keys: [
        "name",
        "city",
        "shipping_cost",
      ],
    };
  },

  methods: {
    reloadData() {
      this.getData(this.areasCurrentPage)
    },
    getData(page = 1) {
      this.$store.dispatch("areas/loadAreasData", page);
      

    },
  },
};
</script>