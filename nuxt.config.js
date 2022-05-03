export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    htmlAttrs: {
      id: "html",
      dir: "rtl",
      class: "p-0",
    },
    bodyAttrs: {
      class: "p-0",
    },
    title: "frontend",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      // Template style
      { rel: "stylesheet", href: "/css/template.css" },
      { rel: "stylesheet", href: "/css/tom.css" },
      // { rel: "stylesheet", href: "/css/bootstrap.min.css" },
    ],
    script: [{ src: "/js/feather.min.js", body: true }],
    script: [{ src: "/js/datepicker.js", body: true }],
    // script: [{ src: "/js/bootstrap.min.js", body: true }],
    // script: [{ src: "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js", body: true }],
    script: [
      { src: "/js/fontawesome.js", crossorigin: "anonymous" },
      // { src: "https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js", integrity: "sha384-7+zCNj/IqJ95wo16oMtfsKbZ9ccEh31eOz1HGyDuCQ6wgnyJNSYdrPa03rtR1zdB", crossorigin: "anonymous", body: true },
      // { src: "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js", integrity: "sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13", crossorigin: "anonymous", body: true },
      // { src: "/js/bootstrap.min.js", body: false }
    ],
  },

  // { rel: "stylesheet", href: "/css/bootstrap.min.css" },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/css/main.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/axios.js",
    "~/plugins/vue-select.js",
    // "~/plugins/circle-loading.js",
    // "~/plugins/confirm.js",
    "~/plugins/datepicker.js",
    "~/plugins/mixins/user.js",
    "~/plugins/mixins/global.js",
    "~/plugins/mixins/orders.js",
    "~/plugins/mixins/status.js",
    "~/plugins/mixins/cities.js",
    "~/plugins/mixins/sellers.js",
    "~/plugins/mixins/drivers.js",
    "~/plugins/mixins/admins.js",
    "~/plugins/mixins/areas.js",

    { src: "@/plugins/vuetimeline.js", mode: "client" },
    { src: '~/plugins/circle-loading.js', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    "@nuxtjs/tailwindcss",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    "@nuxtjs/auth",
    // 'nuxt-buefy',
    // 'bootstrap-vue/nuxt',
    ["vue-toastification/nuxt", {
      timeout: 3000,
      draggable: false,
      position: "top-center",
    }]
    // "vue-toastification/nuxt",
  ],
  toast: {
    timeout: 3000,
    draggable: false,
    position: "top-center",
    toastClassName: 'samrt-alert'
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: "http://127.0.0.1:8000/api",
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: "/login",
            method: "post",
            propertyName: "data",
          },
          user: {
            url: "/user",
            method: "get",
            propertyName: "data",
          },
          logout: { url: "/logout", method: "post" },
        },
      },
    },
    redirect: {
      login: "/login",
      logout: "/login",
      callback: "/login",
      home: "/dashboard",
    },
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: "en",
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
