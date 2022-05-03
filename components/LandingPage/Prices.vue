<template>
  <div class="container is-flex is-flex-wrap-wrap is-justify-content-center">
    <div v-for="(item, i) in 6" :key="i" class="our-card rounded p-5 mx-6 my-4">
      <h2
        class="
          our-card-title
          is-size-2
          has-text-centered
          mt-4
          mb-6
          has-text-danger
        "
      >
        الأسكندرية
      </h2>
      <div class="our-card-body">
        <p class="is-size-3 has-text-centered">35</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.container {
  margin-top: 30px;
}
.our-card {
  cursor: pointer;
  width: 250px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  transition: all 0.8s ease-in-out;
}

.our-card:hover {
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
}
</style>
