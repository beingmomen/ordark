<template>
  <div class="">
    <div class="p-3 flex flex-row justify-between w-full h-16 px-0">
      <h2 class="font-medium text-3xl mt-1 text-right pr-0 w-3/4">الإعدادات</h2>
      <GlobalBackButton class="md:hidden" />
    </div>
    <hr class="mt-3 mb-1" />
    <ChangeInfo @submit="submitSettings" />
    <ChangePassword />
  </div>
</template>

<script>
import ChangePassword from "~/components//Settings/ChangePassword.vue";
import ChangeInfo from "~/components/Settings/ChangeInfo.vue";
export default {
  components: { ChangePassword, ChangeInfo },
  layout: "admin",
  middleware: ["authentication"],
  methods: {
    submitSettings(data) {
      this.$axios
        .post(`/update-settings`, data)
        .then((res) => {
          if (res.data.success) {
            this.showSuccesMessage("add", "تمت تحديث البيانات بنجاح");
          }
        })
        .catch((err) => {
          let errorMessage= err.response.data.message;
            this.$toast.error(errorMessage);;
          console.log(err.status);
        });
    },
  },
};
</script>

<style></style>
