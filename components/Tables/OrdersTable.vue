<template>
  <div>
    <!-- <h2 class="font-medium text-3xl mt-1 text-right pr-5">Orders</h2> -->
    <div class="pt-0">
      <div class="p-3 flex flex-row justify-between w-full mb-2 h-16 px-0">
        <h2 class="font-medium text-3xl mt-1 text-right pr-0 w-full md:w-3/4">
          الأوردرات
        </h2>

        <GlobalAddButton />
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

      <update-status-modal
        ref="statusModal"
        :showModal="showStatusModal"
        @update-status="updateOrderStatus"
        @close="closeStatusModal"
      />

      <update-driver-modal
        ref="driverModal"
        :showModal="showDriverModal"
        @update-driver="updateOrderDriver"
        @close="closeDriverModal"
      />

      <!-- </div> -->
      <div class="mt-3">
        <div
          class="box p-4 overflow-x-auto hidden md:block"
          :class="{ 'table-parent': loadedOrders.length }"
        >
          <table class="table stripped bg-white" v-if="loadedOrders.length">
            <thead class="text-center">
              <tr>
                <th
                  v-for="col in user.type == 'admin'
                    ? headers
                    : headers.filter((x) => x != 'البائع')"
                  :key="col"
                  class="border-b-2 dark:border-dark-5 whitespace-nowrap"
                >
                  {{ col }}
                </th>
              </tr>
            </thead>
            <tbody class="text-center">
              <tr
                v-for="(order, index) in loadedOrders"
                :key="order.id"
                :class="getOrderColorClasses(order.status_id)"
              >
                <td class="border-b">
                  {{ index + 10 * (ordersCurrentPage - 1) + 1 }}
                </td>
                <!-- chck if special fields -->
                <td
                  class="border-b whitespace-nowrap"
                  v-for="key in user.type == 'admin'
                    ? rowKeys
                    : rowKeys.filter((x) => x != 'seller')"
                  :key="key"
                >
                  <div
                    v-if="
                      key == 'client' ||
                      key == 'seller' ||
                      key == 'city' ||
                      key == 'driver' ||
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
                      v-if="
                        (key == 'seller' || key == 'driver') &&
                        user.type == 'admin'
                      "
                    >
                      <nuxt-link
                        v-if="order[key] && order[key].id"
                        :to="
                          key == 'seller'
                            ? `/sellers/${
                                order[key] ? order[key].id : null
                              }/history`
                            : key == 'driver'
                            ? `/drivers/${
                                order[key] ? order[key].id : null
                              }/history`
                            : ''
                        "
                        class="text-blue-500 font-bold"
                        title="عرض أوردرات البائع"
                      >
                        {{ order[key] ? order[key].name : emptyTableValue }}
                      </nuxt-link>
                      <p v-else>
                        {{ order[key] ? order[key].name : emptyTableValue }}
                      </p>
                      <p>
                        {{ order[key] ? order[key].phone : "" }}
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
                        key != 'driver_id' ||
                        key != 'status_id'
                      "
                    >
                      <span
                        class="font-bold cursor-pointer text-blue-500 font-bold"
                        v-if="key == 'track_number'"
                        @click="
                          $router.push(
                            $route.path + `/track_number/${order.track_number}`
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
                          class="cursor-pointer text-right text-gray-700 block px-4 py-2 font-medium hover:font-bold hover:bg-blue-600 hover:text-white"
                          role="menuitem"
                          tabindex="-1"
                          id="menu-item-0"
                          @click="$router.push($route.path + `/${order.id}`)"
                        >
                          تعديل
                        </div>
                        <div
                          :class="{
                            'not-allowed-pointer':
                              order.cancelled_date || order.delieverd_date,
                          }"
                        >
                          <div
                            href="#"
                            class="cursor-pointer text-right text-gray-700 block px-4 py-2 font-medium hover:font-bold hover:bg-green-500 hover:text-white"
                            :class="
                              ({ 'disible-action': order.cancelled_date },
                              { 'disible-action': order.delieverd_date })
                            "
                            role="menuitem"
                            tabindex="-1"
                            id="menu-item-0"
                            @click="
                              openStatusModal(order.id, order.track_number)
                            "
                          >
                            تغير الحالة
                          </div>
                        </div>
                        <div
                          :class="{
                            'not-allowed-pointer':
                              order.cancelled_date || order.delieverd_date,
                          }"
                        >
                          <div
                            href="#"
                            class="cursor-pointer text-right text-gray-700 block px-4 py-2 font-medium hover:font-bold hover:bg-green-500 hover:text-white"
                            :class="
                              ({ 'disible-action': order.cancelled_date },
                              { 'disible-action': order.delieverd_date })
                            "
                            role="menuitem"
                            tabindex="-1"
                            id="menu-item-0"
                            @click="
                              openDriverModal(
                                order.id,
                                order.track_number,
                                order.city_id
                              )
                            "
                          >
                            تغير المندوب
                          </div>
                        </div>

                        <div
                          @click="removeItem(order.id, order.track_number)"
                          href="#"
                          class="cursor-pointer text-right text-gray-700 block px-4 py-2 font-medium hover:font-bold hover:bg-red-600 hover:text-white"
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

        <div class="block md:hidden" v-if="loadedOrders.length">
          <!-- add cards instead of table in the mobile -->

          <!-- index="9999" -->
          <CardsOrderCard
            v-for="(order, index) in loadedOrders"
            :key="order.id"
            :order="order"
            :index="index + 10 * (ordersCurrentPage - 1) + 1"
            :openedOrdersMenuId="openedOrdersMenuId"
            :rowKeys="rowKeys"
            @closeMenu="closeMenu"
            @rowDotsClicked="rowDotsClicked"
            @openItem="openItem"
            @removeItem="removeItem"
            @confirmSubmit="confirmSubmit"
            @confirmCancelled="confirmCancelled"
            @closeStatusModal="closeStatusModal"
            @openStatusModal="openStatusModal"
            @openDriverModal="openDriverModal"
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
          :totalPages="ordersTotalPages"
          :currentPage="ordersCurrentPage"
          @loadPageNumber="loadPageNumber"
        />
        
      </div>
    </div>
  </div>
