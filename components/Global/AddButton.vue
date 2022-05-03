<template>
  <div class="flex justify-end md:w-1/2 w-0">
    <button
      class="btn btn-primary shadow-md mr-2 rounded-full md:rounded-lg md:h-10 w-12 h-12 md:w-20 absolute z-50  bottom-20 left-6 md:relative md:bottom-0 md:left-0"
      @click="$router.push($route.path + '/new')"
    >
      <i data-feather="plus" class="report-box__icon  md:ml-1 text-white"></i>
      <span class="hidden md:block"> إضافة </span>
    </button>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>