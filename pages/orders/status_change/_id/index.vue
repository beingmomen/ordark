<template>
  <div class="container">
    <!-- {{ $route.params }} -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 gap-10 justify-items-center"
      style="padding-top: 60px"
    >
      <vue-ellipse-progress
        class="cursor-pointer"
        v-for="(status, i) in statusesData"
        :key="i"
        :progress="orderStatus >= i + 1 ? 100 : 0"
        :angle="-90"
        :color="
          orderStatus == i + 1
            ? '#7f1d1d'
            : '#338FFF' && orderStatus < i + 1
            ? '#4b5563'
            : '#338FFF'
        "
        :size="200"
        :legend="false"
        :loading="false"
        animation="bounce 700 400"
        @click.native="changeStatus(status.id)"
      >
        >
        <p
          style="color: #338fff"
          class="cursor-pointer text-3xl font-bold"
          :class="
            orderStatus == i + 1
              ? 'active-color'
              : '' || orderStatus < i + 1
              ? 'later-active'
              : ''
          "
          slot="legend-caption"
        >
          {{ status.name }}
        </p>
      </vue-ellipse-progress>
    </div>

    <!-- <p v-for="(status, i) in statusesData" :key="i">
      {{ status.name }} {{ status.id }}
    </p> -->
  </div>
</template>

<script>
export default {
  layout: "admin",
  middleware: ["authentication"],
  mounted() {
    this.getData();

    this.$axios
      .$get(`/orders/${this.$route.params.id}`)
      .then((res) => {
        this.orderStatus = res.data.status_id;
        // console.warn("order status id ::::", res.data.status_id);
      })
      .catch((err) => {});
  },
  data() {
    return {
      orderStatus: null,
    };
  },
  methods: {
    getData(page = 1) {
      console.warn("last");
      this.$store
        .dispatch("status/loadStatusesData", page)
        .then(() => {})
        .catch((err) => {});
    },
    changeStatus(statusId) {
      // console.warn("change status id ::::", statusId);
      this.$axios
        .$put(`/orders/update-status/${this.$route.params.id}`, {
          status_id: statusId,
        })
        .then((res) => {
          console.warn("whats happen when change status ::::", res);
          if (res.success) {
            console.warn("first");
            this.getData();
            console.warn("first 1");
          }
        })
        .then(() => this.$router.push("/orders"))
        .catch((err) => {});
    },
  },
};
</script>

<style scoped>
.active-color {
  color: #7f1d1d !important;
}
.later-active {
  color: #4b5563 !important;
}
</style>

