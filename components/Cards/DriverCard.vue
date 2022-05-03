<template>
  <div class="flex flex-col mt-4 p-4 box rounded-3xl min-h-20 relative">
    <!-- <p class="font-bold">#{{ driver.track_number }}</p> -->
    <div
      class="absolute inset-0 flex flex-row items-center justify-center w-full mt-2"
    >
      <span
        class="rounded-full text-gray-50 z-10 text-center"
        style="letter-spacing: -70px"
        :style="
          index < 99
            ? 'font-size: 400px'
            : index > 99 && index <= 999
            ? 'font-size: 300px'
            : index > 999
            ? 'font-size: 200px'
            : 'font-size: 100px'
        "
      >
        {{ index }}
      </span>
    </div>

    <div
      class="whitespace-nowrap z-20"
      :class="key != 'money' ? 'border-b' : ''"
      v-for="key in user.type == 'admin'
        ? rowKeys
        : rowKeys.filter((x) => x != 'driver')"
      :key="key"
    >
      <div v-if="key == 'city'">
        <div class="flex flex-col" v-if="key == 'city'">
          <p class="font-bold text-center mb-3">
            <span
              class="font-bold text-right w-full inline-block mb-1 mt-2 text-xs text-blue-600"
            >
              المنطقة
            </span>
            <br />
            {{ driver[key].name }} -
            {{ driver["area"] ? driver["area"].name : "" }}
          </p>
        </div>
      </div>
      <div class="" v-else>
        <p class="w-full whitespace-normal text-center mb-3">
          <span
            class="font-bold text-right w-full inline-block mb-1 mt-2 text-xs text-blue-600"
          >
            {{
              key == "name"
                ? "الإسم"
                : key == "phone"
                ? "الهاتف"
                : key == "address"
                ? "العنوان"
                : key == "email"
                ? "الإيميل"
                : ""
            }}
          </span>
          <br />

          <nuxt-link
            v-if="key == 'name'"
            :to="`/drivers/${driver.id}/history`"
            class="text-blue-500 font-bold"
            title="عرض أوردرات البائع"
          >
            {{ driver.name }}
          </nuxt-link>
          <span v-else>
            {{ driver[key] }}
          </span>
        </p>
      </div>
    </div>

    <div class="absolute inline-block text-left top-1 left-1 z-30">
      <div>
        <span
          @click="rowDotsClicked(driver.id)"
          type="button"
          class="inline-flex justify-center w-full rounded-md px-4 py-2 text-sm text-blue-500 capitalize font-bold focus:outline-none"
          :id="`menu-button${driver.id}`"
          aria-expanded="true"
          aria-haspopup="true"
        >
          <i
            class="fas fa-ellipsis-h cursor-pointer"
            style="font-size: 22px"
          ></i>
        </span>
      </div>

      <div
        :class="openedDriversMenuId == driver.id ? '' : 'hidden'"
        class="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabindex="-1"
      >
        <div class="py-1" role="none">
          <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->

          <div
            href="#"
            class="text-right text-gray-700 block px-4 py-2 font-medium hover:font-bold hover:bg-blue-600 hover:text-white"
            role="menuitem"
            tabindex="-1"
            id="menu-item-0"
            @click="$router.push($route.path + `/${driver.id}`)"
          >
            تعديل
          </div>

          <div
            @click="removeItem(driver.id, driver.name)"
            href="#"
            class="text-right text-gray-700 block px-4 py-2 font-medium hover:font-bold hover:bg-red-600 hover:text-white"
            role="menuitem"
            tabindex="-1"
            id="menu-item-0"
          >
            حذف
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["driver", "index", "rowKeys", "openedDriversMenuId"],
  methods: {
    closeMenu() {
      this.$emit("closeMenu");
    },
    rowDotsClicked(itemId) {
      this.$emit("rowDotsClicked", itemId);
    },
    openItem(itemId) {
      this.$emit("openItem", itemId);
    },

    removeItem(id, name) {
      this.$emit("removeItem", id, name);
    },

    confirmSubmit(id) {
      this.$emit("confirmSubmit", id);
    },
    confirmCancelled() {
      this.$emit("confirmCancelled");
    },
  },
};
</script>

<style></style>
