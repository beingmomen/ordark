<template>
  <div class="">
    <div class="p-3 flex flex-row justify-between w-full mb-2 h-16 px-0">
      <h2 class="font-medium text-3xl mt-1 text-right pr-0 w-full">
        إضافة منطقة
      </h2>
      <GlobalBackButton class="md:hidden" />
    </div>
    <hr class="mt-3 mb-1" />

    <div class="flex flex-col justify-start mt-4 box p-5">
      <div class="flex flex-row flex-wrap md:flex-nowrap">
        <div class="w-full md:w-2/4">
          <label class="form-label">المنطقة</label>
          <input
            type="text"
            class="form-control"
            placeholder="المنطقة"
            v-model="selectedArea"
          />
        </div>
        <div class="w-full md:w-1/4 md:mr-3 mt-3 md:mt-0 ">
          <label class="form-label">المحافظة</label>
          <v-select
          @option:selected="cityChanged"
            v-model="selectedCity"
            dir="rtl"
            :clearable="false"
            label="name"
            :options="citiesList.filter((x) => !x.name.includes('كل'))"
            :reduce="(city) => city.id"
            :selectable="(option) => !option.name.includes('كل')"
          ></v-select>
        </div>
        <div class="w-full md:w-1/4 md:mr-2 mt-3 md:mt-0">
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
      selectedArea: "",
      selectedCity: "",
      shippingCost: "",
    };
  },
  methods: {
    cityChanged(newValue){
      console.log("newValue: ", newValue);
      this.shippingCost = newValue.shipping_cost
    },
    submit() {
      let data = {
        name: this.selectedArea,
        city_id: this.selectedCity,
        shipping_cost: this.shippingCost,
      };

      this.$axios
        .post(`/areas/store`, data)
        .then((res) => {
          if (res.data.success) {
            this.showSuccesMessage("add","تمت الإضافة بنجاح");
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
