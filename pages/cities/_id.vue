<template>
  <div class="">
    <div class="p-3 flex flex-row justify-between w-full mb-2 h-16 px-0">
      <h2 class="font-medium text-3xl mt-1 text-right pr-0 w-full">
        تعديل محافظة
        <span dir="ltr" class="text-2xl mt-2"> "{{ oldName }}" </span>
      </h2>
      <GlobalBackButton class="md:hidden" />
    </div>
    <hr class="mt-3 mb-1" />

    <div class="justify-start mt-4 box p-5">
      <div class="flex flex-row flex-wrap md:flex-nowrap items-center">
        <div class="w-full md:w-2/3 mt-2">
          <label class="form-label">المحافظة</label>
          <input
            type="text"
            class="form-control"
            placeholder="المحافظة"
            v-model="selectedItem.name"
          />
        </div>
        <div class="w-full md:w-1/3 mt-2 md:mr-3">
          <label class="form-label">سعر الشحن</label>
          <input
            type="number"
            min="0"
            max="999999"
            class="form-control"
            placeholder="سعر الشحن"
            v-model="selectedItem.shipping_cost"
          />
        </div>
      </div>

      <div class="flex flex-row justify-end">
        <button @click="submit" class="btn btn-primary mt-5">حفظ</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "admin",
  middleware: ["authentication", "admin"],
  data() {
    return {
      oldName: "",
      selectedItem: {},
    };
  },
  mounted() {
    let itemId = this.$route.params.id;
    // get current item data
    this.$axios.get(`/cities/${itemId}`).then((res) => {
      this.selectedItem = res.data.data;
      this.oldName = this.selectedItem.name;
    });
  },
  methods: {
    submit() {
      let itemId = this.$route.params.id;
      this.$axios
        .put(`/cities/update/${itemId}`, this.selectedItem)
        .then((res) => {
          if (res.data.success) {
            this.showSuccesMessage("edit","تم التعديل بنجاح");
          }
        })
        .catch((err) => {
          let errorMessage= err.response.data.message;
            this.$toast.error(errorMessage);;
        });
    },
  },
};
</script>

<style></style>