</template>

<script>
import "vue-select/dist/vue-select.css";
import NoDataFound from "../Global/NoDataFound.vue";
import UpdateDriverModal from "../Modals/UpdateDriverModal.vue";
import UpdateStatusModal from "../Modals/UpdateStatusModal.vue";
export default {
  components: { NoDataFound, UpdateStatusModal, UpdateDriverModal },
  mounted() {
    this.$store.dispatch('global/loadDriversList')
    const feather = require("feather-icons");
    feather.replace();
    setTimeout(() => {
      this.activeStatus = this.ordersSelectedStatusId;
      this.activeCity = this.ordersSelectedCityId;
      this.activeArea = this.ordersSelectedAreaId;
      this.searchText = this.ordersSearchText;

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
      showStatusModal: false,
      showDriverModal: false,

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
    "cities",
    "areas",
    "statuses",
  ],
  methods: {
    closeStatusModal() {
      this.showStatusModal = false;
    },
    closeDriverModal() {
      this.showDriverModal = false;
    },

    openStatusModal(orderId, orderTrackNumber) {
      this.showStatusModal = true;
      this.$refs["statusModal"].orderId = orderId;
      this.$refs["statusModal"].orderNumber = orderTrackNumber;
    },

    openDriverModal(orderId, orderTrackNumber, cityId) {
      this.showDriverModal = true;
      this.$refs["driverModal"].cityId = cityId;
      this.$refs["driverModal"].orderId = orderId;
      this.$refs["driverModal"].orderNumber = orderTrackNumber;
    },
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

    updateOrderStatus(orderId, statusId) {
      this.$axios
        .put(`/orders/update-status/${orderId}`, {
          status_id: statusId,
        })
        .then((res) => {
          if (res.data.success) {
            this.showSuccesMessage("", "تم تحديث الحالة بنجاح");
            this.$refs["statusModal"].backToStatusList();
            // this.loadPageNumber(this.currentPage);
            this.filtersChanged();
          }
        })
        .catch((err) => {
          let errorMessage = err.response.data.message;
          this.$toast.error(errorMessage);
        })
        .finally(() => {
          this.showStatusModal = false;
        });
    },

    updateOrderDriver(orderId, driverId) {
      this.$axios
        .put(`/orders/update-driver/${orderId}`, {
          driver_id: driverId,
        })
        .then((res) => {
          if (res.data.success) {
            this.showSuccesMessage("", "تم تحديث المندوب بنجاح");
            this.filtersChanged();
            // this.loadPageNumber(this.currentPage);
          }
        })
        .catch((err) => {
          let errorMessage = err.response.data.message;
          this.$toast.error(errorMessage);
        })
        .finally(() => {
          this.showDriverModal = false;
        });
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
      console.log(event.keyCode);
      if (event.keyCode == 13) {
        this.filtersChanged();
      }
    },
    // trackNumber(trackNumber) {
    //   console.warn("trackNumber ::::", trackNumber);
    // },
  },
  watch: {
    activeStatus(id) {
      this.$store.commit("orders/updateActiveStatus", id);
      this.filtersChanged();
    },
    activeCity(id) {
      this.$store.commit("orders/updateActiveCity", id);
      this.filtersChanged();
    },
    activeArea(id) {
      this.$store.commit("orders/updateActiveArea", id);
      this.filtersChanged();
    },
    searchText(text) {
      this.$store.commit("orders/updateSearchText", text);
      if (text.trim() == "") this.filtersChanged();
    },
  },
};
</script>

<style>
select {
  background-position: center right 95% !important;
  padding-right: 15px !important;
}
.not-allowed-pointer {
  cursor: not-allowed !important;
}

.disible-action {
  pointer-events: none;
}
</style>
