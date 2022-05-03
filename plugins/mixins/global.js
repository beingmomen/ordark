import Vue from "vue";
const mixin = {
  data() {
    return {
      currentTime: "",
      currentMonth: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ][new Date().getMonth()],

      ordersTableColumns: [
        "#",
        "رقم التتبع",
        "الشحنة",
        "البائع",
        "العميل",
        "المحافظة",
        "العنوان",
        "المندوب",
        "السعر (الشحن)",
        "الحالة",
        "إجراء",
      ],
      ordersTableKeys: [
        "track_number",
        "item",
        "seller",
        "client",
        "city",
        "address",
        "driver",
        "money",
        "status",
      ],
      emptyTableValue: "لا يوجد",
    };
  },
  methods: {
    updateTime() {
      this.currentTime = this.getNowTime();
    },
    getNowTime() {
      const today = new Date();
      const date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      const time =
        today.getHours().toString().padStart(2, "0") +
        ":" +
        today.getMinutes().toString().padStart(2, "0");
      const dateTime = time;

      let testTime = today.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
      testTime = testTime.replace("AM", "ص");
      testTime = testTime.replace("PM", "م");

      return testTime;
    },

    toggleMobileMenu() {
      let mobileMenu = document.querySelector(".mobile-menu ul");
      console.log("mobile menu: ", mobileMenu.style.animation);

      // animation: hideAnimation 0s ease-in 5s;
      // if (mobileMenu.style.animation == "hideAnimation 2s ease-in 1s") {
      //   mobileMenu.style.animation = " showAnimation 2s ease-in 1s";
      // } else {
      //   mobileMenu.style.animation = "hideAnimation 2s ease-in 1s";
      // }

      if (mobileMenu.getAttribute("class").includes("hidden")) {
        mobileMenu.classList.remove("hidden");
      } else {
        mobileMenu.classList.add("hidden");
      }
      // document.querySelector('.mobile-menu ul')
    },

    showSuccesMessage(state = null, msg) {
      this.$toast.success(msg);
      if (state == "add" || state == "edit") {
        this.$router.go(-1);
      }
    },

    getOrderColorClasses(statusId) {
      return statusId == 1
        ? "bg-green-100"
        : statusId == 2
        ? "bg-red-100"
        : statusId == 3
        ? "bg-yellow-100"
        : "";
    },
  },

  computed: {
    citiesList() {
      return this.$store.getters["global/getCitiesList"];
    },
    areasList() {
      return this.$store.getters["global/getAreasList"];
    },
    statusesList() {
      return this.$store.getters["global/getStatusesList"];
    },
    driversList() {
      return this.$store.getters["global/getDriversList"];
    },

    dashboardData() {
      return this.$store.getters["global/getDashboardData"];
    },
    getTodayDate() {
      let today = new Date();
      let year = today.getFullYear();
      let month = (today.getMonth() + 1).toString().padStart(2, "0");
      let day = today.getDate().toString().padStart(2, "0");

      return `${year}-${month}-${day}`;
    },

    getSellerOrdersColumns() {
      return this.ordersTableColumns.filter(
        (x) => x != "المندوب" && x != "البائع"
      );
    },
    getSellerOrdersKeys() {
      return this.ordersTableKeys.filter((x) => x != "driver" && x != "seller");
    },

    getDriverOrdersColumns() {
      return this.ordersTableColumns.filter(
        (x) => x != "المندوب" && x != "البائع"
      );
    },
    getDriverOrdersKeys() {
      return this.ordersTableKeys.filter((x) => x != "driver" && x != "seller");
    },
  },
};

Vue.mixin(mixin);
