<template>
  <div class="">
    <div class="p-3 flex flex-row justify-between w-full mb-2 h-16 px-0">
      <h2 class="font-medium text-3xl mt-1 text-right pr-0 w-full">
        إضافة أوردر
      </h2>
      <GlobalBackButton class="md:hidden" />
    </div>
    <hr class="mt-3 mb-1" />

    <div class="justify-start mt-4 box p-5 pt-3">
      <div class="w-full block sm:flex">
        <div class="w-full ml-2">
          <label class="form-label">الأوردر</label>
          <input
            type="text"
            class="form-control"
            placeholder="الأوردر"
            v-model="item"
          />
        </div>
      </div>

      <div class="w-full block sm:flex">
        <div class="mt-3 w-full sm:w-1/2 md:ml-2">
          <label class="form-label">المحافظة</label>
          <v-select
            v-model="selectedCity"
            @option:selected="selectedArea = 0"
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
            v-model="selectedArea"
            dir="rtl"
            :clearable="false"
            label="formattedName"
            :options="areasList.filter((x) => x.city_id == selectedCity)"
            :reduce="(city) => city.id"
            :selectable="(option) => !option.name.includes('كل')"
          ></v-select>
          <!-- :class=" item.city_id != selectedCity && selectedCity && item.id != 0
          ? 'hidden' : '' " -->
        </div>
      </div>
      <div class="w-full block sm:flex mt-3">
        <div class="mt-3 w-full ml-2 sm:w-1/3 mr-0 md:mr-2">
          <label class="form-label">الكمية</label>
          <input
            type="number"
            min="1"
            class="form-control"
            placeholder="الكمية"
            v-model="quantity"
          />
        </div>

        <div class="mt-3 w-full sm:w-1/3 ml-2">
          <label class="form-label">السعر(شامل مصاريف الشحن)</label>

          <input
            type="number"
            min="0"
            class="form-control"
            placeholder="السعر"
            v-model="money"
          />
        </div>
        <div class="mt-3 w-full sm:w-1/3 ml-2">
          <label class="form-label"
            >تاريخ الإستلام <span style="font-size: 12px">(سنة/يوم/شهر)</span>
          </label>

          <input
            required
            type="date"
            v-model="date"
            class="form-control"
            placeholder="dd-mm-yyyy"
            :min="getTodayDate"
            max="2100-12-31"
          />
        </div>
      </div>
      <div class="w-full block sm:flex mt-3">
        <div class="mt-3 w-full sm:w-1/2 ml-2">
          <label class="form-label">إسم العميل</label>
          <input
            type="text"
            class="form-control"
            placeholder="إسم العميل"
            v-model="clientName"
          />
        </div>

        <div class="mt-3 w-full sm:w-1/2 md:mr-2">
          <label class="form-label">رقم الهاتف</label>
          <input
            type="tel"
            class="form-control"
            placeholder="رقم الهاتف"
            v-model="clientPhone"
          />
        </div>
      </div>

      <div class="mt-3 w-full">
        <label class="form-label">العنوان</label>
        <textarea class="form-control" placeholder="العنوان" v-model="address">
        </textarea>
      </div>

      <div class="flex flex-row justify-end">
        <button @click="submit" class="btn btn-primary mt-5">حفظ</button>
      </div>
    </div>
  </div>
</template>

<script>
import VueDatePicker from "@mathieustan/vue-datepicker";
import "@mathieustan/vue-datepicker/dist/vue-datepicker.min.css";
export default {
  layout: "admin",
  middleware: ["authentication"],
  mounted() {
    let datepickers = document.getElementsByClassName("datepicker");
    // setTimeout(() =>{
    //   for (let index = 0; index < datepickers.length; index++) {
    //     const element = datepickers[index];
    //     new Litepicker({
    //       element: element,
    //       ...options,
    //     });
    //   }
    // },1000)
  },
  data() {
    return {
      selectedCity: "",
      selectedArea: "",
      item: "",
      quantity: 1,
      clientName: "",
      clientPhone: "",
      address: "",
      date: "",
      money: "",
    };
  },
  methods: {
    submit() {
      let data = {
        item: this.item,
        pickup_date: this.date >= this.getTodayDate ? this.date : null,
        quantity: this.quantity,
        money: this.money,
        name: this.clientName,
        phone: this.clientPhone,
        city_id: this.selectedCity,
        area_id: this.selectedArea,
        address: this.address,
      };

      // console.warn("order before submit ::::", data);
      // this.$axios.get
      this.$axios
        .post(`/orders/store`, data)
        .then((res) => {
          // console.warn("order res ::::", res);
          if (res.data.success) {
            this.showSuccesMessage("add", "تمت الإضافة بنجاح");
          }
        })
        .catch((err) => {
          // console.warn("orders error ::::", err);
          let errorMessage = err.response.data.message;
          this.$toast.error(errorMessage);
        });
    },
  },
};
</script>

<style></style>
