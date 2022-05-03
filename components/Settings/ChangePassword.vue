<template>
  <div class="col-span-12 lg:col-span-8 2xl:col-span-9">
    <!-- BEGIN: Change Password -->
    <div class="intro-y box mt-5">
      <div
        class="
          flex
          items-center
          p-5
          border-b border-gray-200
          dark:border-dark-5
        "
      >
        <h2 class="font-bold text-base ml-auto">تغيير كلمة المرور</h2>
      </div>
      <div class="p-5">
        <div>
          <label class="form-label">كلمة المرور القديمة</label>
          <input
            type="password"
            class="form-control"
            placeholder="كلمة المرور القديمة"
          />
        </div>
        <div class="mt-3">
          <label class="form-label">كلمة المرور الجديدة</label>
          <input
            type="password"
            class="form-control"
            placeholder="كلمة المرور الجديدة"
          />
        </div>
        <div class="mt-3">
          <label class="form-label">تأكيد كلمة المرور الجديدة</label>
          <input
            type="password"
            class="form-control"
            placeholder="تأكيد كلمة المرور الجديدة"
          />
        </div>
        <div class="flex w-full mt-4 justify-end">
          <button type="button" class="btn btn-primary">
            تغيير كلمة المرور
          </button>
        </div>
      </div>
    </div>
    <!-- END: Change Password -->
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>
