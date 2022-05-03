<template>
  <div class="login" dir="">
    <div class="container sm:px-10">
      <div class="block xl:grid grid-cols-2 gap-4">
        <!-- BEGIN: Login Info -->
        <div class="hidden xl:flex flex-col min-h-screen">
          <a href="" class="intro-x flex items-center pt-5">
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
              class="
                -intro-x
                text-white
                font-medium
                text-4xl
                leading-tight
                mt-10
              "
            >
              بضع نقرات أخرى لتسجيل
              <br />
              الدخول إلى حسابك.
            </div>
            <div
              class="
                -intro-x
                mt-5
                text-lg text-white text-opacity-70
                dark:text-gray-500
              "
            >
              إدارة جميع حسابات التجارة الإلكترونية الخاصة بك في مكان واحد
            </div>
          </div>
        </div>
        <!-- END: Login Info -->
        <!-- BEGIN: Login Form -->
        <div class="h-screen xl:h-auto flex py-5 xl:py-0 xl:my-0">
          <div
            class="
              my-auto
              mx-auto
              xl:ml-20
              bg-white
              dark:bg-dark-1
              xl:bg-transparent
              px-5
              sm:px-8
              py-8
              xl:p-0
              rounded-md
              shadow-md
              xl:shadow-none
              w-full
              sm:w-3/4
              lg:w-2/4
              xl:w-auto
            "
          >
            <h2
              class="
                intro-x
                font-bold
                text-2xl
                xl:text-3xl
                text-center
                xl:text-right
              "
            >
              تسجيل الدخول
            </h2>

            <div class="intro-x mt-2 text-gray-500 xl:hidden text-center">
              بضع نقرات أخرى لتسجيل الدخول إلى حسابك.إدارة جميع حسابات التجارة
              الإلكترونية الخاصة بك في مكان واحد
            </div>

            <form @submit.prevent="submitLogin">
              <div class="intro-x mt-6">
                <div
                  class="
                    text-red-400 text-base
                    font-bold
                    p-2
                    rounded
                    text-right
                    mb-1
                  "
                  v-if="error"
                >
                  {{ error }}
                </div>
                <input
                  type="text"
                  class="
                    intro-x
                    login__input
                    form-control
                    py-3
                    px-4
                    border-gray-300
                    block
                  "
                  required
                  autocomplete="autocomplete"
                  placeholder="البريد الإلكتروني"
                  v-model="loginForm.email"
                />
                <input
                  type="password"
                  class="
                    intro-x
                    login__input
                    form-control
                    py-3
                    px-4
                    border-gray-300
                    block
                    mt-4
                  "
                  required
                  autocomplete="autocomplete"
                  placeholder="كلمة المرور"
                  v-model="loginForm.password"
                />
              </div>
              <div
                class="
                  intro-x
                  flex
                  text-gray-700
                  dark:text-gray-600
                  text-xs
                  sm:text-sm
                  mt-4
                "
              >
                <div class="flex items-center ml-auto xl:mr-auto xl:ml-0">
                  <a href="">هل نسيت كلمة السر ؟</a>
                </div>
              </div>
              <div class="intro-x mt-5 xl:mt-8 text-center xl:text-right">
                <nuxt-link
                  to="register"
                  class="
                    btn btn-outline-secondary
                    py-3
                    w-2/5
                    mx-3
                    xl:w-40
                    mt-3
                    xl:mt-0
                    align-top
                  "
                >
                  التسجيل
                </nuxt-link>
                <button
                  class="
                    btn btn-primary
                    py-3
                    mt-3
                    xl:mt-0
                    w-2/5
                    mx-3
                    xl:w-40 xl:ml-3
                    align-top
                  "
                  type="submit"
                >
                  تسجيل الدخول
                </button>
              </div>
              <div
                class="
                  intro-x
                  mt-10
                  xl:mt-24
                  text-gray-700
                  dark:text-gray-600
                  text-center
                  xl:text-left
                "
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

        <!-- END: Login Form -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "auth",
  middleware: "guest",
  name: "LoginPage",
  data() {
    return {
      loginForm: {
        email: "admin@admin.com",
        password: "password",
      },
      error: "",
    };
  },
  methods: {
    async submitLogin() {
      try {
        let response = await this.$auth.loginWith("local", {
          data: this.loginForm,
        });

        if (!response.success) {
          this.error = response.message;
        }
      } catch (err) {
        this.error = "Incorrect Email or Password";

        console.log(err.status);
      }
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
