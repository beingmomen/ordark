<template>
  <div class="">
    <div class="p-3 flex flex-row justify-between w-full h-16 px-0">
      <h2 class="font-medium text-3xl mt-1 text-right pr-0 w-3/4">احصائيات</h2>

      <GlobalBackButton class="md:hidden" />

      <div
        class="md:flex hidden flex-col w-1/5 ml-3 mt-2"
        style="min-width: 110px"
      >
        <v-select
          class="sm:mr-2 bg-white rounded-full capitalize"
          v-model="selectedDateType"
          aria-label="Default select example"
          :options="ordersDateList"
          :reduce="(item) => item.key"
          :clearable="false"
          label="text"
        >
         
        </v-select>
      </div>
    </div>
    <hr class="mt-3 mb-1" />

    <div
      class="md:hidden flex flex-col w-full ml-3 mt-4"
      style="min-width: 110px"
    >
      <v-select
        class="sm:mr-2 bg-white capitalize"
        v-model="selectedDateType"
        aria-label="Default select example"
        :options="ordersDateList"
        :clearable="false"
        label="text"
        :reduce="(item) => item.key"
      >
      </v-select>
    </div>

    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12 2xl:col-span-9">
        <div class="grid grid-cols-12 gap-6">
          <!-- BEGIN: General Report -->
          <div class="col-span-12">
            <div class="grid grid-cols-12 gap-6 mt-3">
              <InfoCard
                v-for="(card, index) in statusesList"
                :key="'first' + index"
                :id="card.id"
                :title="card.name"
                :value="card.value"
                icon="dollar-sign"
                :percentage="
                  index != 0 ? (card.value / statusesList[0].value) * 100 : null
                "
                :money="card.shipping_cost"
                :isActive="ordersSelectedStatusId == card.id"
                @cardClicked="changeActiveCard"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr class="mt-10" />
    <div>
     
      <!-- table -->
      <OrdersTable
        ref="ordersTable"
        :headers="ordersTableColumns"
        :rowKeys="ordersTableKeys"
        @loadPage="getData"
        @statusChanged="changeActiveCard"
        @filtersChanged="reloadData"
      />
    </div>
  </div>
</template>

<script>
import InfoCard from "~/components/Global/InfoCard.vue";
import FastSearch from "~/components/Global/FastSearch.vue";
import OrdersTable from "~/components/Tables/OrdersTable.vue";
export default {
  components: { InfoCard, FastSearch, OrdersTable },
  layout: "admin",
  middleware: ["authentication"],

  mounted() {
    const feather = require("feather-icons");
    feather.replace();
    this.updateTime();

    this.getData();
    setTimeout(() => {
      this.selectedDateType = this.ordersSelectedDateKey;
    }, 100);
  },
  data() {
    return {
     
      selectedDateType: "today",
      
    };
  },

  methods: {
    
    changeActiveCard(id) {
      this.$refs["ordersTable"].activeStatus = id;
      this.$store.commit("orders/updateActiveStatus", id);
    },

    reloadData() {
      this.getData(1);
      this.$store.dispatch("global/loadStatusList");
    },
    getData(page = 1) {
      this.$store.dispatch("orders/loadOrders", page);
    },
  },
  watch: {
    selectedDateType(key) {
      this.$store.commit("orders/updateSelectedDateType", key);
      this.reloadData(1);
    },
  },
};
</script>
