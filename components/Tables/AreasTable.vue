<template>
  <div>
    <!-- <h2 class="font-medium text-3xl mt-1 text-right pr-5">Orders</h2> -->
    <div class="pt-0">
      <div class="p-3 flex flex-row justify-between w-full mb-2 h-16 px-0">
        <h2 class="font-medium text-3xl mt-1 text-right pr-0 w-full md:w-3/4">
          المناطق
        </h2>
        <GlobalBackButton class="md:hidden" />

        <GlobalAddButton />
      </div>
      <hr class="mt-3 mb-1" />

      <div
        class="flex flex-row flex-wrap md:flex-nowrap justify-center mt-4 box py-4 px-2"
      >
        <div class="flex flex-col w-full md:w-1/5 ml-2">
          <label class="font-medium text-base mr-4 mb-2 mt-0">المحافظة</label>
          <v-select
            class="mr-2"
            v-model="activeCity"
            dir="rtl"
            :clearable="false"
            label="name"
            :options="citiesList"
            :reduce="(city) => city.id"
          ></v-select>
        </div>

        <div class="flex flex-col w-full md:w-4/5 ml-3">
          <label class="font-medium text-base mr-4 mb-2 md:mt-0 mt-3"
            >بحث</label
          >
          <input
            type="text"
            class="sm:block form-control pr-10 placeholder-theme-13 border-gray-300 rounded-full mr-2"
            placeholder=" إسم المنطقة "
            v-model="searchText"
            @keyup.enter="handleSearchSubmit"
          />
        </div>
      </div>
      <div class="mt-3">
        <div
          class="box p-4 overflow-x-auto  hidden md:block"
          :class="{ 'table-parent': areasData.length }"
        >
          <table class="table bg-white" v-if="areasData.length">
            <thead class="text-center">
              <tr>
                <th
                  v-for="col in headers"
                  :key="col"
                  class="border-b-2 dark:border-dark-5 whitespace-nowrap"
                >
                  {{ col }}
                </th>
              </tr>
            </thead>
            <tbody class="text-center">
              <tr
                v-for="(area, index) in areasData"
                :key="area.id"
                :class="index % 2 == 0 ? 'bg-gray-100' : ''"
              >
                <td class="border-b">
                  {{ index + 10 * (areasCurrentPage - 1) + 1 }}
                </td>

                <!-- chck if special fields -->

                <td
                  class="border-b whitespace-nowrap"
                  v-for="key in rowKeys"
                  :key="key"
                >
                  <div class="">
                    <p v-if="key == 'city'">
                      {{ area[key].name }}
                    </p>
                    <p v-else>
                      {{ area[key] }}
                    </p>
                  </div>
                </td>

                <td class="border-b whitespace-wrap">
                  <!-- This example requires Tailwind CSS v2.0+ -->
                  <div class="relative inline-block text-left">
                    <div>
                      <button
                        type="button"
                        @click="rowDotsClicked(area.id)"
                        class="inline-flex justify-center w-full rounded-md px-4 py-2 text-sm text-blue-500 capitalize font-bold focus:outline-none"
                        :id="`menu-button${area.id}`"
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
                      :class="openedAreasMenuId == area.id ? '' : 'hidden'"
                      class="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="menu-button"
                      tabindex="-1"
                    >
                      <div class="py-1" role="none">
                        <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->

                        <div
                          class="text-right text-gray-700 block px-4 py-2 font-medium hover:font-bold hover:bg-blue-600 hover:text-white"
                          role="menuitem"
                          tabindex="-1"
                          id="menu-item-0"
                          @click="$router.push($route.path + `/${area.id}`)"
                        >
                          تعديل
                        </div>

                        <div
                          @click="removeItem(area.id, area.name)"
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
          <NoDataFound v-else />
        </div>

        <div class="block md:hidden" v-if="areasData.length">
          <!-- add cards instead of table in the mobile -->

          <!-- index="9999" -->
          <CardsAreaCard
            v-for="(area, index) in areasData"
            :key="area.id"
            :area="area"
            :index="index + 10 * (areasCurrentPage - 1) + 1"
            :openedAreasMenuId="openedAreasMenuId"
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
          :ids="areaId"
          :name="itemName"
          itemType="المنطقة"
        />



        <GlobalTablePagination
          :totalPages="areasTotalPages"
          :currentPage="areasCurrentPage"
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
      this.searchText = this.areasSearchText;
      this.activeCity = this.areasSelectedCityId;
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
      openedAreasMenuId: 0,
      activeCity: 0,
      searchText: "",

      confirm: false,
      areaId: "",
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
    "areas",
    "areas",
    "areas",
  ],
  methods: {
    loadPageNumber(number) {
      this.$emit("loadPage", number);
    },

    filtersChanged() {
      this.$emit("filtersChanged");
    },
    closeMenu() {
      this.openedAreasMenuId = null;
    },
    rowDotsClicked(itemId) {
      if (this.openedAreasMenuId == itemId) {
        this.closeMenu();
      } else {
        this.openedAreasMenuId = itemId;
      }
    },
    openItem(itemId) {
      this.$router.push(this.$route.path + `/${itemId}`);
    },

    removeItem(id, name) {
      this.areaId = id;
      this.itemName = name;
      this.confirm = true;
    },

    confirmSubmit(id) {
      this.confirm = false;
      if (id) {
        this.$axios
          .delete(`/areas/delete/${id}`)
          .then((res) => {
            if (res.data.success) {
              this.showSuccesMessage("","تم الحذف بنجاح");
              this.loadPageNumber(this.currentPage);
            }
          })
          .catch((err) => {
            let errorMessage= err.response.data.message;
            this.$toast.error(errorMessage);
          });
      }
    },
    confirmCancelled() {
      this.confirm = false;
    },handleSearchSubmit(event){
console.log(event.keyCode);
if(event.keyCode ==13){
this.filtersChanged()
}
}
  },
  watch: {
    searchText(text) {
      this.$store.commit("areas/updateAreasSearch", text);
      if (!text) this.filtersChanged();
    },
    activeCity(id) {
      this.$store.commit("areas/updateActiveCity", id);
      this.filtersChanged();
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
