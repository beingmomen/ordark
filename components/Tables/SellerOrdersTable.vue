<template>
  <div>
    <!-- <h2 class="font-medium text-3xl mt-1 text-right pr-5">Orders</h2> -->
    <div class="pt-0">
      <div class="p-3 flex flex-row justify-between w-full mb-2 h-16 px-0">
        <h2 class="font-medium text-3xl mt-1 text-right pr-0 w-full md:w-3/4">
          الاوردرات
        </h2>

        <!-- <GlobalAddButton /> -->
      </div>

      <!-- <div class="flex flex-row w-full"> -->
      <div
        class="flex flex-row flex-wrap md:flex-nowrap justify-center mt-3 box py-4 px-2"
      >
        <div class="flex flex-col w-full md:w-1/5 ml-3">
          <label class="font-medium text-base mr-4 mb-2 mt-0">المحافظة</label>
          <v-select
            v-model="activeCity"
            @option:selected="activeArea = 0"
            dir="rtl"
            :clearable="false"
            label="name"
            :options="citiesList"
            :reduce="(city) => city.id"
          ></v-select>
        </div>
        <div class="flex flex-col w-full md:w-1/5 ml-3">
          <label class="font-medium text-base mr-4 mb-2 md:mt-0 mt-3"
            >المنطقة</label
          >

          <v-select
            v-model="activeArea"
            dir="rtl"
            :clearable="false"
            label="name"
            :options="
              activeCity
                ? areasList.filter(
                    (x, index) => x.city_id == activeCity || index == 0
                  )
                : areasList
            "
            :reduce="(city) => city.id"
          ></v-select>
        </div>

        <div class="flex flex-col w-full md:w-1/5 ml-3">
          <label class="font-medium text-base mr-4 mb-2 md:mt-0 mt-3"
            >الحالة</label
          >

          <v-select
            v-model="activeStatus"
            dir="rtl"
            :clearable="false"
            label="name"
            :options="statusesList"
            :reduce="(status) => status.id"
          ></v-select>
        </div>

        <div class="flex flex-col w-full md:w-2/5 ml-4">
          <label class="font-medium text-base mr-4 mb-2 md:mt-0 mt-3"
            >بحث</label
          >
          <input
            type="text"
            class="sm:block form-control pr-10 placeholder-theme-13 border-gray-300 rounded-full mr-0 md:mr-2"
            placeholder="رقم التتبع"
            v-model="searchText"
            @keyup.enter="handleSearchSubmit"
          />
        </div>
      </div>
      <!-- </div> -->
      <div class="mt-3">
        <div
          class="box p-4 overflow-x-auto hidden md:block"
          :class="{ 'table-parent': orders.length }"
        >
          <table class="table stripped bg-white" v-if="orders.length">
            <thead class="text-center">
              <tr>
                <th
                  v-for="col in user.type == 'admin' ? headers : headers"
                  :key="col"
                  class="border-b-2 dark:border-dark-5"
                  :class="
                    col == 'العنوان'
                      ? 'whitespace-normal w-80'
                      : 'whitespace-nowrap'
                  "
                >
                  {{ col }}
                </th>
              </tr>
            </thead>
            <tbody class="text-center">
              <tr
                v-for="(order, index) in orders"
                :key="order.id"
                :class="
                  order.status_id == 1
                    ? 'bg-green-100'
                    : order.status_id == 2
                    ? 'bg-red-100'
                    : order.status_id == 3
                    ? 'bg-yellow-100'
                    : ''
                "
              >
                <td class="border-b">
                  {{ index + 10 * (currentPage - 1) + 1 }}
                </td>
                <!-- chck if special fields -->
                <td
                  class="border-b whitespace-nowrap"
                  v-for="key in user.type == 'admin' ? rowKeys : rowKeys"
                  :key="key"
                >
                  <div
                    v-if="
                      key == 'client' ||
                      key == 'seller' ||
                      key == 'city' ||
                      key == 'status'
                    "
                  >
                    <p v-if="key == 'status'">
                      {{ order[key].name }}
                    </p>
                    <div class="flex flex-col" v-if="key == 'client'">
                      <p>
                        {{ order[key].name }}
                      </p>
                      <p>
                        {{ order[key].phone }}
                      </p>
                    </div>
                    <div
                      class="flex flex-col"
                      v-if="key == 'seller' && user.type == 'admin'"
                    >
                      <p>
                        {{
                          order["seller"]
                            ? order["seller"].name
                            : emptyTableValue
                        }}
                      </p>
                      <p>
                        {{ order["seller"] ? order["seller"].phone : "" }}
                      </p>
                    </div>
                    <div class="flex flex-col" v-if="key == 'city'">
                      <p class="font-bold">
                        {{ order[key].name }}
                      </p>
                      <p>
                        {{ order["area"] ? order["area"].name : "" }}
                      </p>
                    </div>
                  </div>
                  <div class="" v-else>
                    <div
                      v-if="
                        key != 'client_id' ||
                        key != 'seller_id' ||
                        key != 'city_id' ||
                        key != 'status_id'
                      "
                    >
                      <span
                        class="font-bold cursor-pointer text-blue-500 font-bold"
                        v-if="key == 'track_number'"
                        @click="
                          $router.push(
                            `/orders/track_number/${order.track_number}`
                          )
                        "
                      >
                        {{ order[key] }}
                      </span>
                      <p v-else-if="key == 'money'">
                        {{ order[key] }}
                        <span class="font-bold">
                          ({{ order["shipping_cost"] }})
                        </span>
                      </p>

                      <p
                        class="w-80 block whitespace-normal"
                        v-else-if="key == 'address'"
                      >
                        {{ order[key] }}
                      </p>

                      <span v-else>
                        {{ order[key] }}
                      </span>
                    </div>
                  </div>
                </td>

                <td class="border-b whitespace-wrap">
                  <!-- This example requires Tailwind CSS v2.0+ -->
                  <div class="relative inline-block text-left">
                    <div>
                      <button
                        @click="rowDotsClicked(order.id)"
                        type="button"
                        class="inline-flex justify-center w-full rounded-md px-4 py-2 text-sm text-blue-500 capitalize font-bold focus:outline-none"
                        :id="`menu-button${order.id}`"
                        aria-expanded="true"
                        aria-haspopup="true"
                      >
                        <i
                          class="fas fa-ellipsis-h"
                          style="font-size: 22px"
                        ></i>
                      </button>
                    </div>

                    <div
                      :class="openedOrdersMenuId == order.id ? '' : 'hidden'"
                      class="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="menu-button"
                      tabindex="-1"
                    >
                      <div class="py-1" role="none">
                        <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->

                        <div
                          href="#"
                          class="text-right text-gray-700 block px-4 py-2 font-medium hover:font-bold hover:bg-blue-600 hover:text-white"
                          role="menuitem"
                          tabindex="-1"
                          id="menu-item-0"
                          @click="$router.push($route.path + `/${order.id}`)"
                        >
                          تعديل
                        </div>

                        <div
                          @click="removeItem(order.id, order.track_number)"
                          href="#"
                          class="text-right text-gray-700 block px-4 py-2 font-medium hover:font-bold hover:bg-red-600 hover:text-white"
                          role="menuitem"
                          tabindex="-1"
                          id="menu-item-0"
                        >
                          حذف
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <no-data-found v-else />
        </div>

        <div class="block md:hidden" v-if="orders.length">
          <!-- add cards instead of table in the mobile -->

          <!-- index="9999" -->
          <CardsOrderCard
            v-for="(order, index) in orders"
            :key="order.id"
            :order="order"
            :index="index + 10 * (currentPage - 1) + 1"
            :openedOrdersMenuId="openedOrdersMenuId"
            :rowKeys="rowKeys"
            @closeMenu="closeMenu"
            @rowDotsClicked="rowDotsClicked"
            @openItem="openItem"
            @removeItem="removeItem"
            @confirmSubmit="confirmSubmit"
            @confirmCancelled="confirmCancelled"
          />
          <!-- XX add cards instead of table in the mobile XX -->
        </div>

        <div class="box p-4 overflow-x-auto block md:hidden" v-else>
          <no-data-found />
        </div>

        <GlobalConfirm
          v-show="confirm"
          @confirmSubmit="confirmSubmit"
          @confirmCancelled="confirmCancelled"
          :ids="orderId"
          :name="itemName"
          itemType=" الاوردر رقم "
        />

        <GlobalTablePagination
          :totalPages="driversTotalPages"
          :currentPage="currentPage"
          @loadPageNumber="loadPageNumber"
        />
      </div>
    </div>
  </div>
