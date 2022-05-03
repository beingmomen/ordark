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
      <div
        class="relative bg-white rounded-lg shadow my-auto mt-44"
      >
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
            #{{ orderNumber }} إختر حالة الأوردر
          </h3>
        </div>

        <!-- if shifted date chosed -->
        <div class="select-date" v-show="selectedId == 3">
          <button
            class="m-3 absolute btn-primary p-3 border-2 rounded-lg border-blue-300"
            @click="backToStatusList"
          >
            العودة
          </button>
          <GlobalDatePicker
            v-model="shiftedToDate"
            :required="selectedId == 3"
          />
        </div>

        <!-- if shifted date chosed -->
        <!-- Modal body -->
        <div
          class="p-6 flex flex-row flex-wrap justify-center items-center flex-wrap"
          v-show="selectedId != 3"
        >
          <div
            class="cursor-pointer box rounded-full m-full md:w-1/3 mx-2 flex justify-center items-center w-full md:w-20 h-20 my-2 border-2 border-gray-200 text-xl"
            :class="{ 'bg-blue-600 text-white': status.id == selectedId }"
            v-for="status in statusesList.filter((x) => x.id > 0)"
            :key="status.id"
            @click="chooseItem(status.id)"
          >
            {{ status.name }}
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
            @click="updateOrderStatus"
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

    backToStatusList() {
      this.selectedId = 0;
      this.shiftedToDate = null;
    },
    updateOrderStatus() {
      this.$emit("update-status", this.orderId, this.selectedId);
    },
  },
  computed: {
    isDisableSaveButton() {
      if (!this.selectedId) return true;

      let shiftSelected = this.selectedId == 3;
      console.log("shiftSelected: ", shiftSelected);
      console.log("this.shiftedToDate: ", this.shiftedToDate);
      if (shiftSelected && !this.shiftedToDate) {
        return true;
      }

      return false;
      // return !this.selectedId || (shiftSelected && !this.shiftedToDate);
    },
  },
  data() {
    return {
      orderId: 0,
      orderNumber: 0,
      selectedId: 0,
      shiftedToDate: null,
    };
  },
};
</script>

<style lang="scss" scoped></style>
