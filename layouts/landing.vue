<template>
  <div>
    <LandingPageNavbar />
    <Nuxt />
  </div>
</template>

<script>
export default {
  middleware: "guest",

  head () {
    return {
        link: [
          { rel: 'stylesheet', href: '/css/buefy.css' },
        ]
    }
  }
};
</script>

<style>
html body {
  overflow-x: visible !important;
}

.navbar-end {
  margin-left: 0;
}

.navbar-burger.burger {
  margin-right: auto !important;
  margin-left: 0 !important;
}
</style>
