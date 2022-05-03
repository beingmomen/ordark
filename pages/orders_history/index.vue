<template>
  <div class="">
    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12 2xl:col-span-9">
        <div class="grid grid-cols-12 gap-6">
          <!-- BEGIN: General Report -->
          <div class="col-span-12 mt-4">
            <div class="grid grid-cols-12 gap-6 mt-5">
              <InfoCard
                v-for="(card, index) in firstRowCards"
                :key="'first' + index"
                :title="card.title"
                :value="card.value"
                :icon="card.icon"
                :id="card.id"
                :isActive="selectedCardId == card.id"
                @cardClicked="changeActiveCard"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr class="mt-10 mb-6" />

    <div class="box mt-4">
      <div
        class="
          flex flex-col
          sm:flex-row
          items-center
          p-5
          border-b border-gray-200
        "
      >
        <div class="font-medium text-base w-full flex flex-row justify-between">
          <h2 class="font-medium text-base ml-auto">
            {{ firstRowCards.find((x) => x.id == selectedCardId).title }}
          </h2>
          <span class="">test</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InfoCard from "~/components/Global/InfoCard.vue";
import FastSearch from "~/components/Global/FastSearch.vue";
export default {
  components: { InfoCard, FastSearch },
  layout: "admin",
  middleware: ["authentication"],
  data() {
    return {
      firstRowCards: [
        {
          title: "Closed Orders",
          value: 310,
          id: 1,
          icon: "users",
        },
        {
          title: "Delievered Orders",
          value: 300,
          id: 2,
          icon: "users",
        },
        {
          title: "Cancelled Orders",
          value: 10,
          id: 3,
          icon: "users",
        },
      ],
    };
  },
  mounted() {
    const feather = require("feather-icons");
    feather.replace();
    this.updateTime();
  },
   methods:{
    changeActiveCard(id){
      this.$store.commit('ordersHistory/updateActiveCard', id)
    }
  },
  computed:{
      selectedCardId() {
        return this.$store.getters['ordersHistory/getActiveCardId']
      } 

  }
};
</script>