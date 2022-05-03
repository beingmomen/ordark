<template>
  <div
    class="rounded-md border border-gray-300 w-full md:w-1/3 lg:w-1/4 my-2 mx-2 box"
  >
    <p class="whitespace-normal text-center px-3">
      <span
        class="font-bold text-right w-full inline-block mb-1 mt-2 text-base text-blue-600"
      >
        {{
          infoKey == "name"
            ? "الإسم"
            : infoKey == "phone"
            ? "الهاتف"
            : infoKey == "address"
            ? "العنوان"
            : infoKey == "email"
            ? "الإيميل"
            : infoKey == "city"
            ? "المنطقة"
            : ""
        }}
      </span>
      <span class="text-lg inline-block pb-3">
        {{
          infoKey == "city" && seller.city
            ? seller.city.name + "-" + seller.area.name
            : seller[infoKey]
        }}
        <!-- <div
          class="btn btn-sm btn-outline-dark hover:text-white h-5 w-6"
          @click="copy(infoKey, $event)"
          title="نسخ"
        >
          <i class="fas fa-copy"></i>
        </div> -->
      </span>
    </p>
  </div>
</template>

<script>
export default {
  props: ["infoKey", "seller"],
  methods: {
    copy(infoKey, $event) {
      this.$emit("copy", infoKey, $event);
    },
  },
};
</script>

<style></style>
