<template>
  <li class="mb-8 ml-4  ">
    <div
      class="absolute w-3 h-3 bg-gray-500 rounded-full -right-1.5"
    ></div>
    <time
      class="mb-2 mr-3 text-sm font-normal leading-none text-gray-500 dark:text-gray-500 "
      >{{formattedDate}}</time
    >
    <h3 class="text-lg mr-3 font-semibold text-gray-800 dark:text-white">
      {{status.message}}
    </h3>
    <!-- <p class="text-base font-normal text-gray-500 dark:text-gray-400">
      {{status.name}}
    </p> -->
  </li>
</template>

<script>
export default {
  props: ["logDate", "status", "index"],
  computed: {
    formattedDate() {
      let date = new Intl.DateTimeFormat("ar-AR", {
        dateStyle: "full",
        timeStyle: "short",
      }).format(new Date(this.logDate));
      return date;
    },
  },
};
</script>

<style></style>
