<template>
  <!-- Main modal -->
  <div
    dir="ltr"
    id="defaultModal"
    aria-hidden="true"
    :class="{ hidden: !showModal }"
    class="overflow-y-auto flex overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center h-modal md:h-full md:inset-0"
    style="z-index: 99; background: rgba(0, 0, 0, 0.5)"
  >
    <div class="relative px-4 w-full max-w-2xl h-screen">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow my-auto mt-44">
        <!-- Modal header -->
        <div
          class="flex justify-between items-start p-5 rounded-t border-b dark:border-gray-600"
        >
          <button
            @click="closeModal"
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 mق-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-toggle="defaultModal"
          >
            <svg
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>

          <h3
            class="text-xl font-semibold text-gray-900 lg:text-2xl dark:text-white"
          >
            #{{ orderNumber }} إختر مندوب الشحن
          </h3>
        </div>

        <!-- Modal body -->
        <div
          class="p-6 flex flex-row flex-wrap justify-center items-center flex-wrap"
        >
          <div
            class="flex items-center justify-center flex-row flex-wrap w-full mb-4 border-b pb-4"
          >
            <button
              class="btn mx-2 rounded-full px-10"
              :class="
                showAllDriver
                  ? 'bg-blue-600 text-white'
                  : 'text-blue-600 bg-white'
              "
              @click="showAllDriver = true"
            >
              اظهار الكل
            </button>
            <button
              class="mx-2 rounded-full px-10 btn"
              :class="
                !showAllDriver
                  ? 'bg-blue-600 text-white'
                  : 'text-blue-600 bg-white'
              "
              @click="showAllDriver = false"
            >
              {{orderCityName}}
            </button>
          </div>
          <div
            class="cursor-pointer box rounded-full m-full md:w-1/3 mx-2 flex justify-center items-center w-full md:w-20 h-20 my-2 border-2 border-gray-200 text-xl"
            v-for="driver in availableDrivers"
            :key="driver.id"
            @click="chooseItem(driver.id)"
            :class="{ 'bg-blue-600 text-white': driver.id == selectedId }"
          >
            {{ driver.name }}
          </div>

          <div
            class="text-gray-400 w-full flex items-center justify-center h-8 text-2xl"
            v-if="!availableDrivers.length"
          >
            لا يوجد أي مندوب في هذه المحافظة
          </div>
        </div>
        <!-- Modal footer -->
        <div
          class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600"
        >
          <button
            :disabled="isDisableSaveButton"
            data-modal-toggle="defaultModal"
            type="button"
            class="text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            :class="!isDisableSaveButton ? 'bg-blue-700' : 'bg-gray-200'"
            @click="updateOrderDriver"
          >
            حفظ
          </button>
          <button
            data-modal-toggle="defaultModal"
            @click="closeModal"
            type="button"
            class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["showModal"],
  methods: {
    closeModal() {
      this.selectedId = 0;
      this.$emit("close");
    },
    chooseItem(id) {
      this.selectedId = id;
    },

    backToDriverList() {
      this.selectedId = 0;
    },
    updateOrderDriver() {
      this.$emit("update-driver", this.orderId, this.selectedId);
    },
  },
  computed: {
    isDisableSaveButton() {
      if (!this.selectedId) return true;

      return false;
    },
    availableDrivers() {
      if (this.showAllDriver) {
        return this.driversList
        .filter((x) => x.id > 0)
      }

      return this.driversList
        .filter((x) => x.id > 0)
        .filter((x) => x.city_id == this.cityId);
    },

    orderCityName(){
      let selectedCity = this.citiesList.find(x=>x.id == this.cityId)
      if (!selectedCity) return ""
      return selectedCity.name
    }
  },
  data() {
    return {
      cityId: null,
      orderId: 0,
      orderNumber: 0,
      selectedId: 0,
      showAllDriver: false,
    };
  },
};
</script>

<style lang="scss" scoped></style>
