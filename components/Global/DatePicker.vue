<template>
  <div dir="rtl" class="p-5 flex flex-col items-center justify-center">
    <label class="mx-4 text-3xl mb-6" for="">اختر تاريخ التأجيل</label>
    <input
      :required="required"
      :min="getTodayDate"
      type="date"
      class="w-80 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5"
      placeholder="Select date"
      v-model="handledDate"
    />
  </div>
</template>

<script>
export default {
  props: ["required", "date"],
  data() {
    return {
      handledDate: this.date,
    };
  },
  methods: {
   
  },
  watch: {
    handledDate(currentValue) {
      this.$emit("input", currentValue);
    },
  },
};
</script>

<style></style>
