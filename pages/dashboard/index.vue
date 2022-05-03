<template>
  <div class="">
    <div class="p-3 flex flex-row justify-between w-full h-16 px-0">
      <h2 class="font-medium text-3xl mt-1 text-right pr-0 w-3/4">الرئيسية</h2>

    </div>
    <hr class="mt-3 mb-1" />

    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12 2xl:col-span-9">
        <div class="grid grid-cols-12 gap-6">
          <!-- BEGIN: General Report -->
          <div class="col-span-12 mt-0">
            <div class="grid grid-cols-12 gap-6 mt-3">
              <DashboardCard
                v-for="(card, index) in firstRowCards"
                :key="'first' + index"
                :title="card.title"
                :value="dashboardData ? dashboardData[card.link] : 0"
                :icon="card.icon"
                :link="card.link"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <hr class="mt-8 mb-5" /> -->

    <div class="grid grid-cols-12 gap-6 mt-8">
      <div class="col-span-12 2xl:col-span-9">
        <div class="grid grid-cols-12 gap-6">
          <!-- BEGIN: General Report -->
          <div class="col-span-12">
            <div class="grid grid-cols-12 gap-6">
              <DashboardCard
                v-for="(card, index) in secondRowCards"
                :key="'second' + index"
                :title="card.title"
                :value="dashboardData ? dashboardData[card.link] : 0"
                :icon="card.icon"
                :link="card.link"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DashboardCard from "~/components/Global/DashboardCard.vue";
import FastSearch from "~/components/Global/FastSearch.vue";
export default {
  components: { DashboardCard, FastSearch },
  layout: "admin",
  middleware: ["authentication", "admin"],
  data() {
    return {
      currentMonth: "",
      firstRowCards: [
        // {
        //   title: "الأوردرات",
        //   value: 1300,
        //   percentage: "-10%",
        //   icon: "dollar-sign",
        // },
        {
          title: "البائعين",
          value: 0,
          icon: "users",
          link: "sellers",
        },
        
        {
          title: "المسئولين",
          value: 0,
          icon: "users-cog",
          link: "admins",
        },
      ],
      secondRowCards: [
        {
          title: "المحافظات",
          value: 0,
          icon: "flag",
          link: "cities",
        },
        {
          title: "المناطق",
          value: 0,
          icon: "map",
          link: "areas",
        },
        {
          title: "المندوبين",
          value: 0,
          icon: "biking",
          link: "drivers",
        },

        {
          title: "حالات الأوردر",
          value: 0,
          icon: "list",
          link: "order_statuses",
        },
        // {
        //   title: "الطيارين",
        //   value: 5,
        //   percentage: "20%",
        //   icon: "users",
        // },
        // {
        //   title: "Clients",
        //   value: 10,
        //   percentage: "30%",
        //   icon: "smartphone",
        // },
      ],
    };
  },
  mounted() {
    const feather = require("feather-icons");
    feather.replace();
    this.updateTime();
    this.$nextTick(() => {
      this.$store.dispatch("global/loadDashboardData");
    });
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
  },
};
</script>