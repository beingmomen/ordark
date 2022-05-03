<template>
  <div class="w-full mt-16 mx-auto lg:w-1/2 lg:mx-auto py-4">
    <GlobalBackButton
      class="md:hidden"
      style="left: 30px; position: absolute; top: 70px"
    />
    <!-- <div class="w-full flex flex-row justify-content items-center">
      <GlobalTrackSearch />
    </div> -->

    <div class="mt-6 w-full" style="background: #fff">
      <p
        class="w-full text-4xl font-semibold bg-white h-10 px-5 text-sm text-center"
        v-if="timelines.length"
      >
        #{{ number }}
      </p>

      <div class="mt-4 mb-6 flex flex-row" v-if="noData">
        <input
          class="searchTrackNumber w-full text-xl font-semibold border-2 border-gray-300 bg-white h-10 px-5 rounded-lg text-sm focus:outline-none text-center rounded-full"
          type="search"
          name="search"
          placeholder="ادخل رقم الأوردر "
          v-model="number"
          @keypress.enter="newSearch"
        />
        <button
          @click="newSearch"
          class="btn inline-block px-3 mr-2 py-2.5 bg-blue-600 border-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"
          type="button"
        >
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="search"
            class="w-4"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
            ></path>
          </svg>
        </button>
      </div>

      <hr class="my-6" />

      <h2 class="text-blue-600 font-semibold text-4xl mb-8">
        {{ lastStateName }}
      </h2>

      <ol class="relative border-r border-gray-400 dark:border-gray-700">
        <GlobalSingleLog
          v-for="(timeline, i) in timelines"
          :key="i"
          :index="i"
          :logDate="timeline.created_at"
          :status="timeline.status"
        />
      </ol>
      <div
        class="w-full text-4xl text-gray-500 my-8 font-semibold bg-white px-5 text-sm text-center"
        v-if="noData"
      >
        لا يوجد أوردر بهذا الرقم
      </div>
      <hr class="my-6" />
    </div>
  </div>
</template>

<script>
export default {
  layout: "track",
  mounted() {
    this.getOrderLog();
  },
  data() {
    return {
      timelines: [],
      number: this.$route.params.id,
      noData: true,
    };
  },
  methods: {
    getOrderLog() {
      if (!this.number) return;
      this.$axios
        .$get(`/orders/${this.$route.params.id}/log`)
        .then((res) => {
          console.warn("timeline res ::::::", res);
          this.timelines = res.data.reverse();
          this.noData = !this.timelines.length;
        })
        .catch((err) => {
          console.log("err: ", err);
          document.querySelector(".searchTrackNumber").focus();
        });
    },
    newSearch() {
      console.log("newSearch: ", this.number);
      // /orders/track_number/6035813445
      this.$router.push(`/orders/track_number/${this.number}`);
    },
  },
  components: {},
  computed: {
    lastStateName() {
      let last = this.timelines[0];
      if (last) return last.status.name;
    },
  },
};
</script>

<style>
/* handle responsive */
@media screen and (max-width: 1024px) {
  .gb-vue-timeline-update {
    display: flex;
    flex-direction: column;
    position: relative;
  }
  .gb-vue-timeline-update .gb-vue-timeline-update__center {
    left: calc(50% - 20px);
    /* width: 50px; */
  }
}
.gb-vue-timeline-update__category {
  width: 150px !important;
  text-align: center !important;
  font-size: 18px !important;
  height: 40px;
  line-height: 36px;
}
.gb-vue-timeline-update__left {
  width: 250px !important;
}
.gb-vue-timeline-update__left .gb-vue-timeline-update__ago {
  color: #444 !important;
  text-align: inherit;
}
.gb-vue-timeline-update__description {
  text-align: right;
  color: #444 !important;
}
.gb-vue-timeline-update__title,
.gb-base-badge,
.gb-vue-timeline-update__information {
  display: none !important;
}
.gb-vue-timeline-update__meta {
  flex-direction: column;
  align-items: flex-start !important;
  flex-flow: column-reverse;
}
/* .gb-vue-timeline-update__ago {
  display: none !important;
} */
</style>
