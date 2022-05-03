<template>
  <div
    class="flex flex-col mt-4 p-4 box rounded-3xl min-h-20 relative"
    :class="getOrderColorClasses(order.status_id)"
  >
    <!-- <p class="font-bold">#{{ order.track_number }}</p> -->
    <div
      class="absolute inset-0 flex flex-row items-center justify-center w-full mb-3"
    >
      <span
        class="rounded-full text-gray-50 z-10 text-center"
        style="letter-spacing: -70px"
        :style="
          index < 99
            ? 'font-size: 500px'
            : index > 99 && index <= 999
            ? 'font-size: 400px'
            : index > 999
            ? 'font-size: 300px'
            : 'font-size: 200px'
        "
      >
        {{ index }}
      </span>
    </div>

    <div
      class="whitespace-nowrap z-20"
      :class="key != 'status' ? 'border-b' : ''"
      v-for="key in user.type == 'admin'
        ? rowKeys
        : rowKeys.filter((x) => x != 'seller')"
      :key="key"
    >
      <div
        v-if="
          key == 'client' ||
          key == 'seller' ||
          key == 'driver' ||
          key == 'city' ||
          key == 'status' ||
          key == 'track_number'
        "
      >
        <!-- <p v-if="key == 'status'">الحالة {{ order[key].name }}</p> -->

        <div class="flex flex-col" v-if="key == 'client'">
          <p class="pt-1 text-center mb-3">
            <span
              class="font-bold text-right w-full inline-block mb-1 mt-2 text-xs text-blue-600"
            >
              العميل
            </span>
            <br />
            {{ order[key] ? order[key].name : emptyTableValue }}
            <br />
            <span class="pb-1 text-center">
              {{ order[key] ? order[key].phone : "" }}
            </span>
          </p>
        </div>
        <div
          class="flex flex-col"
          v-if="(key == 'seller' || key == 'driver') && user.type == 'admin'"
        >
          <p class="pt-1 text-center mb-3">
            <span
              class="font-bold text-right w-full inline-block mb-1 mt-2 text-xs text-blue-600"
            >
              {{ key == "seller" ? "البائع" : "المندوب" }}
            </span>
            <br />
            <nuxt-link
              v-if="order[key] && order[key].id"
              :to="`/${key == 'seller' ? 'sellers' : 'drivers'}/${
                order[key].id
              }/history`"
              class="text-blue-500 font-bold"
              title="عرض أوردرات البائع"
            >
              {{ order[key] ? order[key].name : emptyTableValue }}
            </nuxt-link>
            <span v-else>
              {{ order[key] ? order[key].name : emptyTableValue }}
            </span>
            <br />
            <span class="pb-1 text-center">
              {{ order[key] ? order[key].phone : "" }}
            </span>
          </p>
        </div>
        <div class="flex flex-col" v-if="key == 'city'">
          <p class="font-bold text-center mb-3">
            <span
              class="font-bold text-right w-full inline-block mb-1 mt-2 text-xs text-blue-600"
            >
              المنطقة
            </span>
            <br />
            {{ order[key].name }} -
            {{ order["area"] ? order["area"].name : "" }}
          </p>
        </div>
        <p
          class="font-bold cursor-pointer text-center mb-3 text-blue-500 font-bold"
          v-if="key == 'track_number'"
          @click="
            $router.push(`/orders/track_number/${order.track_number}`)
          "
        >
          <span
            class="font-bold text-right w-full inline-block mb-1 mt-2 text-xs text-blue-600"
          >
            رقم التتبع
          </span>
          <br />
          {{ order[key] }}
        </p>

        <div class="flex flex-col" v-if="key == 'status'">
          <p class="pt-1 text-center mb-3">
            <span
              class="font-bold text-right w-full inline-block mb-1 mt-2 text-xs text-blue-600"
            >
              الحالة
            </span>
            <br />
            {{ order[key] ? order[key].name : emptyTableValue }}
            <br />
            <span class="pb-1 text-center">
              {{ order[key] ? order[key].phone : "" }}
            </span>
          </p>
        </div>
      </div>
      <div class="" v-else>
        <p
          v-if="
            key != 'client_id' ||
            key != 'seller_id' ||
            key != 'driver_id' ||
            key != 'city_id' ||
            key != 'status_id' ||
            key != 'track_number'
          "
          class="w-full whitespace-normal text-center"
          :class="key != 'status' ? 'mb-3' : ''"
        >
          <span
            class="font-bold text-right w-full inline-block mb-1 mt-2 text-xs text-blue-600"
          >
            {{
              key == "item"
                ? "الشحنة"
                : key == "address"
                ? "العنوان"
                : key == "money"
                ? "السعر"
                : ""
            }}
          </span>
          <br />
          {{ order[key] }}
        </p>
      </div>
    </div>

    <div class="absolute inline-block text-left top-1 left-1 z-30">
      <div>
        <button
          @click="rowDotsClicked(order.id)"
          type="button"
          class="inline-flex justify-center w-full rounded-md px-4 py-2 text-sm text-blue-500 capitalize font-bold focus:outline-none"
          :id="`menu-button${order.id}`"
          aria-expanded="true"
          aria-haspopup="true"
        >
          <i class="fas fa-ellipsis-h" style="font-size: 22px"></i>
        </button>
      </div>

      <div
        :class="openedOrdersMenuId == order.id ? '' : 'hidden'"
        class="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabindex="-1"
      >
        <div class="py-1" role="none">
          <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->

          <div
            :class="{
              'not-allowed-pointer':
                order.cancelled_date || order.delieverd_date,
            }"
          >
            <div
              href="#"
              class="cursor-pointer text-right text-gray-700 block px-4 py-2 font-medium hover:font-bold hover:bg-green-500 hover:text-white"
              :class="
                ({ 'disible-action': order.cancelled_date },
                { 'disible-action': order.delieverd_date })
              "
              role="menuitem"
              tabindex="-1"
              id="menu-item-0"
              @click="openStatusModal(order.id, order.track_number)"
            >
              تغير الحالة
            </div>
          </div>

          <div
            @click="removeItem(order.id, order.track_number)"
            href="#"
            class="cursor-pointer text-right text-gray-700 block px-4 py-2 font-medium hover:font-bold hover:bg-red-600 hover:text-white"
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
  props: ["order", "index", "rowKeys", "openedOrdersMenuId"],
  methods: {
    closeStatusModal() {
      this.$emit("closeStatusModal");
    },

    openStatusModal(orderId, orderTrackNumber) {
      this.$emit("openStatusModal", orderId, orderTrackNumber);
    },

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
