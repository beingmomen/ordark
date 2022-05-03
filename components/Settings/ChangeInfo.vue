<template>
  <div class="w-full flex flex-col-reverse xl:flex-row flex-col mt-2">
    <form @submit.prevent="submit" class="w-full">
      <div class="flex-1 box p-5 mt-2">
        <div class="grid grid-cols-12 gap-x-5">
          <div
            class="col-span-12 w-full flex items-center pb-5 border-b border-gray-200 dark:border-dark-5"
          >
            <h2 class="font-bold text-base ml-auto">تحديث البيانات</h2>
          </div>
          <div class="col-span-12 2xl:col-span-6">
            <div class="mt-3">
              <label class="form-label">الإسم</label>
              <input
                type="text"
                class="form-control"
                placeholder="الإسم"
                v-model="userName"
              />
            </div>

            <div class="mt-3">
              <label class="form-label">المحافظة</label>
              <v-select
                v-model="userCity"
                dir="rtl"
                :clearable="false"
                label="name"
                :options="citiesList.filter((x) => !x.name.includes('كل'))"
                :reduce="(city) => city.id"
                :selectable="(option) => !option.name.includes('كل')"
              ></v-select>
            </div>
          </div>
          <div class="col-span-12 2xl:col-span-6">
            <div class="mt-3">
              <label class="form-label">رقم الهاتف</label>
              <input
                type="text"
                class="form-control"
                placeholder="رقم الهاتف"
                v-model="userPhone"
              />
            </div>
            <div class="mt-3">
              <label class="form-label">المنطقة</label>
              <v-select
                v-model="userArea"
                dir="rtl"
                :clearable="false"
                label="name"
                :options="areasList.filter((x) => x.city_id == userCity)"
                :reduce="(city) => city.id"
                :selectable="(option) => !option.name.includes('كل')"
              ></v-select>
            </div>
          </div>
          <div class="col-span-12">
            <div class="mt-3">
              <label class="form-label">العنوان</label>
              <textarea
                class="form-control"
                placeholder="العنوان"
                v-model="userAddress"
              >
              </textarea>
            </div>
          </div>
        </div>

        <div class="flex w-full mt-4 justify-end">
          <button type="submit" class="btn btn-primary w-20">حفظ</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  mounted() {
    setTimeout(() => {
      // console.warn("this.$store.state: ", this.$store.state);
    }, 200);
  },
  data() {
    return {
      userCity: this.$store.state.auth.user.city_id,
      userArea: this.$store.state.auth.user.area_id,
      userName: this.$store.state.auth.user.name,
      userPhone: this.$store.state.auth.user.phone,
      userAddress: this.$store.state.auth.user.address,
    };
  },
  methods: {
    submit() {
      let data = {
        name: this.userName,
        city_id: this.userCity,
        area_id: this.userArea,
        phone: this.userPhone,
        address: this.userAddress,
      };
      this.$emit("submit", data);
    },
  },
};
</script>

<style></style>
