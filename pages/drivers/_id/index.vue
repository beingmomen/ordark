<template>
  <div class="">
    <div class="p-3 flex flex-row justify-between w-full mb-2 h-16 px-0">
      <h2 class="font-medium text-3xl mt-1 text-right pr-0 w-full">
        تعديل مندوب "{{ oldName }}"
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
          placeholder="الإسكندرية"
          v-model="selectedItem.name"
        />
      </div>

      <div class="mt-3">
        <label class="form-label">رقم الهاتف</label>
        <input
          type="tel"
          class="form-control"
          placeholder="رقم الهاتف"
          v-model="selectedItem.phone"
        />
      </div>
      <div class="mt-3">
        <label class="form-label">البريد الإلكتروني</label>
        <input
          type="email"
          class="form-control"
          placeholder="البريد الإلكتروني"
          v-model="selectedItem.email"
        />
      </div>

      <!-- <div class="mt-3">
        <label class="form-label">كلمة المرور</label>
        <input
          type="password"
          class="form-control"
          placeholder="كلمة المرور"
          v-model="selectedItem.password"
        />
      </div> -->

      <div class="mt-3">
        <label class="form-label">المحافظة</label>
        <v-select
          v-model="selectedItem.city_id"
          @option:selected="selectedItem.area_id = 0"
          dir="rtl"
          :clearable="false"
          label="name"
          :options="citiesList.filter((x) => !x.name.includes('كل'))"
          :reduce="(city) => city.id"
          :selectable="(option) => !option.name.includes('كل')"
        ></v-select>
      </div>
      <div class="mt-3">
        <label class="form-label">المحافظة</label>
        <v-select
          v-model="selectedItem.area_id"
          dir="rtl"
          :clearable="false"
          label="name"
          :options="areasList.filter((x) => x.city_id == selectedItem.city_id)"
          :reduce="(area) => area.id"
          :selectable="(option) => !option.name.includes('كل')"
        ></v-select>
      </div>

      <div class="mt-3">
        <label class="form-label">العنوان</label>
        <textarea
          class="form-control"
          placeholder="العنوان"
          v-model="selectedItem.address"
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

  mounted() {
    let itemId = this.$route.params.id;
    // get current item data
    this.$axios.get(`/drivers/${itemId}`).then((res) => {
      // console.warn(res.data);
      if (res.data.success) {
        this.selectedItem = res.data.data;
        this.oldName = this.selectedItem.name;
      }
    });
  },
  data() {
    return {
      oldName: "",
      selectedItem: {},
    };
  },
  methods: {
    submit() {
      let itemId = this.$route.params.id;
      this.$axios
        .put(`/drivers/update/${itemId}`, this.selectedItem)
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

<style>
</style>
