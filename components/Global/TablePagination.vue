<template>
  <div class="flex flex-row justify-center mt-3 box py-4" v-if="totalPages > 1">
    <button
    
      class="btn mx-1 px-3 capitalize  "
      :disabled="currentPage == 1"
      @click="loadPageNumber(1)"
    >
      <span class="hidden md:block"> الأولى </span>
      <span class="md:hidden block" dir="ltr"> >> </span>
    </button>

    <button
      class="btn mx-1 px-3 capitalize "
      :disabled="currentPage == 1"
      @click="loadPageNumber(currentPage - 1)"
    >
      <span class="hidden md:block"> السابقة </span>
      <span class="md:hidden block" dir="ltr"> > </span>
    </button>
    <button
      v-if="currentPage > 1"
      class="btn mx-1 px-3"
      @click="loadPageNumber(currentPage - 1)"
    >
      {{ currentPage - 1 }}
    </button>
    <button class="btn mx-1 px-3 btn-primary" @click="loadPageNumber(currentPage)">
      {{ currentPage }}
    </button>

    <button
      v-if="currentPage + 1 <= totalPages"
      class="btn mx-1 px-3"
      @click="loadPageNumber(currentPage + 1)"
    >
      {{ currentPage + 1 }}
    </button>

    <button
      v-if="currentPage + 1 < totalPages"
      class="btn mx-1 px-3"
      @click="loadPageNumber(currentPage + 1)"
    >
      ..
    </button>

    <button
      class="btn mx-1 px-3 capitalize "
      :disabled="currentPage == totalPages"
      @click="loadPageNumber(currentPage + 1)"
    >
      <span class="hidden md:block"> التالية </span>
      <span class="md:hidden block"> > </span>
    </button>

    <button
      class="btn mx-1 px-3 capitalize  hidden md:block"
      :disabled="currentPage == totalPages"
      @click="loadPageNumber(totalPages)"
    >
      <span class="hidden md:block"> الأخيرة </span>
      <span class="md:hidden block"> >> </span>
    </button>
  </div>
</template>

<script>
export default {
  props: ["totalPages", "currentPage"],
  methods: {
    loadPageNumber(number) {
      console.log("totalPages: ", this.totalPages);
      this.$emit("loadPageNumber", number);
    },
  },
};
</script>
