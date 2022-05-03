
<template>
  <div
    class="fixed z-50 inset-0 overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
    @click="closeModal"
  >
    <div
      class="
        flex
         items-center
     
        justify-center
        min-h-screen
        pt-4
        px-4
        pb-20
        text-center
        sm:block sm:p-0
      "
    >
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      ></div>

      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
        >&#8203;</span
      >
      <div
        class="
          inline-block
          align-bottom
          bg-white
          rounded-lg
          text-left
          overflow-hidden
          shadow-xl
          transform
          transition-all
          sm:my-8 sm:align-middle sm:max-w-lg sm:w-full
        "
      >
        <div class="bg-white px-4 pb-4 w-full sm:pb-4">
          <div class="sm:flex sm:items-start text-right">
            <div class="w-full text-right">
              <div class="w-full flex flex-row justify-between items-center">
                <h3
                  class="
                    text-lg
                    w-full
                    border-b
                    leading-5
                    font-medium
                    text-gray-900
                    py-4
                  "
                  id="modal-title"
                >
                  حذف العنصر
                </h3>

                <i
                  data-feather="x"
                  @click="closeModal"
                  class="
                    report-box__icon
                    mb-1
                    ml-1
                    cursor-pointer
                    absolute
                    left-2
                    top-3
                  "
                ></i>
              </div>
              <div class="mt-4 pb-5 border-b">
                <p class="text-lg text-gray-600">
                  هل أنت متأكد من حذف {{ itemType }} ({{ name }})
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="px-4 pt-1 pb-4">
          <button
            @click="confirmSubmit(ids)"
            style="width: 80px"
            type="button"
            class="
              inline-flex
              justify-center
              rounded-md
              border border-transparent
              shadow-sm
              px-4
              py-2
              bg-red-600
              text-base
              font-medium
              text-white
              hover:bg-red-700
              focus:outline-none
              focus:ring-2
              focus:ring-offset-2
              focus:ring-red-500
              ml-3 sm:w-auto sm:text-sm
            "
          >
            نعم
          </button>
          <button
            @click="closeModal"
            style="width: 80px"
            type="button"
            class="
              mt-3
              w-full
              inline-flex
              justify-center
              rounded-md
              border border-gray-300
              shadow-sm
              px-4
              py-2
              bg-white
              text-base
              font-medium
              text-gray-700
              hover:bg-gray-50
              focus:outline-none
              focus:ring-2
              focus:ring-offset-2
              focus:ring-indigo-500
              sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm
            "
          >
            لا
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    // console.warn("itemId ::::", this.ids, this.name);
  },
  props: ["ids", "name", "itemType"],
  methods: {
    confirmSubmit(id) {
      this.$emit("confirmSubmit", id);
    },
    closeModal() {
      this.$emit("confirmCancelled");
    },
  },
};
</script>
