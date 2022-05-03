<template>
  <div class="">
    <div>
      <!-- table -->
      <AdminsTable
        ref="adminsTable"
        :headers="columns"
        :rowKeys="keys"
        @loadPage="getData"
        @filtersChanged="reloadData"
      />
    </div>
  </div>
</template>

<script>

import AdminsTable from '~/components/Tables/AdminsTable.vue';
export default {
  components: { AdminsTable },
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
      this.getData(this.adminsCurrentPage) 
    },
    getData(page = 1) {
      this.$store.dispatch("admins/loadAdminsData", page);


    },
  },
};
</script>
