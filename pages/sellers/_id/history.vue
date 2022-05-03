<template>
  <div class="">
    <div class="p-3 flex flex-row justify-between w-full h-16 px-0">
      <h2 class="font-medium text-3xl mt-1 text-right pr-0 w-3/4">
        سجل البائع {{ seller.name }}
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
        v-for="key in sellerInfoKeys"
        :key="key"
        :infoKey="key"
        :seller="seller"
      />
    </div>

    <hr class="mt-3 mb-1" />

    <div
      class="md:hidden flex flex-col w-full ml-3 mt-4"
      style="min-width: 110px"
    >
      <v-select
        class="form-select sm:mr-2 bg-white capitalize"
        v-model="selectedDateType"
        aria-label="Default select example"
        :options="ordersDateList"
        :clearable="false"
        label="text"
        :reduce="(item) => item.key"
      >
      </v-select>
    </div>

    <!-- <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12 2xl:col-span-9">
        <div class="grid grid-cols-12 gap-6">
          <div class="col-span-12">
            <div class="grid grid-cols-12 gap-6 mt-3">
              <InfoCard
                v-for="(card, index) in sellerStatusList"
                :key="'first' + index"
                :id="card.id"
                :title="card.name"
                :value="card.value"
                icon="dollar-sign"
                :percentage="
                  index != 0 ? (card.value / sellerStatusList[0].value) * 100 : null
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
    <hr class="mt-10" /> -->
    <div>
      <!-- table -->
      <SellerOrdersTable
        ref="sellerOrdersTable"
        :orders="orders"
        :currentPage="currentPage"
        :totalPages="totalPages"
        :headers="getSellerOrdersColumns"
        :rowKeys="getSellerOrdersKeys"
        @loadPage="getData"
        @statusChanged="changeActiveCard"
        @filtersChanged="reloadData"
        statuses="sellerStatusList"
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
import SellerOrdersTable from "~/components/Tables/SellerOrdersTable.vue";
export default {
  components: { InfoCard, FastSearch, SellerOrdersTable },
  layout: "admin",
  middleware: ["authentication"],

  mounted() {
    const feather = require("feather-icons");
    feather.replace();
    this.updateTime();

    this.getData().then(this.getStatusList());
  },
  data() {
    return {
      selectedDateType: "all",
      
      sellerInfoKeys: ["name", "phone", "email", "city", "address"],
      activeStatus: 0,
      sellerStatusList: "",
      activeCityId: 0,
      activeAreaId: 0,
      searchText: "",
      orders: [],
      currentPage: 0,
      totalPages: 0,
      seller: {},
    };
  },

  methods: {
    copy(key, event) {
      let seller = this.seller;
      let text =
        key == "city" && seller.city
          ? seller.city.name + "-" + seller.area.name
          : seller[key];

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
      this.$refs["sellerOrdersTable"].activeStatus = id;
    },

    reloadData() {
      this.getData(1).then(this.getStatusList());
    },
    getStatusList() {
      let id = this.$route.params.id;
      console.log("id: ", id);
      let selectedDate = this.selectedDateType;
      this.$axios
        .get(
          `/order_status/list?date=${selectedDate}&city_id=${this.activeCityId}&area_id=${this.activeAreaId}&search=${this.searchText}&status_id=${this.activeStatus}&seller_id=${id}`
        )
        .then((res) => {
          let list = res.data.data;
          let counter = 0;
          let money = 0;
          for (let i = 0; i < list.length; i++) {
            counter += list[i].value;
            money += list[i].shipping_cost;
          }
          // get seller all orders status from the global sellerStatusList
          list.unshift({
            id: 0,
            name: " الكل",
            value: counter,
            shipping_cost: money,
          });

          this.sellerStatusList = list;
        });
    },
    getData(page = 1) {
      let id = this.$route.params.id;
      return this.$axios
        .get(
          `/sellers/${id}/orders?page=${page}&city_id=${this.activeCityId}&area_id=${this.activeAreaId}&search=${this.searchText}&status_id=${this.activeStatus}&date=${this.selectedDateType}&seller_id=${id}`
        )
        .then((res) => {
          this.seller = res.data.data.seller;
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
