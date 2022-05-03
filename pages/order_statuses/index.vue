<template>
  <div class="">
    <div>
      <!-- table -->
      <StatusTable
        ref="statusTable"
        :headers="columns"
        :rowKeys="keys"
        @loadPage="getData"
        @filtersChanged="reloadData"
      />
    </div>
  </div>
</template>

<script>
import StatusTable from "~/components/Tables/StatusTable .vue";
export default {
  components: { StatusTable },
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
      columns: ["#", "الإسم", "رسالة التحديث", "إجراء"],
      keys: ["name", "message"],
    };
  },

  methods: {
    reloadData() {
      this.getData(this.statusCurrentPage);
    },
    getData(page = 1) {
      this.$store.dispatch("status/loadStatusesData", page);
    },
  },
};
</script>
