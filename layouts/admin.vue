<template>
  <div class="main py-0 overflow-y-auto h-screen">
    <!-- <vue-confirm-dialog></vue-confirm-dialog> -->

    <div
      class="mobile-menu md:hidden absolute top-0 left-0 w-full z-50 shadow-2xl shadow-red-500/50"
      style="background: rgb(40, 78, 178)"
    >
      <div class="mobile-menu-bar">
        <a href="" class="flex ml-auto">
          <img
            alt="BLine Orders Management"
            class="w-6"
            src="/images/logo.svg"
          />
        </a>
        <a
          href="javascript:;"
          id="mobile-menu-toggler"
          @click="toggleMobileMenu"
        >
          <i
            data-feather="bar-chart-2"
            class="w-8 h-8 text-white transform -rotate-90"
          ></i>
        </a>
      </div>
      <ul class="border-t border-indigo-400 py-2 pb-6 hidden">
        <mobile-menu-item
          v-for="(menu, index) in user.type == 'admin'
            ? mobileMenus.filter((x, index) => index <= 6)
            : mobileMenus
                .filter((x, index) => index <= 6)
                .filter((x) => x.canSellerAccess)"
          :key="'mobileMenus' + index"
          :icon="menu.icon"
          :text="menu.text"
          :link="menu.link"
          :isActive="$route.path.includes(menu.word)"
        />
        <div style="height: 1px" class="w-full bg-indigo-400 my-3"></div>
        <mobile-menu-item
          v-for="(menu, index) in user.type == 'admin'
            ? mobileMenus.filter((x, index) => index > 6)
            : mobileMenus
                .filter((x, index) => index > 6)
                .filter((x) => x.canSellerAccess)"
          :key="'mobileMenus-2' + index"
          :icon="menu.icon"
          :text="menu.text"
          :link="menu.link"
          :isActive="$route.path.includes(menu.word)"
        />
        <li @click="logout">
          <a class="menu cursor-pointer">
            <div class="flex" style="width: 50px">
              <i class="fas fa-sign-out-alt" style="font-size: 22px"></i>
            </div>

            <div class="menu__title">تسجيل الخروج</div>
          </a>
        </li>
      </ul>
    </div>
    <!-- END: Mobile Menu -->
    <div class="flex min-h-screen pt-16 md:pt-0">
      <!-- BEGIN: Side Menu -->
      <nav class="side-nav pb-8 pr-0">
        <a href="" class="flex items-center pl-5 pt-4 fixed">
          <img
            alt="BLine Orders Management Panel"
            class="w-6 mr-8"
            src="/images/logo.svg"
          />
          <span class="hidden xl:block text-white text-lg mr-3">
            B<span class="font-medium">Line</span>
          </span>
        </a>

        <!-- <div class="side-nav__devider mb-5"></div> -->
        <ul class="mt-20 fixed">
          <!-- <li class="side-nav__devider my-4"></li> -->

          <!-- loop for the firstSectionMenu -->
          <sidebar-item
            v-for="(menu, index) in user.type == 'admin'
              ? firstSectionMenu
              : firstSectionMenu.filter((x) => x.canSellerAccess)"
            :key="'firstMenus' + index"
            :icon="menu.icon"
            :text="menu.text"
            :link="menu.link"
            :isActive="$route.path.includes(menu.word)"
          />
          <li class="side-nav__devider my-4" v-if="user.type == 'admin'"></li>
          <!-- loop for the secondSectionMenu -->
          <sidebar-item
            v-for="(menu, index) in user.type == 'admin'
              ? secondSectionMenu
              : secondSectionMenu.filter((x) => x.canSellerAccess)"
            :key="'secondMenus' + index"
            :icon="menu.icon"
            :text="menu.text"
            :link="menu.link"
            :isActive="$route.path.includes(menu.word)"
          />
          <li class="side-nav__devider my-4" v-if="user.type == 'admin'"></li>
          <!-- loop for the thirdSectionMenu -->
          <sidebar-item
            v-for="(menu, index) in user.type == 'admin'
              ? thirdSectionMenu
              : thirdSectionMenu.filter((x) => x.canSellerAccess)"
            :key="'thirdMenus' + index"
            :icon="menu.icon"
            :text="menu.text"
            :link="menu.link"
            :isActive="$route.path.includes(menu.word)"
          />
          <li class="side-nav__devider my-4"></li>

          <!-- loop for the forthSectionMenu -->
          <sidebar-item
            v-for="(menu, index) in user.type == 'admin'
              ? forthSectionMenu
              : forthSectionMenu.filter((x) => x.canSellerAccess)"
            :key="'forthMenus' + index"
            :icon="menu.icon"
            :text="menu.text"
            :link="menu.link"
            :isActive="$route.path.includes(menu.word)"
          />

          <!-- logout -->
          <li class="" @click="logout">
            <a class="side-menu cursor-pointer">
              <div class="side-menu__icon pr-6">
                <!-- <i data-feather="log-out"></i> -->
                <i class="ml-2 fas fa-sign-out-alt" style="font-size: 22px"></i>
              </div>
              <div class="side-menu__title" style="text-transform: capitalize">
                تسجيل الخروج
              </div>
            </a>
            <!-- <li class="side-nav__devider my-4"></li> -->
          </li>
        </ul>
      </nav>
      <!-- END: Side Menu -->
      <!-- BEGIN: Dark Mode Switcher-->
      <!-- <div
      @click="switchToDarkMode"
      class="
        dark-mode-switcher
        cursor-pointer
        shadow-md
        fixed
        bottom-10
        left-10
        box
        dark:bg-dark-2
        border
        rounded-full
        w-40
        h-12
        flex
        items-center
        justify-center
        z-50
        mb-3
        mr-3
      "
    >
      <div class="mr-4 text-gray-700 dark:text-gray-300 ml-3">Dark Mode</div>
      <div class="dark-mode-switcher__toggle border"></div>
    </div> -->
      <!-- END: Dark Mode Switcher-->

      <!-- BEGIN: Content -->
      <div
        class="content rounded-none overflow-hidden pb-2 md:pb-4"
        style="background: #fcfcfc"
      >
        <!-- BEGIN: Top Bar -->
        <!-- <div class="top-bar">
          <div class="flex justify-between items-between flex-row w-full">
            <p class="text-xl mt-1 capitalize">{{ currentPageName }}</p>
            <fast-search />
          </div>
        </div> -->
        <!-- END: Top Bar -->
        <Nuxt />
      </div>
      <!-- END: Content -->
    </div>
  </div>
  <!-- <Nuxt /> -->
