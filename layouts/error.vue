<template>
  <div
    class="flex items-center justify-center w-screen h-screen bg-gradient-to-r from-indigo-600 to-blue-400"
  >
    <div class="px-40 py-20 bg-white rounded-md shadow-xl">
      <div class="flex flex-col items-center">
        <h1 class="font-bold text-blue-600 text-9xl">404</h1>

        <h6
          class="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl"
        >
          <span class="text-red-500">عذرا!</span> هذه الصفحة غير موجودة
        </h6>

        <p class="mb-8 text-center text-gray-500 md:text-lg">
          الصفحة التي تبحث عنها غير موجودة
        </p>

        <div class="flex flex-row">
          <button
            @click="$router.back()"
            class="px-6 py-2 rounded-md text-sm font-semibold bg-blue-800 text-blue-100 cursor-pointer mx-1"
          >
            الصفحة السابقة
          </button>
          <button
            @click="$router.push('/dashboard')"
            class="px-6 py-2 rounded-md text-sm font-semibold text-blue-800 bg-blue-100 cursor-pointer mx-1"
          >
            الصفحة الرئيسية
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
