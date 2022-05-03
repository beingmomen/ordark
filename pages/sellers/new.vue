<template>
  <div class="">
    <div class="p-3 flex flex-row justify-between w-full mb-2 h-16 px-0">
      <h2 class="font-medium text-3xl mt-1 text-right pr-0 w-full">
        إضافة بائع
      </h2>
      <GlobalBackButton class="md:hidden" />
    </div>
    <hr class="mt-3 mb-1" />

    <div class="justify-start mt-4 box p-5 pt-3">
      <div>
        <label class="form-label">الإسم</label>
        <input
          type="text"
          class="form-control"
          placeholder="الإسم"
          v-model="selectedName"
        />
      </div>

      <div class="mt-3">
        <label class="form-label">رقم الهاتف</label>
        <input
          type="tel"
          class="form-control"
          placeholder="رقم الهاتف"
          v-model="selectedPhone"
        />
      </div>
      <div class="mt-3">
        <label class="form-label">البريد الإلكتروني</label>
        <input
          type="email"
          class="form-control"
          placeholder="البريد الإلكتروني"
          v-model="selectedEmail"
        />
      </div>
      <div class="mt-3">
        <label class="form-label">كلمة المرور</label>
        <input
          type="password"
          class="form-control"
          placeholder="كلمة المرور"
          v-model="selectedPassword"
        />
      </div>

      <div class="mt-3">
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

      <div class="mt-3">
        <label class="form-label">المنطقة</label>
        <v-select
          v-model="selectedArea"
          dir="rtl"
          :clearable="false"
          label="name"
          :options="
            selectedCity
              ? areasList.filter((x) => x.city_id == selectedCity)
              : areasList
          "
          :reduce="(city) => city.id"
          :selectable="(option) => !option.name.includes('كل')"
        ></v-select>
      </div>

      <div class="mt-3">
        <label class="form-label">العنوان</label>
        <textarea
          class="form-control"
          placeholder="العنوان"
          v-model="selectedAddress"
        >
        </textarea>
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
      selectedName: "",
      selectedPhone: "",
      selectedEmail: "",
      selectedPassword: "",
      selectedCity: "",
      selectedArea: "",
      selectedAddress: "",
    };
  },
  methods: {
    submit() {
      // console.warn("this.selectedCity ::::", this.selectedCity);
      let data = {
        name: this.selectedName,
        phone: this.selectedPhone,
        email: this.selectedEmail,
        password: this.selectedPassword,
        city_id: this.selectedCity,
        area_id: this.selectedArea,
        address: this.selectedAddress,
        password: this.selectedPassword,
      };

      this.$axios
        .post(`/sellers/store`, data)
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
