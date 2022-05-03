<template>
  <div class="col-span-12 sm:col-span-6 xl:col-span-3" @click="goToPage">
      <div class="report-box zoom-in">
        <div class="box p-5">
          <div class="flex absolute left-5">
            <i
              :class="`  text-blue-500 fas fa-${icon}`"
              style="font-size: 22px"
            ></i>

            <!-- <i
            :data-feather="icon"
            class="report-box__icon text-theme-10 mr-auto "
          ></i> -->
          </div>
          <div class="text-3xl font-medium leading-8">{{ value }}</div>
          <div class="text-base text-gray-600 mt-1">{{ title }}</div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  props: ["title", "value", "icon", "link"],
  computed: {},
  methods:{
    goToPage(){
      this.$router.push(this.link)
    }
  }
};
</script>

<style>
.active .report-box::before {
  background: rgba(28, 63, 170, 0.6);
}
</style>