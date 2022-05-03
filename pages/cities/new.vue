<template>
  <div class="">
    <div class="p-3 flex flex-row justify-between w-full mb-2 h-16 px-0">
      <h2 class="font-medium text-3xl mt-1 text-right pr-0 w-full">
        إضافة محافظة
      </h2>
        <GlobalBackButton class="md:hidden" />

    </div>
    <hr class="mt-3 mb-1" />

    <div class=" justify-start mt-4 box p-5">
      <div class="flex flex-row flex-wrap md:flex-nowrap items-center">

      <div class="w-full md:w-2/3 mt-2">
        <label class="form-label">المحافظة</label>
        <input
          type="text"
          class="form-control"
          placeholder="المحافظة"
          v-model="city"
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
          v-model="shippingCost"
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
      city: "",
      shippingCost: "",
    };
  },
  methods: {
    submit() {
      let data = {
        name: this.city,
        shipping_cost: this.shippingCost,
      };
      this.$axios
        .post(`cities/store`, data)
        .then((res) => {
          this.showSuccesMessage("add","تمت الإضافة بنجاح");
        })
        .catch((err) => {
          let errorMessage= err.response.data.message;
            this.$toast.error(errorMessage);;
        });
    },
  },
};
</script>

<style>
</style>
