<template>
  <div class="">
    <div class="p-3 flex flex-row justify-between w-full h-16 px-0">
      <h2 class="font-medium text-3xl mt-1 text-right pr-0 w-3/4">
        سجل المندوب {{ driver.name }}
      </h2>

      <GlobalBackButton class="md:hidden" />

      <!-- <div
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
      </div> -->
    </div>
    <hr class="mt-3 mb-1" />

    <div class="flex flex-row flex-wrap">
      <GlobalTitleInfoCard
        v-for="key in driverInfoKeys"
        :key="key"
        :infoKey="key"
        :seller="driver"
      />
    </div>
    <!-- <div class="flex flex-row flex-wrap">
      <div
        class="rounded-md border border-gray-300 w-full md:w-1/3 lg:w-1/4 my-2 mx-2"
        v-for="key in ['name', 'phone', 'email', 'city', 'address']"
        :key="key"
      >
        <p class="whitespace-normal text-center px-3">
          <span
            class="font-bold text-right w-full inline-block mb-1 mt-2 text-base text-blue-600"
          >
            {{
              key == "name"
                ? "الإسم"
                : key == "phone"
                ? "الهاتف"
                : key == "address"
                ? "العنوان"
                : key == "email"
                ? "الإيميل"
                : key == "city"
                ? "المنطقة"
                : ""
            }}
          </span>
          <span class="text-lg inline-block pb-3">
            {{
              key == "city" && driver.city
                ? driver.city.name + "-" + driver.area.name
                : driver[key]
            }}
            <div
              class="btn btn-sm btn-outline-dark hover:text-white h-5 w-6"
              @click="copy(key, $event)"
              title="نسخ"
            >
              <i class="fas fa-copy"></i>
            </div>
          </span>
        </p>
      </div>
    </div> -->

    <!-- <hr class="mt-3 mb-1" /> -->

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
                v-for="(card, index) in statusList"
                :key="'first' + index"
                :id="card.id"
                :title="card.name"
                :value="card.value"
                icon="dollar-sign"
                :percentage="
                  index != 0 ? (card.value / statusList[0].value) * 100 : null
                "
                :money="card.shipping_cost"
                :isActive="activeStatus == card.id"
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
      <DriverOrdersTable
        ref="driverOrdersTable"
        :orders="orders"
        :currentPage="currentPage"
        :totalPages="totalPages"
        :headers="getDriverOrdersColumns"
        :rowKeys="getDriverOrdersKeys"

        
        @loadPage="getData"
        @statusChanged="changeActiveCard"
        @filtersChanged="reloadData"
        statuses="statusList"
        :handledActiveStatus="activeStatus"
        :handledActiveCity="activeCityId"
        :handledActiveArea="activeAreaId"
        :handledSearchText="searchText"
        @activeStatus-changed="activeStatusChange"
        @activeCity-changed="activeCityChange"
        @activeArea-changed="activeAreaChange"
        @searchText-changed="searchTextChange"
      />
    </div>
  </div>
</template>

<script>
import InfoCard from "~/components/Global/InfoCard.vue";
import FastSearch from "~/components/Global/FastSearch.vue";
import DriverOrdersTable from "~/components/Tables/DriverOrdersTable.vue";
export default {
  
  components: { InfoCard, FastSearch, DriverOrdersTable },
  layout: "admin",
  middleware: ["authentication"],

  mounted() {
    const feather = require("feather-icons");
    feather.replace();
    this.updateTime();

    this.getData();
  },
  data() {
    return {
      selectedDateType: "all",
      driverInfoKeys: ["name", "phone", "email", "city", "address"],

      activeStatus: 0,
      statusList: "",
      activeCityId: 0,
      activeAreaId: 0,
      searchText: "",
      orders: [],
      currentPage: 0,
      totalPages: 0,
      driver: {},
    };
  },

  methods: {
    copy(key, event) {
      let driver = this.driver;
      let text =
        key == "city" && driver.city
          ? driver.city.name + "-" + driver.area.name
          : driver[key];

      navigator.clipboard.writeText(text);
      event.target.innerHTML = '<i class="fas fa-check"></i>';
      setTimeout(() => {
        event.target.innerHTML = '<i class="fas fa-copy"></i>';
      }, 1000);
    },
    activeStatusChange(val) {
      this.activeStatus = val;
      this.reloadData();
    },
    activeCityChange(val) {
      this.activeCityId = val;
      this.reloadData();
    },
    activeAreaChange(val) {
      this.activeAreaId = val;
      this.reloadData();
    },
    searchTextChange(val) {
      if (val) {
        this.searchText = val;
      } else {
        this.getData(1);
      }
    },
    changeActiveCard(id) {
      this.activeStatus = id;
      this.$refs["driverOrdersTable"].activeStatus = id;
    },

    reloadData() {
      this.getData(1);
      let id = this.$route.params.id;

      let selectedDate = this.selectedDateType;
      this.$axios
        .get(`/order_status/list?date=${selectedDate}&driver_id=${id}`)
        .then((res) => {
          let list = res.data.data;
          let counter = 0;
          let money = 0;
          for (let i = 0; i < list.length; i++) {
            counter += list[i].value;
            money += list[i].shipping_cost;
          }
          list.unshift({
            id: 0,
            name: " الكل",
            value: counter,
            shipping_cost: money,
          });

          this.statusList = list;
        });
    },
    getData(page = 1) {
      let id = this.$route.params.id;
      this.$axios
        .get(
          `/drivers/${id}/orders?page=${page}&city_id=${this.activeCityId}&area_id=${this.activeAreaId}&search=${this.searchText}&status_id=${this.activeStatus}&date=${this.selectedDateType}`
        )
        .then((res) => {
          this.driver = res.data.data.driver;
          let ordersData = res.data.data.orders;
          this.orders = ordersData.data;
          this.currentPage = ordersData.current_page;
          this.totalPages = ordersData.last_page;
        });
    },
  },
  watch: {
    selectedDateType(key) {
      this.selectedDateType = key;
      this.reloadData(1);
    },
  },
};
</script>
