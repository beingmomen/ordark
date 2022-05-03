<template>
  <div class="login" dir="rtl">
    <div class="container sm:px-10">
      <div class="block xl:grid grid-cols-2 gap-4">
        <!-- BEGIN: Signup Info -->
        <div class="hidden xl:flex flex-col min-h-screen">
          <a href="" class="-intro-x flex items-center pt-5">
            <img
              alt="BLine Orders Management Panel"
              class="w-6"
              src="images/logo.svg"
            />
            <span class="text-white text-lg ml-3">
              B<span class="font-medium">Line</span>
            </span>
          </a>
          <div class="my-auto">
            <img
              alt="BLine Orders Management Panel"
              class="-intro-x w-1/2 -mt-16"
              src="images/illustration.svg"
            />
            <div
              class="-intro-x text-white font-medium text-4xl leading-tight mt-10"
            >
              بضع نقرات أخرى للتسجيل
              <br />
              والدخول إلى حسابك.
            </div>
            <div
              class="-intro-x mt-5 text-lg text-white text-opacity-70 dark:text-gray-500"
            >
              إدارة جميع حسابات التجارة الإلكترونية الخاصة بك في مكان واحد
            </div>
          </div>
        </div>
        <!-- END: Signup Info -->
        <!-- BEGIN: Signup Form -->
        <div class="h-screen xl:h-auto flex py-5 xl:py-0 xl:my-0">
          <div
            class="my-auto mx-auto xl:ml-20 bg-white dark:bg-dark-1 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto"
          >
            <h2
              class="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-right"
            >
              قم بالتسجيل الان
            </h2>

            <div class="intro-x mt-2 text-gray-500 xl:hidden text-center">
              بضع نقرات أخرى لتسجيل الدخول إلى حسابك.إدارة جميع حسابات التجارة
              الإلكترونية الخاصة بك في مكان واحد
            </div>

            <form @submit.prevent="submit">
              <div class="justify-start mt-4 p-5 pt-3">
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
              </div>
              <div class="intro-x mt-5 xl:mt-8 text-center xl:text-right">
                <nuxt-link
                  to="login"
                  class="btn btn-outline-secondary py-3 w-2/5 mx-3 xl:w-40 mt-3 xl:mt-0 align-top"
                >
                  تسجيل الدخول
                </nuxt-link>
                <button
                  class="btn btn-primary py-3 mt-3 xl:mt-0 w-2/5 mx-3 xl:w-40 xl:ml-3 align-top"
                  type="submit"
                >
                  التسجيل
                </button>
              </div>
              <div
                class="intro-x mt-10 xl:mt-24 text-gray-700 dark:text-gray-600 text-center xl:text-left"
              >
                بالتسجيل ، فإنك توافق على
                <br />
                <a class="text-theme-1 dark:text-theme-10" href=""
                  >الأحكام والشروط</a
                >
                &
                <a class="text-theme-1 dark:text-theme-10" href=""
                  >سياسة خاصة</a
                >
              </div>
            </form>
          </div>
        </div>
        <!-- END: Signup Form -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("global/loadCitiesList");
    this.$store.dispatch("global/loadAreasList");
  },
  layout: "auth",
  middleware: ["guest"],
  name: "RegisterPage",
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
    switchToDarkMode(e) {
      const HTML = document.getElementById("html");
      const toggler = e.target;
      if (HTML.classList.contains("dark")) {
        HTML.classList.remove("dark");
        toggler.classList.remove("dark-mode-switcher__toggle--active");
      } else {
        HTML.classList.add("dark");
        // dark-mode-switcher__toggle--active
        toggler.classList.add("dark-mode-switcher__toggle--active");
      }
    },

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
        .post(`/register`, data)
        .then(async (res) => {
          if (res.data.success) {
            this.showSuccesMessage("add", "تمت الإضافة بنجاح");

            let response = await this.$auth.loginWith("local", {
              data: {
                email: this.selectedEmail,
                password: this.selectedPassword,
              },
            });

            if (!response.success) {
              this.error = response.message;
            }
          }
        })
        .catch((err) => {
          this.error = "Incorrect Email or Password";
          let errorMessage= err.response.data.message;
            this.$toast.error(errorMessage);;

          console.log(err.status);
        });
    },
  },
};
</script>

<style scoped>
.login:before {
  margin-right: -48%;
  right: 0;
  transform: rotate(180deg);
}
</style>
