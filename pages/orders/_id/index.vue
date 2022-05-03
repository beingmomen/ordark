<template>
  <div class="">
    <div class="p-3 flex flex-row justify-between w-full mb-2 h-16 px-0">
      <h2 class="font-medium text-3xl mt-1 text-right pr-0 w-full">
        تعديل أوردر
        <span dir="ltr" class="text-2xl mt-2">
          "#{{ selectedOrder.track_number }}"</span
        >
      </h2>
      <GlobalBackButton class="md:hidden" />
    </div>
    <hr class="mt-3 mb-1" />

    <div class="justify-start mt-4 box p-5">
      <div class="w-full block sm:flex">
        <div class="w-full ml-2">
          <label class="form-label">الأوردر</label>
          <input
            type="text"
            class="form-control"
            placeholder="الأوردر"
            v-model="selectedOrder.item"
          />
        </div>
      </div>
      <div class="w-full block sm:flex">
        <div class="mt-3 w-full sm:w-1/3 ml-2">
          <label class="form-label"
            >تاريخ الإستلام <span style="font-size: 12px">(سنة/يوم/شهر)</span>
          </label>

          <input
            type="date"
            v-model="selectedOrder.pickup_date"
            class="form-control"
            :min="getTodayDate"
            max="2100-12-31"
            placeholder="dd-mm-yyyy"
          />
        </div>

        <div class="mt-3 w-full ml-2 sm:w-1/3 mr-0 md:md:mr-2">
          <label class="form-label">الكمية</label>
          <input
            type="number"
            min="1"
            class="form-control"
            placeholder="الكمية"
            v-model="selectedOrder.quantity"
          />
        </div>

        <div class="mt-3 w-full sm:w-1/3 ml-2">
          <label class="form-label">السعر</label>

          <input
            type="number"
            min="0"
            class="form-control"
            placeholder="السعر"
            v-model="selectedOrder.money"
          />
        </div>
      </div>
      <div class="w-full block sm:flex">
        <div class="mt-3 w-full sm:w-1/2 ml-2">
          <label class="form-label">إسم العميل</label>
          <input
            type="text"
            class="form-control"
            placeholder="إسم العميل"
            v-model="selectedOrder.client_name"
          />
        </div>

        <div class="mt-3 w-full sm:w-1/2 md:mr-2">
          <label class="form-label">رقم الهاتف</label>
          <input
            type="text"
            class="form-control"
            placeholder="رقم الهاتف"
            v-model="selectedOrder.phone"
          />
        </div>
      </div>
      <div class="w-full block sm:flex">
        <div class="mt-3 w-full sm:w-1/2 ml-2">
          <label class="form-label">المحافظة</label>

          <v-select
            v-model="selectedOrder.city_id"
            @option:selected="selectedOrder.area_id = 0"
            dir="rtl"
            :clearable="false"
            label="name"
            :options="citiesList.filter((x) => !x.name.includes('كل'))"
            :reduce="(city) => city.id"
            :selectable="(option) => !option.name.includes('كل')"
          ></v-select>
        </div>
        <div class="mt-3 w-full sm:w-1/2 md:mr-2">
          <label class="form-label">المنطقة</label>

          <v-select
            v-model="selectedOrder.area_id"
            dir="rtl"
            :clearable="false"
            label="name"
            :options="
              areasList.filter((x) => x.city_id == selectedOrder.city_id)
            "
            :reduce="(city) => city.id"
            :selectable="(option) => !option.name.includes('كل')"
          ></v-select>
        </div>
      </div>
      <div class="mt-3 w-full">
        <label class="form-label">العنوان</label>
        <textarea
          class="form-control"
          placeholder="العنوان"
          v-model="selectedOrder.address"
        >
        </textarea>
      </div>

      <div class="flex flex-row justify-end">
        <button class="btn btn-primary mt-5">حفظ</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "admin",
  middleware: ["authentication"],
  validate({ params }) {
    console.log("params: ", params)
    // Must be a number
    return /^\d+$/.test(params.id);
  },
  beforeCreate() {
    if (isNaN(this.$route.params.id)) {
      this.$router.push("/orders");
    }
  },
  mounted() {
    let itemId = this.$route.params.id;

    // get current item data
    this.$axios.get(`/orders/${itemId}`).then((res) => {
      // console.warn(res.data);
      if (res.data.success) {
        this.selectedOrder = res.data.data;
        this.oldName = this.selectedOrder.name;
        this.selectedOrder.client_name = "";
        if (this.selectedOrder.client) {
          this.selectedOrder.client_name = this.selectedOrder.client.name;
        }

        // console.warn("selectedOrder: ", this.selectedOrder);
      }
    });
  },
  data() {
    return {
      oldName: "",
      selectedOrder: {},
    };
  },
};
</script>

<style></style>
