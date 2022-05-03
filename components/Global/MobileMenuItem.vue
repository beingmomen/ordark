<template>
  <li @click="goToPage">
    <nuxt-link :to="link" class="menu" :class="isActive ? 'active' : ''">
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

      <div class="menu__title">{{ text }}</div>
    </nuxt-link>
  </li>
</template>


<script>
// side-menu--active
export default {
  mounted() {
    // setTimeout(() => {
    //   const feather = require("feather-icons");
    //   feather.replace();
    // }, 800);
  },
  props: ["text", "icon", "isActive", "link"],
  methods: {
    goToPage() {
        this.toggleMobileMenu()
    },
  },
};
</script>
<style>
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
.menu.active i {
  color: rgb(46, 81, 187);
}
</style>