</template>

<script>
import "vue-select/dist/vue-select.css";
import NoDataFound from "../Global/NoDataFound.vue";
export default {
  components: { NoDataFound },
  mounted() {
    const feather = require("feather-icons");
    feather.replace();
    setTimeout(() => {
      this.activeStatus = this.handledActiveStatus;
      this.activeCity = this.handledActiveCity;
      this.activeArea = this.handledActiveArea;
      this.searchText = this.handledSearchText;

      // close menu if any element clicked
      document
        .getElementsByClassName("main")[0]
        .addEventListener("click", (e) => {
          let clickedElement = e.target.nodeName.toLowerCase();
          if (clickedElement != "i") {
            this.closeMenu();
          }
        });
    }, 100);
  },
  data() {
    return {
      openedOrdersMenuId: 0,
      activeStatus: 0,
      activeCity: 0,
      activeArea: 0,
      searchText: "",

      confirm: false,
      orderId: "",
      itemName: "",
    };
  },
  props: [
    "orders",
    "filters",
    "selectedFilter",
    "headers",
    "rowKeys",
    "pages",
    "currentPage",
    "totalPages",
    "cities",
    "areas",
    "statuses",
    "handledActiveStatus",
    "handledActiveCity",
    "handledActiveArea",
    "handledSearchText",
  ],
  methods: {
    loadPageNumber(number) {
      this.$emit("loadPage", number);
    },

    filtersChanged() {
      this.$emit("filtersChanged");
    },

    closeMenu() {
      this.openedOrdersMenuId = null;
    },
    rowDotsClicked(itemId) {
      if (this.openedOrdersMenuId == itemId) {
        this.closeMenu();
      } else {
        this.openedOrdersMenuId = itemId;
      }
    },
    openItem(itemId) {
      this.$router.push(this.$route.path + `/${itemId}`);
    },

    removeItem(id, name) {
      this.orderId = id;
      this.itemName = name;
      this.confirm = true;
    },

    confirmSubmit(id) {
      this.confirm = false;
      if (id) {
        this.$axios
          .delete(`/orders/delete/${id}`)
          .then((res) => {
            if (res.data.success) {
              this.showSuccesMessage("", "تم الحذف بنجاح");
              // this.loadPageNumber(this.currentPage);
              this.filtersChanged();
            }
          })
          .catch((err) => {
            let errorMessage = err.response.data.message;
            this.$toast.error(errorMessage);
          });
      }
    },
    confirmCancelled() {
      this.confirm = false;
    },
    handleSearchSubmit(event) {
      console.log("key code: ", event.keyCode);
      console.log(event.keyCode);
      if (event.keyCode == 13) {
        this.filtersChanged();
      }
    },
  },
  watch: {
    activeStatus(id) {
      this.$emit("activeStatus-changed", id);
      this.filtersChanged();
    },
    activeCity(id) {
      this.$emit("activeCity-changed", id);
      this.filtersChanged();
    },
    activeArea(id) {
      this.$emit("activeArea-changed", id);
      this.filtersChanged();
    },
    searchText(text) {
      this.$emit("searchText-changed", text);
    },
  },
};
</script>

<style>
select {
  background-position: center right 95% !important;
  padding-right: 15px !important;
}
</style>
