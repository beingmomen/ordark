<template>
  <li class="" @click="goToPage">
    <NuxtLink
      :to="link"
      class="side-menu"
      :class="isActive ? 'side-menu--active' : ''"
    >
      <div class="side-menu__icon pr-6" style="width: 50px">
        <div class="flex" style="width: 50px">
          <i
            :class="`ml-1 fas fa-${icon}`"
            v-if="icon != 'dollar-sign'"
            style="font-size: 22px"
          ></i>
          <div class="" v-else>
            <i :class="` fas fa-${icon}`" style="font-size: 22px"></i>
            <i
              :class="`ml-1 fas fa-${icon}`"
              style="font-size: 22px; margin-right: -5px"
            ></i>
          </div>
        </div>
      </div>
      <div class="side-menu__title capitalize">
        {{ text.replace("_", " ") }}
      </div>
    </NuxtLink>
  </li>
</template>

<script>
// side-menu--active
export default {
  mounted() {
    const feather = require("feather-icons");
    feather.replace();
  },
  props: ["text", "icon", "isActive", "link"],
  methods: {
    goToPage() {},
  },
};
</script>

<style>
.side-menu--active .side-menu__title {
  /* font-weight: bold !important; */
  color: #222 !important;
  font-size: 20px !important;
}
.side-menu .side-menu__title {
  font-size: 16px !important;
}
</style>