</template>

<script>
import FastSearch from "~/components/Global/FastSearch.vue";
import MobileMenuItem from "~/components/Global/MobileMenuItem.vue";
import SidebarItem from "../components/Global/SidebarItem.vue";

export default {
  components: { SidebarItem, FastSearch, MobileMenuItem },

  mounted() {
    const feather = require("feather-icons");
    feather.replace();

    this.$store.commit("global/changeCurrentPage", this.formattedName());
    this.$store.dispatch("global/loadCitiesList");
    this.$store.dispatch("global/loadAreasList");
    this.$store.dispatch("global/loadStatusList");
    this.$store.dispatch("global/loadDriversList");
  },
  data() {
    return {
      mobileMenus: [
        {
          text: "الرئيسية",
          icon: "home",
          link: "/dashboard",
          word: "dashboard",
          canSellerAccess: false,
          canDriverAccess: false,
        },
        {
          text: "الأوردرات",
          icon: "dollar-sign",
          link: "/orders",
          word: "orders",
          canSellerAccess: true,
          canDriverAccess: true,
        },
        {
          text: "البائعين",
          icon: "users",
          link: "/sellers",
          word: "sellers",
          canSellerAccess: false,
          canDriverAccess: false,
        },
        {
          text: "المندوبين",
          icon: "biking",
          link: "/drivers",
          word: "drivers",
          canSellerAccess: false,
          canDriverAccess: false,
        },
        {
          text: "المسئولين",
          icon: "users-cog",
          link: "/admins",
          word: "admins",
          canSellerAccess: false,
          canDriverAccess: false,
        },

        {
          text: "المحافظات",
          icon: "map",
          link: "/cities",
          word: "cities",
          canSellerAccess: false,
          canDriverAccess: false,
        },
        {
          text: "المناطق",
          icon: "map-marked-alt",
          link: "/areas",
          word: "areas",
          canSellerAccess: false,
          canDriverAccess: false,
        },
        {
          text: "حالات الأوردرات",
          icon: "list-ul",
          link: "/order_statuses",
          word: "order_statuses",
          canSellerAccess: false,
          canDriverAccess: false,
        },

        {
          text: "الإعدادات",
          icon: "cogs",
          link: "/settings",
          word: "settings",
          canSellerAccess: true,
          canDriverAccess: true,
        },
      ],

      firstSectionMenu: [
        {
          text: "الرئيسية",
          icon: "home",
          link: "/dashboard",
          word: "dashboard",
          canSellerAccess: false,
          canDriverAccess: false,
        },
        {
          text: "الأوردرات",
          icon: "dollar-sign",
          link: "/orders",
          word: "orders",
          canSellerAccess: true,
          canDriverAccess: true,
        },
        // {
        //   text: "orders_history",
        //   icon: "database",
        //   link: "/orders_history",
        // },

        // {
        //   text: "delieveries",
        //   icon: "users",
        //   link: "/delieveries",
        // },
      ],
      secondSectionMenu: [
        {
          text: "البائعين",
          icon: "users",
          link: "/sellers",
          word: "sellers",
          canSellerAccess: false,
          canDriverAccess: false,
        },
        {
          text: "المندوبين",
          icon: "biking",
          link: "/drivers",
          word: "drivers",
          canSellerAccess: false,
          canDriverAccess: false,
        },
        {
          text: "المسئولين",
          icon: "users-cog",
          link: "/admins",
          word: "admins",
          canSellerAccess: false,
          canDriverAccess: false,
        },
        // {
        //   text: "clients",
        //   icon: "smartphone",
        //   link: "/clients",
        // },
      ],
      thirdSectionMenu: [
        {
          text: "المحافظات",
          icon: "map",
          link: "/cities",
          word: "cities",
          canSellerAccess: false,
          canDriverAccess: false,
        },
        {
          text: "المناطق",
          icon: "map-marked-alt",
          link: "/areas",
          word: "areas",
          canSellerAccess: false,
          canDriverAccess: false,
        },
        {
          text: "حالات الأوردرات",
          icon: "list-ul",
          link: "/order_statuses",
          word: "order_statuses",
          canSellerAccess: false,
          canDriverAccess: false,
        },
      ],
      forthSectionMenu: [
        {
          text: "الإعدادات",
          icon: "cogs",
          link: "/settings",
          word: "settings",
          canSellerAccess: true,
          canDriverAccess: true,
        },
      ],
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
    async logout() {
      await this.$auth.logout();
    },
    formattedName() {
      let name = this.$route.name;
      name = name.replace("_", " ");
      return name;
    },
  },
  computed: {
    currentPageName() {
      return this.$store.getters["global/getCurrentPageName"];
    },
  },
  watch: {
    $route() {
      this.$store.commit("global/changeCurrentPage", this.formattedName());

      let today = new Date();
      let year = today.getFullYear();
      let month = (today.getMonth() + 1).toString().padStart(2, "00");
      let day = today.getDate().toString().padStart(2, "00");
      let nowDate = `${year}-${month}-${day}`;
      // console.log("nowDate: ", nowDate);
      if (document.querySelector("input[type=date]")) {
        document.querySelector("input[type=date]").setAttribute("min", nowDate);
      }
      setTimeout(() => {
        document.querySelector(".mobile-menu ul").classList.add("hidden");
      }, 200);
    },
  },
};
</script>

<style>
/* samrt-alert */
.samrt-alert {
  margin-top: 0px;
}
@media (max-width: 768px) {
  .samrt-alert {
    border-radius: 10px;
    opacity: 0.9;
    margin: 80px auto 0 auto;
    width: 95% !important;
  }
}
.table-parent {
  min-height: 500px;
}
.table th {
  font-weight: 600 !important;
}
label {
  font-weight: 500 !important;
}
/* mobile */
.menu {
  margin: 0 10px;
  font-weight: 600;
}
.menu.active {
  background-color: #fff;
  color: #222;
  border-radius: 50px;
}
.mobile-menu {
  margin: 0 !important;
}

/* menu with animation */

.mobile-menu ul {
  animation: hideAnimation 0s ease-in 2s;
  animation-fill-mode: forwards;
}

@keyframes hideAnimation {
  to {
    display: none;
  }
}

@keyframes showAnimation {
  to {
    display: block;
  }
}

/* .mobile-menu ul{
  transition: all 1s !important;
} */
.mobile-menu .mobile-menu-bar {
  padding: 0 30px !important;
}
/* XX mobile XX */
.side-nav > ul > li > .side-menu.side-menu--active::after {
  display: none;
  /* transform: rotateZ(270deg);
  top: 0px;
  right: 200px;
  width: 30px;
   */
}

.side-nav > ul > li > .side-menu.side-menu--active::before {
  display: none;
  /* top: 0px;
  right: 200px;
  margin-right: -1.25rem;
  transform: rotate(180deg); */
}
.side-nav .side-menu {
  border-radius: 999px;

  padding: unset !important;
  width: 200px;
  margin: 0 auto;
  height: 44px;
}

@media screen and (max-width: 1279px) {
  .side-nav .side-menu {
    width: 80px !important;
    padding-right: 6px !important;
  }
}

.side-nav > ul > li > a:not(.side-menu--active) {
  opacity: 1 !important;
  left: 0 !important;
  transform: translateX(0) !important;
}
.side-menu--active {
  /* border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important; */
}

.side-nav .side-menu .side-menu__title {
  margin-left: unset;
  margin-right: 0.75rem !important;
}
.side-nav .side-menu .side-menu__title .side-menu__sub-icon {
  margin-left: 1.25rem !important;
  margin-right: auto !important;
}
.side-nav > ul > li > .side-menu.side-menu--active .side-menu__icon::before {
  width: 0;
}
.side-nav
  > ul
  > li
  > .side-menu:not(.side-menu--active)
  .side-menu__icon::before {
  width: 100%;
}

.side-nav > ul > li:nth-child(2) > a.side-menu--active {
  animation: unset !important;
  animation-delay: 0s !important;
  animation-duration: 0s !important;
  animation-iteration-count: 0 !important;
  animation-play-state: paused !important;
}

/* Override menu item radiuses */
.side-nav
  > ul
  > li
  > .side-menu:hover:not(.side-menu--active):not(.side-menu--open)
  .side-menu__icon:before {
  --tw-bg-opacity: 1;
  /* background-color: blue; */
  width: 100%;
}
.side-nav
  > ul
  > li
  > .side-menu:not(.side-menu--active)
  .side-menu__icon::before {
  border-radius: 999px;
}

/* tables dot buttons */
.relative.inline-block > div > button {
  /* background-color:red; */
  padding: 0;
}

table tbody tr td div p span {
  /* address cell */
  white-space: normal;
  max-width: 230px !important;
  display: inline-block;
  /* background: red; */
}
</style>
